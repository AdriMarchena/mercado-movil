import { StyleSheet, TextInput } from 'react-native'
import React from 'react'
import { COLORS } from '../../assets/theme/theme';
export default function StyleTextInput({style = {}, changeDataAdmin,inputText, ...props}) {
    const inputStyles = {
        ...styles.inputStyle,
        ...style
    }
    return (<TextInput style={inputStyles}  onChangeText={(text)=>{changeDataAdmin(text, inputText)}} {...props}/>  )
};
const styles = StyleSheet.create({
    "inputStyle":{
        flex:1,
        color : COLORS.negro,
        paddingVertical : 10,
        paddingHorizontal : 5,
        fontSize : 14 ,
        borderRadius:10
    }
})
