import { View, Text, Modal, StyleSheet, Pressable, TextInput } from 'react-native'
import React, { useState } from 'react'
import { StyleText, StyleTextTitle } from '../TextComponents'
import { COLORS } from '../../assets/theme/theme'
import { OverlayModal } from '../OverlayComponents'
import { AntDesign } from '@expo/vector-icons'
import StyleInputText from '../InputsComponents/StyleInputText'
import DropDownPicker from 'react-native-dropdown-picker'
import BasicButton from '../ButtonComponents/BasicButton'

export default function ModalRowArqueo({changeVisible,   agregarCantidad}) {
    const [inputValue, setInputValue] = useState('');
    const [selectedValue, setSelectedValue] = useState( 0);
    const [open, setOpen] = useState(false);
    const [totalArqueo, setTotalArqueo] = useState(0);
    const [items, setItems] = useState([
      {value: '200', label: '200'},
      {value: '100', label: '100'},
      {value: '50', label: '50'},
      {value: '20', label: '20'},
      {value: '10', label: '10'},
      {value: '5', label: '5' },
      {value: '2', label: '2'},
      {value: '1', label: '1'},
      {value: '0.50', label: '0.50'},
      {value: '0.20', label: '0.20'},
      {value: '0.10', label: '0.10'}
    ]);
    const [first, setFirst] = useState([])
    // Manejo del cambio en TextInput
  const handleInputChange = (text) => {
    setInputValue(text);
    // onUpdate(data.id, text, selectedValue);
    actualizatTotal()
  };

  // Manejo del cambio en DropDownPicker
  const handleValueChange = (value) => {
    setSelectedValue(value);
    actualizatTotal();
    // onUpdate(data.id, inputValue, value);
    };
    const actualizatTotal =()=>{
        const total = parseFloat(inputValue || 0) * parseFloat(selectedValue || 0);
        setTotalArqueo(total)
    }
    const handleSubmit=()=>{
        changeVisible();
        agregarCantidad({"cantidad":inputValue,"denominacion":selectedValue,"total":totalArqueo})
    }
    return (
    <Modal
        animationType='slide'
        transparent
        visible
    >
        <View style={styles.mainContainer}>
            <View style={styles.containerChildren}>
                <View style={styles.topBar}>
                    <View></View>
                    <Pressable onPress={changeVisible}>
                        <AntDesign name='close' size={24} color={COLORS.negro} />
                    </Pressable>
                </View>
                <View style={styles.bodyBar}>
                    <StyleTextTitle>Ingresar arqueo</StyleTextTitle>
                    <View style={styles.rowArqueo}>
                        <StyleText style={{width : 150, marginRight : 5}}>Cantidad</StyleText>
                        <StyleText >Denominación</StyleText>
                    </View>
                    <View style={[styles.rowArqueo,{height : 50, marginBottom : 10}]}>
                        <View style={{width : 150, height : 50, borderWidth : 1, borderColor : COLORS.negro, borderRadius : 10, paddingVertical : 10, paddingHorizontal : 5, marginRight : 5}}>
                            <TextInput 
                                style={{flex : 1}}
                                onChangeText={handleInputChange}
                                value={inputValue}
                                keyboardType='numeric'
                                />
                        </View>
                        <View >
                            <DropDownPicker
                                open={open}
                                items={items}
                                value={selectedValue}
                                setOpen={setOpen}
                                placeholder=''
                                setValue={setSelectedValue}
                                setItems={setItems}
                                onChangeValue={handleValueChange}
                                style={[styles.select, open ? styles.dropdownOpen : null]}
                                dropDownContainerStyle={open ? {
                                    width: 106,
                                    backgroundColor: COLORS.blanco,
                                  } : null}
                            />
                        </View>
                    </View>
                    <View>
                        <StyleText style={{fontWeight : 'bold', marginVertical : 10}}>Total S/.{totalArqueo}</StyleText>
                    </View>
                    <View>
                        <BasicButton handleSubmit={handleSubmit}>Listo</BasicButton>
                    </View>
                </View>
            </View>
        </View>
    </Modal>
    )
};
const styles = StyleSheet.create({
    "mainContainer":{
        flex : 1,
        backgroundColor : 'rgba(51,51,51,.81)',
        justifyContent :'center',
        alignItems : 'center',
        
    },
    "containerChildren":{
        padding : 8,
        borderRadius : 10,
        backgroundColor : COLORS.blanco,
        maxWidth : 280,
        minHeight : 300
    },
    "topBar":{
        width : "100%",
        justifyContent:'space-between',
        flexDirection:'row',
        paddingVertical : 10
    },
    "bodyBar":{
        minHeight : 80
    },
    "rowArqueo":{
        flexDirection : 'row',
        height : 20,
        marginTop : 5
    },
    "select": {
        width: 106,
        height: 35,
        backgroundColor: COLORS.blanco,
        flex: 1,
        zIndex: 1,
        elevation: 1,
      },
    
      "dropdownOpen": {
        zIndex: 2000,
        elevation: 2000,
      },
})