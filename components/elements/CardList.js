import { View, Text, StyleSheet, Image } from 'react-native'
import React from 'react'
import { COLORS } from '../../assets/theme/theme'

export default function CardList({item}) {
  return (
    <View style={[styles.itemContainer]}>
        <View>
            <Image
                width={80}
                height={80}
                style={{borderRadius:60}}
                source={{
                    uri:item.urlImagen
                }}
            />
        </View>
        <View style={{marginLeft :10}}>
            <Text style={styles.itemText}>{item.nombre}</Text>
            <Text style={styles.itemTextDescription}>{item.descripcion}</Text>
            <Text style={styles.itemTextDescription}>P.V. : S/.{item.precioVenta}</Text>
            <Text style={[styles.itemTextDescription, {fontWeight:'bold'}]}>Stock : {item.stock}</Text>
        </View>
    </View>
  )
}
const styles = StyleSheet.create({
    itemContainer: {
        backgroundColor: COLORS.white,
        borderRadius: 10,
        marginVertical: 8,
        marginHorizontal: 16,
        flexDirection:'row',
        padding: 20,
        shadowColor: '#000',
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
      },
      itemTextDescription : {
        width:200,
        color:COLORS.negro
      },
      itemText: {
        fontSize: 18,
        fontWeight: 'bold',
        color : COLORS.negro,
        width: 150
      },
})