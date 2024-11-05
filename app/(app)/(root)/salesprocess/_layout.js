import { View, Text, Pressable, TouchableOpacity } from 'react-native'
import React from 'react'
import { Stack, router } from 'expo-router'
import Constants from 'expo-constants'
import { COLORS } from '../../../../assets/theme/theme'
import { AntDesign } from '@expo/vector-icons'
import { StyleTextSubTitle } from '../../../../components'
export default function RootLayout() {
  return (
    <Stack initialRouteName='index'>
        <Stack.Screen
            name='index'
            options={{
                header : ()=>{
                    return (
                      <View style={{marginTop : Constants.statusBarHeight, width:"100%",height:60, backgroundColor:COLORS.blanco, flexDirection : 'row', alignItems:'center', paddingHorizontal:30}}>
                        <TouchableOpacity onPress={()=>router.push("home")}>
                          <AntDesign name="arrowleft" size={24} color={COLORS.negro} />
                        </TouchableOpacity>
                        <StyleTextSubTitle style={{fontWeight : 'bold', marginHorizontal:10}}>Venta</StyleTextSubTitle>
                      </View>
                    )
                  }
            }}
        />
        <Stack.Screen
            name='detail'
            options={{
                header : ()=>(
                    <View style={{marginTop:Constants.statusBarHeight, width:"100%",height:60, backgroundColor:COLORS.blanco, alignItems:'center', flexDirection:'row',paddingHorizontal:30}}>
                        <Pressable onPress={()=>router.back()}>
                            <AntDesign name="arrowleft" size={24} color={COLORS.negro} />
                        </Pressable>
                        <StyleTextSubTitle style={{marginHorizontal:10}}>Detalle de la Venta</StyleTextSubTitle>
                    </View>
                )
            }}
        />
        <Stack.Screen
            name='selectstore'
            options={{
                headerShown : false
            }}
        />
        <Stack.Screen
            name='paymode'
            options={{
                headerShown : false
            }}
        />

        <Stack.Screen
            name='successale'
            options={{
                headerShown : false
            }}
        />
    </Stack>
  )
};