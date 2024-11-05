import { View, Text, Modal, StyleSheet, TouchableOpacity } from 'react-native'
import React from 'react'
import { COLORS } from '../assets/theme/theme'

export default function ModalWarning({visible, changeVisible, deleteData}) {
  return (
    <Modal 
        animationType='slide'
        transparent={true}
        visible={visible}
        onRequestClose={changeVisible}
    >
        <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
                <Text style={{fontSize:20, fontWeight:'bold', color:COLORS.negro, marginVertical : 10}}>Se registro el último ingreso</Text>
                <Text>¿Deseas continuar donde lo dejaste?</Text>
                <View style={styles.modalOptions}>
                    <TouchableOpacity style={styles.modalButton} onPress={changeVisible}>
                        <Text style={{color : COLORS.blanco, fontWeight:'bold'}}>Continuar donde lo deje</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={deleteData}>
                        <Text style={{color :COLORS.negro}}>Empezar de nuevo</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    </Modal>
    )
};
const styles = StyleSheet.create({
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor : 'rgba(51,51,51,.81)',
      },
      modalContent: {
        maxWidth : 250,
        backgroundColor: COLORS.blanco,
        padding: 20,
        borderRadius: 10,
        alignItems: 'center',
        elevation: 5,
      },
      modalOptions :{
        justifyContent:'center',
        alignItems:'center',
        marginVertical:20
      },
      modalButton :{
        backgroundColor : COLORS.naranja,
        borderRadius : 10,
        paddingVertical : 10,
        paddingHorizontal : 15,
        marginBottom:5
      }
})