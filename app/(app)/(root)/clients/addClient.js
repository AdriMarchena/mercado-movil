import { View, Text, ScrollView, Alert } from 'react-native'
import React, { useState } from 'react'
import { COLORS } from '../../../../assets/theme/theme'
import { FormUser, Loading } from '../../../../components'
import { fetchDataAdmin } from '../../../../utils/admin/fetchDatas';
import { useVentaGlobalContext } from '../../../../Context/GlobalStateVenta';
import { saveClientVenta, validateExistClient } from '../../../../services/getDetailVenta';
import { router } from 'expo-router';
import { formatterClient } from '../../../../utils/lib/FormatterClientToDB';
import { AgregarSeleccionObjeto } from '../../../../utils/lib/AgregarSeleccion';
import { useAdminGlobalContext } from '../../../../Context/GlobalStateAdmin';

export default function addClient() {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const {addClientToList} = useVentaGlobalContext();
    const {dataAdmin} = useAdminGlobalContext();
    const [validDocument, setValidDocument] = useState({
        status : "wait",
        valid : false
      })
      const [dataClient, setDataClient] = useState({
        nameAdmin : "",
        lastName : "",
        document : "",
        direction : "",
        phone :""
      });
    const fetchDataSunat=async()=>{
        return await fetchDataAdmin(dataClient, setDataClient, setLoading, setError, setValidDocument);
    }
    const onChangeText=(text, input)=>{
        setDataClient(prev=>({
            ...prev,
            [input]: text
        }))
    }
    const handleSubmit=async()=>{
        setLoading(true);
        const formattedData = formatterClient(dataClient);
        const idAdmin = dataAdmin['idUser']
        const dataToSend = {
            idUsuarioCliente : idAdmin,
            ...formattedData
        }
        const responseValidateExistClient = await validateExistClient(dataToSend);
        const jsonValidateExistClient = await responseValidateExistClient.json();
        if (jsonValidateExistClient['error']) {
            Alert.alert("Error",jsonValidateExistClient['message']);
            return;
        }

        const responseId= await saveClientVenta(dataToSend);
        const jsonResponse = await responseId.json();
        const newList = {
            idClienteUsuario  : jsonResponse.message,
            seleccionado : true,
            ...formattedData
        }
        addClientToList(newList);
        setLoading(false);
        if (router.canGoBack()) {
            router.back();
            return;
        }
        router.push("home")
    }
    const inputs = [
        {'placeholder':'Documento',"value":dataClient.document, 'titleInput':"Documento", 'inputText':'document', 'editable':true,  keyboardType:"decimal-pad"},
        {'placeholder':'Nombre', "value":dataClient.nameAdmin,'titleInput':"Nombre",  'inputText':'nameAdmin', 'editable':true},
        {'placeholder':'Apellido', "value":dataClient.lastName,'titleInput':"Apellido",  'inputText':'lastName', 'editable':true},
        {'placeholder':'Direccion', "value":dataClient.direction,'titleInput':"Direccion",  'inputText':'direction', 'editable':true},
        {'placeholder':'Telefono', "value":dataClient.phone,'titleInput':"Telefono",  'inputText':'phone', 'editable':true,  keyboardType:"decimal-pad"},
    ]
    if (loading) {
        return (<Loading/>)
    }
    return (
        <View style={{flex:1, backgroundColor:COLORS.blanco, paddingTop : 15}}>
            <ScrollView>
            <FormUser
                title={"Nuevo Cliente"}
                loading={loading}
                buttonText={"Guardar Cliente"}
                getDataAdminSunat={fetchDataSunat}
                changeDataAdmin={onChangeText}
                saveData={handleSubmit}
                errorAdmin={error}
                validDocument={validDocument}
                inputs={inputs}
            />
            </ScrollView>
        </View>
      )
};