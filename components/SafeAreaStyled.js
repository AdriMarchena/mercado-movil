import { View, Text, SafeAreaView, StyleSheet } from 'react-native'
import React from 'react'
import Constants from 'expo-constants'
export default function SafeAreaStyled({children, styleSafe}) {
  return (
    <SafeAreaView style={[styles.mainContainer, styleSafe]}>
        {children}
    </SafeAreaView>
  )
}
const styles = StyleSheet.create({
    "mainContainer":{
        flexGrow : 1,
        marginTop : Constants.statusBarHeight
    }
})