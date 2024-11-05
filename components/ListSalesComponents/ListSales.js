import { StyleSheet, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { COLORS } from '../../assets/theme/theme'
import { FontAwesome5, MaterialIcons } from '@expo/vector-icons'
import { StyleText, StyleTextSubTitle, StyleTextTitle } from '../TextComponents'

export default function ListSales({total='', serieVenta, nombreUsuario, nombreTienda, tipoPagoVenta}) {
    return (
        <TouchableOpacity style={styles.rowBody}>
            <View>
                <StyleTextSubTitle>{serieVenta}</StyleTextSubTitle>
                <StyleText>{nombreUsuario}</StyleText>
                <View style={{flexDirection : 'row', marginVertical : 5, alignItems : 'center'}}>
                    <FontAwesome5 name="store-alt" size={14} color={COLORS.naranja}  />
                    <StyleText style={{marginHorizontal : 5}}>{nombreTienda}</StyleText>
                </View>
            </View>
            <View>
                <StyleText>Pago</StyleText>
                <StyleText >{tipoPagoVenta}</StyleText>
            </View>
            <View>
                <StyleText>Total</StyleText>
                <View style={styles.rowText}>
                    <StyleText style={{fontWeight : 'bold'}}>S/ {total}</StyleText>
                </View>
            </View>

        </TouchableOpacity>
    )
};

const styles = StyleSheet.create({
    "rowBody":{
        flexDirection : 'row',
        marginVertical: 5,
        width: "100%",
        paddingVertical : 10,
        borderWidth: 1,
        borderRadius: 10,
        borderCurve: 10,
        backgroundColor: COLORS.blanco,
        borderColor: COLORS.negro,
        elevation: 2,
        alignItems: 'center',
        justifyContent: 'space-evenly',
        
    },
    "rowText": {
        flexDirection : 'row',
        alignItems: 'center',
        justifyContent: 'center',
        
    }
})