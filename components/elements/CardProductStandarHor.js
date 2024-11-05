import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import StyleText from './styleText'
import { COLORS } from '../../assets/theme/theme'
import { Feather } from '@expo/vector-icons';
export default function CardProductStandarHor({product, deleteProduct}) {

  const handleDeleteProduct=async()=>{
    await deleteProduct(product.idProducto);
  }
  return (
    <View style={styles.itemContainer}>
        <View style={{marginRight:5}}>
                <Image height={60} width={80} source={{uri : product.urlImg}} />
            </View>
            <View>
                <StyleText style={{fontSize:18, fontWeight:'bold', width : 180}} text={product.nombre} />
                <StyleText text={product.descripcion} />
            </View>   
            <TouchableOpacity onPress={handleDeleteProduct} style={{backgroundColor:COLORS.naranja, marginLeft:7, height:40, width:40, borderRadius:40, alignItems:'center', justifyContent:'center'}}>
              <Feather name="trash" size={24} color={COLORS.blanco} />
            </TouchableOpacity>
    </View>
  )
}
const styles = StyleSheet.create({
    itemContainer : {
        backgroundColor: COLORS.white,
        borderRadius: 10,
        marginHorizontal: 10,
        flexDirection:'row',
        alignItems:'center',
        padding: 20,
        shadowColor: '#000',
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    }
})