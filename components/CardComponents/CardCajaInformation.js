import { View, Text, StyleSheet, Pressable, useWindowDimensions } from 'react-native'
import React, { useState } from 'react'
import { COLORS } from '../../assets/theme/theme'
import { FontAwesome5, MaterialIcons } from '@expo/vector-icons'
import { StyleText, StyleTextSubTitle } from '../TextComponents'

export default function CardCajaInformation({montoAperturado="150.00", totalVentas = "500.0"}) {
    const {width, height} = useWindowDimensions();
    const montoTotal = Number(totalVentas) + Number(montoAperturado);

    return (
        <View style={[styles.mainContainer,{width : width -40}]}>
            <View style={styles.rowBody}>
                <StyleTextSubTitle>Monto aperturado</StyleTextSubTitle>
                <StyleText style={{fontWeight:'bold'}}>S/.{Number(montoAperturado).toFixed(2)}</StyleText>
            </View>
            <View style={styles.rowBody}>
                <StyleTextSubTitle>Ventas</StyleTextSubTitle>
                <StyleText style={{fontWeight:'bold'}}>S/.{Number(totalVentas).toFixed(2)}</StyleText>
            </View>
            <View style={styles.rowBody}>
                <StyleTextSubTitle >Total</StyleTextSubTitle>
                <StyleText style={{fontWeight:'bold'}}>S/.{Number(montoTotal).toFixed(2)}</StyleText>
            </View>
        </View>
    )
};
const styles = StyleSheet.create({
    "mainContainer":{
        width:"100%",
        padding : 4,
        borderRadius:10,
        backgroundColor : COLORS.blanco,
        borderColor : COLORS.negro,
        borderWidth : 1,
        paddingHorizontal: 10,
        paddingVertical: 20,
        marginBottom: 10
    },
    "topHeaderStyle":{
        flexDirection : 'row',
        alignItems:'center'
    },
    "topHeader":{
        width:"100%",
        flexDirection:'row',
        alignItems : 'center',
        justifyContent:'space-between',
        height: 40
    },
    "rowBody":{
        flexDirection : 'row',
        marginVertical :5,
        justifyContent : 'space-between',
        alignItems : 'center'
    },
    "rowBodyFirstElement":{
    },
    "styleSeparator":{
        width:"100%",
        backgroundColor : COLORS.negro_opaco,
        height: .5,
        marginTop: 20,
        marginBottom: 10,
        
    }
})