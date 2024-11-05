import { View, Text, StyleSheet, Pressable, useWindowDimensions, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { COLORS } from '../../assets/theme/theme'
import { FontAwesome5, MaterialIcons } from '@expo/vector-icons'
import { StyleText, StyleTextSubTitle, StyleTextTitle } from '../TextComponents'
import BasicButton from '../ButtonComponents/BasicButton'

const ViewImg = ({}) => {
    return (
        <View style={styles.cardPlan}></View>
    )
};

const ViewBenefits = ({description}) => {
    return (
        <View style={{flexDirection: 'row', marginTop: 7}}>
            <FontAwesome5 name="check" size={12} color={COLORS.verde_acuarela} />
            <StyleText style={{ fontSize: 12, marginLeft: 20 }}>{description}</StyleText>
        </View>
    )
};

export default function CardSubscription({name="", time="", img="", benefits=[]}) {

    const [showDetail, setShowDetail] = useState(false);

    return (
        <TouchableOpacity style={[styles.mainContainer]} onPress={() => setShowDetail(!showDetail)}>
            <View style={{flexDirection: 'row'}}>
                <ViewImg></ViewImg>
                <View style={styles.title}>
                    <StyleTextTitle style={{ fontWeight: 'bold' }}>{name}</StyleTextTitle>
                    <StyleText>{time}</StyleText>
                </View>
            </View>
            {
                showDetail ? 
                    <View>
                        <StyleText style={{ fontWeight: 'bold', marginTop: 15, marginBottom: 8 }}>Incluye</StyleText>
                        {
                            benefits.map((benefit, key) => (
                                <ViewBenefits key={key} description={benefit.description}></ViewBenefits>
                            ))
                        }
                        <BasicButton style={styles.buttonDetail}>Escoger Plan</BasicButton>
                    </View>                
                : null
            }
        </TouchableOpacity>
    )
};
const styles = StyleSheet.create({
    "mainContainer": {
        borderRadius: 10,
        backgroundColor : COLORS.blanco,
        borderColor : COLORS.blanco,
        borderWidth : 1,
        paddingHorizontal: 22,
        paddingVertical: 26,
        elevation: 7,
        marginBottom: 30
    },
    "cardPlan": {
        height: 50,
        width: 50,
        backgroundColor: COLORS.gray,
        borderRadius: 10
    },
    title: {
        height: 50,
        width: '100%',
        marginLeft: 21,
        justifyContent: 'space-between'
    },
    buttonDetail: {
        height: 35,
        paddingVertical: 8,
        borderRadius: 50,
        marginTop: 33
    }
})