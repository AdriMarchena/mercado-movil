import { View, Text, Alert, StyleSheet, FlatList } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useAdminGlobalContext } from '../../../../Context/GlobalStateAdmin';
import { getDataVerifySupplier } from '../../../../services/getDataVerify';
import { BasicButton, CardSupplier, ListaCargandoDatos, SearchInputText, Separator, StyleTextSubTitle, StyleTextTitle } from '../../../../components';
import { router } from 'expo-router';
import { COLORS } from '../../../../assets/theme/theme';
import { AntDesign } from '@expo/vector-icons';
import { useProductGlobalContext } from '../../../../Context/GlobalStateProduct';

export default function home() {
    const [loading, setLoading] = useState(false);
    const{saveHistoryListSuppplier, saveListSupplier, listSuppliers, changeQuerySupplier}=useProductGlobalContext()
    const {dataAdmin} = useAdminGlobalContext();
    useEffect(()=>{
        async function fetchDataSuppliers() {
            setLoading(true);
            if (dataAdmin!=null) {
                const idUser = dataAdmin['idUser'];
                const responseSuppliers = await getDataVerifySupplier(idUser);
                const jsonResponseSuppliers = await responseSuppliers.json();

                if (jsonResponseSuppliers['error']) {
                    Alert.alert("Error", jsonResponseSuppliers['message']);
                    setLoading(false);
                    return;
                }
                saveListSupplier(jsonResponseSuppliers['message']);
                saveHistoryListSuppplier(jsonResponseSuppliers['message']);
            }
            setLoading(false);
        }
        fetchDataSuppliers();
    },[]);
    const goToAddSupplier=()=>{
        router.push("suppliers/addSupplier")
    }


    if (loading) {
        return (
            <View style={styles.mainContainer}>
                <ListaCargandoDatos
                    title={"Cartera de Proveedores"}
                    numColumns={1}
                    filas={4}
                />
            </View>
        )
    }
    return (
        <View style={styles.mainContainer}>
            <View style={styles.rowStyle}>
                <StyleTextTitle>Cartera de Proveedores</StyleTextTitle>
            </View>
            <View>
                <SearchInputText showMic={true} changeTranscript={changeQuerySupplier} changeRecording={setLoading} changeQuery={changeQuerySupplier} />
            </View>
            {
                listSuppliers.length > 0?
                <View style={{flex : 1, paddingHorizontal : 10}}>
                    <FlatList
                        data={listSuppliers}
                        renderItem={({item})=><CardSupplier dataSupplier={item} />}
                        ItemSeparatorComponent={()=><Separator/>}
                    />
                </View> : 
                <View style={{flex : 1, justifyContent:'center', alignItems:'center'}}>
                    <StyleTextSubTitle>No hay resultados</StyleTextSubTitle>
                </View>  
            }
            <View style={{position : 'absolute', bottom : 20, right : 20}}>
                <BasicButton style={styles.styleButtonAdd} handleSubmit={goToAddSupplier}>
                    <AntDesign name="plus" size={16} color={COLORS.blanco} />
                </BasicButton>
            </View>
        </View>
      )
    

};
const styles = StyleSheet.create({
    "mainContainer":{
      flex :1,
      backgroundColor : COLORS.blanco,
      paddingHorizontal : 20,
      paddingVertical : 15
    },
    "rowStyle":{
      flexDirection : 'row',
      justifyContent: 'space-between',
      alignItems : 'center',
      height : 60
    },
    "styleButtonAdd":{
      paddingHorizontal : 0, 
      borderRadius : 100,
      width :60,
      height : 60,
    }
  })