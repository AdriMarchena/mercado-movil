import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import { COLORS } from '../../assets/theme/theme'

export default function Separator() {
  return (
    <View style={styles.styleSeparator}></View>
  )
};
const styles = StyleSheet.create({
    "styleSeparator":{
      width:"100%",
      backgroundColor : COLORS.negro_opaco,
      height:.5,
      marginVertical : 10
    }
})