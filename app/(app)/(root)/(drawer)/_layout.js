import { View, Text, TouchableOpacity, Pressable } from 'react-native'
import React from 'react'
import { Stack, Tabs, router } from 'expo-router'
import { AntDesign, FontAwesome5 } from '@expo/vector-icons'
import { COLORS } from '../../../../assets/theme/theme'
import Constants from 'expo-constants';
import { GestureHandlerRootView } from 'react-native-gesture-handler'
export default function RootLayout() {
  return (
    <GestureHandlerRootView style={{flex:1}}>
            <Stack screenOptions={{
                
            }}>
                <Stack.Screen name='home' 
                    options={{
                        headerShown : false
                    }}
                />
                <Stack.Screen name='inventorytab' 
                    options={{
                        header : ()=>{
                            return(
                                <View style={{marginTop:Constants.statusBarHeight, width:"100%", height:60, backgroundColor:COLORS.blanco, alignItems:'center', paddingHorizontal:30, flexDirection:'row'}}>
                                <Pressable onPress={()=>router.back()}>
                                    <AntDesign name="arrowleft" size={24} color={COLORS.negro} />
                                </Pressable>
                                <Text style={{color:COLORS.negro, fontWeight:'bold', marginHorizontal:10}}>Mi inventario</Text>
                                </View>
                            )
                          }
                    }}
                />
                <Stack.Screen name='sales'
                    options={{
                            header : ()=>{
                                return(
                                    <View style={{marginTop:Constants.statusBarHeight, width:"100%", height:60, backgroundColor:COLORS.naranja, alignItems:'center', paddingHorizontal:30, flexDirection:'row'}}>
                                    <Pressable onPress={()=>router.back()}>
                                        <AntDesign name="arrowleft" size={24} color={COLORS.blanco} />
                                    </Pressable>
                                    <Text style={{color:COLORS.blanco, fontWeight:'bold', marginHorizontal:10}}>Ventas</Text>
                                    </View>
                                )
                            }
                        }}
                />
                <Stack.Screen name='inventoryprocess'
                    options={{
                            header : ()=>{
                                return(
                                    <View style={{marginTop:Constants.statusBarHeight, width:"100%", height:60, backgroundColor:COLORS.naranja, alignItems:'center', paddingHorizontal:30, flexDirection:'row'}}>
                                    <Pressable onPress={()=>router.back()}>
                                        <AntDesign name="arrowleft" size={24} color={COLORS.blanco} />
                                    </Pressable>
                                    <Text style={{color:COLORS.blanco, fontWeight:'bold', marginHorizontal:10}}>Mi inventario</Text>
                                    </View>
                                )
                            }
                        }}
                />
                <Stack.Screen name='subscription'
                    options={{
                            header : ()=>{
                                return(
                                    <View style={{marginTop:Constants.statusBarHeight, width:"100%", height:60, backgroundColor:COLORS.naranja, alignItems:'center', paddingHorizontal:30, flexDirection:'row'}}>
                                    <Pressable onPress={()=>router.back()}>
                                        <AntDesign name="arrowleft" size={24} color={COLORS.blanco} />
                                    </Pressable>
                                    <Text style={{color:COLORS.blanco, fontWeight:'bold', marginHorizontal:10}}>Suscripción</Text>
                                    </View>
                                )
                            }
                        }}
                />
                <Stack.Screen name='subscriptionplans'
                    options={{
                            header : ()=>{
                                return(
                                    <View style={{marginTop:Constants.statusBarHeight, width:"100%", height:60, backgroundColor:COLORS.naranja, alignItems:'center', paddingHorizontal:30, flexDirection:'row'}}>
                                    <Pressable onPress={()=>router.back()}>
                                        <AntDesign name="arrowleft" size={24} color={COLORS.blanco} />
                                    </Pressable>
                                    <Text style={{color:COLORS.blanco, fontWeight:'bold', marginHorizontal:10}}>Planes disponibles</Text>
                                    </View>
                                )
                            }
                        }}
                />
                <Stack.Screen name='profilemenu'
                    options={{
                            header : ()=>{
                                return(
                                    <View style={{marginTop:Constants.statusBarHeight, width:"100%", height:60, backgroundColor:COLORS.naranja, alignItems:'center', paddingHorizontal:30, flexDirection:'row'}}>
                                    <Pressable onPress={()=>router.back()}>
                                        <AntDesign name="arrowleft" size={24} color={COLORS.blanco} />
                                    </Pressable>
                                    <Text style={{color:COLORS.blanco, fontWeight:'bold', marginHorizontal:10}}>Perfil</Text>
                                    </View>
                                )
                            }
                        }}
                />
    </Stack>
    </GestureHandlerRootView>
  )
}