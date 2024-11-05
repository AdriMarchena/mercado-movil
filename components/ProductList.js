import { View, Text, FlatList, Alert, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import { getProductInventoryByIdUser } from '../services/products';
import { CardList, ListaCargandoDatos } from './elements';
import { COLORS } from '../assets/theme/theme';

function ItemFiltro({item, idx, currentFiltro, changeCurrentFiltro}) {

    return(
      <TouchableOpacity style={[{padding:5, paddingHorizontal:10, borderRadius:5, marginHorizontal:5}, currentFiltro == idx && {backgroundColor:COLORS.naranja}]} onPress={()=>{
        changeCurrentFiltro(idx)
        item.funcion()
      }}>
        <Text style={[currentFiltro == idx ? {color : COLORS.blanco, fontWeight:'bold'} :  {color : COLORS.negro}]}>{item.title}</Text>
      </TouchableOpacity>
    )
}

export default function ProductList({idUser}) {
  const [loading, setLoading] = useState(false);
  const [listaProductos, setListaProductos] = useState([]);
  const [currentFiltro, setCurrentFiltro] = useState(-1);
  useEffect(()=>{
      async function fetchDataProductInventory() {
        setLoading(true);
        const response = await getProductInventoryByIdUser(idUser);
        const jsonResponse = await response.json();
        if (jsonResponse.error) {
            Alert.alert("Error de conexión");
            setLoading(false);
            return;  
        }
        setListaProductos(jsonResponse.message);
        setLoading(false);
      }
      fetchDataProductInventory();
    },[]);

    const ordenarPorPrecioDescendente=(lista)=>{
      return lista.sort((a,b)=>b.precioVenta - a.precioVenta)
    }
    const ordernarPorStockDescendiente=(lista)=>{
      return lista.sort((a,b)=>b.stock - a.stock)
    }
    const filtros = [
      {title : "Precio de Venta", funcion :()=> ordenarPorPrecioDescendente(listaProductos)},
      {title : "Stock", funcion :()=> ordernarPorStockDescendiente(listaProductos)}
    ]
    const changeCurrentFiltro=(idx)=>{
      setCurrentFiltro(idx);
    }
    if (loading) {
      return (<ListaCargandoDatos/>)
    }
  return (
    <View>
      <View style={{paddingHorizontal:20}}>
        <Text style={{color:COLORS.negro, fontWeight:'bold', fontSize:16, marginVertical:10}}>Filtrar por : </Text>
        <View>
          <FlatList
            data={filtros}
            renderItem={({item, index})=><ItemFiltro item={item} currentFiltro={currentFiltro} changeCurrentFiltro={changeCurrentFiltro} idx={index} />}
            horizontal
          />
        </View>
      </View>
      <View style={{height : 600}}>
      <FlatList
        data={listaProductos}
        renderItem={({item})=><CardList item={item} />}
      />
      </View>
    </View>
  )
};