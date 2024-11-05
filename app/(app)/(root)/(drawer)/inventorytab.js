import { View, Text, FlatList, useWindowDimensions, Alert, Image, StyleSheet, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import Constants from 'expo-constants';
import { COLORS } from '../../../../assets/theme/theme';
import { Skeleton } from 'moti/skeleton';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getProductInventoryByIdUser } from '../../../../services/products';
import { DropDownButton } from '../../../../components/elements';
import { ProductList, RegisterProductList } from '../../../../components';



function ListaCargandoDatos() {
  const {width} = useWindowDimensions();
  const listaVacia = Array.from({ length: 5}, () => null); 
  return(
      <View style={{marginTop:20}}>
        <FlatList
        data={listaVacia}
        renderItem={(_)=><Skeleton width={width-20} height={80} radius={10} colorMode='light'/>}
        ItemSeparatorComponent={()=><Text></Text>}
        />
      </View>
    )
}
export default function inventory() {
  const [loading, setLoading] = useState(false);
  const optionsDropDown = [
    "Productos",
    "Registro Productos"
  ]
  const [currentOption, setCurrentOption] = useState("Productos");
  const [idAdmin, setIdAdmin] = useState("");
  useEffect(()=>{
    async function fetchDataInventory() {
      setLoading(true);
      const user = await AsyncStorage.getItem("admin-data");
      const jsonUser = JSON.parse(user);
      const idUser = jsonUser.idUser;
      setIdAdmin(idUser);
      setLoading(false);
    }
    fetchDataInventory();
  },[]);

  if (loading) {
    return(
      <View style={{flex:1, backgroundColor:COLORS.blanco, paddingHorizontal:30, paddingVertical:10}}>
        <Text style={styles.textTitle}>Productos</Text>
        <ListaCargandoDatos/>
      </View>
    )
  }
  return (
    <View style={{flex:1, backgroundColor:COLORS.blanco, paddingHorizontal:10, paddingVertical:10}}>
      <DropDownButton title={currentOption} items={optionsDropDown} setCurrentOption={setCurrentOption} />
      <View>
        {
          currentOption == "Productos" ? 
          <ProductList idUser={idAdmin} />
          : <RegisterProductList idUser={idAdmin} />
        }
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
  itemText: {
    fontSize: 18,
    fontWeight: 'bold',
    color : COLORS.negro,
    width: 250
  },
  itemTextDescription : {
    width:200,
    color:COLORS.negro
  },
  textTitle : {
    color:COLORS.negro, 
    fontWeight:'bold', 
    fontSize:24, 
    paddingHorizontal:20,
    marginVertical:15
  }
})