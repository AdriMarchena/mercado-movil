import React from 'react'
import { Slot, Stack } from 'expo-router'

export default function Page() {
  return (
    <Stack initialRouteName='welcome' >
      <Stack.Screen
        options={{
          headerShown:false
        }}
        name='welcome'
      />
      <Stack.Screen
        options={{
          headerShown:false
        }}
        name='login'
      />
      <Stack.Screen
        options={{
          headerShown:false          
        }}
        name='resetPassword'
      />
      <Stack.Screen
        name='signup'
        options={{
          headerShown:false
        }}
      />
    </Stack>
  )
}
