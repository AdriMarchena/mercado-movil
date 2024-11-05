import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import { COLORS } from '../../assets/theme/theme'

export default function styleText({style,text}) {
    
    return (<Text style={[styles.styleTextInput, style]}>{text}</Text>)
};
const styles = StyleSheet.create({
    "styleTextInput":{
        color : COLORS.negro,
        fontSize:14
    }
})