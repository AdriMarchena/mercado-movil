import { View, Text, StyleSheet, TextInput, Alert } from 'react-native'
import React, { useEffect, useState } from 'react'
import { COLORS } from '../../../../assets/theme/theme'
import { BasicButton, CardList, CardPressable, DisplayOptionsMoney, Loading, OverlayComponentWhite, OverlayPayMode, StyleText, StyleTextSubTitle } from '../../../../components';
import Constants from 'expo-constants'
import { ButtonContinue } from '../../../../components/elements';
import { useVentaGlobalContext } from '../../../../Context/GlobalStateVenta';
import { getTipoModoPago } from '../../../../services/getDetailVenta';
import { router } from 'expo-router';
export default function paymode() {
    const [loading, setLoading] = useState(true);
    const [dataOptions, setDataOptions] = useState([]);
    const {dataToSend, handleSubmit, products} = useVentaGlobalContext();
    const totalVenta = products.reduce((prev,current)=>prev+(current['precioVenta']*current['cantidad']),0).toFixed(2)
    useEffect(()=>{
        async function fetchTypePayModeService() {
            setLoading(true);
            const responseTipoPago = await getTipoModoPago();
            const jsonTipoPago = await responseTipoPago.json();
            const agregarSeleccion=(data)=>{
                return data.map((item,index)=>{
                    if (index == 1) {
                        return {
                            ...item,
                            seleccionado : true
                        }
                            
                    }
                    return {
                        ...item,
                        seleccionado : false
                    }
                })
            }
            const listAgregada = agregarSeleccion(jsonTipoPago.message);
            setDataOptions(listAgregada);
            setLoading(false);
        }
        fetchTypePayModeService();
    },[]);
    const [showDisplay, setShowDisplay] = useState(false);
    const handleChangeData=(idData)=>{
        const newDataOptions = dataOptions.map((data)=>{
            if (idData === 2) {
                changeDisplay();
            }
            if (data.idTipoPagoVenta === idData) {
                return {
                    ...data,
                    seleccionado : true
                }
            }
            return {
                ...data,
                seleccionado : false
            }
        });
        setDataOptions(newDataOptions);
    }
    const handleSubmitButton=async()=>{
        const idTipoPago = dataOptions.filter((val)=>val.seleccionado)[0]['idTipoPagoVenta'];
        const data = {
            ...dataToSend,
            idTipoPagoVenta : idTipoPago
        }
        setLoading(true);
        const responseIdVenta = await handleSubmit(data);
        if (responseIdVenta['error']) {
            Alert.alert("Error","Algo salió mal");
            console.log(responseIdVenta['message']);
            setLoading(false);
            return;
        }
        setLoading(false);
        router.push({
            pathname: "salesprocess/successale/[idVenta]",
            params : {
                idVenta : responseIdVenta['message']
            }
        })

    }
    const changeDisplay=()=>{
        setShowDisplay(!showDisplay);
    }
    if (loading) {
        return (<Loading/>)
    }
    return (
        <View style={styles.mainContainer}>
            {
                showDisplay ? <OverlayPayMode totalVenta={totalVenta} changeDisplay={changeDisplay}></OverlayPayMode>: null
            }
          <Text style={styles.textTitle}>Modo de Pago</Text>
          <View>
            {
                dataOptions.map((item, index)=><CardPressable handlePress={()=>handleChangeData(item.idTipoPagoVenta)} style={[styles.styleCardPressable, item.seleccionado && styles.cardSeleccionada]} key={index}>
                    <StyleTextSubTitle>{item.nombre}</StyleTextSubTitle>
                </CardPressable>)
            }
          </View>
          <ButtonContinue buttonText={"Guardar Venta"} handleSubmit={handleSubmitButton}/>
        </View>
      )
};
const styles = StyleSheet.create({
    "mainContainer":{
        flex : 1,
        backgroundColor :COLORS.blanco,
        paddingHorizontal : 20,
        marginTop :Constants.statusBarHeight,
        paddingVertical : 15
    },
    "textTitle":{
        color:COLORS.negro, 
        fontWeight:'bold', 
        fontSize:24, 
        marginBottom:15
    },
    "styleCardPressable":{
        marginVertical : 10
    },
    "cardSeleccionada":{
        backgroundColor: COLORS.verde_acuarela_opaco,
        borderColor : COLORS.verde_acuarela
    }
})