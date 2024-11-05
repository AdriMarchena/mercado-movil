import { View, Text, StyleSheet, ActivityIndicator } from 'react-native'
import React from 'react'
import { COLORS } from '../assets/theme/theme'

export default function loading() {
  return (
    <View style={[StyleSheet.absoluteFill,styles.mainContainer]}>
      <Text style={styles.textStyle}>MERCADO MOVIL</Text>
      <ActivityIndicator  size='large' animating color={COLORS.blanco}/>
    </View>
  )
};

const styles = StyleSheet.create({
  "mainContainer":{
    flex : 1,
    display : "flex",
    alignItems : "center",
    justifyContent : "center",
    backgroundColor : COLORS.naranja
  },
  "textStyle":{
    color : COLORS.blanco,
    fontWeight : "bold",
    fontSize : 16,
    marginBottom : 10
  }
})