import { View, Text, StyleSheet, useWindowDimensions, Image } from 'react-native'
import React from 'react'
import { COLORS } from '../../assets/theme/theme'
import { StyleText, StyleTextSubTitle, StyleTextTitle } from '../TextComponents';
import {formatearFecha} from '../../utils/lib/FormatterDate'
import { FontAwesome5 } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';
export default function BodySaleSuccess({data, dataQr}) {
  const nuevaFecha = formatearFecha(data['fechaVenta']);
  const {width, height}= useWindowDimensions();
  return (
    <View style={[styles.bodyStyle, {width : width -70, height:height - 250,  alignItems:'center', justifyContent:'center'}]}>
      <View style={{justifyContent:'center', alignItems:'center'}}>
        <StyleTextTitle>¡Nueva Venta!</StyleTextTitle>
        <StyleText style={styles.textTotal}>S/ {data['total']}</StyleText>
        <StyleText style={styles.textCliente}>{data['cliente']}</StyleText>
        <StyleText style={styles.textDate}>{nuevaFecha}</StyleText>
      </View>
      <View style={{marginVertical:7, width:"100%"}}>
        <View style={styles.bottomStyle}>
          <FontAwesome5 name="store" size={16} color={COLORS.negro} />
          <StyleText style={{marginHorizontal : 7}}>{data['tienda']}</StyleText>
        </View>
        <View style={styles.bottomStyle}>
          <Entypo name="ticket" size={24} color={COLORS.negro} />
          <StyleText style={{marginHorizontal : 7}}>{data['serieVenta']}</StyleText>
        </View>
      </View>
        <Image
          source={{
            uri : dataQr
          }}
          height={150}
          width={150}
        />


    </View>
  )
};
const styles = StyleSheet.create({
  "bodyStyle":{
    backgroundColor : COLORS.blanco,
    borderRadius : 10
  },
  "bottomStyle":{
    width:"100%",
    justifyContent:'center',
    flexDirection : 'row',
    alignItems:'center',
    borderTopWidth : 1,
    borderBottomWidth : 1,
    borderTopColor : COLORS.negro_opaco,
    borderBottomColor : COLORS.negro_opaco,
    paddingVertical : 10, 
    marginTop :.5
  },  
  "textTotal":{
    fontSize:28,
    marginVertical : 15,
    color : COLORS.verde_acuarela
  },
  "textCliente":{
    fontSize : 20,
    fontWeight : 'bold'
  },
  "textDate":{
    fontSize : 18
  }
})