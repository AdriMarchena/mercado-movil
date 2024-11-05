import { View, Text, StyleSheet, useWindowDimensions, Pressable, TouchableOpacity, Alert } from 'react-native'
import React from 'react'
import { COLORS } from '../../assets/theme/theme'
import { AntDesign } from '@expo/vector-icons';
import Constants from 'expo-constants';
import { StyleText, StyleTextTitle, StyleTextSubTitle } from '../TextComponents';
import { MaterialIcons } from '@expo/vector-icons';
import CardAccountProfile from '../CardComponents/CardAccountProfile';
import CardLogisticsProfile from '../CardComponents/CardLogisticsProfile';
import CardPersonalrofile from '../CardComponents/CardPersonalrofile';
import { ScrollView } from 'react-native-gesture-handler';
import FooterMenu from '../FooterComponents/FooterMenu';

export default function Menu({changeVisible, name, logout}) {
    const {width, height} = useWindowDimensions();
    return (
        <View style={[styles.mainContainer,{width,height}]}>
            <View style={styles.topStyle}>
                <View style={styles.headerContainer}>
                    <View style={{flexDirection: 'row'}}>
                        <Pressable onPress={changeVisible}>
                            <AntDesign name="close" size={24} color={COLORS.blanco} />
                        </Pressable> 
                        <StyleTextSubTitle style={[styles.textHeader, { width: width - 150 }]}>Menú</StyleTextSubTitle>
                    </View>
                    <View style={[styles.contentName, { width: width - 100 }]}>
                        <StyleTextTitle style={[styles.nameHeader]}>{name}</StyleTextTitle>
                        <View style={styles.subContentHeader}>
                            <MaterialIcons name='store' size={14} color={COLORS.blanco} />
                            <StyleText style={{color: COLORS.blanco}}>Bodega</StyleText>
                        </View>
                    </View>
                </View>
            </View>
            <ScrollView style={styles.scrollContainer}>
                <CardAccountProfile></CardAccountProfile>
                <CardLogisticsProfile></CardLogisticsProfile>
                <CardPersonalrofile></CardPersonalrofile>
                <View style={[styles.footerContainer, { width:width-150 }]}>
                    <View style={{flexDirection: "row"}}>
                        <StyleText style={{color: COLORS.negro_opaco}}>Versión de la App:</StyleText>
                        <StyleText> 3.1</StyleText>
                    </View>
                    <View>
                        <StyleText>MERCADO MOVIL</StyleText>
                    </View>
                    <View style={{flexDirection: "row"}}>
                        <StyleText style={{color: COLORS.negro_opaco}}>RUC: </StyleText>
                        <StyleText>XXXXXX</StyleText>
                    </View>
                </View>
                <FooterMenu logout={logout}></FooterMenu>
            </ScrollView>
        </View>
    )
};
const styles = StyleSheet.create({
    "mainContainer":{
        position:'absolute',
        backgroundColor : COLORS.blanco,
        marginTop:Constants.statusBarHeight,
        zIndex: 10,  
    },
    "topStyle":{
        flexDirection: 'row',
        backgroundColor: COLORS.naranja,
        height: 235,
        width: "100%"
    },
    "headerContainer": {
        marginVertical: 20,
        marginHorizontal: 40
    },
    "textHeader": {
        fontWeight: 'bold',
        color: COLORS.blanco,
        top: 1.5,
        left: 5
    },
    "nameHeader": {
        fontWeight: 'bold',
        color: COLORS.blanco
    },
    "contentName": {
        height: 175,
        alignItems: 'center',
        justifyContent: 'center'
    },
    "subContentHeader": {
        flexDirection : 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginVertical: 15
    },
    "scrollContainer": {
        position: 'absolute',
        width: '100%',
        height: '75%',
        zIndex: 1,
        top: 190
    },
    "footerContainer": {
        marginVertical: 80,
        marginHorizontal: 24
    }
})