import { View, Text, useWindowDimensions, TouchableOpacity } from 'react-native'
import React from 'react'
import { COLORS } from '../assets/theme/theme';
export default function WarningAdvice({clearData, closeWarning}) {
    const {width, height} = useWindowDimensions();
    return (
    <View style={{position:'absolute', width, height, backgroundColor:'rgba(.51,.51,.51,.4)', justifyContent:'center', alignItems:'center', zIndex:30, top:0, marginTop:-30 }}>
        <View style={{backgroundColor:COLORS.blanco, width:(width)-100, height:(height)-300, borderRadius:10, paddingHorizontal:15, justifyContent:'center', alignItems:'center'}}>
            <View style={{marginVertical:20}}>
                <Text style={{color:COLORS.negro, fontWeight:'bold', fontSize:24}}>Parece que has estado ingresando datos</Text>
                <Text style={{color:COLORS.negro}}>¿Deseas continuar donde lo dejaste o empezar de nuevo?</Text>
            </View>
            <View style={{width:"100%", flexDirection:'column',justifyContent:'center'}}>
                <TouchableOpacity onPress={closeWarning} style={{backgroundColor:COLORS.naranja, borderRadius:10,  paddingVertical:8, justifyContent:'center', alignItems:'center'}}>
                    <Text style={{color:COLORS.blanco}}>Continuar donde lo deje</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={clearData} style={{justifyContent:'center', marginVertical:15, alignItems:'center'}}>
                    <Text>Empezar de nuevo</Text>
                </TouchableOpacity>
            </View>
        </View>
    </View>
  )
};