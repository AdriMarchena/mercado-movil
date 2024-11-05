import React, { useEffect, useState } from 'react'
import { Stack, router } from 'expo-router'
import { TouchableOpacity, View, Text } from 'react-native'
import { COLORS } from '../../../../assets/theme/theme'
import { FontAwesome5 } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import Constants from 'expo-constants'
import { useProductGlobalContext } from '../../../../Context/GlobalStateProduct';
import { StyleTextSubTitle } from '../../../../components';
export default function Page() {
  const {numProducts} = useProductGlobalContext();
  return (
      <Stack initialRouteName='home'>
        <Stack.Screen name='home' options={{
          header :()=>{
            return(
              <View style={{marginTop:Constants.statusBarHeight,height:60, backgroundColor:COLORS.blanco, paddingHorizontal:30, flexDirection:'row', alignItems:'center'}}>
                <TouchableOpacity onPress={()=>router.back()}>
                  <AntDesign name="arrowleft" size={24} color={COLORS.negro} />
                </TouchableOpacity>
              </View>
            )
          },
          headerStyle:{
            backgroundColor:COLORS.blanco
          }
        }}/>
        <Stack.Screen name='scan' options={{
          headerShown : false
        }}/>
        <Stack.Screen name='productsInventory' options={{
          header : ()=>{
            return(
              <View style={{position:'relative',backgroundColor:COLORS.blanco, height:60, width:"100%", flexDirection:'row', alignItems:'center', justifyContent:'space-between', marginTop: Constants.statusBarHeight, paddingHorizontal:30, zIndex:10}}>
                <TouchableOpacity style={{flexDirection : 'row'}}  onPress={()=>router.push("home")}>
                  <AntDesign name="arrowleft" size={24} color={COLORS.negro} />
                  <StyleTextSubTitle style={{marginHorizontal : 10}}>Nuevo inventario</StyleTextSubTitle>
                </TouchableOpacity>
                  {
                    numProducts>0? 
                    <TouchableOpacity onPress={()=>router.push('inventory/checkProducts')} style={{position:'relative'}}>
                      <Text style={{position:'absolute',width:20, height:20, backgroundColor:COLORS.naranja, color:COLORS.blanco,borderRadius:30, zIndex:10, top:-10, right:-10, textAlign:'center'}}>{numProducts}</Text>
                      <FontAwesome5 name="shopping-basket" size={24} color={COLORS.negro} />
                    </TouchableOpacity>
                    : null
                  }
              </View>
            )
          },
          headerStyle:{
            backgroundColor:COLORS.blanco
          }
        }}/>
        <Stack.Screen name='warning'  options={{
          headerShown:false
        }} />
        <Stack.Screen name='checkProducts' options={{
          header : ()=>{
            return(
              <View style={{width:"100%", height:60, paddingHorizontal:30, backgroundColor:COLORS.blanco, flexDirection:'row', alignItems:'center', marginTop:Constants.statusBarHeight}}>
                <TouchableOpacity onPress={()=>router.push('inventory/productsInventory')}>
                  <AntDesign name="arrowleft" size={24} color={COLORS.negro} />
                </TouchableOpacity>
              </View>
            )  
          }
        }} />
        <Stack.Screen
          name='confirmProducts'
          options={{
            header : ()=>{
              return (
                <View style={{marginTop : Constants.statusBarHeight, width:"100%",height:60, backgroundColor:COLORS.blanco, flexDirection : 'row', alignItems:'center', paddingHorizontal:30}}>
                  <TouchableOpacity onPress={()=>router.back()}>
                    <AntDesign name="arrowleft" size={24} color={COLORS.negro} />
                  </TouchableOpacity>
                  <StyleTextSubTitle style={{fontWeight : 'bold', marginHorizontal:10}}>Guardar Inventario</StyleTextSubTitle>
                </View>
              )
            }
          }}
        />
        <Stack.Screen
          name='verifyData'
          options={{
            header : ()=>{
              return(
                <View style={{marginTop : Constants.statusBarHeight, width:"100%",height:60, backgroundColor:COLORS.blanco, flexDirection : 'row', alignItems:'center', paddingHorizontal:30}}>
                  <TouchableOpacity onPress={()=>router.push("home")}>
                    <AntDesign name="arrowleft" size={24} color={COLORS.negro} />
                  </TouchableOpacity>
                  <StyleTextSubTitle style={{fontWeight : 'bold', marginHorizontal:10}}>Ingreso de datos</StyleTextSubTitle>
                </View>
              )
            }
          }}
        />
    </Stack>
    )
}