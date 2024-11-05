import { View, Text, StyleSheet, Pressable, useWindowDimensions, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { COLORS } from '../../assets/theme/theme'
import { FontAwesome5, MaterialIcons } from '@expo/vector-icons'
import { StyleText, StyleTextSubTitle } from '../TextComponents'
import { router, useLocalSearchParams } from 'expo-router'

export default function CardAccountProfile({montoAperturado="150.00", totalVentas = "500.0"}) {
    const {width, height} = useWindowDimensions();
    const montoTotal = Number(totalVentas) + Number(montoAperturado);
  
    const goSubscription = () => {
        router.push({
            pathname: "subscription"
        })
    }
    const goProfileMenu = () => {
        router.push({
            pathname: "profilemenu"
        })
    }

    return (
        <View style={[styles.mainContainer]}>
            <View style={styles.rowBody}>
                <StyleText style={{width: width - 150, left: 30, fontWeight: 'bold'}}>Mi Cuenta</StyleText>
            </View>
            <View style={styles.styleSeparator}></View>
            <TouchableOpacity style={[styles.rowBody, { width:width-150 }]} onPress={goProfileMenu}>
                <FontAwesome5 name="user" size={16} color={COLORS.naranja} left={30}/>
                <StyleText style={[styles.rowBodyFirstElement, {left: 40}]}>Perfil</StyleText>
            </TouchableOpacity>
            <View style={styles.styleSeparator}></View>
            <TouchableOpacity style={[styles.rowBody, { width:width-150 }]} onPress={goSubscription}>
                <FontAwesome5 name="wallet" size={16} color={COLORS.naranja} left={30}/>
                <StyleText style={[styles.rowBodyFirstElement, {left: 40}]}>Suscripción</StyleText>
            </TouchableOpacity>
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