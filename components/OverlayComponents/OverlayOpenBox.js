import { View, Text, StyleSheet } from 'react-native'
import React, { useState } from 'react'
import OverlayComponent from './OverlayComponent'
import { StyleText, StyleTextSubTitle, StyleTextTitle } from '../TextComponents'
import BasicButton from '../ButtonComponents/BasicButton'
import { COLORS } from '../../assets/theme/theme'
import { MaterialIcons } from '@expo/vector-icons'
import StyleInputText from '../InputsComponents/StyleInputText'

export default function OverlayOpenBox({firstMount="0.0", saveData}) {
    const [changeQuery, setChangeQuery] = useState({
        incomes : '',
        outcomes : ''
    });
    const onChangeText=(input, text)=>{
        setChangeQuery(prev=>({
            ...prev,
            [input] : parseFloat(text) || 0
        }));
    }
    const resultado = parseFloat(firstMount) + changeQuery.incomes - changeQuery.outcomes

    const handleSubmit=()=>{
        saveData(resultado);
    }

    return (
    <OverlayComponent styleComponent={styles.mainContainer}  close={false}>
        <StyleTextTitle>Apertura Caja</StyleTextTitle>
        <View style={styles.bodyData}>
            <View style={styles.rowSeparate}>
                <View style={styles.rowIcon}>
                    <MaterialIcons name="money" size={20} color={COLORS.naranja}/>
                    <StyleTextSubTitle style={{left: 10}}>Monto Inicial</StyleTextSubTitle>
                </View>
                <StyleText>S/{parseFloat(firstMount).toFixed(2)}</StyleText>
            </View>
            <View style={[styles.rowIcon,{justifyContent:'center', marginVertical : 5}]}>
                <StyleTextSubTitle style={{width : 100}}>Entradas : </StyleTextSubTitle>
                <StyleInputText  style={styles.inputStyle} onChangeText={(text)=>onChangeText('incomes', text)} keyboardType={"decimal-pad"} ></StyleInputText>
            </View>
            <View style={[styles.rowIcon,{justifyContent:'center', marginVertical : 5}]}>
                <StyleTextSubTitle style={{width : 100}}>Salidas : </StyleTextSubTitle>
                <StyleInputText  style={styles.inputStyle} onChangeText={(text)=>onChangeText('outcomes',text)} keyboardType={"decimal-pad"} ></StyleInputText>
            </View>
            <View style={styles.rowSeparate}>
                <View style={styles.rowIcon}>
                    <MaterialIcons name="money" size={20} color={COLORS.naranja}/>
                    <StyleTextSubTitle style={{left: 10}}>Monto Aperturado</StyleTextSubTitle>
                </View>
                <StyleText>S/{resultado}</StyleText>
            </View>
        </View>
        <BasicButton handleSubmit={handleSubmit}>Aperturar</BasicButton>
    </OverlayComponent>
    )
}
const styles = StyleSheet.create({
    "mainContainer":{
        paddingTop : 0,
        
    },
    "bodyData":{
        paddingVertical : 20,
        paddingHorizontal : 10,
        borderRadius : 10,
        borderColor : COLORS.negro_opaco,
        borderWidth : 1,
        marginVertical : 10
    },
    "rowIcon":{
        flexDirection : 'row',
        height : 40,
        alignItems: 'center'
    },
    "rowSeparate":{
        flexDirection: 'row',
        justifyContent:'space-between',
        alignItems:'center'
    },
    "inputStyle":{
        width : "100%",
        maxWidth : 150,
        color : COLORS.negro,
        height: 30,
        padding: 0
    }
})