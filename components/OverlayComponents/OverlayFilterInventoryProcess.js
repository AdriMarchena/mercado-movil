import { View, Text, StyleSheet, TouchableOpacity, ScrollView, FlatList } from 'react-native'
import React, { useState } from 'react'
import OverlayComponent from './OverlayComponent'
import { StyleText, StyleTextSubTitle, StyleTextTitle } from '../TextComponents'
import { COLORS } from '../../assets/theme/theme'
import { CardPressable } from '../CardComponents'

export default function OverlayFilterInventoryProcess({title, data,IconCard=null, handleChange, show}) {
    
    const handleChangeDisplay=()=>{
        show(false);
    }

    return (
        <OverlayComponent changeVisible={handleChangeDisplay}>
            <StyleTextTitle>{title}</StyleTextTitle>
            <View style={{marginTop:15}}>
                <FlatList
                    data={data}
                    renderItem={
                        ({ item, index }) =>
                            <CardPressable style={[item.seleccionado && styles.cardStyle]} handlePress={() => handleChange(index)}>
                                <View style={{left: 10}}>
                                    {IconCard}
                                </View>
                                <View style={{left: 20}}>
                                    <StyleTextSubTitle>{item['nombre']}</StyleTextSubTitle>
                                </View>
                            </CardPressable>
                    }
                    ItemSeparatorComponent={()=><Text></Text>}
                />
            </View>
        </OverlayComponent>
    )
}

const styles = StyleSheet.create({
    "mainContainer":{
        alignItems: 'center',
        justifyContent: 'center',
    },
    "overlay":{
        marginLeft : -30,
        marginTop: -200,

    },
    "cardStyle":{
        backgroundColor : COLORS.verde_acuarela_opaco,
        borderColor : COLORS.verde_acuarela
    }
})