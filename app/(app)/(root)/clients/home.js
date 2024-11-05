import { View, Text, StyleSheet, FlatList, Alert } from 'react-native'
import React, { useEffect, useState } from 'react'
import { BasicButton, CardClient, ListaCargandoDatos, SearchInputText, Separator, StyleTextSubTitle, StyleTextTitle } from '../../../../components'
import { router } from 'expo-router'
import Constants from 'expo-constants';
import { COLORS } from '../../../../assets/theme/theme';
import { AntDesign } from '@expo/vector-icons';
import { useVentaGlobalContext } from '../../../../Context/GlobalStateVenta';
import { useAdminGlobalContext } from '../../../../Context/GlobalStateAdmin';
import { getClientByIdUser } from '../../../../services/getDetailVenta';

export default function home() {
    const {listClients, setClientsListData, changeQueryClient, saveHistoryListClient} = useVentaGlobalContext();
    const {dataAdmin} = useAdminGlobalContext();
    const [loading, setLoading] = useState(false);
    useEffect(()=>{
      async function fetchDataClientes() {
        if (dataAdmin!=null) {
          setLoading(true);
          const idUser =  dataAdmin['idUser'];

          const responseClients = await getClientByIdUser(idUser);
          const jsonResponseClients = await responseClients.json();

          if (jsonResponseClients['error']) {
            Alert.alert("Error",jsonResponseClients['message']);
            setLoading(false);
            return;
          }
          saveHistoryListClient(jsonResponseClients['message']);
          setClientsListData(jsonResponseClients['message']);
          setLoading(false);
        }
      }
      fetchDataClientes()
    },[]);
    const goToAddClient = ()=>{
        router.push("clients/addClient");
    }
    if (loading) {
      return(
        <View style={styles.mainContainer}>
          <ListaCargandoDatos
            title={"Cartera de Clientes"}
            numColumns={1}
            filas={4}
            
          />
        </View>
      )
    }
    return (
      <View style={styles.mainContainer}>
        <View style={styles.rowStyle}>
          <StyleTextTitle>Cartera de Clientes</StyleTextTitle>
        </View>
        <View>
          <SearchInputText showMic={true} changeRecording={setLoading} changeTranscript={changeQueryClient} changeQuery={changeQueryClient} />
        </View>
        {
          listClients.length > 0 ?
          <View style={{flex : 1, paddingHorizontal : 10}}>
            <FlatList
              data={listClients}
              renderItem={({item})=><CardClient dataClient={item} />}
              ItemSeparatorComponent={()=><Separator/>}
            />
          </View>
          : 
          <View style={{flex : 1, justifyContent:'center', alignItems:'center'}}>
            <StyleTextSubTitle>Aún no tienes clientes</StyleTextSubTitle>
          </View>  
      
      }
      <View style={{position : 'absolute', bottom : 20,right : 20}}>
        <BasicButton style={styles.styleButtonAdd} handleSubmit={goToAddClient}><AntDesign name="plus" size={16} color={COLORS.blanco} /></BasicButton>
      </View>

      </View>
    )
};

const styles = StyleSheet.create({
  "mainContainer":{
    flex :1,
    backgroundColor : COLORS.blanco,
    paddingHorizontal : 20,
    paddingVertical : 15
  },
  "rowStyle":{
    flexDirection : 'row',
    justifyContent: 'space-between',
    alignItems : 'center',
    height : 60
  },
  "styleButtonAdd":{
    paddingHorizontal : 0, 
    borderRadius : 100,
    width :60,
    height : 60,
  }
})