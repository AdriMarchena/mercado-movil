import { View, Text, Pressable } from 'react-native'
import React from 'react'
import { Stack, router } from 'expo-router'
import Constants from 'expo-constants';
import { COLORS } from '../../../../assets/theme/theme';
import { AntDesign } from '@expo/vector-icons';

export default function RootLayout() {
  return (
    <Stack initialRouteName='addStore'>
        <Stack.Screen name='addStore' options={{
            header : ()=>{
                return (
                    <View style={{marginTop:Constants.statusBarHeight, width:"100%", height:60, backgroundColor:COLORS.blanco, alignItems:'center', paddingHorizontal:30, flexDirection:'row'}}>
                        <Pressable onPress={()=>router.back()}>
                            <AntDesign name="arrowleft" size={24} color={COLORS.negro} />
                        </Pressable>
                        <Text style={{color:COLORS.negro, fontWeight:'bold', marginHorizontal:10}}>Crear Tienda</Text>

                    </View>
                )
            }
        }}
        
        />
    </Stack>
  )
}