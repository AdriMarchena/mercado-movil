import { View, Text, ScrollView, TextInput, StyleSheet, TouchableOpacity, FlatList } from 'react-native'
import React, { useEffect, useState } from 'react'
import { StyleText, StyleTextSubTitle, StyleTextTitle } from '../TextComponents'
import { COLORS } from '../../assets/theme/theme'
import { OverlayComponent, OverlayModal } from '../OverlayComponents'
import { useAdminGlobalContext } from '../../Context/GlobalStateAdmin'
import { useProductGlobalContext } from '../../Context/GlobalStateProduct'
import { Entypo } from '@expo/vector-icons'
import BasicButton from '../ButtonComponents/BasicButton'
import Separator from './Separator'
import DropDownPicker from 'react-native-dropdown-picker'

export default function FormWorker({listaCargos=[]}) {
    const [tipoDocumento, setTipoDocumento] = useState("Ninguno")
    const {listStores} = useProductGlobalContext();
    const tiendaSeleccionada = listStores.filter(tienda => tienda.seleccionado)[0];
    const [tiendaEscogida, setTiendaEscogida] = useState(tiendaSeleccionada);
    const [showOverlay, setShowOverlay] = useState(false);
    const [showOverlayCargo, setShowOverlayCargo] = useState(false);
    const [listaSexos, setListaSexos] = useState([
        {value : 0, label : "M"},
        {value : 1, label : "F"}
    ])
    const [dataCargos, setDataCargos] = useState([
        {
            idCargo : 1,
            nombre : "Trabajador",
            seleccionado : true,
        },
        {
            idCargo : 2,
            nombre : "Supervisor",
            seleccionado : false,
        }
    ]);
    const [dataWorker, setDataWorker] = useState({
        nombre : "",
        apellido : "",
        documento : "",
        email : "",
        password : "",

    })
    const cargoSeleccionado =  dataCargos.filter(cargo=>cargo.seleccionado)[0];
    const [cargoEscogido, setCargoEscogido] = useState(cargoSeleccionado)

    const changeShowOverlay=()=>{
        setShowOverlay(!showOverlay);
    }
    const changeOverlayCargo=()=>{
        setShowOverlayCargo(!showOverlayCargo);
    }
    const enviarData =()=>{

    }
    const changeInputsText=()=>{

    }
    return (
    <View style={styles.mainContainer}>
        {
            showOverlay && <OverlayComponent styleComponent={{top : -100}} changeVisible={changeShowOverlay}>
                <StyleTextTitle>Lugar de trabajo</StyleTextTitle>
                <View style={{marginVertical : 5}}>
                    <FlatList
                        data={listStores}
                        renderItem={({item : store, index})=>(
                            <TouchableOpacity key={index} style={[{marginVertical : 5,width : "100%", height : 70, borderRadius : 10, borderWidth : 1, borderColor : store.seleccionado ? COLORS.verde_acuarela : COLORS.negro , justifyContent : 'center', paddingHorizontal : 10},
                            store.seleccionado && {backgroundColor : COLORS.verde_acuarela_opaco}
                                ]}>
                            <StyleText style={{fontWeight : 'bold', fontSize : 18}}>{store['razSocial']}</StyleText>
                            <View style={{flexDirection : 'row', alignItems:'center', }}>
                                <Entypo name='location-pin' size={24} color={COLORS.naranja} />
                                <StyleText>{store['direccion']}</StyleText>
                            </View>
                            </TouchableOpacity>
                        )}
                        horizontal={false}
                        ItemSeparatorComponent={<Separator/>}

                    />
                </View>
            </OverlayComponent>
        }
        {
            showOverlayCargo && <OverlayModal changeVisible={changeOverlayCargo}>
                <View>
                    <View style={{width : "100%", justifyContent:'center', alignItems:'center', paddingVertical:10}}>
                        <StyleTextSubTitle>Escoge un cargo</StyleTextSubTitle>
                    </View>
                    <Separator/>
                    <View style={{width : "100%", height : 150}}>
                        <FlatList
                            data={dataCargos}
                            renderItem={({item : cargo, index})=>{
                                const cambiarSeleccion=()=>{
                                    const nuevaListaCargos = dataCargos.map(item=>{
                                        if (item.idCargo == cargo.idCargo) {
                                            setCargoEscogido(item);
                                            return{
                                                ...item,
                                                seleccionado : true
                                            }
                                        }
                                        return {
                                            ...item,
                                            seleccionado : false
                                        }
                                    }) ;
                                    setDataCargos(nuevaListaCargos);           
                                }
                                return(
                                    <TouchableOpacity key={index} onPress={cambiarSeleccion} style={[
                                        {width : "100%", height : 50,borderWidth :1, borderColor : COLORS.negro_opaco, borderRadius : 10, marginVertical : 5, justifyContent :'center', alignItems:'center'},
                                        cargo['seleccionado'] && {backgroundColor : COLORS.verde_acuarela_opaco}
                                    ]} >
                                        <StyleText >{cargo['nombre']}</StyleText>
                                    </TouchableOpacity>
                                )
                            }}
                        />
                    </View>
                </View>
            </OverlayModal>
        }
        <ScrollView>
            <StyleTextTitle>Nuevo Trabajador</StyleTextTitle>
            <View style={{marginVertical : 10}}>
                <StyleTextSubTitle>Documento</StyleTextSubTitle>
                <View style={styles.styleBoxInput}>
                    <TextInput onChange={changeInputsText} style={styles.inputStyle} placeholder='Documento de trabajador' />
                    <StyleText>{tipoDocumento}</StyleText>
                </View>
            </View>
            <View style={{flexDirection : 'row',justifyContent :'space-between',}}>
                <View style={{flex:1, marginRight : 5}}>
                    <StyleTextSubTitle>Nombre</StyleTextSubTitle>
                    <View style={styles.styleBoxInput}>
                        <TextInput onChange={changeInputsText} style={styles.inputStyle} placeholder='Nombre' />
                    </View>
                </View>
                <View style={{flex:1, marginLeft : 5}}>
                    <StyleTextSubTitle>Apellido</StyleTextSubTitle>
                    <View  style={styles.styleBoxInput}>
                        <TextInput onChange={changeInputsText} style={styles.inputStyle} placeholder='Apellido' />
                    </View>
                </View>
            </View>
            <View style={{flexDirection : 'row', marginVertical : 10,justifyContent :'space-between',}}>
                <View style={{flex:1, marginRight : 5}}>
                    <StyleTextSubTitle>Telefono</StyleTextSubTitle>
                    <View style={styles.styleBoxInput}>
                        <TextInput onChange={changeInputsText} style={styles.inputStyle} placeholder='Telefono' />
                    </View>
                </View>
                <View style={{width : 100, marginLeft : 5}}>
                    <StyleTextSubTitle>Sexo</StyleTextSubTitle>
                    <DropDownPicker
                        open={false}
                        items={listaSexos}
                        placeholder={listaSexos[0].label}
                        style={{height : 60, backgroundColor : COLORS.blanco}}
                    />
                </View>
            </View>
            <View style={{marginVertical : 10}}>
                <StyleTextSubTitle>Correo Electronico</StyleTextSubTitle>
                <View style={styles.styleBoxInput}>
                    <TextInput onChange={changeInputsText} style={styles.inputStyle} placeholder='Nombre del trabajador' />
                </View>
            </View>
            <View style={{marginVertical :10}}>
                <StyleTextSubTitle>Contraseña del trabajador</StyleTextSubTitle>
                <View style={styles.styleBoxInput}>
                    <TextInput  style={styles.inputStyle} placeholder='Contraseña del usuario'/>
                </View>
            </View>

            <Separator/>
            <View style={{
                flexDirection : 'row',
                justifyContent :'space-between',
                marginVertical : 10}}>
                <View style={{flex:1, marginRight : 5}}>
                    <StyleTextSubTitle>Lugar de Trabajo</StyleTextSubTitle>
                    <TouchableOpacity onPress={changeShowOverlay} style={styles.styleBoxOverlay}>
                        <StyleText>{tiendaEscogida['razSocial']}</StyleText>
                        <View style={{flexDirection : 'row'}}>
                            <Entypo name='location-pin' size={24} color={COLORS.naranja} />
                            <StyleText>{tiendaEscogida['direccion']}</StyleText>
                        </View>
                    </TouchableOpacity>
                </View>
                <View style={{flex : 1, marginLeft : 5}}>
                    <StyleTextSubTitle>Cargo del trabajador</StyleTextSubTitle>
                    <TouchableOpacity onPress={changeOverlayCargo} style={styles.styleBoxOverlay}>
                        <StyleText style={{fontWeight : 'bold'}}>{cargoEscogido['nombre']}</StyleText>
                    </TouchableOpacity>
                </View>
            </View>
            <View  style={{marginVertical : 10}}>
                <BasicButton handleSubmit={enviarData}>Guardar Trabajador</BasicButton>
            </View>
        </ScrollView>
    </View>
  )
};
const styles = StyleSheet.create({
    "mainContainer":{
        flex: 1,
        backgroundColor : COLORS.blanco,
        paddingHorizontal : 10,
        paddingVertical : 10,
    },
    "styleBoxInput":{
        width: "100%",
        flexDirection : 'row',
        justifyContent : 'center',
        alignItems:'center',
        height : 60,
        paddingHorizontal : 10,
        borderWidth : 1,
        borderColor : COLORS.negro,
        borderRadius : 10
    },
    "inputStyle":{
        flex : 1,
        padding : 5,
        
    },
    "styleBoxOverlay":{
        height : 70,
        width : "100%",
        paddingHorizontal : 10,
        borderWidth :1,
        justifyContent : 'center',
        borderColor : COLORS.negro,
        borderRadius :10
    }
})