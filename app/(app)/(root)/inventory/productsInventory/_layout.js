import React from 'react'
import { Slot, Stack } from 'expo-router'

export default function RootLayout() {
  return (
    <Stack initialRouteName='addProduct'>
        <Stack.Screen name='addProduct' options={{
            headerShown:false
        }} />
    </Stack>
    )
}