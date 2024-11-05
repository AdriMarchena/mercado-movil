import { View, Text, StyleSheet } from 'react-native'
import React from 'react'

export default function viewStyleForm({children}) {
  return (
    <View style={styles.viewStyle}>
        {children}
    </View>
  )
};
const styles = StyleSheet.create({
    "viewStyle":{
        marginBottom : 10,
        flexDirection : "row",
        alignItems : "center",
        borderWidth : 1,
        borderColor : COLORS.blue2,
        borderRadius: 5
    }
})