import { View, Text, StyleSheet, useWindowDimensions, TouchableOpacity } from 'react-native'
import React from 'react'
import { COLORS } from '../../assets/theme/theme';

export default function ContainerButton({style, handleSubmit, buttonText}) {
    const {width} = useWindowDimensions();
    return (
    <View style={[styles.containerButton, {width}, {...style}]} >
        <TouchableOpacity style={styles.buttonStyle} onPress={handleSubmit} >
            <Text style={styles.buttonText}>{buttonText}</Text>
        </TouchableOpacity>
    </View>
  )
};

const styles = StyleSheet.create({
    "containerButton":{
        position : 'absolute',
        height : 80,
        borderTopColor : COLORS.negro_opaco,
        borderTopWidth : 1,
        paddingHorizontal : 20,
        backgroundColor:COLORS.blanco, 
        zIndex : 10,
        bottom : 0,
        left : 0,
        right : 0,
        flexDirection :  'row',
        justifyContent : 'center',
        alignItems : 'center'
    },
    "buttonStyle":{
        width : "100%",
        height : 60,
        backgroundColor : COLORS.naranja,
        borderRadius : 10, 
        justifyContent : 'center',
        alignItems : 'center'
    },
    "buttonText":{
        color :COLORS.blanco,
        fontWeight : 'bold',
        fontSize : 16
    }
})