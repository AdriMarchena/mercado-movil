import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import { COLORS } from '../../assets/theme/theme'

export default function styleTextSubTitle({children, style}) {
  return (<Text style={[styles.styleTextSubTitle, style]}>{children}</Text>)
};
const styles = StyleSheet.create({
    "styleTextSubTitle":{
        fontSize : 18,
        fontWeight : 'bold',
        color : COLORS.negro
    }
})