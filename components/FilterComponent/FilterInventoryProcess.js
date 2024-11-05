import { View, Text, StyleSheet, Pressable, useWindowDimensions, TouchableOpacity } from 'react-native'
import React, { useState, useEffect } from 'react'
import { COLORS } from '../../assets/theme/theme'
import { FontAwesome5, MaterialIcons } from '@expo/vector-icons'
import { StyleText, StyleTextSubTitle } from '../TextComponents'
import ListSales from '../ListSalesComponents/ListSales'
import BasicButton from '../ButtonComponents/BasicButton'
import CardDisplayOverlay from '../ButtonComponents/CardDisplayOverlay'
import { useBoxGlobalContext } from '../../Context/GlobalStateBox'
import OverlayFilterInventoryProcess from '../OverlayComponents/OverlayFilterInventoryProcess'

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

export default function FilterInventoryProcess({showStore, showProvider, nameSelectedStore, nameSelectedProvider}) {
    const { width, height } = useWindowDimensions();

    const [selectedCard, setSelectedCard] = useState('cantidad');
    const [showDetail, setShowDetail] = useState(false);


    // Datos de las tarjetas
    const cardsData = [
        { id: 'cantidad', title: 'Cantidad' },
        { id: 'montoTotal', title: 'Monto Total' },
        { id: 'ventas', title: 'Ventas' },
    ];

    // Maneja la selección de tarjetas
    const handleSelectCard = (id) => {
        setSelectedCard(id);
        //goFilter(id);
    };

    const handleShowStore = () => {
        showStore(true)
    }

    const handleShowProvider = () => {
        showProvider(true)
    }

    useEffect(() => {
        //goFilter('cantidad');
    }, []);

    return (
        <View style={{ paddingVertical: 15 }}>
            
            <View style={[styles.container]}>
                <TouchableOpacity style={styles.rowBody} onPress={() => setShowDetail(!showDetail)}>
                    <StyleTextSubTitle style={styles.rowBodyFirstElement}>Filtrar por</StyleTextSubTitle>
                    {
                        !showDetail ?
                            <FontAwesome5 name="caret-down" size={35} color={COLORS.naranja} marginTop={-10} /> :
                            <FontAwesome5 name="caret-up" size={35} color={COLORS.naranja} marginTop={-10} />
                    }
                </TouchableOpacity>
                {
                    showDetail ?
                        <View>
                            <StyleText style={[styles.rowBodyFirstElement, {marginBottom: 6}]}>Local</StyleText>
                            <TouchableOpacity
                                style={[styles.container, { flexDirection: 'row', marginBottom: 15 }]} 
                                onPress={handleShowStore}>
                                    <FontAwesome5 name="store" size={15} color={COLORS.naranja} top={1} />
                                    <StyleText style={[styles.rowBodyFirstElement, { fontSize: 16, left: 15 }]}>{nameSelectedStore}</StyleText>
                            </TouchableOpacity>
                            <StyleText style={[styles.rowBodyFirstElement, {marginBottom: 6}]}>Proveedor</StyleText>
                            <TouchableOpacity
                                style={[styles.container, { flexDirection: 'row', marginBottom: 10 }]}
                                onPress={handleShowProvider}>
                                    <FontAwesome5 name="user" size={15} color={COLORS.naranja} top={1} />
                                <StyleText style={[styles.rowBodyFirstElement, { fontSize: 16, left: 15 }]}>{nameSelectedProvider}</StyleText>
                            </TouchableOpacity>
                        </View> :
                        null
                }
            </View>
                
        </View>
    )
};
const styles = StyleSheet.create({
    "container": {
        borderWidth: 1,
        borderColor: COLORS.negro,
        borderRadius: 10,
        paddingHorizontal: 14,
        paddingVertical: 10
    },
    "rowBody": {
        flexDirection: 'row',
        marginVertical: 3,
        justifyContent: 'space-between',
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