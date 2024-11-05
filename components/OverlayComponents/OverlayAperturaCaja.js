import { View, Text, StyleSheet, useWindowDimensions, ActivityIndicator } from 'react-native'
import React, { useState } from 'react'
import OverlayModal from './OverlayModal'
import { StyleText, StyleTextTitle } from '../TextComponents'
import StyleInputText from '../InputsComponents/StyleInputText'
import BasicButton from '../ButtonComponents/BasicButton'
import Constants from 'expo-constants';
import { COLORS } from '../../assets/theme/theme'
import { useBoxGlobalContext } from '../../Context/GlobalStateBox'
import { validateAdminPasswordForBox } from '../../services/fetchDataBoxes'
import { useAdminGlobalContext } from '../../Context/GlobalStateAdmin'
import { router } from 'expo-router'

export default function OverlayAperturaCaja() {
  const [error, setError] = useState(null);
  const [query, setQuery] = useState("")
  const {changeValidateAdmin,  dataBoxesOpen, existeCajasAbiertas} = useBoxGlobalContext();
  const [loading, setLoading] = useState(false);
  const {dataAdmin} = useAdminGlobalContext();
  const checkEmpty =(text)=>String(text).trim()==="";
  const handleChangeText=(text)=>{
      setQuery(text);
  }
  const handleSubmit=async()=>{
    const idUser = dataAdmin['idUser'];
      if (checkEmpty(query)) {
          setError({
              message : "Campo Vacío",
          })
          setTimeout(()=>{
              setError(null);
          },4000)
          return;
      }
      setLoading(true);
      const responseServer = await validateAdminPasswordForBox(idUser, query);
      const jsonResponseServer = await responseServer.json();
      if (jsonResponseServer['error']) {
        setError({
            message : jsonResponseServer['message']
        });
        setTimeout(()=>{
            setError(null);
        },4000);
        setLoading(false);
        return;
      }
      setLoading(false);

      changeValidateAdmin();
      if (dataBoxesOpen.length > 0) {
        router.push("boxprocess/cierreCaja");
        return;
      }
      if (existeCajasAbiertas) {
        router.push("boxprocess/home");
        return;
      }

      router.push("boxprocess/tiendaCaja");

    }
  return (
    <OverlayModal styleMainContainer={{marginTop:Constants.statusBarHeight}} style={{width:270,paddingVertical : 10, paddingHorizontal : 7}} close={false}>
    <StyleTextTitle style={{marginVertical:7, justifyContent:'center'}}>Clave Administrador</StyleTextTitle>
    <StyleInputText  secureTextEntry={true} onChangeText={handleChangeText} placeholder='Ingresa la clave'></StyleInputText>
    {error ? <StyleText style={styles.errorStyle}>{error.message}</StyleText>:null}
    <BasicButton disabled={loading} handleSubmit={handleSubmit}>{loading ? <ActivityIndicator/> : "Validar"}</BasicButton>
    </OverlayModal>
  )
};
const styles = StyleSheet.create({
    "errorStyle":{
        color:COLORS.red,
        fontWeight:'bold',
        marginVertical: 7
    }
})