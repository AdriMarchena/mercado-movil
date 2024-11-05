import { View, Text, StyleSheet, Pressable } from 'react-native'
import React from 'react'
import { COLORS } from '../../assets/theme/theme'
import { AntDesign } from '@expo/vector-icons';
import { router } from 'expo-router';
import { StyleTextSubTitle, StyleTextTitle } from '../TextComponents';

export default function NavBar({route=null, title}) {
  return (
    <View style={styles.navBarStyle}>
        <Pressable onPress={()=>{
            if (route) {
                router.push(route);
                return;
            }
            router.back();
        }}>
            <AntDesign name="arrowleft" size={20} color={COLORS.negro} />
        </Pressable>
        <StyleTextSubTitle style={{marginLeft : 10}}>{title}</StyleTextSubTitle>
    </View>
  )
};
const styles = StyleSheet.create({
    "navBarStyle":{
        height : 60,
        backgroundColor : COLORS.blanco,
        flexDirection : 'row',
        alignItems : 'center',
        justifyContent : 'flex-start',
        width : "100%"
    }
})