import { View, Text, StyleSheet, TextInput } from 'react-native'
import React from 'react'
import { COLORS } from '../../assets/theme/theme'

export default function StyleInputText({style,firstIcon=null, lastIcon=null, placeholder,onChangeText, value, ...props}) {
  return (
    <View style={[styles.mainContainer, style]}>
      {firstIcon}
      <TextInput style={styles.inputStyle} onChangeText={onChangeText} placeholder={placeholder} value={value} {...props} ></TextInput>
      {lastIcon}
    </View>
  )
};
const styles = StyleSheet.create({
    "mainContainer":{
      borderWidth:1, 
      borderRadius:10, 
      borderColor : COLORS.negro, 
      padding:5, 
      paddingHorizontal:15, 
      marginVertical:10,
      flexDirection : 'row',
      alignItems:'center'
    },
    "inputStyle":{
      flex : 1,
      color : COLORS.negro,
      paddingVertical : 5,
      paddingHorizontal : 5,
      fontSize: 14
    }
})