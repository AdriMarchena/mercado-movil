import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import { Stack, router } from 'expo-router'
import { AntDesign, FontAwesome5 } from '@expo/vector-icons'
import { COLORS } from '../../../../assets/theme/theme'
import Constants from 'expo-constants';
import { StyleText, StyleTextSubTitle } from '../../../../components'
export default function Page() {
  return (
   <Stack initialRouteName='registerData'>
    <Stack.Screen name='registerData'
        options={{
            headerShown:false
        }}
    />
    <Stack.Screen name='verification'
        options={{

            header :()=>{
                return(
                    <View style={{marginTop : Constants.statusBarHeight, width:"100%",height:60, backgroundColor:COLORS.blanco, flexDirection : 'row', alignItems:'center', paddingHorizontal:30}}>
                        <TouchableOpacity onPress={()=>router.push("auth/signup/registerData")}>
                            <AntDesign name="arrowleft" size={24} color={COLORS.negro} />
                        </TouchableOpacity>
                        <StyleTextSubTitle style={{fontWeight : 'bold', marginHorizontal:10}}>Validación de correo </StyleTextSubTitle>

                    </View>
                )
            },
            headerStyle:{
                backgroundColor:COLORS.blanco
            }
        }}
    />
    <Stack.Screen
        name='configPassword'
        options={{
            header : ()=>{
                return(
                    <View style={{marginTop : Constants.statusBarHeight, width:"100%",height:60, backgroundColor:COLORS.blanco, flexDirection : 'row', alignItems:'center', paddingHorizontal:30}}>
                        <TouchableOpacity onPress={()=>router.push("auth/signup/registerData")}>
                            <AntDesign name="arrowleft" size={24} color={COLORS.negro} />
                        </TouchableOpacity>
                        <StyleTextSubTitle style={{fontWeight : 'bold', marginHorizontal:10}}>Registro </StyleTextSubTitle>
                    </View>
                )
            },
            headerStyle:{
                backgroundColor:COLORS.blanco
            }
        }}
    />
    <Stack.Screen
        name='categories'
        options={{
            header :()=>{
                return(
                    <View style={{marginTop : Constants.statusBarHeight, width:"100%",height:60, backgroundColor:COLORS.blanco, flexDirection : 'row', alignItems:'center', paddingHorizontal:30}}>
                        <TouchableOpacity onPress={()=>router.push("auth/signup/registerData")}>
                            <AntDesign name="arrowleft" size={24} color={COLORS.negro} />
                        </TouchableOpacity>
                        <StyleTextSubTitle style={{fontWeight : 'bold', marginHorizontal:10}}>Categoria de usuario </StyleTextSubTitle>
                    </View>
                )
            }
            ,
            headerStyle:{
                backgroundColor:COLORS.blanco
            }
        }}

    />
    <Stack.Screen
        name='registerFirstStore'
        options={{
            header : ()=>{
                return(
                    <View style={{marginTop : Constants.statusBarHeight, width:"100%",height:60, backgroundColor:COLORS.blanco, flexDirection : 'row', alignItems:'center', paddingHorizontal:30}}>
                        <StyleTextSubTitle style={{fontWeight : 'bold', marginHorizontal:10}}>Registra el primer local</StyleTextSubTitle>
                    </View>
                )
            },
            headerStyle:{
                backgroundColor:COLORS.blanco
            }
        }}
    />
   </Stack>
  )
}