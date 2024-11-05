import { View, Text, ScrollView, StyleSheet, useWindowDimensions, Alert } from 'react-native'
import React, { useEffect, useState } from 'react'
import { SafeAreaView } from 'react-native'
import { FormUser, Loading, OnBoardingComponent, PickerTypeDoc, SafeAreaStyled } from '../../../../components'
import {inputsSignUp} from '../../../../utils/forms/inputs'
import { fetchDataAdmin, fetchDataAdminRegister, validateDataAdmin } from '../../../../utils/admin/fetchDatas';
import { useAdminGlobalContext } from '../../../../Context/GlobalStateAdmin'
import { stylesFormLogin } from '../../../../assets/theme/stylesForm'
import { Link, router } from 'expo-router'
import { COLORS } from '../../../../assets/theme/theme';
import {validarEmail} from '../../../../utils/forms/validateEmails'
export default function Page() {
  const initialAdmin = {
    document : '',
    nameAdmin : '',
    lastName : '',
    email : '',
    phone : '',
    typeDocument : 'DNI'
  }
  const useAdmin = useAdminGlobalContext();
  const [dataAdmin, setDataAdmin] = useState(initialAdmin);
  const [errorAdmin, setErrorAdmin] = useState(null);
  const [loading, setLoading] = useState(false);
  const [loadingPage, setLoadingPage] = useState(false);
  const [showOnboarding, setshowOnboarding] = useState(true);
  const [validDocument, setValidDocument] = useState({
    status : "wait",
    valid : false
  })

  const inputs = inputsSignUp(dataAdmin);

  const validateInputText=(text, input)=>{
    if (input === "document" || input === "phone"){
      return text.replace(/[^0-9]/g, '')
    }
    return text.trim();
  }
  const onChangeText=(text,input)=>{
    setDataAdmin(prevState=>({
      ...prevState, 
      [input]: validateInputText(text, input)
    }));
  }
  const fetchData=async()=>{
    return await fetchDataAdminRegister(dataAdmin, setDataAdmin, setLoading, setErrorAdmin, setValidDocument);
  }
  const validateEmail=()=>{
    const isValidEmail =  validarEmail(dataAdmin.email.trim());
    if (!isValidEmail) {
      setErrorAdmin({
        type : "email",
        message : "Email inválido"
      });
      return;
    }
    setErrorAdmin(null);
  }
  const handleSubmit=async()=>{
   setLoading(true);
   if (  dataAdmin['typeDocument']=='DNI' && dataAdmin['document'].length !==8 ) {
    Alert.alert("Error","Documento inválido");
    setErrorAdmin({
      "type":"document",
      "message":"Documento inválido"
    })
    setTimeout(()=>{
      setErrorAdmin(null);
    },3000);
    setLoading(false);
    return;
   }
   if (dataAdmin['typeDocument'] == 'RUC' && dataAdmin['document'].length!==11) {
    Alert.alert("Error","Documento inválido");
    setErrorAdmin({
      "type":"document",
      "message":"Documento inválido"
    })
    setTimeout(()=>{
      setErrorAdmin(null);
    },3000);
    setLoading(false);
    return;
   }
   const existAdmin = await validateDataAdmin(dataAdmin);
   if (existAdmin['error']) {
    Alert.alert("Error",existAdmin['message']);
    setErrorAdmin({
      type : "submit",
      message : existAdmin['message']
    });
    setTimeout(()=>{
      setErrorAdmin(null);
    },3000);
    setLoading(false);
    return;
   }
    await useAdmin.pushToEmailVerification(dataAdmin, setErrorAdmin);
    setLoading(false);
  }
  const changeShowOnboarding=()=>{
    setshowOnboarding(!showOnboarding)
  }
  if (!loadingPage) {
    return (
        <SafeAreaStyled >
            <SafeAreaView >
            {showOnboarding ? <OnBoardingComponent changeShowOnboarding={changeShowOnboarding}/> : null}
              <SafeAreaView style={{height:"100%", paddingTop:40, backgroundColor:COLORS.blanco}}>
              <ScrollView style={{marginBottom : 10}}  >

                <FormUser 
                  title={"Registrar"} 
                  AfterTitleComponent={<PickerTypeDoc setTypeDocument={(typeDoc)=>{
                    setValidDocument({
                      status : "wait",
                      valid : false
                    })
                    setDataAdmin(prev=>({...prev, typeDocument:typeDoc, document:''}))
                  }}/>} 
                  validDocument={validDocument} 
                  loading={loading} 
                  errorAdmin={errorAdmin} 
                  getDataAdminSunat={fetchData} 
                  inputs={inputs} 
                  changeDataAdmin={onChangeText} 
                  buttonText={"Continuar"} 
                  saveData={handleSubmit} 
                  onEndEmailInputText={validateEmail}
                  />

                <View style={stylesFormLogin.bottomContainer}>
                    <View style={stylesFormLogin.containerBottomContainer}>
                      <Text style={stylesFormLogin.textStyle}>
                        ¿Ya tienes una cuenta? <Link style={stylesFormLogin.linkStyle} href={'auth/login'}>Inicia Sesión</Link>
                      </Text>
                    </View>
                </View>
                </ScrollView>
              </SafeAreaView>
            
          </SafeAreaView>
        </SafeAreaStyled>
      )
  }
  return (
    <Loading/>
  )
};
