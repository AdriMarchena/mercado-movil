import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import React from 'react'
import { COLORS } from '../../../../assets/theme/theme'
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons';
import { router } from 'expo-router';
import { useProductGlobalContext } from '../../../../Context/GlobalStateProduct';
import { StyleText, StyleTextSubTitle, StyleTextTitle } from '../../../../components';
export default function home() {
  const {numProducts} = useProductGlobalContext();
  const inventoryOptions = [
    {'id':1, 'title':'Escaneo', 'description':'Escanea el código QR o código de barras de los productos.', 'img':<MaterialCommunityIcons name="qrcode-scan" size={24} color={COLORS.naranja} />, 'route':'inventory/scan'},
    {'id':2, 'title':'Tipeo', 'description':'Ingresa el inventario de por escritura o por comandos de voz. ', 'img':<MaterialIcons name="keyboard" size={24} color={COLORS.naranja}/>, 'route':numProducts > 0 ? 'inventory/warning' : 'inventory/productsInventory'},
    {'id':3, 'title':'PreCarga', 'description':'Sube el XML y ahorra tiempo de escritura o escaneo', 'img':<Feather name="upload" size={24} color={COLORS.naranja}/>, 'route':'inventory/scan'},
  ]
  return (
    <View style={styles.bodyStyle}>
      <StyleTextTitle>¿Cómo ingresarás el inventario?</StyleTextTitle>
      <View style={{marginVertical:15}}>
        {
          inventoryOptions.map((elem)=>{
            return (
              <TouchableOpacity key={elem.id} style={styles.cardStyle} onPress={()=>router.push(elem.route)}>
                  <View style={styles.containerCardImg}>
                    {elem.img}
                  </View>
                  <View>
                    <StyleTextSubTitle>{elem.title}</StyleTextSubTitle>
                    <StyleText style={{width:250}}>{elem.description}</StyleText>
                  </View>
              </TouchableOpacity>
            )
          })
        }
      </View>
    </View>
  )
}
const styles = StyleSheet.create({
  "bodyStyle":{
    width : "100%",
    paddingHorizontal : 30,
    paddingVertical : 20
  },
  "cardStyle":{
    width:"100%",
    height:100,
    borderRadius:10,
    borderWidth:1,
    borderColor:COLORS.negro,
    flexDirection:'row',
    alignItems:'center',
    marginVertical:15
  },
  "containerCardImg":{
    width:70,
    height:70,
    justifyContent:'center',
    alignItems:'center'
  }
})