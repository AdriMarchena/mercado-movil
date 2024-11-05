import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import OverlayModal from './OverlayModal'
import { StyleText, StyleTextTitle } from '../TextComponents'
import BasicButton from '../ButtonComponents/BasicButton'

export default function OverlayWarningBoxEmpty({showAperturaComp, visible}) {
  return (
    <OverlayModal visible={visible} close={false} style={styles.mainContainer}>
        <StyleTextTitle>Caja no abierta</StyleTextTitle>
        <StyleText style={styles.textAdvice}>Aún no has aperturado caja en este local. Apertura caja para poder continuar</StyleText>
        <BasicButton handleSubmit={showAperturaComp}>Aperturar Caja</BasicButton>
    </OverlayModal>
    )

}
const styles = StyleSheet.create({
    "textAdvice":{
        marginVertical : 10
    },
    "mainContainer":{
        paddingHorizontal : 10,
        paddingVertical : 10
    }
})