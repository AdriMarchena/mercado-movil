import { View, Text, StyleSheet, useWindowDimensions, TouchableOpacity } from 'react-native';
import React, { useState, useEffect } from 'react';
import { StyleText, StyleTextTitle, StyleTextSubTitle } from '../TextComponents';
import { COLORS } from '../../assets/theme/theme';
import { router, useLocalSearchParams } from 'expo-router'

const ViewImg = ({}) => {
    return (
        <View style={styles.cardPlan}></View>
    )
};

export default function Subscription({planSelected='Plan Premiun'}) {
    
    const goSubscriptionPlans = () => {
        router.push({
            pathname: "subscriptionplans"
        })
    }

    return (
        <View style={styles.mainContainer}>
            <StyleText style={{ fontWeight: 'bold' }}>Plan actual</StyleText>
            <View style={styles.headerContainer}>
                <ViewImg></ViewImg>
                <View style={styles.title}>
                    <StyleTextTitle style={{ fontWeight: 'bold' }}>{planSelected}</StyleTextTitle>
                    <StyleText>Suscripción mensual</StyleText>
                </View>
            </View>
            <TouchableOpacity onPress={goSubscriptionPlans}>
                <StyleText style={{ fontWeight: 'bold', textDecorationLine: 'underline' }}>Ver Planes disponibles</StyleText>
            </TouchableOpacity>
            <StyleText style={{ marginVertical: 18 }}>Premiun, Basico,  Prueba</StyleText>
            <View style={styles.styleSeparator}></View>
            <View style={{width: '80%', marginVertical: 23}}>
                <StyleText style={{textAlign: 'justify' }}>
                    Puedes cancelar tu suscripción en cualquier momento. Para más información has{' '} 
                    <StyleText style={{textDecorationLine: 'underline'}}>
                        click aquí
                    </StyleText>
                </StyleText>
            </View>
        </View>
    )
};
const styles = StyleSheet.create({
    "mainContainer":{
        paddingHorizontal: 35,
        paddingVertical: 25
    },
    "cardPlan": {
        height: 50,
        width: 50,
        backgroundColor: COLORS.gray,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: COLORS.negro
    },
    headerContainer: {
        flexDirection: 'row',
        marginTop: 28,
        marginBottom: 40
    },
    title: {
        height: 50,
        width: '100%',
        marginLeft: 21,
        justifyContent: 'space-between'
    },
    "styleSeparator":{
        width:"100%",
        backgroundColor : COLORS.negro_opaco,
        height: .5
    }
})