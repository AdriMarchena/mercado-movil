import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native'
import React, { useState } from 'react'
import OverlayComponent from './OverlayComponent'
import { StyleText, StyleTextSubTitle, StyleTextTitle } from '../TextComponents'
import BasicButton from '../ButtonComponents/BasicButton'
import { COLORS } from '../../assets/theme/theme'
import { FontAwesome5, MaterialIcons } from '@expo/vector-icons'
import StyleInputText from '../InputsComponents/StyleInputText'
import Checkbox from 'expo-checkbox'

export default function OverlayFilterSales({
    data,
    show,
    tiposDocumentos,
    locales,
    selecciones,
    actualizarSelecciones,
    actualizarRangoValor,
    cleanSelected
}) {
    const [showTypeDocument, setShowTypeDocument] = useState(false);
    const [showLocal, setShowLocal] = useState(false);
    const [showAmount, setShowAmount] = useState(false);

    const cleanFilters = () => {
        let dataSelected = {
            tipoDocumento: [],
            local: [],
            valorMin: '',
            valorMax: ''
        };
        data(dataSelected);
        cleanSelected(dataSelected);
        show(false);
    };

    const submitSelected = () => {
        data({
            tipoDocumento: selecciones.tipoDocumento,
            local: selecciones.local,
            valorMin: selecciones.valorMin,
            valorMax: selecciones.valorMax,
        });
        show(false);
    };

    if (!show) return null;
    
    return (
    <OverlayComponent style={styles.mainContainer} changeVisible={() => show(false)}>
        <StyleTextTitle>FILTRAR</StyleTextTitle>
        <View style={styles.subContainer}>
            <TouchableOpacity onPress={cleanFilters}>
                <StyleTextSubTitle style={{color : COLORS.naranja, fontSize : 20}}>Limpiar</StyleTextSubTitle>
            </TouchableOpacity>
            <TouchableOpacity onPress={submitSelected}>
                <StyleTextSubTitle style={{color : COLORS.naranja, fontSize : 20}}>Listo</StyleTextSubTitle>
            </TouchableOpacity>
        </View>
        <View style={[styles.styleSeparator, {elevation: 4}]}></View>
        <ScrollView style={styles.scrollContainer}>  
            <TouchableOpacity style={styles.itemCard} onPress={() => setShowTypeDocument(!showTypeDocument)}>
                <StyleTextSubTitle>Tipo de documento:</StyleTextSubTitle>
                    {
                        !showTypeDocument ?
                            <FontAwesome5 name="caret-down" size={30} color={COLORS.naranja}/> :
                            <FontAwesome5 name="caret-up" size={30} color={COLORS.naranja} />
                    }
            </TouchableOpacity>
                {
                    showTypeDocument ?
                        <View style={styles.containerCard}>
                            {
                                tiposDocumentos.map((tipoDoc) => (
                                    <TouchableOpacity
                                        key={tipoDoc.id}
                                        style={styles.contentCard}
                                        onPress={() => actualizarSelecciones('tipoDocumento', tipoDoc.id)}>
                                            <Checkbox
                                                id={tipoDoc.id}
                                                value={selecciones.tipoDocumento.includes(tipoDoc.id)}
                                                onValueChange={() => actualizarSelecciones('tipoDocumento', tipoDoc.id)}
                                            ></Checkbox>
                                            <StyleText style={{ marginLeft: 10 }}>{tipoDoc.nombre}</StyleText>
                                    </TouchableOpacity>
                                ))
                            }
                        </View>
                            
                    : null
                }
            <View style={styles.styleSeparator}></View>
            <TouchableOpacity style={styles.itemCard} onPress={() => setShowLocal(!showLocal)}>
                <StyleTextSubTitle>Local:</StyleTextSubTitle>
                    {
                        !showLocal ?
                            <FontAwesome5 name="caret-down" size={30} color={COLORS.naranja} /> :
                            <FontAwesome5 name="caret-up" size={30} color={COLORS.naranja} />
                    }
            </TouchableOpacity>
                {
                    showLocal ?
                        <View style={styles.containerCard}>
                            {
                                locales.map((local) => (
                                    <TouchableOpacity
                                        key={local.id}
                                        style={styles.contentCard}
                                        onPress={() => actualizarSelecciones('local', local.id)}>
                                            <Checkbox
                                                id={local.id}
                                                value={selecciones.local.includes(local.id)}
                                                onValueChange={() => actualizarSelecciones('local', local.id)}
                                            ></Checkbox>
                                            <StyleText style={{ marginLeft: 10 }}>{local.nombre}</StyleText>
                                    </TouchableOpacity>
                                ))
                            }
                        </View>
                    : null
                }
            <View style={styles.styleSeparator}></View>
            <TouchableOpacity style={styles.itemCard} onPress={() => setShowAmount(!showAmount)}>
                <StyleTextSubTitle>Monto total:</StyleTextSubTitle>
                    {
                        !showAmount ?
                            <FontAwesome5 name="caret-down" size={30} color={COLORS.naranja} /> :
                            <FontAwesome5 name="caret-up" size={30} color={COLORS.naranja} />
                    }
            </TouchableOpacity>
                {
                    showAmount ?
                        <View style={[styles.containerCard, {flexDirection: 'row'}]}>
                            <View style={{marginRight: 20}}>
                                <Text style={{fontSize: 12}}>Min.</Text>
                                <StyleInputText
                                    style={styles.inputStyle}
                                    value={selecciones.valorMin}
                                    onChangeText={text => actualizarRangoValor(text, selecciones.valorMax)}
                                    placeholder="Min"
                                    keyboardType="numeric"
                                ></StyleInputText>    
                            </View>
                            <View style={[styles.line]}></View>
                            <View style={{marginLeft: 20}}>
                                <Text style={{fontSize: 12}}>Máx.</Text>
                                <StyleInputText
                                    style={styles.inputStyle}
                                    value={selecciones.valorMax}
                                    onChangeText={text => actualizarRangoValor(selecciones.valorMin, text)}
                                    placeholder="Max"
                                    keyboardType="numeric"
                                ></StyleInputText>    
                            </View>
                        </View> 
                    : null
                }
            <View style={styles.styleSeparator}></View>
        </ScrollView>        
    </OverlayComponent>
    )
}
const styles = StyleSheet.create({
    "mainContainer":{
        alignItems: 'center',
        justifyContent: 'center',
    },
    "subContainer": {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '90%'
    },
    "styleSeparator":{
        width: "100%",
        backgroundColor: COLORS.negro_opaco,
        height: .5,
        marginTop: 10,
        marginBottom: 15,
    },
    "itemCard": {
        flexDirection: 'row',
        height: 50,
        width: '73%',
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
    },
})