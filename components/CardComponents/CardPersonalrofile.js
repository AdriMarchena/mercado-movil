import { View, Text, StyleSheet, Pressable, useWindowDimensions, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { COLORS } from '../../assets/theme/theme'
import { FontAwesome5, MaterialIcons } from '@expo/vector-icons'
import { StyleText, StyleTextSubTitle } from '../TextComponents'
import { router } from 'expo-router'
import Separator from '../ViewComponents/Separator'

export default function CardPersonalrofile() {
    const {width, height} = useWindowDimensions();

    return (
        <View style={[styles.mainContainer]}>
            <View style={styles.rowBody}>
                <StyleText style={{width: width - 150, left: 30, fontWeight: 'bold'}}>Personal</StyleText>
            </View>
            <View style={styles.styleSeparator}></View>
            <TouchableOpacity onPress={()=>router.push("clients/home")} style={[styles.rowBody, { width:width-150 }]}>
                <FontAwesome5 name="user" size={16} color={COLORS.naranja} left={30}/>
                <StyleText style={[styles.rowBodyFirstElement, {left: 40}]}>Clientes</StyleText>
            </TouchableOpacity>
            <Separator/>
            <TouchableOpacity onPress={()=>router.push("suppliers")} style={[styles.rowBody, { width:width-150 }]}>
                <FontAwesome5 name="users" size={16} color={COLORS.naranja} left={30}/>
                <StyleText style={[styles.rowBodyFirstElement, {left: 40}]}>Proveedores</StyleText>
            </TouchableOpacity>
            <Separator/>
            <View style={[styles.rowBody, { width:width-150 }]}>
                <FontAwesome5 name="store" size={16} color={COLORS.naranja} left={30}/>
                <StyleText style={[styles.rowBodyFirstElement, {left: 40}]}>Locales</StyleText>
            </View>
            <Separator/>
            <TouchableOpacity onPress={()=>router.push("workers")} style={[styles.rowBody, { width:width-150 }]}>
                <MaterialIcons name="person" size={16} color={COLORS.naranja} left={30}/>
                <StyleText style={[styles.rowBodyFirstElement, {left: 40}]}>Trabajadores</StyleText>
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