import { View, Text, Alert, FlatList, StyleSheet, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import { getRegisterProductByIdUser } from '../services/products';
import { ListaCargandoDatos } from './elements';
import { AntDesign } from '@expo/vector-icons';
import { COLORS } from '../assets/theme/theme';
import { FontAwesome5 } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons';
function CardListToggle({data}) {
    const nroFormateado = String(data.nroIngresoInventario).padStart(4,'0')
    const reducirTexto=(maximoCaracteres, text)=>{
        if (text.length <= maximoCaracteres) {
            return text;
        }
        return text.substring(0, longitudMaxima) + '...';
    }
    const reduccionNombreProv = reducirTexto(100, data.nombreProveedor);
    const [expanded, setExpand] = useState(false);
    const toggleExpand=()=>{
        setExpand(!expanded);
    }
    return (
        <TouchableOpacity onPress={toggleExpand} style={styles.itemContainer}>
          <View style={styles.itemHeader}>
            <View>
                <Text style={styles.itemTitle}>Ingreso N°{nroFormateado}</Text>
                <Text>Prod. Ingresados : {data.numProductosIngresados}</Text>
            </View>
            <View>
                {expanded ? <AntDesign name="caretup" size={24} color={COLORS.negro} /> : <AntDesign name="caretdown" size={24} color={COLORS.negro}/>}
            </View>
          </View>
    
          {expanded && (
            <View style={styles.additionalInfoContainer}>
                <View style={{flexDirection:'row', alignItems:'center', marginTop:5}}>
                    <AntDesign name="user" size={16} color={COLORS.negro} />
                    <Text style={styles.additionalInfoText}> Usuario : {data.nombreUsuario}</Text>
                </View>
                <View style={{flexDirection:'row', alignItems:'center', marginTop:5}}>
                    <FontAwesome5 name="store-alt" size={14} color={COLORS.negro} />
                    <Text style={styles.additionalInfoText}>Tienda : {data.nombreTienda}</Text>
                </View>
                <View style={{flexDirection:'row', alignItems:'center', marginTop:5}}>
                    <Feather name="user" size={16} color={COLORS.negro} />
                    <Text style={styles.additionalInfoText}>Proveedor : {reduccionNombreProv}</Text>
                </View>
            </View>
          )}
        </TouchableOpacity>
      );
}

export default function RegisterProductList({idUser}) {
    const [loading, setLoading] = useState(false);
    const [listaRegistro, setListaRegistro] = useState([])
    useEffect(()=>{
        async function fetchDataRegisterInventory() {
            setLoading(true);
            const response = await getRegisterProductByIdUser(idUser);
            const jsonResponse = await response.json();
            if (jsonResponse.error) {
                Alert.alert("Error de conexión");
                setLoading(false);
                return;
            }
            setListaRegistro(jsonResponse.message);
            setLoading(false);
        }
        fetchDataRegisterInventory();
    },[]);
  if (loading) {
    return (<ListaCargandoDatos/>)
  }
  return (
    <View style={{height : 600}}>
        <FlatList
            data={listaRegistro}
            renderItem={({item})=><CardListToggle data={item} />}
        />
    </View>
    )
};
const styles = StyleSheet.create({
    itemContainer: {
      backgroundColor: '#ffffff',
      borderRadius: 10,
      marginVertical: 8,
      marginHorizontal: 16,
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
    itemHeader: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    itemTitle: {
      fontSize: 18,
      fontWeight: 'bold',
      
    },
    expandIcon: {
      fontSize: 20,
    },
    additionalInfoContainer: {
      marginTop: 10,
    },
    additionalInfoText: {
      fontSize: 16,
      marginLeft : 5
    },
  });
  