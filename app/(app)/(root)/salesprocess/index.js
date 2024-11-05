import { View, Text, Alert, FlatList, StyleSheet, useWindowDimensions, Image, TouchableOpacity, Touchable, Pressable, Modal, ActivityIndicator } from 'react-native'
import React, { useEffect, useState } from 'react'
import { COLORS } from '../../../../assets/theme/theme';
import { CardProductList2 } from '../../../../components/elements';
import {BasicButton, SearchInputText, StyleTextTitle, StyleText, StyleTextSubTitle, WarningAdvice, OverlayModal, OverlayWarningModal} from '../../../../components';
import Constants from 'expo-constants';
import ListaCargandoDatosVertical from '../../../../components/ListaCargandoDatosVertica';
import { useVentaGlobalContext } from '../../../../Context/GlobalStateVenta';
import { router } from 'expo-router';
import { MaterialIcons } from '@expo/vector-icons';
import { useProductGlobalContext } from '../../../../Context/GlobalStateProduct';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useAdminGlobalContext } from '../../../../Context/GlobalStateAdmin';
import { getProductInventoryByIdUserAndIdStore } from '../../../../services/products';
import { traerCajasDelDiadeHoy, traerTiendasdelUsuario } from '../../../../utils/lib/FuncdelProcesoCaja';
import { AgregarSeleccion, AgregarSeleccionPorId } from '../../../../utils/lib/AgregarSeleccion';


export default function home() {
  const {width,height} =useWindowDimensions();
  const {
    loadingPage, 
    totalVenta, 
    listProducts, 
    handleMinusProduct, 
    changeQueryProduct, 
    numProducts, 
    handleAddProduct,
    resetDataProductList,
  saveListProducts, saveHistoryListProducts, actualizarData} = useVentaGlobalContext();
  const {saveListStores, listStores} = useProductGlobalContext();
  const {dataAdmin} = useAdminGlobalContext();
  const [showWarningBoxClose, setShowWarningBoxClose] = useState(false);
  const [loading, setLoading] = useState(false);
  const [mostrarAlertaTiendasVacias, setMostrarAlertaTiendasVacias] = useState(false);
  const [cargandoBotonContinuar, setCargandoBotonContinuar] = useState(false);
  useEffect(()=>{
    async function fetchData() {
      setLoading(true);
      
      if (dataAdmin!==null) {
        const idUser = dataAdmin['idUser']

        // Traemos las tiendas de la BD
        const jsonListaTiendas = await traerTiendasdelUsuario(idUser);
        if (jsonListaTiendas['error']) {
          Alert.alert("Alerta","Problemas de conexión");
          setLoading(false);
          return;
        }
      
        const listaTiendas = jsonListaTiendas['message'] || [];
        if (listaTiendas.length == 0) {
          setMostrarAlertaTiendasVacias(true);
          setLoading(false);
          return;
        }
        const cacheDataStore = await AsyncStorage.getItem(`default-store-idAdmin-${idUser}`);
        const jsonCacheDataStore = JSON.parse(cacheDataStore);
        let idDefStore = null;
        if (jsonCacheDataStore !== null) {
          const dataDefaultStore = jsonCacheDataStore['defaultStore'];
          idDefStore = dataDefaultStore['idTienda'];
          
        }
        // Para la tiendas
        const listaTiendasconSeleccionado = idDefStore ? AgregarSeleccionPorId(listaTiendas, idDefStore, 'idTienda'): AgregarSeleccion(listaTiendas);
        saveListStores(listaTiendasconSeleccionado);
        const dataStoreSelected = listaTiendasconSeleccionado.filter(tienda=>tienda.seleccionado)[0];
        const idTiendaSeleccionada = dataStoreSelected['idTienda'];

        // Traemos los datos de los productos
        const responseProducts = await getProductInventoryByIdUserAndIdStore(idUser, idTiendaSeleccionada);
        const responseJSON = await responseProducts.json();
        if (responseJSON.error) {
            Alert.alert("Error","Error de conexión");
            setLoading(false);
            return;
        }
        const lista = responseJSON.message.map((val)=>({...val, cantidad : 0}))
        saveListProducts(lista);
        saveHistoryListProducts(lista);

      }
      setLoading(false);

    }
    fetchData();
    
  },[actualizarData]);
  const gotToSelecStore=()=>{
    if (numProducts>0) {
      Alert.alert("Alerta","Estás seguro de salir, no se guardaran los cambios",[
        {
          text : "Cancelar",
          onPress : ()=>{console.log("Se cancelo el cambio de pantalla en ventas");},
          style : 'cancel'
        },
        {
          text : "Continuar",
          onPress : ()=>{
            router.push("salesprocess/selectstore");
            resetDataProductList();
          }
        }
      ])
    }
    router.push("salesprocess/selectstore");
  }
  const goToBoxProcess=()=>{
    router.push("boxprocess")
    setShowWarningBoxClose(false);
  }
  const handleChangeTranscript=(dataTranscript)=>{
    const dataProducts = listProducts || [];
    if (dataProducts.length == 0) {
      Alert.alert("Error","Aún no tienes inventario en este local");
      return;
    }
    const nuevaListaProductos = dataProducts.filter((item)=>
    item.codigoProducto.toUpperCase().includes(dataTranscript.toUpperCase()));

    saveListProducts(nuevaListaProductos);
  }
  const goToDetail=async()=>{
    // Validamos si la tienda actual tiene caja abierta
    const idUser = dataAdmin['idUser'];
    setCargandoBotonContinuar(true);
    const tiendaSeleccionada = listStores.filter(tienda=>tienda.seleccionado)[0];
    const idTiendaSeleccionada = tiendaSeleccionada['idTienda'];
    const dataCajasPorUsuario = await traerCajasDelDiadeHoy(idUser);
    const existeCajaAbiertaEnEsteLocal = dataCajasPorUsuario.filter(caja=>caja['idTienda']==idTiendaSeleccionada)[0]['cajas'].length > 0;
    if (!existeCajaAbiertaEnEsteLocal) {
      setShowWarningBoxClose(true);
      setCargandoBotonContinuar(false);
      return;
    }
    setCargandoBotonContinuar(false);
    router.push("salesprocess/detail")
  }
  const goToCreateStore=()=>{
    router.push("stores/addStore");
  } 
  const validarSiTieneInventario=()=>{
    if (listProducts.length==0) {
      Alert.alert("Error","Aún no tienes inventario");
      return;
    }
  }
  if (loadingPage || loading) {
  return (
    <ListaCargandoDatosVertical numColumns={2} title={"Nueva Venta"}  />
  )    
  }
  return (
    <View style={{flex:1, paddingHorizontal:30, paddingVertical:20, backgroundColor : COLORS.blanco}}>
      {mostrarAlertaTiendasVacias ? 
      <OverlayWarningModal
        title={"No hay tiendas"}
        description={"Para poder continuar, por favor crear locales"}
        buttonText={"Crear un local"}
        handleSubmit={goToCreateStore}
      /> :null}
      {showWarningBoxClose ? <OverlayWarningModal 
      title={"Caja no abierta"} 
      description={"Este local no tiene una caja abierta, por favor abra caja para continuar."} 
      buttonText={"Abrir Caja"} handleSubmit={goToBoxProcess} />
      : null}
      <View style={{flexDirection:'row', height:40, justifyContent:'space-between', alignItems:'center'}}>
        <StyleTextTitle>Nueva Venta</StyleTextTitle>
        <Pressable onPress={gotToSelecStore} style={{maxWidth:150,flexDirection:'row', marginRight:10, alignItems:'center'}}>
          <MaterialIcons name='store' size={20} color={COLORS.negro} />
          <StyleText style={{textDecorationLine : 'underline',fontWeight:'bold'}}>{listStores.length > 0 ? listStores.filter(tienda=>tienda.seleccionado)[0]['razSocial'] : "No hay tienda" }</StyleText>
        </Pressable>
      </View>
      <SearchInputText showMic={true} changeRecording={setLoading} changeTranscript={handleChangeTranscript} onPressIn={validarSiTieneInventario} changeQuery={changeQueryProduct} />
      <View style={[{height:height-150,  paddingBottom:60}, numProducts>0 && {paddingBottom:110}]}>
        {
          listProducts.length > 0 ? 
          <FlatList 
            style={{paddingVertical : 10}}
            data={listProducts}
            numColumns={2}
            renderItem={({item})=>(<CardProductList2 useMinusProduct={handleMinusProduct} useAddProduct={handleAddProduct} productStandard={item}  />)}
            showsVerticalScrollIndicator={false}
          /> : 
          <View style={{flex :1, backgroundColor : COLORS.blanco, justifyContent:'center', alignItems:'center'}}>
            <StyleTextSubTitle>Aún no tienes inventario en este local</StyleTextSubTitle>
          </View>
        }
      </View>
      {
        numProducts > 0 &&
        <View style={{position:'absolute', bottom:0, left:0, right:0,width,height:70, borderTopWidth:1, borderColor:COLORS.negro_opaco, backgroundColor:COLORS.blanco, flexDirection:'row', alignItems:'center', justifyContent:'center'}}>
          <View style={{marginRight:10, alignItems:'flex-end'}}>
            <Text style={{color:COLORS.negro}}>Productos : {numProducts}</Text>
            <Text style={{fontWeight:'bold', color:COLORS.negro, fontSize:18}}>S/{Number(totalVenta).toFixed(2)}</Text>
          </View>
          <BasicButton handleSubmit={goToDetail} style={{width:(width/2)-60, }}>
            <StyleTextSubTitle style={{color : COLORS.blanco}}>{cargandoBotonContinuar ? <ActivityIndicator/> : "Continuar"}</StyleTextSubTitle>
          </BasicButton>
        </View>
      }
    </View>
  )

}
