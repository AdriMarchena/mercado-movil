import { View, Text, StyleSheet } from 'react-native'
import React, { useState } from 'react'
import { COLORS } from '../../../../assets/theme/theme';
import { BasicButton, SearchInputText, Separator, StyleTextSubTitle } from '../../../../components';
import { AntDesign } from '@expo/vector-icons';
import { router } from 'expo-router';

export default function home() {
  const [trabajadorConMasVentas, setTrabajadorConMasVentas] = useState(null);
  const [listaTrabajadores, setListaTrabajadores] = useState([]);
  const goToAddWorker=()=>{
    router.push("workers/addWorker");
  }
  return (
    <View style={styles.mainContainer}>
      <View>
        <SearchInputText showMic={false}  />
      </View>
      {
        trabajadorConMasVentas && 
        <View>
          <StyleTextSubTitle>Trabajador con más ventas</StyleTextSubTitle>
          <View>

          </View>
        </View>
      }
      <Separator/>
      {
        listaTrabajadores.length > 0?
        <View>
          
        </View>:
        <View style={{flex : 1, justifyContent:'center', alignItems:'center'}}>
          <StyleTextSubTitle>Aún no tienes trabajadores</StyleTextSubTitle>
        </View>  
    }
    <View style={{position : 'absolute', bottom : 20,right : 20}}>
      <BasicButton handleSubmit={goToAddWorker} style={styles.styleButtonAdd} ><AntDesign name="plus" size={16} color={COLORS.blanco} /></BasicButton>
    </View>
    </View>
  )
};
const styles = StyleSheet.create({
  "mainContainer":{
    flex : 1,
    backgroundColor : COLORS.blanco,
    paddingHorizontal : 20,
    paddingVertical : 15
  },
  "styleButtonAdd":{
    paddingHorizontal : 0, 
    borderRadius : 100,
    width :60,
    height : 60,
  }
})