import { View, Text, StyleSheet, useWindowDimensions, TouchableOpacity } from 'react-native';
import React, { useState, useEffect } from 'react';
import { useAdminGlobalContext } from '../../Context/GlobalStateAdmin';
import { StyleText, StyleTextTitle, StyleTextSubTitle } from '../TextComponents';
import { COLORS } from '../../assets/theme/theme';

export default function ProfileMenu({ }) {
    
    const { dataAdmin, loadingDataAdmin } = useAdminGlobalContext();
    
    const name = dataAdmin ? (dataAdmin['nameAdmin'] ? dataAdmin['nameAdmin'] : '') : '';
    const phone = dataAdmin ? (dataAdmin['phoneAdmin'] ? dataAdmin['phoneAdmin'] : '+51 934 147 116') : '';
    const email = dataAdmin ? (dataAdmin['emailAdmin'] ? dataAdmin['emailAdmin'] : 'alvaro_12_12@gmail.com') : '';
    const document = dataAdmin ? (dataAdmin['documentAdmin'] ? dataAdmin['documentAdmin'] : '71785274') : '';

    const convertPhone = (number) => {
        const firstThree = number.slice(0, 4);
        const lastTwo = number.slice(-2);

        const maskedSection = number
            .slice(4, -2)
            .split('')
            .map((char) => (char === ' ' ? ' ' : '*'))
            .join('');

        const maskedPhoneNumber = `${firstThree}${maskedSection}${lastTwo}`;
        return maskedPhoneNumber;
    }

    const convertEmail = (mail) => {
        const [localPart, domain] = mail.split('@');
        const maskedLocalPart = localPart.substring(0, 2) + '*'.repeat(localPart.length - 2);
        return `${maskedLocalPart}@${domain}`;
    }

    return (
        <View style={styles.mainContainer}>
            <StyleText style={styles.titleField}>Nombre</StyleText>
            <StyleText style={styles.textField}>{name}</StyleText>
            <View style={styles.styleSeparator}></View>
            
            <StyleText style={styles.titleField}>Celular</StyleText>
            <StyleText style={styles.textField}>{convertPhone(phone)}</StyleText>
            <View style={styles.styleSeparator}></View>

            <StyleText style={styles.titleField}>Correo electrónico</StyleText>
            <StyleText style={styles.textField}>{convertEmail(email)}</StyleText>
            <View style={styles.styleSeparator}></View>

            <StyleText style={styles.titleField}>Documento</StyleText>
            <StyleText style={styles.textField}>{document}</StyleText>
            <View style={styles.styleSeparator}></View>
            
        </View>
    )
};
const styles = StyleSheet.create({
    "mainContainer":{
        paddingHorizontal: 35,
        paddingVertical: 25
    },
    "titleField": {
        fontWeight: 'bold',
        fontSize: 16,
        marginLeft: 12
    },
    "textField": {
        fontSize: 16,
        marginTop: 12,
        marginLeft: 17
    },
    "styleSeparator":{
        width:"100%",
        backgroundColor : COLORS.negro_opaco,
        height: .5,
        marginTop: 8,
        marginBottom: 18
    }
})