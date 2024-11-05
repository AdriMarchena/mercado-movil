import { View, Text, Image, StyleSheet } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useLocalSearchParams } from 'expo-router'
import { getDataSupplierByIdSupplier, getProductStoredByIdSupplier } from '../../../../services/fetchDataSupplier';
import { useAdminGlobalContext } from '../../../../Context/GlobalStateAdmin';
import { StyleTextTitle, ViewSupplierComponent } from '../../../../components';
import { COLORS } from '../../../../assets/theme/theme';

export default function PageSupplierId() {
   const {idProveedor} = useLocalSearchParams();
   const {dataAdmin} = useAdminGlobalContext();
    const [dataSupplier, setDataSupplier] = useState(null);
    const [loading, setLoading] = useState(false);
    const [productStored, setProductStored] = useState({})
    useEffect(() => {
        async function fetchDataProveedor() {
            setLoading(true);
            const idUser = dataAdmin['idUser'];
            const response = await getDataSupplierByIdSupplier(idProveedor, idUser);
            const responseJSON = await response.json();
            const message = responseJSON['message'];
            
            const responseProductStored = await getProductStoredByIdSupplier(idProveedor);
            const responseJSONProdStored = await responseProductStored.json();
            const messageProdStored = responseJSONProdStored['message'];

            setProductStored(messageProdStored);
            setDataSupplier(message);
            setLoading(false);
        }   
        fetchDataProveedor();
    }, [])
    if (loading) {
        return (
            <View>
                <Text>Cargando ....</Text>
            </View>
        )
    }
    return (
        <ViewSupplierComponent dataProductsStored={productStored} data={ dataSupplier ? dataSupplier : {}} />
      )
    
};
const styles = StyleSheet.create({
    "viewSupplierStyle":{
        flex : 1,
        backgroundColor: COLORS.blanco
    }
})