import { Animated, StyleSheet, Text, View, useWindowDimensions } from 'react-native'
import React from 'react'
import { COLORS } from '../../assets/theme/theme';

export default function paginator({data, scrollX, style}) {
    const { width } = useWindowDimensions();
  return (
    <View style={[styles.container, style]}>
        {data.map((_,i)=>{
            const inputRange = [(i - 1)*width, i*width, (i+1)*width];
            
            const dotWidth = scrollX.interpolate({
                inputRange,
                outputRange : [10,20,10],
                extrapolate : 'clamp'
            })

            return <Animated.View style={[styles.dot, {width : dotWidth}]} key={i.toString()} />
        })}
    </View>
  )
}

const styles = StyleSheet.create({
    container : {
        flexDirection : 'row',
        height : 64
    },
    dot : {
        height : 10,
        borderRadius : 5,
        backgroundColor : COLORS.naranja,
        marginHorizontal : 8
    }
});