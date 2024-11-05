import { View, Text } from 'react-native'
import React, { useState } from 'react'
import StyleView from './styleView'
import { StyleSheet } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import { COLORS } from '../../assets/theme/theme';
import StyleTextInput from './styleTextInput';
import { FontAwesome } from '@expo/vector-icons';

export default function InputTextPhone({ style,inputText, changeDataAdmin, ...props}) {
    return (
        <StyleView style={style}>
            <FontAwesome name="phone" size={16} color={COLORS.negro} />
            <TextInput style={styles.inputStyleIcon} editable={false} value='+51' />
            <StyleTextInput changeDataAdmin={changeDataAdmin} inputText={inputText} {...props}/>
        </StyleView>
    )
};
const styles = StyleSheet.create({
    "inputStyleIcon":{
        width : 45,
        paddingHorizontal :10,
        marginRight : 5,
        marginLeft:20
    },
    "inputStyle":{
        color : COLORS.negro,
        paddingVertical : 10,
        paddingHorizontal : 5,
        fontSize : 16        
    }
})