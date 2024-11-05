import { View, Text, useWindowDimensions, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { COLORS } from '../assets/theme/theme';
import { StyleTextSubTitle } from './TextComponents';
export default function PickerTypeDoc({setTypeDocument}) {
    const {width} = useWindowDimensions();
    const tipoDocumento = ["DNI","RUC"]
    const [position, setPosition] = useState(0);
    const handleClick =(idx)=>{
      setTypeDocument(tipoDocumento[idx]);
      setPosition(idx);
    }
    return (
      <View style={{flexDirection:'column', width:"100%"}}>
        <StyleTextSubTitle style={{marginVertical : 5}}>Tipo de Documento</StyleTextSubTitle>
        <View style={{width:"100%", height:50, flexDirection:"row",justifyContent:"center", alignItems:"center", }}>
          {
            tipoDocumento.map((txt, idx)=>{
              return (
                <TouchableOpacity key={idx} style={{width:"50%", borderRadius : 10, borderWidth : 1, borderColor : COLORS.negro_opaco,  height:50, backgroundColor: idx === position ? COLORS.verde_acuarela_opaco : COLORS.blanco, justifyContent:'center', alignItems:'center'}} onPress={()=>handleClick(idx)} >
                  <Text style={{color:COLORS.negro, fontWeight:'bold'}} >{txt}</Text>
                </TouchableOpacity>
              )
            })
          }
        </View>
      </View>
    )
  }