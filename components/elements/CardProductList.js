import { View, Text, useWindowDimensions, TouchableOpacity, Image, StyleSheet } from 'react-native'
import React, { useState } from 'react'
import { COLORS } from '../../assets/theme/theme';
import AddMinusButton from './AddMinusButton';
import { StyleText, StyleTextSubTitle } from '../TextComponents';
import { AntDesign } from '@expo/vector-icons';

export default function CardProductList({productStandard, useAddProduct, useMinusProduct}) {
    const {width, height} = useWindowDimensions();
    const [loading, setLoading] = useState(false);
    const handleAddProduct=async()=>{
        setLoading(true);
        await useAddProduct(productStandard.idProducto,productStandard);
        setLoading(false);
    }
    const handleMinusProduct=async()=>{
      setLoading(true);
      await useMinusProduct(productStandard.idProducto);
      setLoading(false);
    }

    return (
        <TouchableOpacity  onPress={handleAddProduct} style={[styles.itemContainer, {  width: (width/2)-40,minHeight:(height/3)-30, backgroundColor : COLORS.white }]}>
        <View style={{ justifyContent:'center', alignItems:'center'}} >
          <Image
            width={60}
            height={85}
            source={{
              uri : productStandard.urlImg
            }}
          />
        </View>
        <View style={{marginVertical:10}}>
            <StyleTextSubTitle>{productStandard.nombre}</StyleTextSubTitle>
            <StyleText><AntDesign name="right" size={14} color={COLORS.negro} /> {productStandard.categoria}</StyleText>
        </View>
        {
          loading ? 
          <View>
            <Text>Cargando</Text>
          </View> :
            (
              productStandard.cantidad > 0 ?
              <AddMinusButton countProduct={productStandard.cantidad} handleAddProduct={handleAddProduct} handleMinusProduct={handleMinusProduct} /> :
              <TouchableOpacity onPress={handleAddProduct} style={{width:"100%", height:25, borderRadius:10, backgroundColor:COLORS.naranja, justifyContent:'center', alignItems:'center'}}>
                <Text style={{color:COLORS.blanco, fontWeight:'bold'}}>Agregar</Text>
              </TouchableOpacity>
            )
    }
      </TouchableOpacity>
    )
}
const styles = StyleSheet.create({
    itemContainer : {
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,
      elevation: 5,
      marginHorizontal:5, 
      paddingHorizontal:10,
      marginBottom:20,
      justifyContent:'center', 
      borderRadius:10, 
      flexDirection:'column',
      paddingVertical : 10
    },

    
  })