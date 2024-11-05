import { View, Text, useWindowDimensions } from 'react-native'
import React from 'react'

export default function BottomButton() {
    const {width, height} = useWindowDimensions();
  return (
    <View style={{position:'absolute', bottom:0, left:0, right:0, width, borderTopWidth:1, height:60}}>

    </View>
  )
};