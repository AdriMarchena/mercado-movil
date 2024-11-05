import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import React from 'react'
import { StyleText, StyleTextSubTitle } from '../TextComponents'
import { AntDesign } from '@expo/vector-icons'
import { COLORS } from '../../assets/theme/theme'
import { router } from 'expo-router'

export default function CardSupplier({dataSupplier}) {
    return (
    <TouchableOpacity onPress={()=>router.push({
        pathname : 'suppliers/[idProveedor]',
        params : {idProveedor : dataSupplier['idProveedor']}
    })} style={styles.cardStyle}>
        <StyleTextSubTitle>{dataSupplier['nombre']}</StyleTextSubTitle>
        <View style={styles.rowStyle}>
            <AntDesign name="idcard" size={16} color={COLORS.naranja} />
            <StyleText style={styles.spaceText} >{dataSupplier['documento']}</StyleText>
        </View>
    </TouchableOpacity>
  )
};
const styles = StyleSheet.create({
    "cardStyle":{
        minHeight : 70,
        paddingVertical : 10
    },
    "rowStyle":{
        flexDirection : 'row', 
        alignItems:'center',
        marginVertical : 3
    },
    "spaceText":{
        marginHorizontal : 5
    }
})