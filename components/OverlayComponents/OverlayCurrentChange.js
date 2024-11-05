import React, { useState } from 'react'
import OverlayModal from './OverlayModal'
import { StyleText, StyleTextTitle } from '../TextComponents'
import { StyleSheet, View } from 'react-native'
import { MaterialIcons } from '@expo/vector-icons'
import { COLORS } from '../../assets/theme/theme'
import { formatearFechaActual } from '../../utils/lib/FormatterDate'
import BasicButton from '../ButtonComponents/BasicButton'
import StyleInputText from '../InputsComponents/StyleInputText'
import { FontAwesome } from '@expo/vector-icons';
export default function OverlayCurrentChange({saveCurrentChange, firstCurrentChange="3.70"}) {
    const fecha = formatearFechaActual();
    const [queryInput, setQueryInput] = useState("");
    const changeValueInput=(text)=>{
        setQueryInput(text);
    }
    const saveCurrentChangeData=()=>{
        saveCurrentChange(queryInput);
    }
  return (
    <OverlayModal style={styles.mainOverlay}  close={false}>
        <StyleTextTitle>Tipo de Cambio</StyleTextTitle>
        <View style={styles.topStyle}>
            <MaterialIcons name="calendar-today" size={20} color={COLORS.negro}/>
            <StyleText>{fecha}</StyleText>
        </View>
        <StyleInputText placeholder={firstCurrentChange}  keyboardType={"decimal-pad"} onChangeText={changeValueInput} firstIcon={<FontAwesome name="dollar" size={16} color={COLORS.negro_opaco}/>} ></StyleInputText>
        <BasicButton handleSubmit={saveCurrentChangeData}>Guardar</BasicButton>
    </OverlayModal>
  )
};
const styles = StyleSheet.create({
    "topStyle":{
        flexDirection : 'row',
        height : 60,
        alignItems:'center'
    },
    "mainOverlay":{
        padding : 10,
        width : 270
    }
})