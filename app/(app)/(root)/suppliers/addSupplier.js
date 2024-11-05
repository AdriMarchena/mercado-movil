import { View, Text, Image, ScrollView, Alert } from 'react-native'
import React, { useEffect, useState } from 'react'
import { FormUser, Loading } from '../../../../components';
import { checkDocument, fetchDataAdmin } from '../../../../utils/admin/fetchDatas';
import { useAdminGlobalContext } from '../../../../Context/GlobalStateAdmin';
import { saveDataSupplier, validateExistDataSupplier } from '../../../../services/saveData';
import { router } from 'expo-router';
import { useProductGlobalContext } from '../../../../Context/GlobalStateProduct';
const imgDefault = "https://res.cloudinary.com/dun7xxiya/image/upload/v1703274563/profileAdmin_fzl1ye.jpg"
const initialSupplier = {
  document : '',
  razSocial : '',
  direction : '',
  phone_first : "",
  phone_second : ""
}
export default function addSupplier() {
  const {dataAdmin} = useAdminGlobalContext();
  const {handleAddSupplier} = useProductGlobalContext();
  const [dataSupplier, setDataSupplier] = useState(initialSupplier);

  const inputs = [
    {'placeholder':'Documento',"value":dataSupplier.document, 'titleInput':"Documento", 'inputText':'document', 'editable':true},
    {'placeholder':'Nombre', "value":dataSupplier.razSocial,'titleInput':"Razón Social",  'inputText':'razSocial', 'editable':true},
    {'placeholder':'Dirección',"value":dataSupplier.direction, 'titleInput':"Dirección", 'inputText':'direction', 'editable':true},
    {'placeholder':'Telefono 1',"value":dataSupplier.phone_first,'titleInput':"Telefono 1",  'inputText':'phone_first', 'editable':true, "keyboardType":"decimal-pad"},
    {'placeholder':'Telefono 2', "value":dataSupplier.phone_second,'titleInput':"Telefono 2",'inputText':'phone_second', 'editable':true, "keyboardType":"decimal-pad"},
  ]
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [validDocument, setValidDocument] = useState({
    status : "wait",
    valid : false
  })
  const fetchData = async()=>{
    setLoading(true);
    const data = await checkDocument(dataSupplier.document);
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
    const jsonData = data['message'];
    const newSupplier = {
      document : dataSupplier.document,
      razSocial : jsonData['nombre'] || "",
      direction : jsonData['direccion'] || "",
      phone_first : dataSupplier.phone_first,
      phone_second : dataSupplier.phone_second
    }
    setDataSupplier(newSupplier);
    setValidDocument({
      status : "response",
      valid : true
    })
    setLoading(false);
  }
  const validateInputText=(text,input)=>{
    if (input === "document" || input === "phone_first" || input ==="phone_second"){
      return text.replace(/[^0-9]/g, '')
    }
    return text;

  }
  const onChangeText=(text, input)=>{
    setDataSupplier(prev=>({
      ...prev,
      [input]:validateInputText(text,input)
    }))
  }
  const handleSubmit=async()=>{
    setLoading(true);
    const dataToSend={
      ...dataSupplier,
      idUser : dataAdmin.idUser
    };
    const responseExistSupplier = await validateExistDataSupplier(dataToSend);
    const jsonExistSupplier = await responseExistSupplier.json();
    if (jsonExistSupplier['error']) {
      setLoading(false);
      Alert.alert("Error",jsonExistSupplier['message']);
      setError({
        type : "document",
        message : jsonExistSupplier['message']
      });
      setTimeout(()=>{
        setError(null);
      },4000)
      return;
    }

    const response = await saveDataSupplier(dataToSend);
    const responseJSON = await response.json();
    if (!response.ok || responseJSON.error) {
      setLoading(false);
      Alert.alert("Algo salió mal");
      return;
    }

    const formattedData = {
      documento : dataSupplier.document,
      urlImage : imgDefault,
      nombre : dataSupplier.razSocial,
      idProveedor : responseJSON.message,
      seleccionado : true
    }
    
    handleAddSupplier(formattedData);
    setLoading(false);
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
  <View style={{flex:1}}>
    <ScrollView>   
    <FormUser
      title={"Nuevo Proveedor"}
      loading={loading}
      inputs={inputs}
      buttonText={"Guardar Proveedor"}
      getDataAdminSunat={fetchData}
      changeDataAdmin={onChangeText}
      validDocument={validDocument}
      saveData={handleSubmit}
      errorAdmin={error}
    />
    </ScrollView>
  </View>
)
};