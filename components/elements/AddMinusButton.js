import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import { COLORS } from '../../assets/theme/theme'
import StyleText from './styleText';
import { AntDesign } from '@expo/vector-icons'

export default function AddMinusButton({ countProduct,handleMinusProduct, handleAddProduct}) {
  return (
    <View style={{height:25, width:"100%", borderWidth:1, borderRadius:5, borderColor:COLORS.negro, flexDirection:'row', alignItems:'center'}}>
        <TouchableOpacity onPress={handleMinusProduct} style={{width:30, height:20, justifyContent:'center', alignItems:'center'}}>
        <AntDesign name="minus" size={14} color={COLORS.negro} />
        </TouchableOpacity>
        <View style={{flexGrow:1, justifyContent:'center', alignItems:'center'}}>
        <StyleText text={countProduct}></StyleText>
        </View>
        <TouchableOpacity onPress={handleAddProduct} style={{width:30, height:20,justifyContent:'center', alignItems:'center'}} >
        <AntDesign name="plus" size={14} color={COLORS.negro} />
        </TouchableOpacity>
  </View>
  )
};