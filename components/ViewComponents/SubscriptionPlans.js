import { View, Text, StyleSheet, useWindowDimensions, ScrollView } from 'react-native';
import React, { useState, useEffect } from 'react';
import { StyleText, StyleTextTitle, StyleTextSubTitle } from '../TextComponents';
import { COLORS } from '../../assets/theme/theme';
import CardSubscription from '../CardComponents/CardSubscription';

const listSubscription = [
    {
        id:'1',
        name: 'Premiun Individual',
        time: 'Suscripción mensual',
        img: '',
        benefits: [
            {
                id: '1',
                description: 'Beneficio 1'
            },
            {
                id: '2',
                description: 'Beneficio 2'
            },
            {
                id: '3',
                description: 'Beneficio 3'
            },
            {
                id: '4',
                description: 'Beneficio 4'
            },
            {
                id: '5',
                description: 'Beneficio 5'
            }
        ]
    },
    {
        id:'2',
        name: 'Básico Individual',
        time: 'Suscripción mensual',
        img: '',
        benefits: [
            {
                id: '1',
                description: 'Beneficio 1'
            },
            {
                id: '2',
                description: 'Beneficio 2'
            },
            {
                id: '3',
                description: 'Beneficio 3'
            },
            {
                id: '4',
                description: 'Beneficio 4'
            }
        ]
    },
    {
        id:'3',
        name: 'Prueba Individual',
        time: 'Suscripción mensual',
        img: '',
        benefits: [
            {
                id: '1',
                description: 'Beneficio 1'
            },
            {
                id: '2',
                description: 'Beneficio 2'
            }
        ]
    }
]

export default function SubscriptionPlans({}) {
   
    return (
        <View style={styles.mainContainer}>
            <ScrollView showsVerticalScrollIndicator={false} style={{height: '85%'}}>
                {
                    listSubscription.map( subs => (
                        <CardSubscription
                            name={subs.name}
                            time={subs.time}
                            img={subs.img}
                            benefits={subs.benefits}
                        >
                        </CardSubscription>
                    ))
                }
            </ScrollView>
            <View style={styles.styleSeparator}></View>
            <View style={{width: '100%', marginVertical: 19}}>
                <View style={{width: 280, alignItems: 'center' }}>
                    <StyleText>
                        Selecciona el plan más conveniente para tí.
                        Puedes cambiarlo en cualquier momento.
                    </StyleText>
                </View>
            </View>
        </View>
    )
};
const styles = StyleSheet.create({
    "mainContainer":{
        paddingHorizontal: 35,
        paddingVertical: 30
    },
    "styleSeparator":{
        width:"100%",
        backgroundColor : COLORS.negro_opaco,
        height: .5,
        marginTop: 18
    }
})