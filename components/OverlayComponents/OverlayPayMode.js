import { View, Text, TextInput, StyleSheet } from 'react-native'
import React, { useState } from 'react'
import OverlayComponent from './OverlayComponent'
import BasicButton from '../ButtonComponents/BasicButton'
import { StyleText, StyleTextTitle } from '../TextComponents'
import { COLORS } from '../../assets/theme/theme'

export default function OverlayPayMode({changeDisplay, totalVenta}) {
    const [Vuelto, setVuelto] = useState("0.0");

    const handleChange=(text)=>{
        const vuelto = Number(text) - totalVenta;
        const nuevoVuelto = vuelto.toFixed(2) > 0 ? vuelto.toFixed(2) : "0.0" 
        setVuelto(nuevoVuelto);
    }
    return (
    <OverlayComponent styleComponent={{paddingTop: 10}} changeVisible={changeDisplay}>
      <View style={{marginVertical:10}} >
        <StyleText style={styles.styleText}>Monto Total : </StyleText>
        <StyleTextTitle >S/ {totalVenta}</StyleTextTitle>
    </View>
    <View>
        <StyleText style={styles.styleText}>Pago con : </StyleText>
        <View style={styles.styleInputText}>
            <TextInput keyboardType='decimal-pad'  onChangeText={(text)=>handleChange(text)} style={{fontSize:14, paddingHorizontal:10, paddingVertical:10}}  placeholder='Monto de Pago...'></TextInput>
        </View>
    </View>
    <View  style={{marginVertical:10}}>
        <StyleText style={styles.styleText}>Vuelto : </StyleText>
        <StyleTextTitle>S/ {Vuelto}</StyleTextTitle>
    </View>
    <BasicButton handleSubmit={changeDisplay} >Continuar</BasicButton>
    </OverlayComponent>
  )
};
const styles = StyleSheet.create({
    "styleInputText":{
        borderWidth : 1,
        borderColor :COLORS.negro,
        borderRadius : 5,
        padding:5,
        marginVertical:10
    },
    "styleText":{
        fontSize : 18
    }
})