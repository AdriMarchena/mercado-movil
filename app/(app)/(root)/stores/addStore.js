import { View, Text, Image, Alert, ScrollView } from 'react-native'
import React, { useState } from 'react'
import { FormUser, Loading } from '../../../../components'
import { checkDocument } from '../../../../utils/admin/fetchDatas'
import { useAdminGlobalContext } from '../../../../Context/GlobalStateAdmin'
import { saveDataStore, validateExistStore } from '../../../../services/saveData'
import { router } from 'expo-router'
import { useProductGlobalContext } from '../../../../Context/GlobalStateProduct'

const initialStore = {
    razSocial:"",
    document:"",
    phone:"",
    direction:"",
    detail:"",
    idUser:""
}
export default function addStore() {
    const{dataAdmin}=useAdminGlobalContext();
    const {handleAddStore} = useProductGlobalContext();
    const [loading, setLoading] = useState(false);
    const [dataStore, setDataStore] = useState(initialStore);
    const [error, setError] = useState(null);
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
    const fetchData=async()=>{
        setLoading(true);
        const data = await checkDocument(dataStore.document);
        if (data.error) {
            setLoading(false);
            setValidDocument({
                status : "response",
                valid : false
            });
            setError({
                type : "document",
                message : data.message
            });
            setTimeout(()=>{
                setError(null);
            },3000);
            return;
        }
        const jsonData = data['message']
        const newStore={
            razSocial: jsonData['nombre'] || "",
            document:dataStore.document,
            phone:dataStore.phone,
            direction: jsonData['direccion'] || "",
            detail:dataStore.detail,
            idUser:""
        }
        setDataStore(newStore);
        setValidDocument({
            status : "response",
            valid : true
        });
        setLoading(false);
    }
    const onChangeText=(text, input)=>{
        setDataStore(prev=>({
            ...prev,
            [input]:text
        }))
    }
    const handleSubmit=async()=>{
        setLoading(true);
        const dataToSend={
            ...dataStore,
            idUser : dataAdmin.idUser
        }
        const responseValidateExistStore = await validateExistStore(dataToSend);
        const jsonValidateExistStore = await responseValidateExistStore.json();

        if (jsonValidateExistStore['error']) {
            Alert.alert("Error",jsonValidateExistStore['message']);
            setLoading(false);
            return;
        }

        const response =await saveDataStore(dataToSend);
        const responseJSON = await response.json();
        if (!response.ok || responseJSON['error']) {
            Alert.alert("Error","Algo salió mal :(");
            setLoading(false);
            return;
        }
        const formattedData = {
            razSocial : dataStore.razSocial,
            documento : dataStore.document,
            seleccionado : true,
            idTienda : responseJSON.message
        }
        handleAddStore(formattedData);
        setLoading(false)
        if (router.canGoBack()) {
            router.back();
            return;
        }
        router.push("home");
    }
    if (loading) {
        return (<Loading/>)
    }
    return (
        <View style={{flex:1, paddingTop:15}}>
            <ScrollView>
            <FormUser
                title={"Nueva Tienda"}
                loading={loading}
                inputs={inputs}
                changeDataAdmin={onChangeText}
                validDocument={validDocument}
                saveData={handleSubmit}
                getDataAdminSunat={fetchData}
                errorAdmin={error}
                buttonText={"Guardar Tienda"}
            />
            </ScrollView>
        </View>
      )
};