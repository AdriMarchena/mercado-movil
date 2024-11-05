import { View, Text, StyleSheet, useWindowDimensions, TouchableOpacity, ScrollView, FlatList, SafeAreaView } from 'react-native'
import React, { useState } from 'react'
import OverlayComponent from '../OverlayComponents/OverlayComponent'
import { StyleText, StyleTextSubTitle, StyleTextTitle } from '../TextComponents'
import BasicButton from '../ButtonComponents/BasicButton'
import { COLORS } from '../../assets/theme/theme'
import { MaterialIcons } from '@expo/vector-icons'
import StyleInputText from '../InputsComponents/StyleInputText'
import RowArqueo from '../../app/(app)/(root)/boxprocess/rowArqueo'
import ModalRowArqueo from '../ViewComponents/ModalRowArqueo'

export default function ArchingBox({ saveArching }) {
    const {width, height} = useWindowDimensions();
    
    const [arching, setArching] = useState(0);
    const [isScrollEnabled, setIsScrollEnabled] = useState(true);
    const [showModalWarning, setShowModalWarning] = useState(false);

    const handleSubmit=()=>{
        saveArching(arching)
    }

    const toggleScroll = (enabled) => {
        setIsScrollEnabled(enabled);
    };

    const [rowsData, setRowsData] = useState([
        { id: 1, iconName: 'add', dropdownItems: [{ label: 'Item 1', value: '1' }] },
    ]);

    const addNewRow = () => {
        const newRowId = rowsData.length > 0 ? rowsData[rowsData.length - 1].id + 1 : 1;
        const newRow = { 
        id: newRowId,
        iconName: 'add', 
        dropdownItems: [{ label: 'Item 1', value: '1' }], 
        inputValue: '', 
        selectedValue: null 
        };
        setRowsData([...rowsData, newRow]);
    };

    const addNewValue=()=>{
        setShowModalWarning(!showModalWarning);
    }

    const updateRowData = (id, inputValue, newValue) => {  
        const newRowsData = rowsData.map(row => {
        if (row.id === id) {
            return { ...row, inputValue, selectedValue: newValue };
        }
        return row;
        });
        setRowsData(newRowsData);
        
        //Arqueo:
        setArching(calculateTotal(newRowsData));
    };

    const calculateTotal = (rowsData) => {
        const total = rowsData.reduce((accumulator, currentRow) => {
        const inputNumber = parseFloat(currentRow.inputValue);
        const selectedNumber = parseFloat(currentRow.selectedValue);
        if (isNaN(inputNumber) || isNaN(selectedNumber)) {
            return accumulator;
        }
        return accumulator + (inputNumber * selectedNumber);
        }, 0);
        return total;
    };

    return (
    <View style={{paddingVertical: 10}}>
        {showModalWarning ?  <ModalRowArqueo onUpdate={updateRowData} toggleScroll={toggleScroll}/> : null}
        <TouchableOpacity style={styles.button} onPress={addNewValue}>
            <Text style={styles.buttonText}>+ Agregar cantidad</Text>
        </TouchableOpacity>
        <View style={styles.mainContainer}>
            <MaterialIcons name="money" size={16} color={COLORS.naranja}/>
            <StyleText style={[styles.rowBodyFirstElement, {width: width-150, left: 10}]}>Total de Arqueo:</StyleText>
            <StyleText>S/. {arching.toFixed(2)}</StyleText>  
        </View>
        <BasicButton handleSubmit={handleSubmit}>Cerrar Caja</BasicButton>
    </View>
    )
}
const styles = StyleSheet.create({
    "rowBody":{
        flexDirection: 'row',
        marginVertical: 5
    },
    "rowBodyFirstElement":{
    },
    "button": {
        alignItems: "flex-end",
        padding: 5,
        marginVertical : 8
    },
    "buttonText": {
        color: COLORS.naranja,
        fontSize: 16,
        fontWeight: 'bold',
        textDecorationLine: 'underline'
    },
    "mainContainer": {
        flexDirection: 'row',
        width:"100%",
        padding : 4,
        borderRadius:10,
        backgroundColor : COLORS.blanco,
        borderColor : COLORS.negro,
        borderWidth : 1,
        paddingHorizontal: 10,
        paddingVertical: 10,
        marginVertical : 10
    },
    "mainBody": {
        marginHorizontal: 10,
    }
})