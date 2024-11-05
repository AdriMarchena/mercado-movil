import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import React from 'react'
import { StyleText, StyleTextSubTitle } from '../TextComponents'
import { COLORS } from '../../assets/theme/theme';
import { Entypo } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons';
import { router } from 'expo-router';
export default function CardStorePresentation({data}) {
    const tiendaSeleccionada = data.filter(store=>store.seleccionado)[0] || null;
    return (
    <TouchableOpacity onPress={()=>router.push("stores/home")} style={styles.cardStyle}>
        <View style={{width : 60, height : 80, justifyContent:'center', alignItems:'center',  marginHorizontal : 10, borderRadius : 80}}>
            <FontAwesome5 name="store-alt" size={32} color={COLORS.naranja} />
        </View>
        <View>
            <StyleTextSubTitle >{tiendaSeleccionada['razSocial'] || ""}</StyleTextSubTitle>
            <StyleText style={styles.labelStyle}>{`${tiendaSeleccionada['categoriaTienda'] || ""}`}</StyleText>
            <View style={styles.rowStyle}>
                <Entypo name="location-pin" size={24} color={COLORS.naranja} />
                <StyleText style={{marginHorizontal : 5}}>{tiendaSeleccionada['direccion'] || ""}</StyleText>
            </View>
        </View>
    </TouchableOpacity>
  )
};
const styles = StyleSheet.create({
    "labelStyle":{
        color : COLORS.naranja,
        fontWeight : 'bold'
    },
    "rowStyle":{
        flexDirection :'row',
        alignItems : 'center'
    },
    "cardStyle":{


        borderWidth : 1, 
        borderColor : COLORS.negro_opaco, paddingHorizontal : 5, 
        borderRadius : 10, paddingVertical : 5, flexDirection : 'row', 
        alignItems:'center', marginVertical : 10
    }
});