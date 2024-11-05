import { View, Text, StyleSheet, Pressable, useWindowDimensions, Modal } from 'react-native'
import React from 'react'
import { COLORS } from '../../assets/theme/theme'
import { AntDesign } from '@expo/vector-icons'

export default function OverlayModal({style,changeVisible,children, close=true, styleMainContainer, visible =true}) {
    const {width, height} = useWindowDimensions();
    return (
        <Modal
            animationType='slide'  
            transparent
            visible={visible}
        >
            <View style={[styles.mainContainer,{width,height}, styleMainContainer]}>
                <View style={styles.containerChildren}>
                    {
                        close ? 
                        <View style={styles.topBar}>
                            <View></View>
                            <Pressable onPress={changeVisible}>
                                <AntDesign name='close' size={24} color={COLORS.negro} />
                            </Pressable>
                        </View> :
                        null
                    }
                    <View style={[style]}>
                        {children}
                    </View>
                </View>
            </View>

        </Modal>
  )
};
const styles = StyleSheet.create({
    "mainContainer":{
        backgroundColor : 'rgba(51,51,51,.81)',
        position : 'absolute',
        top : 0,
        right : 0,
        left : 0,
        zIndex : 40,
        justifyContent :'center',
        alignItems : 'center',
    },
    "containerChildren":{
        padding : 8,
        borderRadius : 10,
        backgroundColor : COLORS.blanco,
        maxWidth : 280
    },
    "topBar":{
        width : "100%",
        justifyContent:'space-between',
        flexDirection:'row',
        paddingVertical : 10
    }
})