import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import { COLORS } from '../../assets/theme/theme'

export default function styleTextTitle({children, style}) {
  return (<Text style={[styles.styleTextTitle, style]}>{children}</Text>)
};
const styles = StyleSheet.create({
    "styleTextTitle":{
        fontSize : 24,
        color : COLORS.negro,
        fontWeight : 'bold'
    }
})