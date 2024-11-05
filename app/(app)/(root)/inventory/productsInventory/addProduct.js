import { View, Text, TextInput, FlatList, Image, useWindowDimensions, TouchableOpacity, StyleSheet, Modal } from 'react-native'
import React, { useEffect, useState } from 'react'
import { COLORS } from '../../../../../assets/theme/theme'
import { AddMinusButton, ButtonContinue, CardProductList, SearchInputText, StyleText } from '../../../../../components/elements';
import { useProductGlobalContext } from '../../../../../Context/GlobalStateProduct';
import { Redirect, router } from 'expo-router';
import ListaCargandoDatosVertical from '../../../../../components/ListaCargandoDatosVertica';
import ModalWarning from '../../../../../components/ModalWarning';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { BasicButton, BasicButtonContainer, StyleTextSubTitle, StyleTextTitle } from '../../../../../components';


function UrlCategorie({categorie, currentIdx, index, changeCurrentIdx, filtro}) {
  return (
    <TouchableOpacity onPress={()=>{
      changeCurrentIdx(index)  
      filtro(categorie.nombre);
  }} style={[{marginHorizontal:2, paddingVertical : 5, paddingHorizontal:10}, currentIdx == index   && {borderBottomColor:COLORS.verde_acuarela, borderBottomWidth:2}]}>
      <Text style={[{color:COLORS.negro}, currentIdx == index && {color : COLORS.verde_acuarela} ]} >{categorie.nombre}</Text>
    </TouchableOpacity>
  )
}


export default function addProduct() {
  const {handleAddProduct, handleMinusProduct,clearStorageDataProduct, addProductsInventory, numProducts, listProducts, listCategories, loadingPage, changeQuery, 
    filtrarPorCategoria, registroIngreso } = useProductGlobalContext();
  const [currentIndexUrl, setCurrentIndexUrl] = useState(0);
  const {width, height} = useWindowDimensions();
  const [visibleWarning, setVisibleWarning] = useState(true);
  const [existeRegistroInv, setExisteRegistroInv] = useState(false);
  const [loading, setLoading] = useState(false);
  useEffect(()=>{
    async function getDataProductStorage() {
      setLoading(true);
        const dataStorageProduct = await AsyncStorage.getItem("product-data");
        const jsonProductStorage = JSON.parse(dataStorageProduct);
        if (jsonProductStorage) {
          if (jsonProductStorage['numProducts']) {
            setExisteRegistroInv(true);
          }
        }
        setLoading(false);
    }
    getDataProductStorage();
  },[]);

  const changeCurrentIdx =(idx)=>{
    setCurrentIndexUrl((_)=>idx)
  }


  const handleSubmit=()=>{
    addProductsInventory();
    router.push("inventory/confirmProducts")
  }

  const changeVisible=()=>{
    setVisibleWarning(!visibleWarning);
  }
  const deleteData=()=>{
    changeVisible();
    clearStorageDataProduct()
  }
  if (loading || loadingPage) {
    return (<ListaCargandoDatosVertical title={"Ingreso Inventario"} filas={4} numColumns={2} />)
  }
  return (
    <View style={{flex:1, paddingHorizontal:30, paddingVertical:20}}>
      {
        existeRegistroInv ? 
        <ModalWarning visible={visibleWarning} changeVisible={changeVisible} deleteData={deleteData}/>
        : null
      }
      <StyleTextTitle style={{marginBottom:10}}>Ingreso Inventario</StyleTextTitle>
      <SearchInputText changeQuery={changeQuery}/>
      <View style={{height:50, width:"100%", flexDirection:'row', alignItems:'center'}}>
        {
          listCategories ? 
          <FlatList
          showsHorizontalScrollIndicator={false}
          data={listCategories}
          renderItem={({item, index})=><UrlCategorie index={index} filtro={filtrarPorCategoria} currentIdx={currentIndexUrl} changeCurrentIdx={changeCurrentIdx} categorie={item} />}
          ItemSeparatorComponent={()=><Text></Text>}
          horizontal
          initialNumToRender={100}
        /> : <View style={{flex : 1, justifyContent:'center', alignItems:'center'}}>
          <StyleTextSubTitle>No hay resultados</StyleTextSubTitle>

        </View>
        }
      </View>
      <View style={[{height:height-200, paddingBottom : 50}, numProducts > 0 && {paddingBottom : 80}]}>
        {
          listProducts ?
          <FlatList
          style={{paddingVertical:10}}
          data={listProducts}
          renderItem={({item})=><CardProductList productStandard={item} useAddProduct={handleAddProduct} useMinusProduct={handleMinusProduct}/>}
          numColumns={2}
          keyExtractor={item=>item.idProducto}
          /> : null
        }
      </View>
      {
        numProducts > 0 ?
        <BasicButtonContainer handleSubmit={handleSubmit} >
          Continuar
        </BasicButtonContainer>
        : null
      }
    </View>
  )
};
