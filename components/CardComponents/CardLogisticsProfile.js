import { View, Text, StyleSheet, Pressable, useWindowDimensions, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { COLORS } from '../../assets/theme/theme'
import { FontAwesome5, MaterialIcons } from '@expo/vector-icons'
import { StyleText, StyleTextSubTitle } from '../TextComponents'
import { router, useLocalSearchParams } from 'expo-router'


export default function CardLogisticsProfile({montoAperturado="150.00", totalVentas = "500.0"}) {
    const {width, height} = useWindowDimensions();
    const montoTotal = Number(totalVentas) + Number(montoAperturado);

    const goSales = () => {
        router.push({
            pathname: "sales"
        })
    }

    const goInventory = () => {
        router.push({
            pathname: "inventoryprocess"
        })
    }

    return (
        <View style={[styles.mainContainer]}>
            <View style={styles.rowBody}>
                <StyleText style={{width: width - 150, left: 30, fontWeight: 'bold'}}>Procesos</StyleText>
            </View>
            <View style={styles.styleSeparator}></View>
            <TouchableOpacity style={[styles.rowBody, { width:width-150 }]} onPress={goInventory}>
                <MaterialIcons name="inventory" size={16} color={COLORS.naranja} left={30}/>
                <StyleText style={[styles.rowBodyFirstElement, {left: 40}]}>Inventario</StyleText>
            </TouchableOpacity>
            <View style={styles.styleSeparator}></View>
            <TouchableOpacity style={[styles.rowBody, { width:width-150 }]} onPress={goSales}>
                <FontAwesome5 name="coins" size={16} color={COLORS.naranja} left={30}/>
                <StyleText style={[styles.rowBodyFirstElement, {left: 40}]}>Ventas</StyleText>
            </TouchableOpacity>
            <View style={styles.styleSeparator}></View>
            <View style={[styles.rowBody, { width:width-150 }]}>
                <FontAwesome5 name="box" size={16} color={COLORS.naranja} left={30}/>
                <StyleText style={[styles.rowBodyFirstElement, {left: 40}]}>Caja</StyleText>
            </View>
        </View>
    )
};
const styles = StyleSheet.create({
    "mainContainer": {
        marginHorizontal: 45,
        marginVertical : 10,
        padding : 4,
        borderRadius:10,
        backgroundColor : COLORS.blanco,
        borderColor : COLORS.negro,
        borderWidth : 1,
        paddingHorizontal: 10,
        paddingVertical: 20,
        elevation: 5,
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
        flexDirection: 'row',
        marginVertical: 3
    },
    "rowBodyFirstElement":{
    },
    "styleSeparator":{
        width:"100%",
        backgroundColor : COLORS.negro_opaco,
        height: .5,
        marginTop: 10,
        marginBottom: 10
    }
})