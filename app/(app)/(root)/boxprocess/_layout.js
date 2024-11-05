import React from 'react'
import { Stack } from 'expo-router'

export default function RootLayout() {
  return (
    <Stack initialRouteName='home'>
      <Stack.Screen name='home' options={{
        headerShown : false
        }} />


      <Stack.Screen name='tiendaCaja' options={{
        headerShown : false
      }}/>
      <Stack.Screen name='cierreCaja' options={{
        headerShown : false
      }} />
      <Stack.Screen name='validateAdmin' options={{
        headerShown : false
      }} />
    </Stack>
    
  )
};