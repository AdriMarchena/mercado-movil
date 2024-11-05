import { View, Text, FlatList, Animated, useWindowDimensions, Image, TouchableOpacity, Alert } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import { COLORS } from '../../../../assets/theme/theme'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { BasicButton, ConfirmProductItem, Loading, StyleTextTitle } from '../../../../components';
import { InputTextForm, Paginator, StyleTextInput } from '../../../../components/elements';
import { router } from 'expo-router';
import { useProductGlobalContext } from '../../../../Context/GlobalStateProduct';



export default function confirmProducts() {
  const [loading, setLoading] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const {height} = useWindowDimensions();
  const scrollX = useRef(new Animated.Value(0)).current;
  const slidesRef = useRef(null);
  const {handleSubmitProductsInventory, products, loadingPage, handleChangeProductStandard} = useProductGlobalContext();
  const viewableItemsChanged = useRef(({viewableItems})=>{
    setCurrentIndex(viewableItems[0].index);
  }).current;
  const viewConfig = useRef(({viewAreaCoveragePercentThreshold : 50})).current;

  const handleSubmit=async()=>{
    setLoading(true)
    const dataIncompleta = products.filter((prod)=>{
      if (Number(prod.precioVenta)<=0 || Number(prod.precioCompra)<=0) {
        return true
      }
      return false
    }).length > 0;
    if (dataIncompleta) {
      Alert.alert("Asigna un precio a los productos");
      setLoading(false);
      return;
    }
    await handleSubmitProductsInventory();
    setLoading(false)
    router.push("success");
  }
  if (loadingPage || loading) {
    return (<Loading/>)
  }
  return (
    <View style={{flex:1, backgroundColor:COLORS.blanco, paddingHorizontal:20}}>
      <View>
        <StyleTextTitle>Verificar Productos</StyleTextTitle>
      </View>
      <View style={{ minHeight : height - 250 ,paddingVertical:10}} >
        <FlatList
         
          data={products}
          renderItem={({item, index})=><ConfirmProductItem key={item.idProducto} idx={index} listaProductos={products} setDataListProducts={handleChangeProductStandard} item={item} />}
          horizontal
          showsHorizontalScrollIndicator={false}
          bounces={false}
          pagingEnabled
          keyExtractor={(item)=>item.idProducto}
          onScroll={Animated.event([{nativeEvent : {contentOffset : {x : scrollX}}}],{
            useNativeDriver : false
          })}
          scrollEventThrottle={32}
          onViewableItemsChanged={viewableItemsChanged}
          viewabilityConfig={viewConfig}
          ref={slidesRef}
          key={2}
        />
      </View>
      <View style={{justifyContent:'center', alignItems:'center'}}>
      <Paginator style={{height:40}} data={products} scrollX={scrollX} />
      </View>
      <View style={{width:"100%", height:60}}>
        <BasicButton handleSubmit={handleSubmit}>Guardar Inventario</BasicButton>
      </View>
    </View>
  )
};