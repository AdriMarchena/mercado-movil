import { View, Text } from 'react-native'
import React from 'react'
import { useLocalSearchParams } from 'expo-router'

export default function Page() {
    const {fechaCajaCerrada} = useLocalSearchParams();
    console.log(fechaCajaCerrada);
  return (
    <View>
      <Text>Page</Text>
    </View>
  )
}