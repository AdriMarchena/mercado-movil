import { View, Text, StyleSheet, Pressable, useWindowDimensions, FlatList } from 'react-native'
import React, { useState } from 'react'
import { COLORS } from '../../assets/theme/theme'
import { FontAwesome5, MaterialIcons } from '@expo/vector-icons'
import { StyleText, StyleTextSubTitle, StyleTextTitle } from '../TextComponents'
import ListSales from '../ListSalesComponents/ListSales'
import BasicButton from '../ButtonComponents/BasicButton'
import Separator from '../ViewComponents/Separator'
import { AntDesign } from '@expo/vector-icons';
import { OverlayComponent } from '../OverlayComponents'

export default function CardCaja({detailVentas={}, dataCaja={},ventas=[],seeSales=[], nombreLocal='Local 1', montoAperturado="150.00", totalVentas = "500.0", montoEfectivo="1000", montoTarjeta="200", montoPlin="150", montoYape="150", saveInformation}) {
    const {width, height} = useWindowDimensions();
    const {
        totalVenta=0,
        detalleEfectivoInicial=0,
        totalVentasEfectivo=0, 
        totalVentasTarjeta=0,
        totalVentasYape=0,
        totalVentasPlin=0
    } = dataCaja;
    const montoTotal = Number(totalVenta) + Number(detalleEfectivoInicial);
    const [showSales, setShowSales] = useState(false);

    const handlePress = () => {
        setShowSales(!showSales);
    };

    const handleSubmit=()=>{
        saveInformation()
    }

    return (
        <View>
            <View style={styles.mainContainer}>
                { showSales && (
                        <OverlayComponent changeVisible={handlePress} styleComponent={{paddingTop : 10}}>
                            <StyleTextTitle>Ventas del día</StyleTextTitle>
                            <View>
                                <FlatList
                                    data={seeSales}
                                    renderItem={({item})=><ListSales
                                    {...item}
                                    ></ListSales>}
                                />
                            </View>
                        </OverlayComponent>
                    )}
                <View style={styles.topHeader}>
                    <View>
                        <View style={styles.topHeaderStyle}>
                            <FontAwesome5 name="store-alt" size={20} color={COLORS.naranja}/>
                            <StyleTextSubTitle style={{marginLeft : 10}}>{nombreLocal}</StyleTextSubTitle>
                        </View>
                        <StyleText style={{fontWeight : 'bold'}}>Caja Cerrada</StyleText>
                    </View>
                    <Pressable>
                        <MaterialIcons name="share" size={20} color={COLORS.naranja} />
                    </Pressable>
                </View>
                <View style={styles.rowBody}>
                    <View style={[styles.rowBodyFirstElement, {width:width-150}]}></View>
                    <StyleText style={{fontWeight: 'bold'}}>Soles</StyleText>
                </View>
                <View style={styles.rowBody}>
                    <StyleText style={[styles.rowBodyFirstElement, {width:width-150}]}>Monto aperturado</StyleText>
                    <StyleText>S/.{Number(detalleEfectivoInicial).toFixed(2)}</StyleText>
                </View>
                <View style={styles.rowBody}>
                    <StyleText style={[styles.rowBodyFirstElement, {width:width-150}]}>Ventas</StyleText>
                    <StyleText>S/.{Number(totalVenta).toFixed(2)}</StyleText>
                    {
                        seeSales.length>0&& <AntDesign name="eye" style={{marginLeft : 10}} size={20} color={COLORS.naranja} onPress={handlePress} />
                    }
                </View>
                <Separator></Separator>
                <View style={styles.rowBody}>
                    <StyleText style={[styles.rowBodyFirstElement, {width:width-150}, {left: 30}]}>Efectivo</StyleText>
                    <StyleText>S/. {Number(totalVentasEfectivo).toFixed(2)}</StyleText>
                </View>
                <View style={styles.rowBody}>
                    <StyleText style={[styles.rowBodyFirstElement, {width:width-150}, {left: 30}]}>Tarjeta</StyleText>
                    <StyleText>S/. {Number(totalVentasTarjeta).toFixed(2)}</StyleText>
                </View>
                <View style={styles.rowBody}>
                    <StyleText style={[styles.rowBodyFirstElement, {width:width-150}, {left: 30}]}>Yape</StyleText>
                    <StyleText>S/. {Number(totalVentasYape).toFixed(2)}</StyleText>
                </View>
                <View style={styles.rowBody}>
                    <StyleText style={[styles.rowBodyFirstElement, {width:width-150}, {left: 30}]}>Plin</StyleText>
                    <StyleText>S/. {Number(totalVentasPlin).toFixed(2)}</StyleText>
                </View>
                <Separator></Separator>
                <View style={styles.rowBody}>
                    <StyleText style={[styles.rowBodyFirstElement, {width:width-150, fontWeight: 'bold'}]}>Total</StyleText>
                    <StyleText>S/.{Number(montoTotal).toFixed(2)}</StyleText>
                </View>

            </View>
        </View>
    )
};
const styles = StyleSheet.create({
    "mainContainer":{
        width:"100%",
        padding : 4,
        borderRadius:10,
        backgroundColor : COLORS.blanco,
        borderColor : COLORS.negro,
        borderWidth : 1,
        paddingHorizontal : 10,
        paddingVertical : 10,
        paddingBottom : 20,
        marginBottom : 15
    },
    "topHeaderStyle":{
        flexDirection : 'row',
        alignItems:'center',
    },
    "topHeader":{
        width:"100%",
        flexDirection:'row',
        alignItems : 'center',
        justifyContent:'space-between',
        height: 60,
        paddingHorizontal : 15
    },
    "rowBody":{
        flexDirection : 'row',
        marginVertical :5
    },
    "rowBodyFirstElement":{
        paddingLeft : 15
    },
})