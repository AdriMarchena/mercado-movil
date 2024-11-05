import { View, Text } from 'react-native'
import React from 'react'
import { Link, useGlobalSearchParams, useLocalSearchParams } from 'expo-router'
import { COLORS } from '../assets/theme/theme';

export default function Page() {
  const local = useLocalSearchParams();
  const global = useGlobalSearchParams();
  console.log("Ruta :",local);
  console.log("Global : ",global);
  return (
    <View style={{width:"100%", height:"100%", backgroundColor:COLORS.blanco, justifyContent:'center', alignItems:'center', paddingHorizontal:30}}>
      <Text style={{fontSize:16, color:COLORS.negro}}>Te has pérdido  <Link style={{textDecorationLine:'underline', fontWeight:'bold'}} href={'/'}>Regresa a casa</Link></Text>
    </View>
  )
}