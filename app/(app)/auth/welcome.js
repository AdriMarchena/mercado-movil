import { View, Text, Image, TouchableOpacity, useWindowDimensions, SafeAreaView } from 'react-native'
import React from 'react'
import { COLORS } from '../../../assets/theme/theme'
import { router } from 'expo-router';
import Constants from 'expo-constants';
import { SafeAreaStyled } from '../../../components';
function StyleTextWhite({text, style}) {
  const styleText = {
    color : COLORS.blanco,
    ...style
  }
  return <Text style={[styleText]}>{text}</Text>
}

export default function welcome() {
  const {width, height} = useWindowDimensions();
  const nextPage=()=>{
    router.push("auth/login")
  }
  return (
    <SafeAreaStyled styleSafe={{backgroundColor :COLORS.naranja, justifyContent:'center', flexDirection:'column', alignItems:'center', marginTop : Constants.statusBarHeight}}>
      <View style={{width:width-90, height:height < 700 ? height - 400 : height-530}}>
          <Image source={{uri :'https://res.cloudinary.com/dun7xxiya/image/upload/v1702074366/WelcomMercadoMovilLogo_hpilow.png'}} style={{width:'100%', height:"100%"}} />
        </View>
        <View style={{width : width < 300 ? width-90 : 300, marginVertical:15}}>
          <StyleTextWhite style={{color:COLORS.blanco, fontSize : 20}} text={"El primer mercado más grande del país, en la palma de tu mano"} />
        </View>
        <View>
          <TouchableOpacity style={{backgroundColor:COLORS.blanco, marginVertical:15, borderRadius : 10}} onPress={nextPage}>
            <View style={{width: width< 300 ? width-90 : 300, paddingVertical:15, justifyContent:'center',alignItems:'center', flexDirection:'row'}}>
              <StyleTextWhite text={"Continuar"} style={{color : COLORS.naranja, fontSize:18, fontWeight:"bold", marginHorizontal:10}} />
            </View>
          </TouchableOpacity>
        </View>
    </SafeAreaStyled>
    
  )
};