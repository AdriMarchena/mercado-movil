import { View, Text, StyleSheet, TouchableOpacity, Alert, useWindowDimensions, FlatList, ScrollView } from 'react-native'
import React, { useEffect, useState } from 'react'
import { StyleTextSubTitle, StyleTextTitle, LoadingScreen, Header, Menu, OverlayWarningModal, CardStorePresentation, Separator, StyleText, BasicButton } from '../../../../components';
import { COLORS } from '../../../../assets/theme/theme';
import { router } from 'expo-router';
import { useProductGlobalContext } from '../../../../Context/GlobalStateProduct';
import { useAdminGlobalContext } from '../../../../Context/GlobalStateAdmin';
import { useBoxGlobalContext } from '../../../../Context/GlobalStateBox';
import { getBoxes, getBoxesOpen } from '../../../../services/fetchDataBoxes';
import { useVentaGlobalContext } from '../../../../Context/GlobalStateVenta';
import { ButtonContinue } from '../../../../components/elements';

export default function home() {
  const {width} = useWindowDimensions();
  const {defaultStore, loadingPage, listStores} = useProductGlobalContext();
  const {dataAdmin, loadingDataAdmin, signOut} = useAdminGlobalContext();
  const {saveDataBoxesOpen, actualizarDataCaja, dataBoxesOpen, hasValidateAdmin} = useBoxGlobalContext();
  const {actualizarDataVentas} = useVentaGlobalContext();
  const [showMenu, setShowMenu] = useState(false);
  const [loading, setLoading] = useState(false);
  const [solicitudesInventario, setSolicitudesInventario] = useState([]);
  const [cajasAperturadas, setCajasAperturadas] = useState([]);
  useEffect(()=>{
    async function fetchDataBoxes() {
      setLoading(true);
      if (dataAdmin!== null) {
        const idUser = dataAdmin['idUser'];
        const respuestaBoxesOpen = await getBoxesOpen(idUser);
        const jsonBoxesOpen = await respuestaBoxesOpen.json();
        if (jsonBoxesOpen['error']) {
          Alert.alert("Error","Error de conexión");
          setLoading(false);
          return;
        }
        const messageResponseBoxesOpen = jsonBoxesOpen['message'];
        saveDataBoxesOpen(messageResponseBoxesOpen);
      }

      setLoading(false)
    }
    fetchDataBoxes();

  },[]);
  const goToInventario=()=>{
    router.push("inventory/verifyData");
  }
  const goToVenta=()=>{
    if (defaultStore) {
      router.push("salesprocess");
      actualizarDataVentas();
      return;
    }
    router.push("salesprocess/selectstore");
    actualizarDataVentas();
  }


  const changeVisibleMenu = () => {
    setShowMenu(!showMenu)
  }
  const goToCerrarCaja = ()=>{
    router.push("boxprocess/validateAdmin");
  }
  if (loadingDataAdmin || loadingPage || loading) {
    return (<LoadingScreen/>)
  }
  return (
    <View style={styles.bodyStyle}>
      {dataBoxesOpen.length > 0 ? <OverlayWarningModal title={"Cajas abiertas"} description={"Parece que están abiertas algunas cajas. Cierra las cajas para continuar."} buttonText={"Ir a cerrar Caja"} handleSubmit={goToCerrarCaja} /> : null}
      {showMenu ?
        <Menu
          logout={signOut}
          changeVisible={changeVisibleMenu}
          name={`${dataAdmin ? dataAdmin['nameAdmin'] : null}`}
        /> :
      null}
      <Header changeVisible={changeVisibleMenu} title={`Hola ${dataAdmin ? dataAdmin['nameAdmin'] : null}`} />
      <StyleTextSubTitle>Local actual</StyleTextSubTitle>
      <CardStorePresentation data={listStores} />
      <Separator/>
        <ScrollView>
          <View style={styles.rowStyle}>
            <StyleTextTitle>Inventario</StyleTextTitle>          
            <TouchableOpacity onPress={()=>router.push("inventorytab")}>
              <StyleText>Ver Inventario</StyleText>
            </TouchableOpacity>
          </View>        
          {
            solicitudesInventario.length > 0 && 
            (
            <View>
              <StyleTextSubTitle>Solicitudes de inventario</StyleTextSubTitle>
            </View> 
            )    
          }
          <Separator/>

          <View style={styles.rowStyle}>
            <StyleTextTitle>Ventas</StyleTextTitle>
            <TouchableOpacity onPress={()=>router.push("salesprocess")}>
              <StyleText>Ver Ventas</StyleText>
            </TouchableOpacity>
          </View>
          {/* <View>
            <StyleTextSubTitle>Balance general de ventas</StyleTextSubTitle>
          </View>
          <View style={styles.boxVentas}>
            
          </View> */}
          <Separator/>

          <View style={styles.rowStyle}>
            <StyleTextTitle>Cajas de Hoy</StyleTextTitle>
            <StyleText>Ver Cajas</StyleText>
          </View>
          {
            cajasAperturadas.length > 0 ?
            <View>

            </View> : 
            <View style={{marginVertical : 10}}>

              <BasicButton>Aperturar Caja</BasicButton>
            </View>
          
          }
          <View>
            
          </View>
        </ScrollView>
        <View style={[styles.bottomBoxButton, {width}]}>
          <TouchableOpacity 
            onPress={goToInventario} style={styles. styleButtonNegative}>
            <Text style={{color :COLORS.naranja, fontWeight : 'bold'}}>Ingresar Inventario</Text>
          </TouchableOpacity>
          <TouchableOpacity  
            onPress={goToVenta} style={styles.stylesButton}>
            <Text style={{color : COLORS.blanco, fontWeight : 'bold'}}>Nueva Venta</Text>
          </TouchableOpacity>
        </View>
    </View>
  )
}
const styles = StyleSheet.create({
  "bodyStyle":{
    width : "100%",
    paddingHorizontal : 20,
    paddingVertical : 15,
    backgroundColor:COLORS.blanco,
    flex : 1
  },
  "cardStyle":{
    width:"100%",
    height:100,
    borderRadius:10,
    borderWidth:1,
    flexDirection:'row',
    alignItems:'center',
    marginVertical:8
  },
  "containerCardImg":{
    width:70,
    height:70,
    justifyContent:'center',
    alignItems:'center'
  },
  "bottomBoxButton":{
    position:"absolute",
    bottom : 0,
    height : 80,
    paddingHorizontal : 10,
    flexDirection : 'row',
    justifyContent:'center',
    alignItems:'center'
  },
  "styleButtonNegative":{
    flex:1,
    borderWidth : 1,
    borderColor : COLORS.naranja,
    justifyContent: 'center',
    alignItems:'center',
    height : 60,
    borderRadius : 10,
    marginHorizontal : 5
  },
  "stylesButton":{
    flex:1,
    borderRadius : 10,
    backgroundColor:COLORS.naranja,
    color : COLORS.blanco,
    height : 60,
    justifyContent : 'center',
    alignItems:'center',
  },
  "rowStyle":{
    flexDirection : 'row',
    justifyContent : 'space-between',
    alignItems:'center'
  },
  "boxVentas":{
    width : "100%",
    height : 90,
    borderWidth : 1,
    borderColor : COLORS.negro_opaco,
    borderRadius : 10,
    marginVertical : 10
  }
})