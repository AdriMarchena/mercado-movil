import { View, Text, FlatList, StyleSheet } from 'react-native'
import React from 'react'
import CardHorizonta from './CardHorizonta'
import { StyleText } from '../TextComponents'

export default function ListCardResumeVenta({data}) {
  return (
    <View style={{maxHeight:250, marginTop:10, marginBottom:10}}>
        <FlatList
            data={data}
            renderItem={({item})=>(
                <CardHorizonta >
                  <StyleText style={[styles.textCard,{maxWidth:150}]}>{item.nombre}</StyleText>
                  <StyleText style={styles.textCard}>{item.cantidad}</StyleText>
                  <StyleText style={styles.textCard}>S/.{item.precioVenta}</StyleText>
                </CardHorizonta>
            )}
            ItemSeparatorComponent={()=><Text style={{height:10}}></Text>}
        />
    </View>
  )
};
const styles = StyleSheet.create({
    "textCard":{
        fontWeight:'bold',
        fontSize:14,
      },
})