import { View, Text, StyleSheet, useWindowDimensions, TouchableOpacity } from 'react-native'
import React from 'react'
import { Entypo } from '@expo/vector-icons';
import { COLORS } from '../../assets/theme/theme';
import { AntDesign } from '@expo/vector-icons';
import { router } from 'expo-router';
export default function BottomSaleSuccess({data, clearData}) {
  const {width} = useWindowDimensions();
  return (
    <View style={[styles.bottomStyle,{width:width-70}]}>
      <TouchableOpacity style={styles.buttonStyle}>
        <Entypo name="share" size={24} color={COLORS.blanco} />
      </TouchableOpacity>
      <TouchableOpacity style={styles.buttonStyle}>
        <AntDesign name="download" size={24} color={COLORS.blanco} />
      </TouchableOpacity>
      <TouchableOpacity style={styles.buttonStyle} onPress={()=>{
        router.push("home") 
        clearData();
        }}>
        <Entypo name="home" size={24} color={COLORS.blanco}/>
      </TouchableOpacity>
    </View>
  )
};
const styles = StyleSheet.create({
  "bottomStyle":{
    justifyContent:'center',
    flexDirection:'row',
    alignItems:'center',
    height:80,
    marginTop :10
  },
  "buttonStyle":{
    padding:15,
    backgroundColor:'rgba(25,51,51,.21)',
    borderRadius:5,
    marginHorizontal:10
  }
})