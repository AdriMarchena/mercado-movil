import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import { StyleText, StyleTextSubTitle } from '../TextComponents'
import { AntDesign } from '@expo/vector-icons';
import { COLORS } from '../../assets/theme/theme';
import { Feather } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';
export default function CardClient({dataClient}) {
    const nombreCompleto = dataClient['nombre']+" "+dataClient['apellido']
    return (
    <View style={styles.cardStyle}>
        <StyleTextSubTitle>{nombreCompleto}</StyleTextSubTitle>
        <View style={styles.rowStyle}>
            <AntDesign name="idcard" size={16} color={COLORS.naranja} />
            <StyleText style={styles.spaceText}>{dataClient['documento']}</StyleText>
        </View>
        {
            dataClient['celular'] != null &&
            dataClient['celular'].trim()!=="" ? 
                <View style={styles.rowStyle}>
                    <Feather name="phone" size={16} color={COLORS.naranja} />
                    <StyleText style={styles.spaceText}>{dataClient['celular']}</StyleText>
                </View> : null
        }
        {
            dataClient['direccion'] !== null &&
            dataClient['direccion'].trim()!=="" ? 
            <View style={styles.rowStyle}>
                <Entypo name="location-pin" size={24} color={COLORS.naranja} />
                <StyleText style={styles.spaceText}>{dataClient['direccion']}</StyleText>
            </View> : null
        }
    </View>
  )
};
const styles = StyleSheet.create({
    "cardStyle":{
        minHeight : 60,
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