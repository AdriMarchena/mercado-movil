import { View, Text, StyleSheet, FlatList, useWindowDimensions, TextInput, ScrollView, TouchableOpacity, Alert } from 'react-native'
import React, { useEffect, useState } from 'react'
import { COLORS } from '../../../../assets/theme/theme'
import { useAdminGlobalContext } from '../../../../Context/GlobalStateAdmin';
import { AddCardPickerComp, BasicButton, CardDisplayOverlay, CardHorizontal, ListCardResumeVenta, Loading, OverlayModal, StyleText, StyleTextSubTitle, StyleTextTitle } from '../../../../components';
import { getClientByIdUser, getNumVentasByIdUser, getTipoComprobate } from '../../../../services/getDetailVenta';
import { AntDesign, Entypo } from '@expo/vector-icons';
import { useProductGlobalContext } from '../../../../Context/GlobalStateProduct';
import { useVentaGlobalContext } from '../../../../Context/GlobalStateVenta';
import { ButtonContinue } from '../../../../components/elements';
import { FontAwesome6 } from '@expo/vector-icons';
import { router } from 'expo-router';
import { AgregarSeleccion } from '../../../../utils/lib/AgregarSeleccion';


export default function detail() {
  const [loading, setloading] = useState(true);
  const [numVenta, setNumVenta] = useState(0);
  const {dataAdmin} = useAdminGlobalContext();
  const {products, numProducts, totalVenta, handleAddDetailProduct, listClients, setClientsListData} = useVentaGlobalContext();
  const {listStores, defaultStore} = useProductGlobalContext();
  const subtotal = products.reduce((prev, current)=>prev+(current['precioVenta']*current['cantidad']),0).toFixed(2)
  const [dataTipoComprobante, setTipoComprobante] = useState([]);
  const [descuento, setDescuento] = useState("0.0");
  const [total, setTotal] = useState(totalVenta);
  const [showModal, setShowModal] = useState(false);
  useEffect(()=>{
    async function fetchNumVenta() {
      setloading(true);
      const idUser = dataAdmin['idUser'];
      
      const responseNumVentas = await getNumVentasByIdUser(idUser);
      const jsonResponseNumVentas = await responseNumVentas.json();
      setNumVenta(jsonResponseNumVentas.message['numVentas'])
      
      const responseClients = await getClientByIdUser(idUser);
      const jsonResponseClients = await responseClients.json();

      const responseTipoComprobante = await getTipoComprobate();
      const jsonTipoComp = await responseTipoComprobante.json();

      const listaClientesSeleccionado = AgregarSeleccion(jsonResponseClients.message);
      const listaTipoCompSeleccionado = AgregarSeleccion(jsonTipoComp.message);
      setTipoComprobante(listaTipoCompSeleccionado);
      setClientsListData(listaClientesSeleccionado);
      setloading(false);
    }
    fetchNumVenta();
  },[]);
  const handleChangeClients=(idItem)=>{
    const nuevaLista = listClients.map((data, key)=>{
      if (key===idItem) {
        return {
          ...data,
          seleccionado : true
        }
      }
      return {
        ...data,
        seleccionado : false
      }
    });
    setClientsListData(nuevaLista);
  }
  const handleChangeTipoComp=(idItem)=>{
    const nuevaLista = dataTipoComprobante.map((data,key)=>{
      if (key===idItem) {
        return {
          ...data,
          seleccionado : true
        }
      }
      return {
        ...data,
        seleccionado : false
      }
    });
    setTipoComprobante(nuevaLista);
  }
  const handleSubmit=()=>{
    const idCliente = listClients.filter((client)=>client.seleccionado)[0]['idClienteUsuario'];
    const idTienda = listStores.filter((stor)=>stor.seleccionado)[0]['idTienda'];
    const tipoComprobanteSeleccionado = dataTipoComprobante.filter((tipo)=>tipo.seleccionado)[0];
    const idTipoComprobante = tipoComprobanteSeleccionado['idTipoComprobante'];
    const serie = tipoComprobanteSeleccionado['serie'];
    
    //Validamos que el tipo de Comprobante sea Factura 
    if (tipoComprobanteSeleccionado['idTipoComprobante']===1) {
      const docClienteSeleccionado = listClients.filter((client)=>client.seleccionado)[0]['documento'];
      if (String(docClienteSeleccionado).length !== 11) {
        Alert.alert("Debe ingresar un cliente con RUC");
        return;
      }
    }
    const formatterProduct = (data)=>{
      return data.map((val)=>{
        return {
          "idProductoInventario" : val.idProductoInventario,
          "cantidad" : val.cantidad,
          "precioUnitario" : val.precioVenta,
          "total" : (val.cantidad*val.precioVenta)
        }
      })
    }

    const formattedProduct = formatterProduct(products);
    const dataToSend={
      idTienda,
      idUsuario : dataAdmin['idUser'],
      idUsuarioVenta : dataAdmin['idUser'],
      idCliente,
      tipoComprobante : {
        idTipoComprobante,
        serie
      },
      listaProductos : formattedProduct,
    }
    handleAddDetailProduct(dataToSend);
    router.push("salesprocess/paymode");
  }
  if (loading) {
    return (<Loading/>)
  }
  return (
    <View style={styles.maintContainer}>
      {
        showModal ? <OverlayModal>

        </OverlayModal> : null
      }
        <StyleTextTitle>Nueva Venta N° {numVenta}</StyleTextTitle>
        <AddCardPickerComp
          titleOverlay={"Escoge un cliente"}
          titleComponent={"Cliente"}
          IconCard={<AntDesign name="user" size={24} color="black" />}
          changeDataSelect={handleChangeClients}
          data={listClients}
          path={"clients/addClient"}
        />
        <CardDisplayOverlay
          title={"TipoComprobante"}
          data={dataTipoComprobante}
          handleChange={handleChangeTipoComp}
        />
        <StyleTextSubTitle style={{marginTop:15}}>Productos {numProducts}</StyleTextSubTitle>
        <ListCardResumeVenta data={products} />
        <View style={{borderTopColor:COLORS.negro, borderTopWidth:1, marginTop:15}}>
            {/* <View style={styles.horizontalData}>
              <StyleText style={styles.textCard}>SubTotal</StyleText>
              <StyleText>S/.{subtotal}</StyleText>
            </View>
            <View style={styles.horizontalData}>
              <StyleText style={styles.textCard}>Descuento</StyleText>
              <View style={{flexDirection:'row',alignItems:'center'}}>
                <StyleText style={{marginHorizontal:7}}>S/. {descuento}</StyleText>
                <TouchableOpacity style={{backgroundColor:COLORS.naranja, padding:8, borderRadius:10}} onPress={changeShowModal}>
                  <Entypo name="pencil" size={14} color="black" />
                </TouchableOpacity>
              </View>
            </View> */}
            <View style={styles.horizontalData}>
              <StyleText style={styles.textCard}>Total</StyleText>
              <StyleText style={{fontSize : 18}}>S/.{subtotal}</StyleText>
            </View>

        </View>
      <ButtonContinue handleSubmit={handleSubmit} buttonText={"Continuar"}  />
    </View>
  )
};
const styles = StyleSheet.create({
  "maintContainer":{
    flex : 1,
    backgroundColor : COLORS.blanco,
    paddingHorizontal:30, paddingVertical:10,
    position:'relative'
  },
  "textCard":{
    fontWeight:'bold',
    fontSize:18
  },
  "horizontalData":{
    flexDirection:'row',
    justifyContent:'space-between',
    alignItems:'center'
  }
})