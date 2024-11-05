import { View, Text, Pressable, StyleSheet } from 'react-native'
import React from 'react'
import { Stack, router } from 'expo-router'
import Constants from 'expo-constants';
import { COLORS } from '../../../../assets/theme/theme';
import { AntDesign } from '@expo/vector-icons';
import { StyleTextSubTitle } from '../../../../components';
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
                            
                            <StyleTextSubTitle style={styles.textStyle}>Proveedores</StyleTextSubTitle>
                        </View>
                        )
                }
            }}
        />
        <Stack.Screen name='addSupplier' options={{
            header : ()=>{
               return(
                <View style={{marginTop:Constants.statusBarHeight, width:"100%", height:60, backgroundColor:COLORS.naranja, alignItems:'center', paddingHorizontal:30, flexDirection:'row'}}>
                    <Pressable onPress={()=>router.push("home")}>
                        <AntDesign name="arrowleft" size={24} color={COLORS.blanco} />
                    </Pressable>
                    
                    <StyleTextSubTitle style={styles.textStyle}>Crear Proveedor</StyleTextSubTitle>
                </View>

               )
            }
        }}/>
        <Stack.Screen
            name='[idProveedor]'
            options={{
                header : ()=>{
                    return (
                        <View style={{marginTop:Constants.statusBarHeight, width:"100%", height:60, backgroundColor:COLORS.naranja, alignItems:'center', paddingHorizontal:30, flexDirection:'row'}}>
                            <Pressable onPress={()=>router.push("home")}    >
                                <AntDesign name="arrowleft" size={24} color={COLORS.blanco} />
                            </Pressable>
                            <StyleTextSubTitle style={styles.textStyle}>Proveedor</StyleTextSubTitle>
                        </View>
                    )
                }
            }}
        />
    </Stack>
    )
};

const styles = StyleSheet.create({
    "textStyle":{
        color : COLORS.blanco,
        marginHorizontal : 5
    }
})