import { View,  StyleSheet } from 'react-native'
import React from 'react'
import { COLORS } from '../../assets/theme/theme';
export default function StyleView({style ={}, ...props}) {
  const viewStyles = {
    ...styles.viewStyle,
    ...style
  }
  return (<View style={viewStyles} {...props}>
    {props.children}
  </View>)
};
const styles = StyleSheet.create({
    "viewStyle":{
        marginBottom : 10,
        paddingHorizontal : 10,
        flexDirection : "row",
        alignItems : "center",
        borderWidth : 1,
        borderColor : COLORS.negro,
        borderRadius : 10,
        paddingVertical : 9
    }
})