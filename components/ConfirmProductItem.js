import { View, Text, useWindowDimensions, Image, StyleSheet, TextInput, Alert } from 'react-native'
import React, { useEffect, useState } from 'react'
import { InputTextForm } from './elements';
import { COLORS } from '../assets/theme/theme';
import { fetchPrevStockByProductStandard } from '../services/getProductCategories';
import { useAdminGlobalContext } from '../Context/GlobalStateAdmin';

export default function ConfirmProductItem({item, setDataListProducts, idx, listaProductos}) {
    const {width} = useWindowDimensions();
    const {dataAdmin} = useAdminGlobalContext();
    const [loading, setLoading] = useState(false);
    const nuevaDataItem={
      ...item,
      precioCompra : "0.00",
      precioVenta : "0.00",
      stock : "0",
      urlImagen : item.urlImg
    }
    const [dataItem, setDataItem] = useState(nuevaDataItem);
    useEffect(()=>{
      async function getPrevStockByProduct() {
          setLoading(true)
          const idUser = dataAdmin['idUser'];
          const codigoProducto = item['codigoProducto']
          const response = await fetchPrevStockByProductStandard(idUser, codigoProducto);
          const responseJson = await response.json();
          const messageResponse = responseJson['message'];
          const nuevaData = {
            ...nuevaDataItem,
            stock : String(messageResponse['prevStock'])
          }
          setDataItem(nuevaData);
          setLoading(false);
      }
      getPrevStockByProduct();
    },[]);

      const filterText=(input, text)=>{
        if (input=="precioCompra" || /^(\d+\.?\d*|\.\d+)$/.test(text)) {
          return text.replace(',', '.');
        }
        if ( input == "precioVenta" || input=="stock") {
          return text.replace(/[^0-9]/g, '')
        }
        return text
      }
      const onChangeText=(text,input)=>{

        if (input=="precioCompra") {
          
          setDataItem(prev=>({
            ...prev,
            precioCompra:filterText(input,text),
            precioVenta : (Number(text)/0.9).toFixed(2)
          }));
          const nuevaLista = listaProductos.map((val, key)=>{
              if (key==idx) {
                  return{
                    ...val,
                    precioCompra : filterText(input,text),
                    precioVenta : (Number(text)*1.1).toFixed(2)
                  }
              }
              return {
                ...val
              }
          })
          setDataListProducts(nuevaLista)
          return;
        }
        const nuevaLista = listaProductos.map((val, key)=>{
          if (key==idx) {
              return{
                ...val,
                [input]:filterText(input,text)
              }
          }
          return {
            ...val
          }
        })
        setDataListProducts(nuevaLista);
        setDataItem(prev=>({
          ...prev,
          [input]:filterText(input, text)
        }));
      }
      return(
        <View style={[{flex:1,width:width - 50, paddingVertical:20, justifyContent:'center', borderRadius:10,borderWidth:1, borderColor:COLORS.negro, }, styles.itemContainer]}>
          <View>
            <Text style={{fontWeight:'bold', fontSize:16, color:COLORS.negro}}>Nombre del Producto</Text>
            <InputTextForm style={{borderRadius : 5}} inputText={"nombre"} changeDataAdmin={onChangeText} value={dataItem.nombre} />
          </View>
          <View style={styles.rowStyle}>
            <View style={styles.widthTextStyle}>
              <Text style={{fontWeight:'bold', fontSize:16, color:COLORS.negro}}>Cantidad</Text>
              <InputTextForm style={{borderRadius : 5}} inputText={"cantidad"} changeDataAdmin={onChangeText} value={String(dataItem['cantidad'])}  />
            </View>
            <View style={styles.widthTextStyle}>
              <Text onPress={()=>Alert.alert("Información","Dato de la base de datos")} style={{fontWeight:'bold', fontSize:16, color:COLORS.negro}}>Stock</Text>
              <InputTextForm  style={{borderRadius : 5, backgroundColor : COLORS.negro_opaco}} editable={false}  inputText={"stock"} changeDataAdmin={onChangeText} value={dataItem['stock']}  />
            </View>
          </View>
          <View style={styles.rowStyle}>
            <View style={styles.widthTextStyle}>
              <Text style={{fontWeight:'bold', fontSize:16, color:COLORS.negro}}>Precio de Compra</Text>
              <InputTextForm style={{borderRadius : 5}} inputText={"precioCompra"}  changeDataAdmin={onChangeText} value={String(dataItem.precioCompra)} />
            </View>
            <View style={styles.widthTextStyle}>
              <Text style={{fontWeight:'bold', fontSize:16, color:COLORS.negro}}>Precio de Venta</Text>
              <InputTextForm style={{borderRadius : 5}} inputText={"precioVenta"} changeDataAdmin={onChangeText} value={String(dataItem.precioVenta)} />
            </View>
          </View>
          <View>
            <Text style={{fontWeight:'bold', fontSize:16, color:COLORS.negro}}>Imagen</Text>
            <View style={{width:"100%", borderRadius:10, borderWidth:1, borderColor:COLORS.negro, justifyContent:'center', alignItems:'center', paddingVertical:15}}>
              <Image
                source={{
                  uri : item.urlImg
                }}
                style={{
                  width:70,
                  height:70
                }}
              />
            </View>
          </View>
      </View>
    )
};
const styles = StyleSheet.create({
  itemContainer : {
    backgroundColor:COLORS.blanco,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    paddingHorizontal:10,
    marginHorizontal:5,
    marginVertical:5,
    justifyContent:'center', 
    paddingTop:5, 
    borderRadius:10, 
    flexDirection:'column',
  },
  "rowStyle":{
    flexDirection:'row', alignItems:'center', justifyContent:'space-between'
  },
  "widthTextStyle":{
    minWidth : 120
  }
})