import { View, Text, TouchableOpacity, Image, useWindowDimensions, Alert, StyleSheet } from 'react-native'
import React, { useEffect, useState } from 'react'
import { COLORS } from '../../../../assets/theme/theme'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getDataVerifyStore, getDataVerifySupplier, getDetailDataUser } from '../../../../services/getDataVerify';
import { BasicButton, CardVerifyData, DisplayOptionScreen, Loading, StyleTextSubTitle, StyleTextTitle } from '../../../../components';
import { Entypo } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { useProductGlobalContext } from '../../../../Context/GlobalStateProduct';
import Constants from 'expo-constants';

function AgregarSeleccion(lista) {
    const nuevaLista = lista.map((val, key)=>{
      if (key==0) {
        return {
          ...val,
          seleccionado : true
        }
      }
      return {
        ...val,
        seleccionado : false
      }
    });
    return nuevaLista;
}
function RouterDisplay({type, handleChangeDisplayData, changeDisplayOptions, dataSupplier, dataStore}) {
  if (type=="supplier") {
    return(
      <DisplayOptionScreen labelId={"idProveedor"}  handleChangeDisplayData={handleChangeDisplayData} title={"Escoge un Proveedor"} listData={dataSupplier} type={"supplier"} handleDisplayOptions={changeDisplayOptions} />
    )
  }
  if (type=="store") {
    return (
      <DisplayOptionScreen labelId={"idTienda"} Icon={
        <View style={{width:60, height:60, borderRadius : 60, backgroundColor : COLORS.white, justifyContent:'center', alignItems:'center'}}>
          <MaterialIcons name="store" size={40} color={COLORS.negro} />
        </View>
      } handleChangeDisplayData={handleChangeDisplayData} title={"Escoge una tienda"} listData={dataStore} type={"store"} handleDisplayOptions={changeDisplayOptions} />
    )
  }
}


export default function verifyData() {
  const useProduct = useProductGlobalContext();
  const {width} = useWindowDimensions();
  const [loading, setLoading] = useState(false);
  const [displayOptions, setDisplayOptions] = useState(false);
  const [typeDisplay, setTypeDisplay] = useState("supplier");
  const [idAdmin, setIdAdmin] = useState("");
  useEffect(()=>{
    async function fetchDataAdminStorage() {
      setLoading(true);
      const dataAdminStorage = await AsyncStorage.getItem("admin-data")
      const jsonDataAdminStorage = JSON.parse(dataAdminStorage);
      const idDataAdmin = jsonDataAdminStorage['idUser'];
      setIdAdmin(idDataAdmin);

      const responseDataSupplier = await getDataVerifySupplier(idDataAdmin);
      const jsonDataSupplier = await responseDataSupplier.json();

      if (jsonDataSupplier.error ) {
        Alert.alert("Error :","Algo salió mal");
        setLoading(false);
        return;
      }

      const newListSupplier = AgregarSeleccion(jsonDataSupplier ? jsonDataSupplier.message : []);      
      useProduct.initialValueSupplierStore(newListSupplier);
      setLoading(false)
    }
    fetchDataAdminStorage();
  },[]);
  const changeDisplayOptions=(type)=>{
    setTypeDisplay(type);
    setDisplayOptions(!displayOptions);
  }
  const handleSubmit=()=>{
    const idStore = useProduct.listStores.filter((val)=>val.seleccionado)[0].idTienda
    const idSupplier = useProduct.listSuppliers.filter((val)=>val.seleccionado)[0].idProveedor;
    const idUser = idAdmin;

    useProduct.addSupplierStore(idSupplier, idStore, idAdmin, idUser);
    router.push("inventory/productsInventory/addProduct")
  }
  const handleChangeDisplayData=(type, idItem)=>{
    if (type=="supplier") {
      const newLista = useProduct.listSuppliers.map((data)=>{
        if (data.idProveedor == idItem) {
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
      useProduct.onChangeSupplier(newLista);
    }

    if (type=="store") {
      const newLista = useProduct.listStores.map((data)=>{
        if (data.idTienda == idItem) {
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
      useProduct.onChangeStore(newLista);
    }
  }
  if (loading) {
    return (<Loading/>)
  }
  return (
    <View style={{flex:1, backgroundColor:COLORS.blanco, paddingHorizontal:30, paddingVertical:10}}>
      {displayOptions ? <RouterDisplay type={typeDisplay} handleChangeDisplayData={handleChangeDisplayData} changeDisplayOptions={changeDisplayOptions} dataSupplier={useProduct.listSuppliers} dataStore={useProduct.listStores} /> : null}
      <StyleTextTitle>Verificar Datos</StyleTextTitle>
      <View style={{flexDirection:'column'}}>
        <View style={{width:"100%",flexDirection:'row', justifyContent:'space-between', paddingVertical:5}}>
          <StyleTextSubTitle>Proveedor</StyleTextSubTitle>
          <TouchableOpacity onPress={()=>router.push("suppliers/addSupplier")} style={{backgroundColor:COLORS.naranja, padding:5, borderRadius:10, justifyContent:'center', alignItems:'center'}}>
            <Entypo name="plus" size={16} color={COLORS.azul} />
          </TouchableOpacity>
        </View>
          {
            useProduct.listSuppliers ? (
              useProduct.listSuppliers.length > 0 ?
              <CardVerifyData type={"supplier"} changeDisplayOptions={changeDisplayOptions} listItems={useProduct.listSuppliers} /> :
              <View style={{width:"100%", height:70, marginTop:10, backgroundColor:COLORS.negro_opaco, borderRadius: 10, justifyContent:'center', alignItems:'center'}}>
                <StyleTextSubTitle>No hay proveedores</StyleTextSubTitle>
              </View>
            ) : null
          }
      </View>
      <View style={{position:'absolute', width:width, height:80, paddingHorizontal:30, backgroundColor:COLORS.blanco, zIndex:10, bottom:0, left:0, right:0, flexDirection:'row', justifyContent:'center', alignItems:'center'}}>
          <BasicButton handleSubmit={handleSubmit}>Continuar</BasicButton>
        </View>

    </View>
  )
};