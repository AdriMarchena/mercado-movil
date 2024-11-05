import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import { COLORS } from '../../assets/theme/theme'

export default function styleText({style,children}) {
    return (<Text style={[styles.styleTextInput, style]}>{children}</Text>)
};
const styles = StyleSheet.create({
    "styleTextInput":{
        color : COLORS.negro,
        fontSize:14
    }
})