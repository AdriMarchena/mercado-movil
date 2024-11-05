import { View, Text, StyleSheet, Dimensions, TouchableOpacity, Alert, Image } from 'react-native'
import React, { useEffect, useState } from 'react'
import { COLORS } from '../../../../assets/theme/theme'
import {stylesFormLogin} from '../../../../assets/theme/stylesForm'
import { useAdminGlobalContext } from '../../../../Context/GlobalStateAdmin';
import { Loading } from '../../../../components';
import { router } from 'expo-router';
import { MaterialIcons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage'
export default function settings() {
    const useAdmin = useAdminGlobalContext();
    const [loading, setLoading] = useState(false);
    const [dataUser, setDataUser] = useState(null);

    useEffect(()=>{
        async function fetchDataUser(){
            setLoading(true);
            const user = await AsyncStorage.getItem("admin-data");
            const jsonUser = JSON.parse(user);
            const idUser = jsonUser.idUser;
            const data = await globalThis.fetch(`https://mercadomovilback.fly.dev/admin/${idUser}`,{
                method:'GET',
                mode:'cors'
            });
            const jsonData = await data.json();
            setDataUser(jsonData.message);
            setLoading(false);
        }
        fetchDataUser()
    },[]);
    const signOut=async()=>{
        await useAdmin.signOut();
        Alert.alert('Cerraste sesión')
        router.replace("/");
    }
    if (loading) {
        return (<Loading/>)
    }
  return (
    <View style={styles.mainContainer}>
        {
            dataUser ?         
            <View style={{flexDirection:'row', alignItems:'center'}}>
                <View>
                    <Image style={{width:60, height:60, borderRadius:60, borderWidth:1, borderColor:COLORS.negro_opaco}} src={dataUser.urlImagen} />
                </View>
                <View style={{marginLeft:10}}>
                    <Text style={{fontWeight:'bold', fontSize:18, color:COLORS.negro}}>{dataUser.nombreUsuario}</Text>
                    <View style={{flexDirection:'row', alignItems:'center'}}>
                        <MaterialIcons name="store" size={18} color={COLORS.negro} />
                        <Text style={{color:COLORS.negro, fontSize:16}}>{dataUser.nombreTipoTienda}</Text>
                    </View>
                </View>
                <View style={{width:"100%"}}>

                </View>
            </View> : null
        }
        <View style={styles.bottomStyle}>
            <TouchableOpacity style={stylesFormLogin.loginButton} onPress={signOut}>
                <Text style={stylesFormLogin.textStyleLoginButton}>Cerrar Sesión</Text>
            </TouchableOpacity>
        </View>
    </View>
  )
};
const styles = StyleSheet.create({
    "bodyStyle":{
        width :"100%",
        height : Dimensions.get("screen").height-100,
        backgroundColor : COLORS.blanco
    },
    "bottomStyle":{
        width : "100%",
        height : 100,
        justifyContent : "center",
        alignItems : "center"
    },
    "mainContainer":{
        width:"100%",
        paddingHorizontal:30,
        paddingTop:15
    }
})