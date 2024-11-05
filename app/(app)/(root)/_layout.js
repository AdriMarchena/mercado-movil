import React from 'react'
import { Stack, router } from 'expo-router'
export default function Page() {
  return (
    <Stack initialRouteName='(drawer)'>
        
        <Stack.Screen name='(drawer)'
            options={{headerShown:false}}
        />
        <Stack.Screen name='profile' options={{
                headerShown:false}}/>
        <Stack.Screen name='inventory' options={{
            headerShown : false
        }}/>
        <Stack.Screen name='suppliers' options={{
            headerShown : false
        }}/>
        <Stack.Screen name='stores' options={{
            headerShown : false
        }}/>
        <Stack.Screen name='success' options={{
            headerShown : false
        }}/>
        <Stack.Screen name='salesprocess' options={{
            headerShown : false
        }}/>
        <Stack.Screen name='boxprocess' options={{
            headerShown : false
        }}/>
        <Stack.Screen name='clients' options={{
            headerShown : false
        }}/>
        <Stack.Screen
            name='workers'
            options={{
                headerShown : false
            }}
        />
    </Stack>
    )
}
