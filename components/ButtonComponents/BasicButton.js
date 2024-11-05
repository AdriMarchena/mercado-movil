import { Text, TouchableOpacity, StyleSheet } from 'react-native'
import React from 'react'
import { COLORS } from '../../assets/theme/theme'

export default function BasicButton({handleSubmit, style, children, ...props}) {
  return (
    <TouchableOpacity onPress={handleSubmit} style={[styles.styleButton,{...style}]} {...props}>
        <Text style={[styles.styleTextButton]}>{children}</Text>
    </TouchableOpacity>
    )
};
const styles = StyleSheet.create({
    "styleButton":{
        width:"100%",
        backgroundColor : COLORS.naranja,
        paddingVertical : 15,
        justifyContent: 'center',
        alignItems : 'center',
        borderRadius: 10
    },
    "styleTextButton":{
        color : COLORS.blanco,
        fontSize : 16,
        fontWeight : 'bold'
    }
})