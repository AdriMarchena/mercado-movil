import { View, Text, StyleSheet, Image } from 'react-native'
import React from 'react'
import { COLORS } from '../../assets/theme/theme'
import { StyleText, StyleTextSubTitle } from '../TextComponents'
import { AntDesign } from '@expo/vector-icons';
import BasicButton from '../ButtonComponents/BasicButton';

export default function SupplierComponent({data, dataProductsStored}) {
    const {url, razonSocial, telefono1, documento} = data
    console.log(dataProductsStored);
    return (
    <View style={styles.viewSupplierStyle}>
        <View style={styles.topCardSupplierComponent}>
        <Image
            source={{
                uri : url
            }}
            width={100}
            height={100}
            borderRadius={100}
        />
            <StyleTextSubTitle>
                {razonSocial}
            </StyleTextSubTitle>
            <View style={styles.styleHorizontalCard} >
                <View style={styles.optionCard}>
                    <AntDesign name="phone" size={24} color={COLORS.naranja} />
                    <StyleText style={{marginHorizontal : 10}}>
                        {telefono1}
                    </StyleText>
                </View>
                <View style={[styles.optionCard, {borderLeftWidth : 1, borderLeftColor : COLORS.negro_opaco}]}>
                    <AntDesign name="idcard" size={24} color={COLORS.naranja} />
                    <StyleText style={{marginHorizontal : 10}}>
                    {documento}
                    </StyleText>
                </View>
            </View>
        </View>
        <View style={{width : "100%", height : 60, justifyContent:'center', alignItems:'center', marginVertical : 10}}>    
            <View style={{width : 150}}>
            <BasicButton>Editar</BasicButton>
            </View>
        </View>
        {
            dataProductsStored && dataProductsStored.length > 0 &&             <View>
                <StyleTextSubTitle>Productos</StyleTextSubTitle>
            </View>

        }
        <View>
            {
                dataProductsStored && dataProductsStored.length > 0 ? <View>

                </View> : 
                <View>
                    <StyleTextSubTitle>Aún no se ha registrado un Producto</StyleTextSubTitle>
                </View>
            }
        </View>
    </View>
  )
};
const styles = StyleSheet.create({
    "viewSupplierStyle":{
        flex : 1,
        backgroundColor: COLORS.blanco,
        paddingVertical : 10,
        paddingHorizontal : 15
    },
    "topCardSupplierComponent":{
        width:"100%", 
        height : 150, 
        justifyContent:'center', 
        alignItems:'center',
        marginTop : 20
    },
    "styleHorizontalCard":{
        flexDirection : 'row',
        alignItems:'center',
        paddingVertical:5,
        minHeight : 60
    },
    "optionCard":{
        flexDirection : 'row',
        alignItems:'center',
        padding : 5
    }
})