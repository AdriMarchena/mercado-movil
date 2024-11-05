import { View, Text, StyleSheet, FlatList, Alert, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useProductGlobalContext } from '../../../../Context/GlobalStateProduct'
import { COLORS } from '../../../../assets/theme/theme';
import Constants from 'expo-constants';
import { useAdminGlobalContext } from '../../../../Context/GlobalStateAdmin';
import { getDataVerifyStore } from '../../../../services/getDataVerify';
import { CardList, DisplayOptionsMoney, ListaCargandoDatos, OverlayWarningModal } from '../../../../components';
import { MaterialIcons } from '@expo/vector-icons';
import Checkbox from 'expo-checkbox';
import { ButtonContinue } from '../../../../components/elements';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { router } from 'expo-router';
import { traerTiendasdelUsuario } from '../../../../utils/lib/FuncdelProcesoCaja';
import { AgregarSeleccion } from '../../../../utils/lib/AgregarSeleccion';
import { getProductInventoryByIdUserAndIdStore } from '../../../../services/products';
import { useVentaGlobalContext } from '../../../../Context/GlobalStateVenta';


export default function selectstore() {
    const {dataAdmin} = useAdminGlobalContext();
    const {saveListProducts, saveHistoryListProducts} = useVentaGlobalContext();
    const {listStores, saveListStores, loadingPage, onChangeStore} = useProductGlobalContext();
    const [loading, setLoading] = useState(false);
    const [acceptAgreement, setAcceptAgreement] = useState(true);
    const [mostrarAlertaTiendasVacias, setMostrarAlertaTiendasVacias] = useState(false);
    useEffect(()=>{
      async function fetchData() {
        setLoading(true);
        if (dataAdmin!==null) {
          const idUser = dataAdmin['idUser'];
          const jsonListaTiendas = await traerTiendasdelUsuario(idUser);
          if (jsonListaTiendas['error']) {
            Alert.alert("Error","Algo salio mal");
            setLoading(false);
            return;
          }

          const listaTiendas = jsonListaTiendas['message'] || [];
          if (listaTiendas.length == 0) {
            setLoading(false);
            setMostrarAlertaTiendasVacias(true);
            return;
          }
          const listaTiendasconSeleccionado = AgregarSeleccion(listaTiendas);
          saveListStores(listaTiendasconSeleccionado);
          setLoading(false);
        }
      }
      fetchData();
    },[]);
    const handleSubmit =async()=>{
      setLoading(true);
      const storeSeleccionado = listStores.filter((data)=>data.seleccionado)[0];
      const idTiendaSeleccionada = storeSeleccionado['idTienda']
      const idUser = dataAdmin['idUser'];
      const labelDataSave = `default-store-idAdmin-${idUser}`
      const dataSave = JSON.stringify({defaultStore : storeSeleccionado})
      if (acceptAgreement) {
        await AsyncStorage.setItem(labelDataSave, dataSave);
      }
      const responseProducts = await getProductInventoryByIdUserAndIdStore(idUser, idTiendaSeleccionada);
      const responseJSON = await responseProducts.json();
      if (responseJSON['error']) {
          Alert.alert("Error","Error de conexión");
          setLoading(false);
          return;
      }

      const listaProductos = responseJSON['message'].map(val=>({...val, cantidad : 0}));
      saveListProducts(listaProductos);
      saveHistoryListProducts(listaProductos);
      router.push("salesprocess");
      setLoading(false);
    }
    const handleChangeStore=(idTienda)=>{
      const newLista = listStores.map((data)=>{
        if (data.idTienda === idTienda) {
          return {
            ...data,
            seleccionado : true
          }
        }
        return {
          ...data,
          seleccionado : false
        }
      })
      onChangeStore(newLista);
    }
    const goToCreateStore=()=>{
      router.push("stores/addStore");
    } 
    if (loading || loadingPage) {
      return (
        <ListaCargandoDatos styles={styles.mainContainer} filas={2} title={"¿En qué local estás vendiendo"} numColumns={1}/>
      )
    }
    return (
      <View style={styles.mainContainer}>
          {
            mostrarAlertaTiendasVacias ? 
            <OverlayWarningModal
              title={"No hay tiendas"}
              description={"No has creado aún tu primer local, por favor crea un local para continuar"}
              buttonText={"Crear local"}
              handleSubmit={goToCreateStore}
            /> : null
          }
          <Text style={styles.textTitle}>¿En qué local estás vendiendo?</Text>
          <View >
            <FlatList 
              data={listStores}
              renderItem={({item})=><CardList handleChangeData={handleChangeStore} idCard={item.idTienda} title={item.razSocial} description={item.direccion} seleccionado={item.seleccionado} Icon={<MaterialIcons name='store' size={28} color={COLORS.negro} />} />}
              ItemSeparatorComponent={()=><Text></Text>}
            />
          </View>
          <View style={styles.containerSelect}>
            <Checkbox
              value={acceptAgreement}
              color={acceptAgreement ? COLORS.azul : undefined}
              onValueChange={setAcceptAgreement}
              />
            <Text style={styles.textDescription}>Guardar selección por defecto</Text>
          </View>
          <ButtonContinue buttonText={"Continuar"} handleSubmit={handleSubmit}  />
      </View>
    )
  
  };
const styles = StyleSheet.create({
    "textTitle":{
        color:COLORS.negro, 
        fontWeight:'bold', 
        fontSize:24, 
        marginBottom:15
    },
    "textDescription":{
      fontSize : 16,
      color :COLORS.negro,
      marginHorizontal : 10
    },
    "mainContainer":{
      marginTop : Constants.statusBarHeight,
      flex : 1,
      paddingHorizontal:20,
      paddingVertical:25
    },
    "containerSelect":{
      width : "100%",
      height:60,
      flexDirection : 'row',
      alignItems : 'center'
    }
})