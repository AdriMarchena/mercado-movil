import { View, Text, useWindowDimensions, TouchableOpacity, StyleSheet, Image } from 'react-native'
import React, { useState } from 'react'
import { COLORS } from '../../assets/theme/theme';
import StyleText from './styleText';
import AddMinusButton from './AddMinusButton';

export default function CardProductList2({productStandard, useAddProduct, useMinusProduct}) {
    const [countProduct, setCountProduct] = useState(productStandard.cantidad || 0);
    const {width, height} = useWindowDimensions();
    const [loading, setLoading] = useState(false);
    const handleAddProduct=()=>{
        setLoading(true);
        setCountProduct(prev=>prev+1);
        useAddProduct(productStandard.idProducto, productStandard)
        setLoading(false);
    }
    const handleMinusProduct=async()=>{
        setLoading(true);
        setCountProduct(prev=>prev-1);
        useMinusProduct(productStandard.idProducto);
        setLoading(false);
    }
    return (
        <TouchableOpacity  onPress={handleAddProduct} style={[styles.itemContainer, {  width: (width/2)-40,height:(height/2.8), backgroundColor : COLORS.white }]}>
            <View style={{ justifyContent:'center', alignItems:'center'}} >
                <Image
                    width={60}
                    height={85}
                    source={{
                        uri : productStandard.urlImagen
                    }}
                />
            </View>
            <View style={{marginVertical:10}}>
                <StyleText text={productStandard.nombre} style={{fontWeight:'bold'}}/>
                <StyleText text={productStandard.descripcion} />
                <StyleText text={`P.V : S/${productStandard.precioVenta}`} style={{fontWeight:'bold'}} />
                <StyleText text={`Stock : ${productStandard['stock']}`}></StyleText>
            </View>
            {
          loading ? 
            <View>
                <Text>Cargando</Text>
            </View> :
            (
                countProduct > 0 ?
                <AddMinusButton countProduct={countProduct} handleAddProduct={handleAddProduct} handleMinusProduct={handleMinusProduct}/> :
                <TouchableOpacity onPress={handleAddProduct} style={{width:"100%", height:25, borderRadius:10, backgroundColor:COLORS.naranja, justifyContent:'center', alignItems:'center'}}>
                    <Text style={{color:COLORS.blanco, fontWeight:'bold'}}>Agregar</Text>
                </TouchableOpacity>
            )
            }   
        </TouchableOpacity>
        )
};
const styles = StyleSheet.create({
    itemContainer : {
        shadowColor: '#000',
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
        marginHorizontal:5, 
        paddingHorizontal:10,
        marginBottom:20,
        justifyContent:'center', 
        paddingTop:5, 
        borderRadius:10, 
        flexDirection:'column',
      },
})