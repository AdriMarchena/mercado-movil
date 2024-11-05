import { View, Text, Pressable, StyleSheet } from 'react-native'
import React from 'react'
import { Stack, router } from 'expo-router'
import { AntDesign } from '@expo/vector-icons'
import { COLORS } from '../../../../assets/theme/theme'
import Constants from 'expo-constants';
import { StyleTextSubTitle } from '../../../../components'
export default function RootLayout() {
  return (
    <Stack initialRouteName='home'>
        <Stack.Screen 
            name='home'
            options={{
                header : ()=>{
                    return(
                        <View style={{marginTop:Constants.statusBarHeight, width:"100%", height:60, backgroundColor:COLORS.naranja, alignItems:'center', paddingHorizontal:30, flexDirection:'row'}}>
                        <Pressable onPress={()=>router.push("home")}>
                            <AntDesign name="arrowleft" size={24} color={COLORS.blanco} />
                        </Pressable>
                        <StyleTextSubTitle style={styles.textStyle}>Clientes</StyleTextSubTitle>
                    </View>
                    )
                }
            }}
        />
        <Stack.Screen 
        name='addClient' 
        options={{
            header : ()=>(
                <View style={{marginTop:Constants.statusBarHeight, width:"100%", height:60, backgroundColor:COLORS.naranja, alignItems:'center', paddingHorizontal:30, flexDirection:'row'}}>
                    <Pressable onPress={()=>router.push("home")}>
                        <AntDesign name="arrowleft" size={24} color={COLORS.blanco} />
                    </Pressable>
                    
                    <StyleTextSubTitle style={styles.textStyle}>Crear Cliente</StyleTextSubTitle>
                </View>
            )
        }}/>
    </Stack>
    )
};
const styles = StyleSheet.create({
    "textStyle":{
        color : COLORS.blanco,
        marginHorizontal : 5
    }
})