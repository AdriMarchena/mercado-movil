import { View, Text, Image, Alert, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import { FormUser, SafeAreaStyled, StyleTextTitle } from '../../../components'
import { useAdminGlobalContext } from '../../../Context/GlobalStateAdmin'
import { stylesFormLogin } from '../../../assets/theme/stylesForm'
import { Link, router } from 'expo-router'
import { COLORS } from '../../../assets/theme/theme';
export default function login() {
  const {signIn, loadingDataAdmin} = useAdminGlobalContext();
  const initialInputs = {
    username : "",
    password : ""
  }
  const [dataInputs, setDataInputs] = useState(initialInputs)
  const [error, setError] = useState(null);
  const [timesTryLogin, setTimesTryLogin] = useState(0);
  const inputs =[
    {'placeholder':'Documento (DNI o R.U.C)', "value":dataInputs.username, "inputText":"username", keyboardType:"decimal-pad"},
    {'placeholder':'Contraseña', "value":dataInputs.password,"inputText":"password" }
  ]
  const onChangeText=(text, input)=>{
    setDataInputs(prevState=>({
      ...prevState, 
      [input]: text
    }))
  }
  const handleSubmit =async()=>{
    setTimesTryLogin(timesTryLogin+1)
    await signIn(dataInputs, setError);
  }
  useEffect(()=>{
    if (timesTryLogin > 3) {
      Alert.alert("Error","Parece que has olvidado tu contraseña")
    }
  },[timesTryLogin]);
  return (
    <SafeAreaStyled styleSafe={{paddingTop:40, backgroundColor:COLORS.blanco}}>
      <View>
        <FormUser 
        inputs={inputs}  
        title={"Iniciar Sesión"} 
        errorAdmin={error}
        loading={loadingDataAdmin} 
        buttonText={"Ingresar"} 
        changeDataAdmin={onChangeText} 
        saveData={handleSubmit}>
        {
          timesTryLogin > 3 ?
          <View style={{width:"100%", alignItems:"flex-end", marginBottom:10}}>
          <Text style={{textDecorationLine:"underline", fontWeight:"bold", color:COLORS.negro}}><Link href={'auth/resetPassword'}>Olvidé mi contraseña</Link></Text>
        </View>
        : null
        }
        </FormUser>
      </View>
      <View style={stylesFormLogin.bottomContainer}>
        <View style={stylesFormLogin.containerBottomContainer}>
          <Text style={stylesFormLogin.textStyle}>
            ¿Aún no tienes una cuenta? <Link style={stylesFormLogin.linkStyle} href={'auth/signup'} >Registrate</Link>
          </Text>
        </View>
      </View>
    </SafeAreaStyled>
    )
}