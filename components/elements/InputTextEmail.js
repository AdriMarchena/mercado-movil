import { View, Text } from 'react-native'
import React from 'react'
import StyleView from './styleView'
import StyleTextInput from './styleTextInput'
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { COLORS } from '../../assets/theme/theme';

export default function InputTextEmail({ style,inputText,changeDataAdmin,...props}) {
  return (
    <StyleView style={style}>
        <MaterialCommunityIcons name="email" size={16} color={COLORS.negro} />
        <StyleTextInput changeDataAdmin={changeDataAdmin} inputText={inputText} {...props} />
    </StyleView>
    )
};