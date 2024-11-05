import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native'
import React, { useState } from 'react'
import OverlayComponent from './OverlayComponent'
import { StyleText, StyleTextSubTitle, StyleTextTitle } from '../TextComponents'
import BasicButton from '../ButtonComponents/BasicButton'
import { COLORS } from '../../assets/theme/theme'
import { FontAwesome5, MaterialIcons } from '@expo/vector-icons'
import StyleInputText from '../InputsComponents/StyleInputText'
import Checkbox from 'expo-checkbox'

const RadioButton = ({ onPress, selected, children }) => {
  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <View style={[styles.outerCircle, selected && styles.selectedOuterCircle]}>
        {selected ? <View style={styles.innerCircle} /> : null}
      </View>
      <Text style={styles.text}>{children}</Text>
    </TouchableOpacity>
  );
};

export default function OverlayOrderSales({ firstMount = "0.0", goOrder, show, selectedOrder }) {
    const [selected, setSselected] = useState(false);
    const [selectedValue, setSelectedValue] = useState(selectedOrder);

    const [optionsList, setOptionsList] = useState([
        {
            key: 'option1',
            value: 'Cantidad de menor a mayor'
        }, {
            key: 'option2',
            value: 'Cantidad de mayor a menor'
        }, {
            key: 'option3',
            value: 'Monto de menor a mayor'
        }, {
            key: 'option4',
            value: 'Monto de mayor a menor'
        }
    ]);

    const handleSubmit = (key) => {
        setSelectedValue(key);
    }

    const submitSelected = () => {
        goOrder(selectedValue);
        show(false);
    }

    return (
        <OverlayComponent style={styles.mainContainer} changeVisible={() => show(false)}>
        <View style={{alignItems: 'center'}}><StyleTextTitle>ORDENAR</StyleTextTitle></View>
        <View style={styles.subContainer}>
            <StyleTextSubTitle> </StyleTextSubTitle>
            <TouchableOpacity onPress={submitSelected}>
                <StyleTextSubTitle>Listo</StyleTextSubTitle>
            </TouchableOpacity>   
        </View>
        <View style={[styles.styleSeparator, {elevation: 4}]}></View>
        <ScrollView style={styles.scrollContainer}>   
            {optionsList.map(option => (
                <View key={option.key}>
                    <RadioButton
                        
                        selected={selectedValue === option.key}
                        onPress={() => handleSubmit(option.key)}
                    >
                        {option.value}
                    </RadioButton>
                    <View style={styles.styleSeparator}></View>
                </View>
            ))}
        </ScrollView>        
    </OverlayComponent>
    )
}
const styles = StyleSheet.create({
    "mainContainer":{
        justifyContent: 'center',
    },
    "subContainer": {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%'
    },
    "styleSeparator":{
        width: "100%",
        backgroundColor: COLORS.negro_opaco,
        height: .5,
        marginTop: 10,
        marginBottom: 10
    },
    "itemCard": {
        flexDirection: 'row',
        height: 50,
        width: '100%',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginLeft: 5
    },
    "containerCard": {
        marginLeft: 50,
        width: '100%'
    },
    "contentCard": {
        flexDirection: 'row',
        marginVertical: 6
    },
    "inputStyle": {
        width: 100,
        color : COLORS.negro,
        height: 40,
        marginTop: 2
    },
    "line": {
        width: 1,
        backgroundColor: COLORS.negro,
        height: '90%',
        top: 4,
        backgroundColor: COLORS.naranja
    },
    "scrollContainer": {
        height: '55%',
        marginTop: 20
    },
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
    },
    outerCircle: {
        height: 24,
        width: 24,
        borderRadius: 12,
        borderWidth: 2,
        borderColor: '#000',
        alignItems: 'center',
        justifyContent: 'center',
    },
    innerCircle: {
        height: 12,
        width: 12,
        borderRadius: 6,
        backgroundColor: '#000',
    },
    text: {
        marginLeft: 10,
    },
    selectedOuterCircle: {
        borderColor: 'blue',
    },
})