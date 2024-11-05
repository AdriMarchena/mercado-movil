import { View, Text, Modal, StyleSheet } from 'react-native'
import React from 'react'
import OverlayModal from './OverlayModal'
import { StyleText, StyleTextTitle } from '../TextComponents'
import BasicButton from '../ButtonComponents/BasicButton'

export default function WarningModal({title, description, buttonText,handleSubmit, close=false}) {
  return (
    <Modal
        animationType='slide'
        transparent>
        <OverlayModal style={styles.styleWarning} close={close}>
            <StyleTextTitle style={{marginVertical : 10}}>{title}</StyleTextTitle>
            <StyleText style={{marginVertical: 7}}>{description}</StyleText>
            <BasicButton handleSubmit={handleSubmit}>{buttonText}</BasicButton>
        </OverlayModal>
    </Modal>
    )
};
const styles = StyleSheet.create({
    "styleWarning":{
        padding : 10
    }
})