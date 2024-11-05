import { View, Text, StyleSheet, Alert, Modal, useWindowDimensions, ScrollView, SafeAreaView, FlatList } from 'react-native'
import React, { useEffect, useState } from 'react'
import Constants from 'expo-constants';
import { FontAwesome, MaterialIcons } from '@expo/vector-icons';
import { BasicButton, CalendarButton, CardCaja, CardDisplayOverlay, Loading, LoadingDataList, NavBar, OverlayCurrentChange, OverlayModal, OverlayOpenBox, OverlayValidateAdmin, OverlayWarningBoxEmpty, Separator, StyleInputText, StyleText, StyleTextSubTitle, StyleTextTitle, ViewCardCaja } from '../../../../components';
import { COLORS } from '../../../../assets/theme/theme';
import { formatearFecha, formatearFechaActual, formatearFechaActualYYYMMdd } from '../../../../utils/lib/FormatterDate';
import { FontAwesome5 } from '@expo/vector-icons';
import { useProductGlobalContext } from '../../../../Context/GlobalStateProduct';
import { AgregarSeleccion, AgregarSeleccionPorId } from '../../../../utils/lib/AgregarSeleccion';
import { formatearDataStore } from '../../../../utils/lib/FormatearDataDb';
import { useAdminGlobalContext } from '../../../../Context/GlobalStateAdmin';
import { getDataVerifyStore } from '../../../../services/getDataVerify';
import { useBoxGlobalContext } from '../../../../Context/GlobalStateBox';
import { fetchCurrentChangeMoney, getCurrentBoxData, getCurrentBoxes, getCurrentBoxesByIdAdmin, getDetailVentasByIdCaja, getSumTotalVentasByIdCaja, saveBoxClose, saveBoxOpen } from '../../../../services/fetchDataBoxes';
import { hayCajasAbiertas, traerCajasDelDiadeHoy, traerMontoCierreCajaPasado, traerTiendasdelUsuario, traerTipoDeCambioActual, traerVentasdelDiadeHoy } from '../../../../utils/lib/FuncdelProcesoCaja';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { router } from 'expo-router';


export default function index() {
    const fecha = formatearFechaActual();
    const fechaFormateadaHoy = formatearFecha(new Date()).split("-")[0];
    const {dataAdmin} = useAdminGlobalContext();
    const {saveCurrentChange, currentChange : currentChangeData} = useBoxGlobalContext();
    const {
        listStores, 
        boxesOpen, 
        nameStoreSelected, 
        detailVentasxBox,
        saveStoreSelected,
        saveListStores,
        llamarDataCajaPorIdTienda,
        saveNameStoreSelected,
        saveExisteCajasAbiertas,
        saveDetailVentas,
        actualizarData,
        actualizarDataCaja
    } = useBoxGlobalContext();
    const [currentFecha, setCurrentFecha] = useState(fecha)
    const [loading, setLoading] = useState(false);
    const [showAlert, setShowAlert] = useState(true);
    const [showOpenBox, setShowOpenBox] = useState(false);
    const [showArqueo, setShowArqueo] = useState(false);
    const [currentChange, setCurrentChange] = useState(null);
    const [showChangeMoneyOverlay, setShowChangeMoneyOverlay] = useState(false);
    const [showAlertStore, setShowAlertStore] = useState(false);
    const [montoCierreCajaPasado, setMontoCierreCajaPasado] = useState(0)
    const [dataCaja, setDataCaja] = useState({
        totalVenta : 0,
        detalleEfectivoInicial : 0,
        totalVentasEfectivo :0, 
        totalVentasTarjeta:0,
        totalVentasYape:0,
        totalVentasPlin:0
    });
    const [dataCajaCerrada, setDataCajaCerrada] = useState(null);
    const [hayCajaCerrada, setHayCajaCerrada] = useState(false);
    useEffect(() => {
        async function fetchData() {
            setLoading(true);
            if (dataAdmin !== null) {
                const idUsuario = dataAdmin['idUser'];
            
                // Validar si el usuario tiene tiendas abiertas
                const jsonListaTiendas = await traerTiendasdelUsuario(idUsuario);
                if (jsonListaTiendas['error']) {
                    Alert.alert("Alerta","Problemas de conexión");
                    setLoading(false);
                    return;
                }
                const listaTiendas = jsonListaTiendas['message'] || [];    
                if (listaTiendas.length == 0) {
                    setShowAlertStore(true);
                    setLoading(false);
                    return;
                }        

                const listaTiendasconSeleccionado = listStores.length > 0 ? listStores : AgregarSeleccion(listaTiendas)
                saveListStores(listaTiendasconSeleccionado);
                // Tipo de Cambio Actual
                const precioVentaCambio = await traerTipoDeCambioActual();
                saveCurrentChange(precioVentaCambio);
    
                const cajasDeHoy = await traerCajasDelDiadeHoy(dataAdmin['idUser']);
                const existeCajasAbiertas = hayCajasAbiertas(cajasDeHoy);
                saveExisteCajasAbiertas(existeCajasAbiertas);
                // La primera apertura de caja, traemos el monto del cierre anterior
                if (!existeCajasAbiertas) {
                    const idTiendaSeleccionada = listStores.length > 0 ? listStores.filter(store=>store.seleccionado)[0]['idTienda'] : listaTiendasconSeleccionado.filter(store=>store.seleccionado)[0]['idTienda']
                    const responseCierreCaja = await traerMontoCierreCajaPasado(idUsuario, idTiendaSeleccionada);
                    if (responseCierreCaja['error']) {
                        Alert.alert("Error","Algo salió mal",[{
                            text : 'Ok',
                            onPress : ()=>router.push("home")
                        }]);
                        setShowAlert(false);
                        setLoading(false);
                        return;
                    }
                    const dataCierreCaja = responseCierreCaja['message']['ultimo_totalArqueo']
                    setMontoCierreCajaPasado(dataCierreCaja);
                }

                // En el caso de que haya caja abierta
                if (existeCajasAbiertas) {
                    setHayCajaCerrada(false);
                    const cacheHistorialListaTiendas = await AsyncStorage.getItem(`historial-lista-tiendas-${idUsuario}`);
                    const jsonHistorialListaTiendas = JSON.parse(cacheHistorialListaTiendas);
                    const historialListaTiendas = jsonHistorialListaTiendas['listStores']
                    // Guardamos la nueva lista de Tiendas Seleccionadas
                    saveListStores(historialListaTiendas);
                    const nombreTiendaSeleccionada = historialListaTiendas.filter(tienda=>tienda.seleccionado)[0]['razSocial']
                    saveNameStoreSelected(nombreTiendaSeleccionada)
    
                    setShowAlert(false);
                    setShowOpenBox(false);
                    setShowChangeMoneyOverlay(false);
                    
                    const idTiendaSeleccionada = historialListaTiendas.filter(tienda=>tienda.seleccionado)[0]['idTienda'];
                    
                    const cajasSeleccionadas = cajasDeHoy.filter(caja=>caja.idTienda==idTiendaSeleccionada)[0]['cajas'] // Esto es una lista de todas las cajas del día por el usuario X
                    const cajaAbiertaActual = cajasSeleccionadas.filter(cajaSeleccionada=>cajaSeleccionada.cerrada==0)[0] || {};
                    // Detalle de las ventas del Dia de Hoy
                    const idCajaAbiertaActual = cajaAbiertaActual['idCaja'];
                    const responseDetailVentas = await traerVentasdelDiadeHoy(idCajaAbiertaActual);
                    if (responseDetailVentas['error']) {
                        Alert.alert("Error","Surgió un error : /");
                        setLoading(false)
                        return;
                    }
                    saveDetailVentas(responseDetailVentas['message']);

                    setDataCaja(cajaAbiertaActual);
                    const cajasCerradasActual = cajasSeleccionadas.filter(cajaSeleccionada=>cajaSeleccionada.cerrada==1)[0] || null;
                    console.log("Caja cerrada : ",cajasCerradasActual);
                    if (cajasCerradasActual!==null) {
                        setHayCajaCerrada(true);
                        setDataCajaCerrada(cajasCerradasActual);
                    }
                }
                
    
            }
            setLoading(false);
        }
        fetchData();
    }, [actualizarData]);
    
    const handleChangeStore =async (idItem) => {
        const idUser = dataAdmin['idUser'];
        const nuevaLista = listStores.map((data, key) => {
            if (key === idItem) {
                return {
                    ...data,
                    seleccionado: true
                }
            }
            return {
                ...data,
                seleccionado: false
            }
        });
        const jsonTiendaSeleccionada = nuevaLista.filter(tienda=>tienda.seleccionado)[0];
        const idTiendaSeleccionada = jsonTiendaSeleccionada['idTienda']
        const estaTiendaenCajasAbiertas = boxesOpen.some(caja=>caja['Tienda_idTienda']==idTiendaSeleccionada);

        const nuevoNombre = nuevaLista.filter(tienda => tienda.seleccionado)[0]['nombre'];
        saveNameStoreSelected(nuevoNombre);

        if (!estaTiendaenCajasAbiertas) {
            await AsyncStorage.setItem(`historial-lista-tiendas-${idUser}`, JSON.stringify({listStores : nuevaLista}))
            actualizarDataCaja();
            return
        }
    }

    const abrirCaja=()=>{
        setShowAlert(!showAlert);
        if (!currentChange) {
            setShowChangeMoneyOverlay(true);
        }
        if (currentChange) {
            setShowChangeMoneyOverlay(false);
            setShowOpenBox(true);
        }
    }

    const saveCurrentChangeData=(data)=>{
        saveCurrentChange(data);
        setShowChangeMoneyOverlay(false);
        setShowOpenBox(true);
    }

    const saveDataApertura=async(montoApertura)=>{
        setShowOpenBox(!showOpenBox);
        setLoading(true);
        const idUser = dataAdmin['idUser'];
        const idTienda = listStores.filter((tienda)=>tienda.seleccionado)[0]['idTienda'];
        const nombreTienda = listStores.filter(tienda=>tienda.seleccionado)[0]['razSocial']
        const dataToSend={
            idUsuario : idUser,
            idUsuarioApertura : idUser,
            idTienda,
            efectivoInicial : montoApertura
        }
        await AsyncStorage.setItem(`historial-lista-tiendas-${idUser}`, JSON.stringify({listStores}))
        const response = await saveBoxOpen(dataToSend);
        const responseJson = await response.json();
        if (responseJson['error']) {
            Alert.alert("Error", "Algo salió mal");
            return;
        }
        setDataCaja({
            totalVenta : 0,
            detalleEfectivoInicial : montoApertura,
            totalVentasEfectivo :0, 
            totalVentasTarjeta:0,
            totalVentasYape:0,
            totalVentasPlin:0
        })
        saveNameStoreSelected(nombreTienda);
        setLoading(false);
    }
    const changeFecha=(newFecha)=>{
        setCurrentFecha(newFecha);
    }

    if (loading) {
        return (<Loading/>)
    }

    if (showAlertStore) {
        return (
            <OverlayModal close={false}>
                <StyleTextTitle>Aún no has registrado un local</StyleTextTitle>
                <StyleText>Registra un local para continuar</StyleText>
            </OverlayModal>
        )
    }
    return (
        <View style={styles.mainContainer}>
            <NavBar title={"Gestionar Caja"} route={"home"} />
            {
                showAlert ? <OverlayWarningBoxEmpty 
                visible={showAlert}
                showAperturaComp={abrirCaja}/> : null
            }
            {
                showChangeMoneyOverlay ?  <OverlayCurrentChange 
                firstCurrentChange={String(currentChangeData)} 
                saveCurrentChange={saveCurrentChangeData}/> : null
            }
            {   
                showOpenBox ? <OverlayOpenBox 
                saveData={saveDataApertura}
                firstMount={montoCierreCajaPasado}
                /> : null
            }

            <View style={{flexDirection:'row', alignItems:'center', height:60,justifyContent:'space-between'}}>
                <CalendarButton
                    fecha={currentFecha}
                    changeFecha={changeFecha}
                />
                <View style={styles.topStyle}>
                    <FontAwesome name="dollar" size={20} color={COLORS.naranja}/>
                    <StyleText style={{marginHorizontal : 5}}>{currentChangeData}</StyleText>
                </View>
            </View>
            <View style={{marginBottom:5}}>
                <StyleTextTitle>Hoy {fechaFormateadaHoy}</StyleTextTitle>
            </View>
            {
                listStores[0] ? 
                <CardDisplayOverlay 
                styleOverlay={{marginLeft : -10}}
                title={"Local actual"} 
                data={listStores || []}
                handleChange={handleChangeStore}
                IconCard={<FontAwesome5 name="store-alt" size={20} color={COLORS.naranja}  />} />
                : <LoadingDataList rows={1} columns={1} />
            }
            <Separator></Separator>
            {
                !hayCajaCerrada ? 
                <ViewCardCaja
                nombreLocal={nameStoreSelected}
                dataCaja={dataCaja}
                seeSales={detailVentasxBox}
                />
                : 
                <CardCaja
                    nombreLocal={nameStoreSelected}
                    dataCaja={dataCajaCerrada}
                    seeSales={detailVentasxBox}
                />
            }
        </View>
      )
};
const styles = StyleSheet.create({
    "mainContainer":{
        flex : 1,
        marginTop : Constants.statusBarHeight,
        paddingHorizontal : 20,
        backgroundColor : COLORS.blanco
    },
    "topStyle":{
        flexDirection : 'row',
        height : 60,
        alignItems : 'center',

    },
      "errorStyle":{
        color:COLORS.red,
        fontWeight:'bold',
        marginVertical: 7
    }
})