import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import { Link } from 'expo-router'
import { COLORS } from '../assets/theme/theme';

export default function homeScreen() {
  return (
    <View style={styles.mainContainer}>
      <Text style={{fontWeight:'bold',color :COLORS.blue2}}>
            MERCADO MOVIL
      </Text>
        <View style={styles.containerButtons}>
            <Text style={styles.buttonStyle}>
                <Link style={{fontWeight : 'bold'}} href={'user/login'}>Usuario</Link>
            </Text>
            <Text style={styles.buttonStyle}>
                <Link style={{fontWeight : 'bold'}} href={'admin/login'}>Vendedor</Link>
            </Text>
        </View>
    </View>
  )
};
const styles = StyleSheet.create({
    "mainContainer":{
        width : "100%",
        height : "100%",
        justifyContent : "center",
        alignItems : "center",
        paddingVertical : 30,
        color : COLORS.blue2
    },
    "containerButtons":{
        width : "100%",
        height : 60,
        display : "flex",
        justifyContent : "center",
        alignItems : "center",
        paddingHorizontal : 20,
        marginTop : 30
    },
    "buttonStyle":{
        width : "100%",
        textAlign : "center",
        height : 50,
        fontSize : 12,
        marginTop : 15,
        borderRadius : 10,
        paddingVertical : 15,
        backgroundColor : COLORS.blue2,
        color :COLORS.white
    }
});