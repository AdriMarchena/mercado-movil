import { View, Text, Pressable, TouchableOpacity } from 'react-native'
import React from 'react'
import { Stack, router } from 'expo-router'
import Constants from 'expo-constants';
import { COLORS } from '../../../../assets/theme/theme';
import { AntDesign, Ionicons } from '@expo/vector-icons';
export default function RootLayout() {
  return (
    <Stack initialRouteName='settings'>
        <Stack.Screen
            name='home'
            options={{
                header : ()=>{
                    return ( 
                        <View style={{marginTop:Constants.statusBarHeight, width:"100%", height:60, backgroundColor:COLORS.blanco, flexDirection:'row', alignItems:'center', justifyContent:'space-between', paddingHorizontal:30}}>
                            <Text>Hola</Text>
                        </View>
                    )
                }
            }}
        />
        <Stack.Screen
            name='settings'
            options={{
                header :()=>{
                    return (
                        <View style={{marginTop:Constants.statusBarHeight, width:"100%", height:60, backgroundColor:COLORS.blanco, flexDirection:'row', alignItems:'center', justifyContent:'space-between', paddingHorizontal:30}}>
                            <Pressable onPress={()=>router.back()}>
                                <AntDesign name="arrowleft" size={24} color={COLORS.negro} />
                            </Pressable>
                            <TouchableOpacity onPress={()=>router.push("profile/edit")}>
                                <Ionicons name="pencil" size={20} color={COLORS.negro} />
                            </TouchableOpacity>
                        </View>
                    )
                }
            }}
        />
        <Stack.Screen
            name='edit'
            options={{
                header :()=>{
                    return(
                        <View style={{marginTop:Constants.statusBarHeight, width:"100%", height:60, flexDirection:'row',alignItems:'center', paddingHorizontal:30}}>
                            <Pressable onPress={()=>router.push("profile/settings")}>
                                <AntDesign name="arrowleft" size={24} color={COLORS.negro} />
                            </Pressable>
                        </View>
                    )
                }
            }}
        />
    </Stack>
  )
};