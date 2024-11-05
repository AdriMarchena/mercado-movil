import { View, Text, SafeAreaView, TouchableOpacity, StyleSheet, Image } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useAdminGlobalContext } from '../../../../Context/GlobalStateAdmin';
import { formatCategorie } from '../../../../services/formatterCategorie';
import { Loading, StyleText, StyleTextTitle } from '../../../../components';
import { COLORS } from '../../../../assets/theme/theme';
import ListCategories from '../../../../components/ListCategories';
import { stylesFormLogin } from '../../../../assets/theme/stylesForm';
import CheckBox from 'expo-checkbox';
import { router } from 'expo-router';

export default function Page() {
  const useAdmin = useAdminGlobalContext();
  const [loadingPage, setLoadingPage] = useState(false);
  const [dataCategories, setDataCategories] = useState(null);
  const [valueCategorie, setValueCategorie] = useState(1);
  const [acceptAgreement, setAcceptAgreement] = useState(false);
  const [error, setError] = useState(null)
  useEffect(()=>{
    async function getCategories() {
      setValueCategorie(1);
      setLoadingPage(true);
      const response = await useAdmin.fetchDataCategories();
      const formattedCategories = formatCategorie(response);
      setLoadingPage(false);
      setDataCategories(formattedCategories);
    };
    getCategories();
  },[]);
  const handleSubmit=async()=>{
    if (!acceptAgreement) {
      setError("Debe aceptar los términos y condiciones")
      setTimeout(()=>{
        setError(null)
      },3000)
      return;
    }
    await useAdmin.signup(valueCategorie);
    router.push("auth/signup/registerFirstStore");
  }
  if (loadingPage || useAdmin.loadingDataAdmin) {
    return <Loading/>
  }
  return (
    <SafeAreaView style={styles.mainContainer}>
          <StyleTextTitle style={{marginVertical : 10}}>Registrar</StyleTextTitle>
        <View style={{marginVertical:10}}>
          <StyleText>Elige el rubro de tu negocio. Nos ayuda a entender tus potenciales proveedores o clientes.</StyleText>
        </View>
        <View style={styles.containerItems} >
          <ListCategories
              data={dataCategories}
              setValueCategorie={setValueCategorie}
              valueCategorie={valueCategorie}
            />
        </View>  
      <View style={{flexDirection:'row', height:60, alignItems:'center'}}>
        <CheckBox
          value={acceptAgreement}
          onValueChange={setAcceptAgreement}
          color={acceptAgreement ? COLORS.azul : undefined}
        />
        <StyleText style={{marginLeft : 15}}>Acepto los términos y condiciones</StyleText>
      </View>
      {error ? <Text style={{color:COLORS.red, fontWeight:'bold'}}>{error}</Text> : null}
      <TouchableOpacity style={[stylesFormLogin.loginButton,{marginTop:15}]} onPress={handleSubmit}>
        <Text style={stylesFormLogin.textStyleLoginButton}>Registrarse</Text>
      </TouchableOpacity>
    </SafeAreaView>
  )
}
const styles = StyleSheet.create({
  "item":{
    width : 150,
    padding : 10,
    borderWidth : 1.5,
    height : 150,
    marginRight : 15,
    marginTop : 10,
    borderRadius : 5,
    borderColor : COLORS.blue2,
    alignItems : "center"
  },
  "itemImg":{
    width : 60,
    height : 60,
    marginBottom : 10
  },
  "containerItems":{
    width : "100%",
    height : "auto",
  },
  "mainContainer":{
    paddingHorizontal : 30,
    width : "100%",
    backgroundColor:COLORS.blanco,
    height : "100%",
  },
  "containerButton":{
    width :"100%",
    height:60,
    backgroundColor :COLORS.blue2,
    borderRadius:10,
    marginTop : 10,
  }
})