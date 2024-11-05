import { View, Text, StyleSheet, FlatList, Alert } from 'react-native'
import React, { useEffect, useState } from 'react'
import { CardList, LoadingDataList, StyleTextTitle } from '../../../../components'
import { useAdminGlobalContext } from '../../../../Context/GlobalStateAdmin'
import Constants from 'expo-constants';
import { ButtonContinue } from '../../../../components/elements';
import { MaterialIcons } from '@expo/vector-icons';
import { COLORS } from '../../../../assets/theme/theme';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getDataVerifyStore } from '../../../../services/getDataVerify';
import { formatearDataStore } from '../../../../utils/lib/FormatearDataDb';
import { AgregarSeleccion, AgregarSeleccionPorId } from '../../../../utils/lib/AgregarSeleccion';
import { useBoxGlobalContext } from '../../../../Context/GlobalStateBox';
import { router } from 'expo-router';
export default function tiendaCaja() {
    const {dataAdmin} = useAdminGlobalContext();
    const [loading, setLoading] = useState(false);
    const [stores, setStores] = useState([]);
    const {
        saveStoreSelected, 
        saveNameStoreSelected,
        saveListStores
    } = useBoxGlobalContext();
    useEffect(()=>{
        (async()=>{
            const idAdmin = dataAdmin['idUser'];
            const defaultStorage = await AsyncStorage.getItem(`default-store-idAdmin-${idAdmin}`);
            const jsonDefaultStorage = JSON.parse(defaultStorage);

            const responseDataStore = await getDataVerifyStore(idAdmin);
            const jsonResponseDataStore = await responseDataStore.json();

            if (jsonResponseDataStore['error']) {
                Alert.alert("Error","Algo salió mal");
                setLoading(false);
                return;
            }
            
            const messageStores = jsonResponseDataStore['message'];

            if (jsonDefaultStorage) {
                const idSeleccionado = jsonDefaultStorage['defaultStore']['idTienda'];
                const nuevaLista=formatearDataStore(AgregarSeleccionPorId(messageStores, idSeleccionado, 'idTienda'));
                setStores(nuevaLista);
                saveListStores(nuevaLista);
            }
            if (!defaultStorage) {
                const nuevaLista = formatearDataStore(AgregarSeleccion(messageStores));
                setStores(nuevaLista);
                saveListStores(nuevaLista);
            }
        })();
    },[]);
    const handleSubmit=()=>{
        router.push("boxprocess/home");
    }
    const handleChangeStore=(idTienda)=>{
        const newLista = stores.map((data)=>{
            if (data.idTienda===idTienda) {
                return {
                    ...data,
                    seleccionado : true
                }
            }
            return{
                ...data,
                seleccionado : false
            }
        });
        saveListStores(newLista)
        setStores(newLista);
        saveStoreSelected(newLista);
        const nuevoNombre = newLista.filter(tienda=>tienda.seleccionado)[0]['nombre'];
        saveNameStoreSelected(nuevoNombre);
    }
    if (loading) {
        return <View style={styles.mainContainer}>
            <StyleTextTitle>¿Cual tienda desea abrir caja?</StyleTextTitle>
            <LoadingDataList columns={2} rows={3} />
        </View>
    }
    return (
        <View style={styles.mainContainer}>
            <StyleTextTitle style={{marginBottom:10}}>¿Cual tienda desea abrir caja?</StyleTextTitle>
            <View>
                <FlatList
                    data={stores}
                    renderItem={({item})=><CardList handleChangeData={handleChangeStore} idCard={item.idTienda} title={item.razSocial} description={item.direccion} seleccionado={item.seleccionado}  Icon={<MaterialIcons name='store' size={28} color={COLORS.negro} />}/>}
                    ItemSeparatorComponent={()=><Text></Text>}
                />
            </View>
            <ButtonContinue buttonText={"Continuar"} handleSubmit={handleSubmit}/>
        </View>
      )
    

};
const styles = StyleSheet.create({
    "mainContainer":{
        marginTop : Constants.statusBarHeight,
        flex : 1,
        paddingHorizontal:20,
        paddingVertical:25
      },
})