import { View, Text, Pressable, StyleSheet } from 'react-native'
import React from 'react'
import Constants from 'expo-constants';
import { COLORS } from '../../assets/theme/theme';
import { StyleText } from '../TextComponents';
import { Entypo } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
export default function Header({title, changeVisible}) {
  return (
    <View style={{marginTop :Constants.statusBarHeight, height:60, width:"100%", backgroundColor:COLORS.blanco, flexDirection:'row', alignItems:'center', justifyContent:'space-between'}}>
        <View style={{flexDirection:'row', alignItems:'center', height:60}}>
        <Pressable onPress={changeVisible} >
            <Entypo name="menu" size={24} color={COLORS.negro} />
        </Pressable>
        <StyleText style={styles.titleStyle}>{title}</StyleText>
        </View>
        <Ionicons name="notifications" size={20} color={COLORS.negro} />
    </View>
  )
};
const styles =StyleSheet.create({
    "titleStyle":{  
        fontWeight : 'bold',
        fontSize:18,
        marginLeft : 10
    }
})