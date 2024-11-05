import React, { useState } from 'react'
import StyleView from './styleView'
import StyleTextInput from './styleTextInput'
import { Feather } from '@expo/vector-icons';
import { COLORS } from '../../assets/theme/theme';
export default function InputTextUsername({ inputText,changeDataAdmin,...props}) {
    return (
    <StyleView>
        <Feather name="user" size={16} color={COLORS.negro} />
        <StyleTextInput changeDataAdmin={changeDataAdmin}  inputText={inputText} {...props} />
    </StyleView>
    )
};