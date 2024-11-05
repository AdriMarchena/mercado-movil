import { View, Text,  TouchableOpacity, useWindowDimensions } from 'react-native'
import React from 'react'
import { COLORS } from '../../../../assets/theme/theme'
import { useProductGlobalContext } from '../../../../Context/GlobalStateProduct';
import { router } from 'expo-router';
import { BasicButton, StyleText, StyleTextTitle } from '../../../../components';


export default function warning() {
  const {width, height} = useWindowDimensions();
  const {clearStorageDataProduct} = useProductGlobalContext();
  const clearData=async()=>{
    await clearStorageDataProduct();
    router.push("inventory/productsInventory");
  }
  return (
    <View style={{flex:1, backgroundColor:COLORS.negro_opaco, justifyContent:'center', alignItems:'center'}}>
      <View style={{backgroundColor:COLORS.blanco, width:(width)-100, height:(height)-300, borderRadius:10, paddingHorizontal:15, justifyContent:'center', alignItems:'center'}}>
        <View style={{marginVertical:20}}>
          <StyleTextTitle>Parece que has estado ingresando datos</StyleTextTitle>
          <StyleText>¿Deseas continuar donde lo dejaste o empezar de nuevo?</StyleText>
        </View>
        <View style={{width:'100%', flexDirection:'column', justifyContent:'center'}} >
          <BasicButton handleSubmit={()=>router.push("inventory/productsInventory")}>Continuar donde lo deje</BasicButton>
          <TouchableOpacity onPress={clearData} style={{justifyContent:'center', marginVertical:15, alignItems:'center'}}>
            <Text>Empezar de nuevo</Text>
          </TouchableOpacity>
      </View>
      </View>
      
    </View>
  )
};