import { View, Text, StyleSheet, useWindowDimensions, Pressable, TextInput, ScrollView, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { COLORS } from '../assets/theme/theme';
import { AntDesign } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons';
import { ButtonContinue, DropDownButton } from './elements';
import { OverlayComponent } from './OverlayComponents';
import { StyleTextSubTitle, StyleTextTitle } from './TextComponents';
function ItemOptions({item}) {
  if (item.typeIcon==="money") {
    return (
      <View style={styles.containerOption}>
        <FontAwesome5 name="money-bill" size={24} color={COLORS.negro} />
        <View style={{width : 160, marginHorizontal : 7}}>
          <Text>Cantidad</Text>
          <View style={styles.styleInput}>
            <TextInput placeholder=''></TextInput>
          </View>
        </View>
        <View style={{flex : 1}}>
          <Text>Denominación</Text>
          <View style={styles.styleInput}>
            <TextInput placeholder=''></TextInput>
          </View>
        </View>
      </View>
    )
  }
  return (
    <View style={styles.containerOption}>
      <FontAwesome5 name="coins" size={24} color={COLORS.negro} />
      <View style={{width : 160, marginHorizontal : 7}}>
          <Text>Cantidad</Text>
          <View style={styles.styleInput}>
            <TextInput placeholder=''></TextInput>
          </View>
        </View>
        <View style={{flex : 1}}>
          <Text>Denominación</Text>
          <View style={styles.styleInput}>
            <TextInput placeholder=''></TextInput>
          </View>
        </View>
    </View>
  )
}

export default function DsiplayOptions({title, changeDisplay}) {
    const {width, height} = useWindowDimensions();
    const [dataOptions, setDataOptions] = useState([]);
    const options = [
      "Billete",
      "Monedas"
    ]
    const handleChange=(item)=>{
      if (item==="Billete") {
        setDataOptions(prev=>[
          ...prev,
          {typeIcon : 'money'}
        ])
      }
      if (item==="Monedas") {
        setDataOptions(prev=>[
          ...prev,
          {typeIcon : 'coins'}
        ])
      }
      console.log(item);
    }
    const handleSubmit=()=>{
      changeDisplay();
    }
    return (
    <OverlayComponent
      changeVisible={changeDisplay}>
        <View style={{width:"100%", justifyContent:'center', alignItems:'center', height:60}}>
        <StyleTextTitle>{title}</StyleTextTitle>
        </View>
        <StyleTextSubTitle>Ingrese el monto total</StyleTextSubTitle>
        <View style={styles.styleInput}>
          <TextInput placeholder='Ingrese el monto ..' />
        </View>
        <View>
          <ScrollView >
            {
              dataOptions ? dataOptions.map((item, index)=>{
                return (
                  <ItemOptions key={index} item={item} />
                )
              }) : null
            }
          </ScrollView>
        </View>
       <DropDownButton title={"Agregar"} setCurrentOption={handleChange} items={options} />
       <ButtonContinue buttonText={"Guardar"} handleSubmit={handleSubmit} />
    </OverlayComponent>
  )
}
const styles = StyleSheet.create({
    "mainContainer":{
        backgroundColor : 'rgba(51,51,51,.81)',
        paddingTop : 40,
        position : 'absolute',
        top : 0,
        right : 0,
        left : 0,
        zIndex : 40
    },
    "containerData":{
        position : 'relative',
        backgroundColor : COLORS.blanco,
        borderRadius : 15,
        paddingHorizontal : 30,
        paddingVertical : 10
    },
    "containerTop":{
        width : "100%",
        justifyContent : 'space-between',
        flexDirection : 'row',
        alignItems : 'center'
    },
    "styleTitle":{
        fontWeight : 'bold',
        fontSize : 24,
        color : COLORS.negro
    },
    "containerOption":{
      flexDirection : 'row',
      alignItems:'center',
      width:"100%",
      height:60, 
      marginVertical:10
    },
    "styleInput":{borderWidth:1, borderRadius:5, borderColor : COLORS.negro, padding:5, paddingHorizontal:15, marginVertical:10},
})