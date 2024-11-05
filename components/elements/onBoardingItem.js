import { View, Text, StyleSheet, Image, useWindowDimensions } from 'react-native'
import React from 'react'
import { COLORS } from '../../assets/theme/theme';

export default function onBoardingItem({item}) {
    const { width } = useWindowDimensions();
  return (
    <View key={item.id} style={[styles.container, {width}]}>
        <Image source={{uri : item.image}} style={[styles.image, {width, resizeMode:'contain'}]} />
        <View style={{flex:.3}}>
            <Text style={styles.title}>{item.title}</Text>
            <Text style={styles.description}>{item.description}</Text>
        </View>
    </View>
  )
};
const styles = StyleSheet.create({
    "container":{
        flex:1,
        justifyContent:"center",
        alignItems:"center"
    },
    "image":{
        flex:.7,
        justifyContent:'center'
    },
    "title":{
        fontWeight:"bold",
        fontSize:24,
        marginBottom:10,
        color:COLORS.negro,
        textAlign:'center',
        paddingHorizontal:10
    },
    "description":{
        color : COLORS.negro,
        textAlign : 'center',
        paddingHorizontal: 10
    }
});