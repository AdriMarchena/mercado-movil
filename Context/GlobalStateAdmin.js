import React, { useContext, useEffect, useState } from 'react'
import ContextAdmin from './ContextAdmin'
import { saveDataAdmin } from '../services/saveData';
import {fetchDataAdminCategories} from '../services/getAdminCategories'
import {router} from 'expo-router';
import { SignInAdmin } from '../services/signInData';
import { checkEmptyFieldsObject } from '../utils/forms/checkEmptyFields';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {  Alert } from 'react-native';
import { checkDocument } from '../utils/admin/fetchDatas';
export function useAdminGlobalContext() {
    return useContext(ContextAdmin);
}

export default function GlobalStateAdmin({children}) {
    const [dataAdmin, setDataAdmin] =useState(null);
    const [tokenAdmin, setTokenAdmin] = useState(null);
    const [isSession, setIsSession] = useState(false);
    const [loadingDataAdmin, setLoadingDataAdmin] = useState(true);
     useEffect(()=>{
      async function getDataStorage() {
        setLoadingDataAdmin(true);
        const data = await AsyncStorage.getItem('admin-data');
        const jsonData = JSON.parse(data); 
        if (jsonData) {
            setDataAdmin(jsonData);
            setIsSession(true);
         } 
        setLoadingDataAdmin(false);

       }
       getDataStorage();
     },[]);
    const getDataAdminStorage =()=>{
      return dataAdmin;
    }
    const updateDataAdmin=(data)=>{
      setDataAdmin(data)
    }
    const updateDataStores=(data)=>{
      const result = {
        ...dataAdmin,
        dataStores : data
      }
      setDataAdmin(result)
    }
    const pushToEmailVerification=(data, setError)=>{
      const check = checkEmptyFieldsObject(data);
      if (check.error) {
        setError({
          type : "submit",
          message : check.message
        });
        setTimeout(()=>{
          setError(null);
        },3000);
        return ;
      }
      setDataAdmin(data);
      router.push("auth/signup/verification");
    }
    const pushDataAdmin=async(dataAdmin, setError)=>{
      console.log(dataAdmin);
      const check = checkEmptyFieldsObject(dataAdmin);
      if (check.error) {
        setError(check.message);
        setTimeout(()=>{
          setError(null);
        },3000);
        return ;
      }
      setDataAdmin({
        username : dataAdmin.username,
        email : dataAdmin.email,
        password : dataAdmin.password
      });
      console.log(dataAdmin.email);
      router.push({
        pathname : "admin/auth/signup/verification/[email]",
        params : {email : String(dataAdmin.email)}
      })
    }
    const pushToConfigPassword =()=>{
      router.push("auth/signup/configPassword");
    }
    const pushToCategories=(password)=>{
      setDataAdmin(prev=>({
        ...prev,
        password
      }))
      router.push("auth/signup/categories");
    }
    const pushDataCategories=(valueCategory)=>{
      const newDataAdmin = {
        ...dataAdmin,
        categorie : valueCategory
      }
      setDataAdmin(newDataAdmin);
      router.push({pathname : "auth/signup/store"})
    }
    const pushDataStore=async(dataStore,setError)=>{
      const check = checkEmptyFieldsObject(dataStore);
      if (check.error) {
        setError(check.message);
        setTimeout(()=>{
          setError(null);
        },3000);
        return ;
      }
      const checkDoc = await checkDocument(dataStore.document);
      if (checkDoc.error) {
        setError(checkDoc.message);
        setTimeout(()=>{
          setError(null);
        },3000);
        return ;
      }
      const result = {
        ...dataAdmin,
        dataStores : [{
          document : dataStore.document,
          phone : dataStore.phone,
          razSocial : checkDoc.message.nombre || "",
          direction : dataStore.direction,
          startTime : dataStore.startTime,
          endTime : dataStore.endTime
        }]
      }
      setDataAdmin(result);
      router.push({
        pathname : "admin/auth/signup/verification/[phone]",
        params : {phone:dataAdmin.phone}
      })
    }
    const signup=async(idStore)=>{
      const newData = {
        ...dataAdmin,
        idStore
      }
      setLoadingDataAdmin(true);
      const response = await saveDataAdmin(newData);
      const responseJson = await response.json();
      if (responseJson.error) {
        Alert.alert("Error", responseJson.message);
        setLoadingDataAdmin(false);
        return;
      }
      await AsyncStorage.setItem('admin-data', JSON.stringify(responseJson.message));
      setLoadingDataAdmin(false);
      setIsSession(true);
      setDataAdmin(responseJson['message'])
    }
    const handleSubmit=async (dataStores)=>{
      const bodyDataAdmin = {
        ...dataAdmin,
        dataStores
      }
      const response = await saveDataAdmin(bodyDataAdmin);
      const jsonResponse = await response.json();

      if (jsonResponse.error) {
        Alert.alert("Error",jsonResponse['message']);
        console.log(jsonResponse['message']);
        return;
      }
      setTokenAdmin(jsonResponse.message);
      setIsSession(true);
    }
    const signIn=async(dataAdmin={}, setError)=>{
      setLoadingDataAdmin(true)
      const check = checkEmptyFieldsObject(dataAdmin);
      if (check.error) {
        setLoadingDataAdmin(false)
        setError({
          type : "submit",
          message :check.message
        });
        setTimeout(()=>{
          setError(null)
        },3000)
        return;
      }
      const response = await SignInAdmin(dataAdmin);
      const jsonResponse = await response.json();
      if (jsonResponse.error) {
        setLoadingDataAdmin(false)
        setError({
          type : "password",
          message : jsonResponse.message
        });
        Alert.alert("Error",jsonResponse['message'])
        setTimeout(()=>{
          setError(null)
        },3000);
        return;
      }
      const jsonNewAdmin = JSON.stringify(jsonResponse.message)
      await AsyncStorage.setItem('admin-data', jsonNewAdmin);
      setLoadingDataAdmin(false);
      setDataAdmin(jsonResponse.message);
      setIsSession(true);
      router.replace("/home");
    }
    const signOut=async()=>{
      setLoadingDataAdmin(true);
      await AsyncStorage.removeItem('admin-data');
      await AsyncStorage.removeItem(`default-store-idAdmin-${dataAdmin['idUser']}`);
      
      setDataAdmin(null);
      setIsSession(false);
      setLoadingDataAdmin(false );
      router.replace("/auth")
    }
    const fetchDataCategories=async()=>{
      const categoriesReponse = await fetchDataAdminCategories();
      const jsonCategorie = await categoriesReponse.json();
      return jsonCategorie.message;
    }
  return (
    <ContextAdmin.Provider value={{pushToEmailVerification,pushToCategories,pushToConfigPassword,loadingDataAdmin, getDataAdminStorage,pushDataAdmin,signOut,signup,pushDataStore,pushDataCategories,signIn,isSession,tokenAdmin,dataAdmin,handleSubmit, fetchDataCategories,updateDataAdmin, updateDataStores}}>
        {children}
    </ContextAdmin.Provider>
  )
};