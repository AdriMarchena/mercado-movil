import { View, Text } from 'react-native'
import React from 'react'
import { Stack } from 'expo-router'

export default function RootLayout() {
  return (
    <Stack initialRouteName='home'>
        <Stack.Screen
            name='home'
            options={{
                headerTitle : "Mis trabajadores"
            }}
        />
        <Stack.Screen
            name='addWorker'
            options={{
                headerTitle : "Ingreso de trabajador"
            }}
        />
    </Stack>
)
};