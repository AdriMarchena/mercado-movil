import { View, Text, Alert, ScrollView } from 'react-native'
import React, { useState } from 'react'
import { FormUser, StyleTextTitle } from '../../../../components'
import { useAdminGlobalContext } from '../../../../Context/GlobalStateAdmin'
import { saveDataStore, validateExistStore } from '../../../../services/saveData'
import { useProductGlobalContext } from '../../../../Context/GlobalStateProduct'
import { router } from 'expo-router'
import { checkDocument } from '../../../../utils/admin/fetchDatas'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { getDataVerifyStore } from '../../../../services/getDataVerify'

const initialStore={
    razSocial : "",
    document : "",
    direction : "",
    detail : "",
    phone : "",
    idUser : ""
}

export default function registerFirstStore() {
    const {dataAdmin} = useAdminGlobalContext();
    const {handleAddStore} = useProductGlobalContext();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [dataStore, setDataStore] = useState(initialStore);
    const [validDocument, setValidDocument] = useState({
        status : "wait",
        valid : false
    })
    const inputs = [
        {'placeholder':'Documento',"value":dataStore.document, 'titleInput':"Documento", 'inputText':'document', 'editable':true},
        {'placeholder':'Razón Social', "value":dataStore.razSocial,'titleInput':"Razón Social",  'inputText':'razSocial', 'editable':true},
        {'placeholder':'Dirección',"value":dataStore.direction, 'titleInput':"Dirección", 'inputText':'direction', 'editable':true},
        {'placeholder':'Telefono',"value":dataStore.phone,'titleInput':"Telefono",  'inputText':'phone', 'editable':true},
        {'placeholder':'Detalle', "value":dataStore.detail,'titleInput':"Detalle adicional",'inputText':'detail', 'editable':true},    
    ]
    const onChangeText=(text, input)=>{
        setDataStore(prev=>({
            ...prev,
            [input] : text
        }))
    }
    const fetchData=async()=>{
        setLoading(true);
        const data = await checkDocument(dataStore['document']);
        if (data['error']) {
            setLoading(false);
            setValidDocument({
                status : "response",
                valid : false
            });
            setError({
                type : "document",
                message : data['message']
            })
            setTimeout(()=>{
                setError(null);
            },3000);
            return;
        }
        const jsonData = data['message'];
        const newStore={
            razSocial : jsonData['nombre'] || "",
            document : dataStore['document'],
            direction : jsonData['direccion'] || "",
            detail : dataStore['detail'],
            phone : dataStore['phone'],
            idUser : ""
        }
        setDataStore(newStore);
        setValidDocument({
            status : "response",
            valid : true
        });
        setLoading(false);
    }
    const handleSubmit=async()=>{
        setLoading(true);
        if (dataStore['document'].trim() === "" || dataStore['razSocial'].trim()==="") {
            Alert.alert("Error","Complete el formulario");
            setLoading(false);
            return;
        }
        const dataToSend = {
            ...dataStore,
            idUser : dataAdmin['idUser']
        }
        const response = await saveDataStore(dataToSend);
        const responseJSON = await response.json();
        if (!response.ok || responseJSON['error']) {
            Alert.alert("Error","Algo salió mal");
            setLoading(false);
            return;
        }
        const responseDataStore = await getDataVerifyStore(dataAdmin['idUser']);
        const jsonResponseDataStore = await responseDataStore.json();
        if (jsonResponseDataStore['error']) {
            Alert.alert("Error","Algo salió mal");
            setLoading(false);
            return;
        }
        const messageDataStore = jsonResponseDataStore['message']
        const formattedData = {
            ...messageDataStore,
            seleccionado : true
        }
        
        handleAddStore(formattedData);
        const labelStore = `default-store-idAdmin-${dataAdmin['idUser']}`;
        const dataToSaveCache = JSON.stringify({defaultStore: formattedData});
        await AsyncStorage.setItem(labelStore, dataToSaveCache);
        setLoading(false);
        router.push("home");
    }
    return (
    <View style={{flex : 1, paddingTop : 10}}>
        <ScrollView>
            <FormUser
                title={"Nuevo Local"}
                loading={loading}
                inputs={inputs}
                changeDataAdmin={onChangeText}
                validDocument={validDocument}
                saveData={handleSubmit}
                getDataAdminSunat={fetchData}
                errorAdmin={error}
                buttonText={"Guardar Local"}

                />
        </ScrollView>
    </View>
  )
};