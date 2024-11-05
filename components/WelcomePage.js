import { View, Text, StyleSheet } from 'react-native'
import { Link, Redirect } from 'expo-router';

import React from 'react'

export default function WelcomePage() {
  return (
    <View style={styles.container}>
      <Text style={{color : "#1d3557", fontSize : 20, fontWeight : "bold", marginBottom:20}}>Bienvenido a MercadoMovil</Text>
      <Image
        style={styles.img}
        source={{
          uri : 'https://res.cloudinary.com/dabyqnijl/image/upload/v1697556069/welcome-back_rru6tt.png',
        }}
      />

      <Link style={{width:"50%", backgroundColor:"#1d3557",paddingVertical:7,height:40, textAlign:"center", borderRadius:10, marginTop:20 }} href={'admin/auth/signup'}>
        <Text style={{color:"#f1faee"}}>Continuar</Text>
      </Link>
    </View>
  )
};
const styles = StyleSheet.create({
    "img":{
      width : 100,
      height : 100
    },
    "container":{
      width : "100%",
      height : "80%",
      alignItems : "center",
      justifyContent : "center"
    }
  });