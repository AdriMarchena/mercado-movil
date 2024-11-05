import { View, Text, StyleSheet, useWindowDimensions, ActivityIndicator } from 'react-native'
import React, { useState, useEffect } from 'react'
import OverlayModal from './OverlayModal'
import { StyleText, StyleTextTitle } from '../TextComponents'
import BasicButton from '../ButtonComponents/BasicButton'
import { COLORS } from '../../assets/theme/theme'

export default function OverlaySquareBox({ loading,saveSquareBox, total, arching }) {
    const {width, height} = useWindowDimensions();
    const [missing, setMissing] = useState(0);
    const [surplus, setSurplus] = useState(0);

    useEffect(() => {
        getResult();
    }, []); 

    const getResult = () => {
        setMissing(0);
        setSurplus(0);
        if (total > arching) {
            setMissing(total - arching);
        } else {
            setSurplus(arching - total);
        };
    };

    const handleSubmit=()=>{
        saveSquareBox(missing, surplus);
    }
    
  return (
    <OverlayModal close={false} style={styles.mainContainer}>
        <StyleTextTitle>Cierre de Caja</StyleTextTitle>
          
            <View style={styles.rowBody}>
                <StyleText style={{width: width-230, left: 10}}>Faltante:</StyleText>
                <StyleText style={{ color: COLORS.red}}>S/. {missing.toFixed(2)}</StyleText>
            </View>
          
            <View style={styles.rowBody}>
                <StyleText style={{width: width-230, left: 10}}>Sobrante:</StyleText>
                <StyleText style={{ color: COLORS.verde_acuarela}}>S/. {surplus.toFixed(2)}</StyleText>
            </View>
          
        <BasicButton handleSubmit={handleSubmit}>{loading ? <ActivityIndicator/> : "Cerrar Caja"}</BasicButton>
    </OverlayModal>
    )

}
const styles = StyleSheet.create({
    "mainContainer":{
        paddingHorizontal : 10,
        paddingVertical : 10
    },
    "rowBody": {
        flexDirection: 'row',
        alignItems: "center",
        padding: 10
    }
})