import { View, Text, StyleSheet, useWindowDimensions, Pressable, Modal } from 'react-native'
import React from 'react'
import { COLORS } from '../../assets/theme/theme'
import { AntDesign } from '@expo/vector-icons';

export default function OverlayComponent({visible,style, styleComponent,changeVisible,children, close=true}) {
    const {width, height} = useWindowDimensions();
    return (
    <Modal
        animationType='slide'
        transparent={true}
    >
        <View style={[styles.mainContainer,styleComponent]}>
        <View style={[styles.insideContainer]}>
            <View style={[styles.topBar]}>
                <View></View>
                {
                    close ? 
                    <Pressable onPress={changeVisible}>
                    <AntDesign name='close' size={24} color={COLORS.negro} />
                    </Pressable> : null
                }
            </View>
            <View style={[style]}>
                {children}
            </View>
        </View>
        </View>
    </Modal>
  )
}

const styles = StyleSheet.create({
    "mainContainer":{
        flex : 1,
        backgroundColor : 'rgba(51,51,51,.81)',
        paddingTop : 200,
        top : 0,
        right : 0,
        left : 0,
        zIndex : 40
    },
    "insideContainer":{
        position : 'relative',
        backgroundColor : COLORS.blanco,
        borderRadius : 15,
        paddingHorizontal : 30,
        paddingVertical : 10,
        top : 100,
        flex : 1
    },
    "topBar":{
        width : "100%",
        justifyContent : 'space-between',
        flexDirection : 'row',
        paddingVertical : 10
    }
})