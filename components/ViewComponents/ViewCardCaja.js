import { View, Text, StyleSheet, useWindowDimensions, FlatList, Pressable, TouchableOpacity, Alert, ActivityIndicator } from 'react-native'
import React, { useState } from 'react'
import { OverlayCantidadesBox, OverlayComponent } from '../OverlayComponents';
import { StyleText, StyleTextSubTitle, StyleTextTitle } from '../TextComponents';
import { AntDesign, FontAwesome5, MaterialIcons } from '@expo/vector-icons';
import Separator from './Separator';
import { COLORS } from '../../assets/theme/theme';
import BasicButton from '../ButtonComponents/BasicButton';
import ModalRowArqueo from './ModalRowArqueo';
import CardCajaInformation from '../CardComponents/CardCajaInformation';
import OverlaySquareBox from '../OverlayComponents/OverlaySquareBox';
import { saveBoxClose } from '../../services/fetchDataBoxes';
import { router } from 'expo-router';
import ListSales from '../ListSalesComponents/ListSales';

function ComponenteCuadreCaja({detalleEfectivoInicial, totalVenta, actualizarArqueo}) {
    const  {width} = useWindowDimensions();
    const [mostrarCantidades, setMostrarCantidades] = useState(false);
    const [dataTotalArqueo, setDataTotalArqueo] = useState(0);
    const [mostrarListaCantidades, setMostrarListaCantidades] = useState(false);
    const [listaCantidades, setListaCantidades] = useState([]);
    const [posicionListaCantidades, setPosicionListaCantidades] = useState(0);
    const actualizarData =(lista)=>{
        const resultado = lista.reduce((accum, current)=>{
            return accum+current['total'];
        },0)
        setDataTotalArqueo(resultado);
        actualizarArqueo(resultado);
    }
    const cambiarMostrarCantidades=()=>{
        setMostrarCantidades(!mostrarCantidades)
    }
    const cambiarMostrarListaCantidades=()=>{
        setMostrarListaCantidades(!mostrarListaCantidades)
    }
    const agregarCantidad=(jsonCantidades)=>{
        const nuevaLista = [
            ...listaCantidades,
            {
                id : posicionListaCantidades,
                ...jsonCantidades
            }
        ]
        setListaCantidades(nuevaLista);
        setPosicionListaCantidades(prev=>prev+1)
        actualizarData(nuevaLista)
    }   
    const eliminarCantidad=(idCantidad)=>{
        const nuevaLista = listaCantidades.filter(data=>data.id !== idCantidad);
        setListaCantidades(nuevaLista);
        actualizarData(nuevaLista);
    }
    return(
        <View style={[styles.containerCardItem, {borderWidth : 0}]}>
        {mostrarCantidades ? <ModalRowArqueo  agregarCantidad={agregarCantidad} changeVisible={cambiarMostrarCantidades} /> : null}
        {mostrarListaCantidades ? <OverlayCantidadesBox eliminarCantidad={eliminarCantidad}  changeVisible={cambiarMostrarListaCantidades} data={listaCantidades}/> : null}
        <CardCajaInformation
            montoAperturado={detalleEfectivoInicial}
            totalVentas={totalVenta}
        />
        <View style={{marginTop : 10}}>
            <TouchableOpacity  onPress={cambiarMostrarCantidades} >
                <Text style={styles.buttonText}>+ Agregar Cantidad</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={cambiarMostrarListaCantidades} style={[styles.rowBody,{justifyContent : 'space-between', alignItems:'center', borderWidth : 1, borderRadius : 10, width: width-40, paddingVertical : 10, paddingHorizontal : 10}]}>
                <View style={[styles.rowBody,{justifyContent:'center', alignItems:'center'}]}>
                    <MaterialIcons name='money' size={16}  color={COLORS.naranja} />
                    <StyleText>Total de Cuadre de Caja</StyleText>
                </View>
                <StyleText>S/. {dataTotalArqueo}</StyleText>
            </TouchableOpacity>
        </View>
    </View>
    )
}

export default function ViewCardCaja({dataCaja,detailVentas={},ventas=[],seeSales=[], nombreLocal='Local 1', montoAperturado="150.00", totalVentas = "500.0", montoEfectivo="1000", montoTarjeta="200", montoPlin="150", montoYape="150", saveInformation}) {
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
    const [totalArqueo, setTotalArqueo] = useState(0);
    const [sereaLizoCuadre, setSereaLizoCuadre] = useState(false);
    const [mostrarOverlaySquareBox, setMostrarOverlaySquareBox] = useState(false);
    const [loading, setLoading] = useState(false);
    const handlePress = () => {
        setShowSales(!showSales);
    };

    const realizarCuadreCaja=()=>{
        setSereaLizoCuadre(!sereaLizoCuadre)
    }
    const actualizarArqueo=(total)=>{
        setTotalArqueo(total);
    }
    const mostrarSquareBox=()=>{
        if (totalArqueo==0) {
            Alert.alert("Alerta", "Realiza el cuadre de caja para cerrar.");
            return;
        }
        setMostrarOverlaySquareBox(!mostrarOverlaySquareBox);
    }
    const cerrarCajaActual=(missing, surplus)=>{
        const dataToSend = {
            idCaja : dataCaja['idCaja'],
            totalArqueo,
            totalSobrante : surplus,
            totalFaltante : missing,
            totalVenta : dataCaja['totalVenta']
        }
        console.log(dataToSend);
        Alert.alert("Cerrar Caja", "Estas seguro de cerrar caja",[
        {
            text : 'Cancelar',
            onPress : ()=>{console.log("Cancelo");},
            style : 'cancel'
        },
        {
            text : "Cerrar",
            onPress : async()=>{
                setLoading(true);
                const response = await saveBoxClose(dataToSend);
                const jsonResponse = await response.json();
                if (jsonResponse['error']) {
                    Alert.alert("Error","Algo salió mal");
                    setLoading(false);
                    return;
                }
                setLoading(false)
                router.push("home")
            },
            style : 'default'
        }]);
    }
    return (
    <View>
        {mostrarOverlaySquareBox ? <OverlaySquareBox loading={loading} saveSquareBox={cerrarCajaActual} total={montoTotal} arching={totalArqueo} /> : null}

        {
            !sereaLizoCuadre ? 
            <View>
            <View style={styles.mainContainer}>
                {showSales && (
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
                        <StyleText>Caja Abierta</StyleText>
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
                    <StyleText>S/.{detalleEfectivoInicial}</StyleText>
                </View>
                <View style={styles.rowBody}>
                    <StyleText style={[styles.rowBodyFirstElement, {width:width-150}]}>Ventas</StyleText>
                    <StyleText>S/.{Number(totalVenta).toFixed(2)}</StyleText>
                    <AntDesign name="eye" style={{marginLeft : 10}} size={20} color={COLORS.naranja} onPress={handlePress} />
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
                    <StyleText style={{fontWeight : 'bold'}}>S/.{Number(montoTotal).toFixed(2)}</StyleText>
                </View>

            </View>

    </View>
     : <ComponenteCuadreCaja actualizarArqueo={actualizarArqueo} detalleEfectivoInicial={dataCaja['detalleEfectivoInicial']} totalVenta={dataCaja['totalVenta']}/>}
    
    { !sereaLizoCuadre ?   <BasicButton handleSubmit={realizarCuadreCaja}>Realizar Cuadre de Caja</BasicButton> :    <BasicButton handleSubmit={mostrarSquareBox}>{loading ? <ActivityIndicator/> : "Cerrar Caja"}</BasicButton>}
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
    "containerCardItem":{
        borderWidth : 1,
        borderColor : COLORS.negro,
        borderRadius : 10,
        paddingHorizontal : 10,
        paddingVertical : 20,
        width : "100%",
        marginVertical : 15,
        minHeight : 400,
        justifyContent : 'center',
        alignItems:'center'
    },
    "buttonText":{
        fontWeight : 'bold',
        color : COLORS.naranja,
        textDecorationLine:'underline',
        marginVertical:10,
        fontSize:16
    }
})