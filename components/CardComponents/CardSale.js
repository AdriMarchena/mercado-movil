import { View, Text, StyleSheet, Pressable, useWindowDimensions, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { COLORS } from '../../assets/theme/theme'
import { FontAwesome5, MaterialIcons } from '@expo/vector-icons'
import { StyleText, StyleTextSubTitle } from '../TextComponents'
import BasicButton from '../ButtonComponents/BasicButton'

export default function CardSale({nroSale="0001", prod="2", name="Alvaro Felipe", store="Local 1", getDetail}) {
    const { width, height } = useWindowDimensions();
    const [showDetail, setShowDetail] = useState(false);

    const handleSubmit = () => {
        getDetail()
    }

    const expand = () => {
        setShowDetail(!showDetail);
    }

    return (
        <View style={[styles.mainContainer]}>
            <View style={[styles.rowBody, {bottom: 5}]}>
                <View style={{ width: width - 120 }}>
                    <StyleTextSubTitle style={{ width: width - 150, left: 10, fontWeight: 'bold' }}>{nroSale}</StyleTextSubTitle>
                    <StyleText style={[styles.rowBodyFirstElement, { left: 10, top: 5 }]}>Prod. Vendidos: {prod}</StyleText>
                </View>
                {
                    showDetail ?
                        <FontAwesome5 name="caret-up" size={40} color={COLORS.negro} onPress={expand} /> :
                        <FontAwesome5 name="caret-down" size={40} color={COLORS.negro} onPress={expand} />
                }
            </View>
            {
                showDetail ?
                    <View>
                        <View style={[styles.rowBody, { width: width - 150 }]}>
                            <FontAwesome5 name="user" size={16} color={COLORS.negro} left={10}/>
                            <StyleText style={[styles.rowBodyFirstElement, { left: 25 }]}>Vendedor: {name}</StyleText>
                        </View>
                        <View style={[styles.rowBody, { width: width - 150 }]}>
                            <FontAwesome5 name="store" size={16} color={COLORS.negro} left={8} />
                            <StyleText style={[styles.rowBodyFirstElement, { left: 21 }]}>Tienda: {store}</StyleText>
                        </View>
                        <View style={{height: 20}}></View>
                        <BasicButton style={styles.buttonDetail} handleSubmit={handleSubmit}>Ver detalle</BasicButton>
                    </View> : null
            }
        </View>
    )
};
const styles = StyleSheet.create({
    "mainContainer": {
        borderRadius:10,
        backgroundColor : COLORS.blanco,
        borderColor : COLORS.negro,
        borderWidth : 1,
        paddingHorizontal: 10,
        paddingVertical: 20,
        elevation: 5,
        marginBottom: 24 
    },
    "topHeaderStyle":{
        flexDirection : 'row',
        alignItems:'center'
    },
    "topHeader":{
        width:"100%",
        flexDirection:'row',
        alignItems : 'center',
        justifyContent:'space-between',
        height: 40
    },
    "rowBody":{
        flexDirection: 'row',
        marginVertical: 3
    },
    "rowBodyFirstElement":{
    },
    "styleSeparator":{
        width:"100%",
        backgroundColor : COLORS.negro_opaco,
        height: .5,
        marginTop: 10,
        marginBottom: 10
    },
    "buttonDetail": {
        paddingVertical: 9
    }
})