import { View, Text, StyleSheet, Pressable, useWindowDimensions, TouchableOpacity } from 'react-native'
import React, { useState, useEffect } from 'react'
import { COLORS } from '../../assets/theme/theme'
import { FontAwesome5, MaterialIcons } from '@expo/vector-icons'
import { StyleText, StyleTextSubTitle } from '../TextComponents'
import ListSales from '../ListSalesComponents/ListSales'
import BasicButton from '../ButtonComponents/BasicButton'

const Card = ({ id, title, onSelect, isSelected }) => (
    <TouchableOpacity
        style={[styles.cardOption, isSelected ? styles.cardOptionSelected : null]}
        onPress={() => onSelect(id)}
    >
        <Text style={[styles.textOption, isSelected ? styles.textOptionSelected : null]}>
            {title}
        </Text>
    </TouchableOpacity>
);

export default function FilterSales({goFilter}) {
    const {width, height} = useWindowDimensions();

    const [selectedCard, setSelectedCard] = useState('cantidad');

    // Datos de las tarjetas
    const cardsData = [
        { id: 'cantidad', title: 'Cantidad' },
        { id: 'montoTotal', title: 'Monto Total' },
        { id: 'ventas', title: 'Ventas' },
    ];

    // Maneja la selección de tarjetas
    const handleSelectCard = (id) => {
        setSelectedCard(id);
        goFilter(id);
    };

    useEffect(() => {
        goFilter('cantidad');
    }, []);

    return (
        <View style={{paddingVertical: 15}}>
            <View style={[styles.rowBody, { width:width-150 }]}>
                <StyleText style={styles.rowBodyFirstElement}>Ordenar por</StyleText>
            </View>
            <View style={[styles.rowBody, { width:width-150 }]}>
                {cardsData.map(card => (
                    <Card
                        key={card.id}
                        id={card.id}
                        title={card.title}
                        onSelect={handleSelectCard}
                        isSelected={selectedCard === card.id}
                    />
                ))}
            </View>
            <View style={styles.styleSeparator}></View>
        </View>
    )
};
const styles = StyleSheet.create({
    "rowBody":{
        flexDirection: 'row',
        marginVertical: 3
    },
    "rowBodyFirstElement": {
        fontWeight: 'bold'
    },
    "styleSeparator":{
        width:"100%",
        backgroundColor : COLORS.negro_opaco,
        height: .5,
        marginTop: 10,
        marginBottom: 10
    },
    "cardOption": {
        backgroundColor: COLORS.blanco,
        paddingVertical: 6,
        paddingHorizontal: 12,
        marginRight: 10
    },
    "cardOptionSelected": {
        backgroundColor: COLORS.naranja,
        paddingVertical: 6,
        paddingHorizontal: 12,
        borderRadius: 5,
        borderColor: COLORS.negro,
        borderWidth: 1,
    },
    "textOption": {
        color: COLORS.negro
    },
    "textOptionSelected": {
        color: COLORS.blanco,
        fontWeight: 'bold'
    }
})