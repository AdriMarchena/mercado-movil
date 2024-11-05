import { View, Text, StyleSheet, Pressable, useWindowDimensions, TouchableOpacity, Image } from 'react-native'
import React, { useState } from 'react'
import { COLORS } from '../../assets/theme/theme'
import { FontAwesome5, MaterialIcons } from '@expo/vector-icons'
import { StyleText, StyleTextSubTitle } from '../TextComponents'
import BasicButton from '../ButtonComponents/BasicButton'
import ToolTipMenu from '../ToolTipComponents/ToolTipMenu'

export default function CardProduct({nombre="", stock="", precio="", sale="", img="", getDetail}) {
    const { width, height } = useWindowDimensions();
    const [showDetail, setShowDetail] = useState(false);
    const [tooltipVisible, setTooltipVisible] = useState(false);

    const handleSubmit = () => {
        getDetail()
    }

    const expand = () => {
        setShowDetail(!showDetail);
    }

    return (
        <View style={[styles.mainContainer]}>
            <View style={[styles.rowBody, { bottom: 5 }]}>
                <View style={{justifyContent: 'center', width: 65}}>
                    <Image source={img} />
                </View>
                <View style={{ width: width - 180 }}>
                    <StyleTextSubTitle style={{ width: width - 150, left: 10, fontWeight: 'bold', fontSize: 16 }}>{nombre}</StyleTextSubTitle>
                    <View style={{flexDirection: 'row'}}>
                        <StyleText style={[styles.rowBodyFirstElement, { left: 10, top: 6 }]}>Stock: {stock}</StyleText>
                        <StyleText style={[styles.rowBodyFirstElement, { left: 10, top: 6 }]}>N° de ventas: {sale}</StyleText>
                    </View>
                    <StyleText style={[styles.rowBodyFirstElement, { left: 10, top: 6 }]}>P.V: S/.{precio}</StyleText>
                </View>
                <TouchableOpacity
                    style={{ justifyContent: 'center', width: 10 }}
                    onPress={() => setTooltipVisible(!tooltipVisible)}>
                        <Image source={require('../../assets/images/circle-points.png')} />
                        {tooltipVisible && <ToolTipMenu />}
                </TouchableOpacity>
            </View>
        </View>
    )
};
const styles = StyleSheet.create({
    "mainContainer": {
        borderRadius: 10,
        backgroundColor : COLORS.blanco,
        borderColor : COLORS.blanco,
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
        marginVertical: 3,
        marginHorizontal: 20
    },
    "rowBodyFirstElement": {
        fontSize: 12,
        width: '40%'
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