import { View, Text, SafeAreaView, StyleSheet, TouchableOpacity, ScrollView } from 'react-native'
import React, { useState } from 'react'
import { COLORS } from '../../../../assets/theme/theme'
import { InputPasswordForm, StyleText } from '../../../../components/elements'
import { Feather } from '@expo/vector-icons';
import { useAdminGlobalContext } from '../../../../Context/GlobalStateAdmin';
import { BasicButton } from '../../../../components';

export default function PasswordPage() {
  const useAdmin = useAdminGlobalContext();
  const [newPassword, setNewPassword] = useState('');
  const [newPasswordRepeat, setNewPasswordRepeat] = useState('');
  const [checksRequirements, setChecksRequirements] = useState({
    check1 : false,
    check2 : false,
    check3 : false
  });
  const [error, setError] = useState(null);
  const handleChangePassword = (text)=>{
    if (text.length>0) {
      if (/[A-Z]/.test(text)) {
        setChecksRequirements(prev=>({...prev, check1:true}))
      }
      if (!/[A-Z]/.test(text)) {
        setChecksRequirements(prev=>({...prev, check1:false}))
      }
      if (/[0-9]/.test(text)) {
        setChecksRequirements(prev=>({...prev, check2:true}));
      }
      if (!/[0-9]/.test(text)) {
        setChecksRequirements(prev=>({...prev, check2:false}));
      }
      if (text.length >= 8) {
        setChecksRequirements(prev=>({...prev, check3:true}))
      }
      if (text.length<8) {
        setChecksRequirements(prev=>({...prev, check3:false}))
      }
    }
    if (text.length === 0) {
      setChecksRequirements({
        check1 : false,
        check2 : false,
        check3 : false
      })
    }

    setNewPassword(text);
  }
  const handleChangePasswordRepeat =(text)=>{
    if (text !== newPassword) {
      setError({
        type : "different",
        message : "Contraseña diferente"
      })
    }
    if (text===newPassword) {
      setError(null);
    }
    setNewPasswordRepeat(text);
  }
  const handleBackSpace=(evt)=>{
    const {nativeEvent}=evt;
    if (nativeEvent.key==="Backspace") {
      handleChangePassword(newPassword);
    }
  }
  const handleSubmit =()=>{
    if (newPassword !== newPasswordRepeat) {
      setError({
        type : "different",
        message : "Contraseña diferente"
      });
      return;
    }
    if (!checksRequirements.check1 || !checksRequirements.check2 || !checksRequirements.check3) {
      setError({
        type : "weak",
        message : "Contraseña débil"
      });
      return;
    }
    if (newPassword.length === 0) {
      setError({
        type : "empty",
        message : "Campos incompletos"
      });
      return;
    }
    useAdmin.pushToCategories(newPassword);
  }
  return (
    <View style={{width:"100%", height:"100%", backgroundColor:COLORS.blanco, paddingHorizontal:30}}>
      <ScrollView>
      <Text style={{fontSize:30, fontWeight:'bold', marginTop:30, color:COLORS.negro}}>Registrar</Text>
      <View style={{marginTop:25, marginBottom:10}}>
        <Text style={{color:COLORS.negro}}>Escribe una contraseña segura para poder continuar con el registro.</Text>
      </View>
      <View>
        <StyleText style={styles.labelInputText} text={"Nueva Contraseña"}/>
        <InputPasswordForm inputText={"newPassword"} value={newPassword}  changeDataAdmin={(text)=>handleChangePassword(text)} onKeyPress={evt=>handleBackSpace(evt)} />
      </View>
      <View>
        <StyleText style={styles.labelInputText} text={"Confirma la nueva contraseña"} />
        <InputPasswordForm  inputText={"newPasswordRepeat"} value={newPasswordRepeat} changeDataAdmin={(text)=>handleChangePasswordRepeat(text)} />
        {error ? <Text style={{color:COLORS.red, fontWeight:'bold'}}>{error.message}</Text> : null }
      </View>
      <View style={{width:"100%", paddingVertical:15, paddingHorizontal:10, flexDirection:'column', borderWidth:1, borderColor:checksRequirements.check1 && checksRequirements.check2 && checksRequirements.check3 ? COLORS.verde_acuarela : COLORS.negro, marginVertical:15, backgroundColor:checksRequirements.check1 && checksRequirements.check2 && checksRequirements.check3 ? COLORS.verde_acuarela_opaco : COLORS.blanco}}>
        <StyleText style={{fontWeight:"bold", fontSize:16}} text={"La contraseña debe contener :"} />
        <View style={styles.requirementsPass}>
          {checksRequirements.check1 ? <Feather name="check-circle" size={16} color={COLORS.verde_acuarela} /> : <Feather name="circle" size={16} color={COLORS.negro} />}
          <StyleText style={{fontSize:16, marginLeft:5}} text={"Al menos una mayúscula o minúscula"} />
        </View>   
        <View style={styles.requirementsPass}>
          {checksRequirements.check2 ? <Feather name="check-circle" size={16} color={COLORS.verde_acuarela} /> : <Feather name="circle" size={16} color={COLORS.negro} />}
          <StyleText style={{fontSize:16, marginLeft:5}} text={"Al menos un caracter numérico"} />
        </View>  
        <View style={styles.requirementsPass}>
          {checksRequirements.check3 ? <Feather name="check-circle" size={16} color={COLORS.verde_acuarela} /> : <Feather name="circle" size={16} color={COLORS.negro} />}
          <StyleText style={{fontSize:16, marginLeft:5}} text={"8 caracteres"} />
        </View>   
      </View>
      <BasicButton handleSubmit={handleSubmit}>
        Continuar
      </BasicButton>
      </ScrollView>
    </View>
  )
};
const styles = StyleSheet.create({
  "labelInputText":{
    fontWeight:'bold',
    color : COLORS.negro,
    fontSize:16
  },
  "requirementsPass":{
    flexDirection:'row',
    alignItems:'center',
    height:25
  }
})