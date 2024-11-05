import { View, Text, useWindowDimensions, ScrollView, StyleSheet } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useLocalSearchParams } from 'expo-router'
import Constants from 'expo-constants';
import { COLORS } from '../../../../../assets/theme/theme';
import { BodySaleSuccess, BottomSaleSuccess, Loading, StyleTextTitle } from '../../../../../components';
import { getDetailVentaByIdVenta, getQrCodeByIdVentaAndidUser } from '../../../../../services/getDetailVenta';
import { useAdminGlobalContext } from '../../../../../Context/GlobalStateAdmin';
import { useVentaGlobalContext } from '../../../../../Context/GlobalStateVenta';
export default function RootLayout() {
    const {idVenta} = useLocalSearchParams();
    const {dataAdmin} = useAdminGlobalContext();
    const {clearStorageData} = useVentaGlobalContext();
    const [loading, setLoading] = useState(true);
    const [detailVenta, setDetailVenta] = useState(null);
    const [dataQr, setDataQr] = useState(null);
    const [dataDownload, setDataDownload] = useState(null);
    useEffect(()=>{
      async function fetchDetailVenta() {
        setLoading(true);
        console.log(idVenta);
          const responseDataDetailVenta = await getDetailVentaByIdVenta(idVenta);
          const jsonResponseDetailVenta = await responseDataDetailVenta.json();
          setDetailVenta(jsonResponseDetailVenta.message);

          const responseQrVenta = await getQrCodeByIdVentaAndidUser(idVenta, dataAdmin['idUser']);
          const jsonResponseQrVenta = await responseQrVenta.json();
          setDataQr(jsonResponseQrVenta.message);
        setLoading(false);
      }
      fetchDetailVenta();
    },[]);
    if (loading) {
      return (<Loading/>)
    }
    return (
      <View style={{flex:1,marginTop:Constants.statusBarHeight,  backgroundColor : COLORS.verde_acuarela, justifyContent:'center', alignItems:'center'}}>
          <View style={{marginVertical : 20, paddingBottom:30, width:"100%", justifyContent:'center', alignItems:'center'}}>
            <StyleTextTitle style={{color : COLORS.blanco}}>Mercado Movil</StyleTextTitle>
          </View>
          <BodySaleSuccess data={detailVenta} dataQr={dataQr}/>
          <BottomSaleSuccess data={dataDownload} clearData={clearStorageData}/>
      </View>
    )
};
