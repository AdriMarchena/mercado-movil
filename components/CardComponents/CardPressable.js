import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import React from 'react'
import { COLORS } from '../../assets/theme/theme'

export default function CardPressable({style,handlePress,children}) {
  return (
    <TouchableOpacity onPress={handlePress} style={[styles.cardContainer,style]}>
        {children}
    </TouchableOpacity>
    )
};

const styles = StyleSheet.create({
    "cardContainer":{width:"100%", borderWidth:1, borderColor : COLORS.negro, borderRadius : 10, paddingHorizontal:7, paddingVertical:15, flexDirection : 'row', alignItems:'center'}
})