import { View, Text } from 'react-native'
import React, { useEffect, useState } from 'react'
import { COLORS } from '../../../assets/theme/theme'
import { Redirect } from 'expo-router';

export default function success() {
  const [isTimeComeback, setIsTimeComeback] = useState(false);
  useEffect(()=>{
    function timeComeback() {
      return setTimeout(()=>{
        setIsTimeComeback(true)
      },3000);
    }
    timeComeback();
  },[]);
  if (isTimeComeback) {
    return (<Redirect href={"home"} />)
  }
  return (
    <View style={{flex:1, backgroundColor:COLORS.verde_acuarela, justifyContent:'center', alignItems:'center'}}>
      <Text style={{fontSize:24, color:COLORS.blanco, width:150, fontWeight:'bold'}}>Guardado con éxito</Text>
    </View>
  )
};