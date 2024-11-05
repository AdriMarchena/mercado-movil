import { View, Text, StyleSheet, Pressable, useWindowDimensions, TouchableOpacity, Image } from 'react-native'
import React, { useState } from 'react'
import { COLORS } from '../../assets/theme/theme'
import { FontAwesome5, MaterialIcons } from '@expo/vector-icons'
import { StyleText, StyleTextSubTitle } from '../TextComponents'
import BasicButton from '../ButtonComponents/BasicButton'

export default function ToolTipMenu({nombre="", stock="", precio="", img="", getDetail}) {
    const { width, height } = useWindowDimensions();
    const [showDetail, setShowDetail] = useState(false);
    const [tooltipVisible, setTooltipVisible] = useState(false);

    return (
        <TouchableOpacity style={styles.tooltip}>
            <StyleText style={styles.tooltipText}>Editar</StyleText>
            <View style={styles.styleSeparator}></View>
            <StyleText style={styles.tooltipText}>Eliminar</StyleText>
        </TouchableOpacity>
    )
};
const styles = StyleSheet.create({
    tooltip: {
        position: 'absolute',
        width: 104,
        height: 70,
        right: -30,
        top: 30,
        backgroundColor: COLORS.blanco,
        borderRadius: 5,
        paddingVertical: 8,
        paddingHorizontal: 15,
        shadowColor: COLORS.negro,
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    tooltipText: {
        color: COLORS.negro,
        left: 5
    },
    "styleSeparator":{
        width:"100%",
        backgroundColor : COLORS.negro_opaco,
        height: .5,
        marginTop: 10,
        marginBottom: 10
    }
})