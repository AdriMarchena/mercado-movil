import { View, Text, FlatList, StyleSheet, Animated, useWindowDimensions, Alert, ActivityIndicator, TouchableOpacity } from 'react-native'
import React, { useRef, useState } from 'react'
import { StyleText, StyleTextSubTitle, StyleTextTitle } from '../TextComponents';
import { COLORS } from '../../assets/theme/theme';
import { FontAwesome5, MaterialIcons } from '@expo/vector-icons';
import Separator from './Separator';
import BasicButton from '../ButtonComponents/BasicButton';
import { Entypo } from '@expo/vector-icons';
import { saveBoxClose } from '../../services/fetchDataBoxes';
import { useBoxGlobalContext } from '../../Context/GlobalStateBox';
import { router } from 'expo-router';
import CardCajaInformation from '../CardComponents/CardCajaInformation';
import ModalRowArqueo from './ModalRowArqueo';
import { OverlayCantidadesBox } from '../OverlayComponents';
import OverlaySquareBox from '../OverlayComponents/OverlaySquareBox';
function formatearFecha(fechaString) {
    // Crear un objeto de fecha a partir de la cadena proporcionada
    const fecha = new Date(fechaString);
  
    // Obtener el día del mes
    const dia = fecha.getDate();
  
    // Obtener el nombre del mes en español
    const meses = [
      "ene.", "feb.", "mar.", "abr.", "may.", "jun.",
      "jul.", "ago.", "sep.", "oct.", "nov.", "dic."
    ];
    const mes = meses[fecha.getMonth()];
  
    // Obtener el año
    const año = fecha.getFullYear();
  
    // Formatear la hora y minutos (00:00)
    const hora = fecha.getHours();
    const minutos = String(fecha.getMinutes()).padStart(2,'0');
  
    // Construir la cadena de fecha formateada
    const fechaFormateada = `${dia} ${mes} ${año} - ${hora}:${minutos}`;
  
    return fechaFormateada;
  }


function Paginator({data, scrollX, style}) {
    const { width } = useWindowDimensions();
    return (
        <View style={[styles.containerPaginator, style]}>
            {
                data.map((_,i)=>{
                    const inputRange = [(i - 1)*width, i*width, (i+1)*width];

                    const dotWidth = scrollX.interpolate({
                        inputRange,
                        outputRange : [10,20,10],
                        extrapolate : 'clamp'
                    })
                    return <Animated.View style={[styles.dotPaginator, {width : dotWidth}]} key={i.toString()} />

                })
            }
        </View>
    )
}

function ComponenteArqueo({detalleEfectivoInicial, totalVenta, actualizarArqueo}) {
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
            <TouchableOpacity onPress={cambiarMostrarListaCantidades} style={[styles.rowBody,{justifyContent : 'space-between', alignItems:'center', borderWidth : 1, borderRadius : 10, width: width -30, paddingVertical : 10, paddingHorizontal : 10}]}>
                <View style={[styles.rowBody,{justifyContent:'center', alignItems:'center'}]}>
                    <MaterialIcons name='money' size={24}  color={COLORS.naranja} />
                    <StyleTextSubTitle style={{marginHorizontal : 5}}>Total de Cuadre de Caja</StyleTextSubTitle>
                </View>
                <StyleText style={{fontWeight : 'bold'}}>S/. {dataTotalArqueo}</StyleText>
            </TouchableOpacity>
        </View>
    </View>
    )
}

function OnboardingItem({nombreTienda,setLoading,detalleEfectivoInicial, totalVenta, horaAperturaCaja, totalCaja, numItems=1, idCaja, totalVentasEfectivo, totalVentasYape, totalVentasTarjeta, totalVentasPlin}) {
    const { width } = useWindowDimensions();
    const fechaFormateada = formatearFecha(horaAperturaCaja)
    const {removeBoxOpen} = useBoxGlobalContext();
    const [sereaLizoCuadre, setSereaLizoCuadre] = useState(false);
    const [mostrarOverlaySquareBox, setMostrarOverlaySquareBox] = useState(false);
    const [totalArqueo, setTotalArqueo] = useState(0);

    const cerrarCajaActual=(missing, surplus)=>{
        const dataToSend = {
            idCaja,
            totalArqueo,
            totalSobrante : surplus,
            totalFaltante : missing,
            totalVenta
        }
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
                    Alert.alert("Error",jsonResponse['message']);
                    setLoading(false);
                    return;
                }
                removeBoxOpen(idCaja);

                setLoading(false);
                if (numItems == 1) {
                    Alert.alert("Alerta", "Ya no hay más cajas por cerrar");
                    router.push("home");
                }
            },
            style : 'default'
        }]);
    }
    const cuadrarCaja=()=>{
        setSereaLizoCuadre(!sereaLizoCuadre);
    }
    const mostrarSquareBox=()=>{
        if (totalArqueo==0) {
            Alert.alert("Alerta", "Realiza el cuadre de caja para cerrar.");
            return;
        }
        setMostrarOverlaySquareBox(!mostrarOverlaySquareBox);
    }
    const actualizarArqueo=(total)=>{
        setTotalArqueo(total);
    }
    return(<View style={[styles.containerItem,{width : width -20}]}>
            {mostrarOverlaySquareBox ? <OverlaySquareBox saveSquareBox={cerrarCajaActual} total={totalCaja} arching={totalArqueo} /> : null}
            <View style={{flexDirection : 'row', alignItems:'center'}}>
                <Entypo name="calendar" size={20} color={COLORS.negro}/>
                <StyleTextSubTitle style={{marginHorizontal : 10}}>{fechaFormateada}</StyleTextSubTitle>
            </View>
            {
                !sereaLizoCuadre ? 
                <View style={styles.containerCardItem}>
                <View style={{width: "100%", paddingHorizontal : 15}}>
                    <View style={{flexDirection : 'row', alignItems : 'center'}}>
                        <FontAwesome5 name="store-alt" size={20} color={COLORS.negro} />
                        <StyleTextTitle style={{marginHorizontal : 10}}>{nombreTienda}</StyleTextTitle>
                    </View>      
                    <View style={styles.rowBody}>
                        <StyleTextSubTitle style={{width : width - 200}}>Monto Aperturado : </StyleTextSubTitle>
                        <StyleText>S/. {Number(detalleEfectivoInicial).toFixed(2)}</StyleText>
                    </View>
                    <View style={styles.rowBody}>
                        <StyleTextSubTitle style={{width : width - 200}}>Total de Ventas : </StyleTextSubTitle>
                        <StyleText>S/. {Number(totalVenta).toFixed(2)}</StyleText>
                    </View>
                    <Separator></Separator>
                    <View style={styles.rowBody}>
                        <StyleText style={{width : width - 200, fontWeight : 'bold'}}>Ventas Tarjeta : </StyleText>
                        <StyleText>S/. {Number(totalVentasTarjeta).toFixed(2)}</StyleText>                    
                    </View>
                    <View style={styles.rowBody}>
                        <StyleText style={{width : width - 200, fontWeight : 'bold'}}>Ventas Efectivo : </StyleText>
                        <StyleText>S/. {Number(totalVentasEfectivo).toFixed(2)}</StyleText>                    
                    </View>
                    <View style={styles.rowBody}>
                        <StyleText style={{width : width - 200, fontWeight : 'bold'}}>Ventas Yape : </StyleText>
                        <StyleText>S/. {Number(totalVentasYape).toFixed(2)}</StyleText>                    
                    </View>
                    <View style={styles.rowBody}>
                        <StyleText style={{width : width - 200, fontWeight : 'bold'}}>Ventas Plin : </StyleText>
                        <StyleText>S/. {Number(totalVentasPlin).toFixed(2)}</StyleText>                    
                    </View>
                    <Separator></Separator>
                    <View  style={styles.rowBody}>
                        <StyleTextSubTitle style={{width : width - 200}}>Total de Caja : </StyleTextSubTitle>
                        <StyleTextSubTitle>S/. {Number(totalCaja).toFixed(2)}</StyleTextSubTitle>
                    </View>

                </View>
            </View> :
            <ComponenteArqueo actualizarArqueo={actualizarArqueo} detalleEfectivoInicial={detalleEfectivoInicial} totalVenta={totalVenta}/>
            }
            {!sereaLizoCuadre ? <BasicButton handleSubmit={cuadrarCaja}>Cuadrar Caja</BasicButton> : <BasicButton handleSubmit={mostrarSquareBox} >Cerrar Caja</BasicButton>}
    </View>)
}

export default function OnBoardingViewBoxes({data=[], setLoading}) {

  const [currentIndex, setCurrentIndex] = useState(0);
  const scrollX = useRef(new Animated.Value(0)).current;
  const slidesRef = useRef(null);
  const viewableItemsChanged = useRef(({viewableItems})=>{
    setCurrentIndex(viewableItems[0].index);
  }).current;
  const viewConfig = useRef(({viewAreaCoveragePercentThreshold : 50})).current;
    return (
    <View style={{flex : 1,justifyContent:'center', alignItems:'center'}}>
        <View style={{ flex:1,justifyContent:'center', alignItems:'center', paddingTop : 10}}>
        <FlatList
            horizontal
            data={data}
            renderItem={({item, key})=><OnboardingItem key={key} setLoading={setLoading} numItems={data.length} {...item} />}
            showsHorizontalScrollIndicator={false}
            pagingEnabled
            bounces={false}
            scrollEventThrottle={30}
            ref={slidesRef}
            onScroll={Animated.event([{
                nativeEvent : {
                    contentOffset : {x : scrollX}
                }
            }],{
                useNativeDriver : false,
            })}
            onViewableItemsChanged={viewableItemsChanged}
            viewabilityConfig={viewConfig}
            key={2}
        />
        </View>
        <Paginator style={{marginTop : 15}}  data={data} scrollX={scrollX} />
    </View>
  )
};
const styles = StyleSheet.create({
    "containerItem" : {
        justifyContent : 'center',
        alignItems:'center',
        marginHorizontal : 10,
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
    "containerPaginator" : {
        flexDirection : 'row',
        height : 64
    },
    "dotPaginator" : {
        height : 10,
        borderRadius : 5,
        backgroundColor : COLORS.naranja,
        marginHorizontal : 8
    },
    "rowBody":{
        flexDirection : 'row',
        marginVertical :5
    },
    "buttonText": {
        color: COLORS.naranja,
        fontSize: 16,
        fontWeight: 'bold',
        textDecorationLine: 'underline'
    },
})