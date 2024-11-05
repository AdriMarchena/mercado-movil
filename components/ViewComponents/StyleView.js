import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import { COLORS } from '../../assets/theme/theme'

export default function StyleView({style,children}) {
  return (
    <View style={[styles.mainContainer, style]}>
        {children}
    </View>
  )
};
const styles = StyleSheet.create({
    "mainContainer":{
        flex : 1,
        backgroundColor :COLORS.blanco,
        paddingHorizontal  : 30
    }
})