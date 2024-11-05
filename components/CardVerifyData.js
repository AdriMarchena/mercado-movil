import React, { useEffect, useState } from 'react'
import { View, Text, Image, TouchableOpacity, useWindowDimensions } from 'react-native'
import { COLORS } from '../assets/theme/theme'
import { StyleTextSubTitle } from './TextComponents'

export default function CardVerifyData({listItems, type, changeDisplayOptions, Icon=null}) {
    const dataSeleccionada = listItems.filter((val)=>val.seleccionado)[0]
    const {width} = useWindowDimensions();
    const handlePress=()=>{
        changeDisplayOptions(type);
    }
    return (
    <TouchableOpacity onPress={handlePress} style={{width:"100%", borderWidth:1, borderColor : COLORS.negro, borderRadius : 10, paddingHorizontal:7, paddingVertical:15, flexDirection : 'row', alignItems:'center'}}>
        <View >
            {
                Icon ? 
                Icon :
                <Image
                source={{
                    uri : dataSeleccionada ? dataSeleccionada.urlImage : null
                }}
                height={60}
                width={60}
                style={{borderRadius:30}}
            />
            }
        </View>
        <View style={[{marginHorizontal:10,  maxWidth : width-100}]}>
            <StyleTextSubTitle>{dataSeleccionada ? dataSeleccionada.nombre || dataSeleccionada.razSocial || "" : null}</StyleTextSubTitle>
            <Text>{dataSeleccionada ? dataSeleccionada.documento || dataSeleccionada.direccion || "" : null}</Text>
        </View>
    </TouchableOpacity>
  )
};