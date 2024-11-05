import { View, Text, StyleSheet, Pressable, useWindowDimensions, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { COLORS } from '../../assets/theme/theme'
import { FontAwesome5, MaterialIcons } from '@expo/vector-icons'
import { StyleText, StyleTextSubTitle } from '../TextComponents'

export default function FooterMenu({montoAperturado="150.00", totalVentas = "500.0", logout}) {
    const {width, height} = useWindowDimensions();

    return (
        <View style={{paddingBottom: 40}}>
            <View style={styles.styleSeparator}></View>
            <View style={[styles.rowBody, { width:width-150 }]}>
                <FontAwesome5 name="file" size={16} color={COLORS.negro} left={50}/>
                <StyleText style={[styles.rowBodyFirstElement, {left: 60}]}>Términos y condiciones</StyleText>
            </View>
            <View style={styles.styleSeparator}></View>
            <TouchableOpacity onPress={logout} style={[styles.rowBody, { width:width-150 }]}>
                <MaterialIcons name="logout" size={16} color={COLORS.negro} left={50}/>
                <StyleText style={[styles.rowBodyFirstElement, {left: 60}]}>Cerrar Sesión</StyleText>
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
    "rowBodyFirstElement": {
    },
    "styleSeparator":{
        width:"100%",
        backgroundColor : COLORS.negro_opaco,
        height: .5,
        marginTop: 10,
        marginBottom: 10
    }
})