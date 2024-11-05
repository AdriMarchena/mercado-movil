import { View, Text, Alert } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import ContextBox from './ContextBox'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getBoxesOpen, getCurrentBoxesByIdAdmin, getDetailVentasByIdCaja, getSumTotalVentasByIdCaja } from '../services/fetchDataBoxes';

export function useBoxGlobalContext() {
  return useContext(ContextBox);
}

export default function GlobalStateBox({children}) {
  const [initialMoney, setInitialMoney] = useState(0);
  const [sales, setSales] = useState(0);
  const [currentChange, setCurrentChange] = useState(null)
  const [hasValidateAdmin, setHasValidateAdmin] = useState(false);
  const [listStores, setListStores] = useState([]);
  const [loading, setLoading] = useState(false);
  const [montoApertura, setMontoApertura] = useState(null);
  const [nameStoreSelected, setNameStoreSelected] = useState("");
  const [boxesOpen, setBoxesOpen] = useState([]);
  const [detailVentasxBox, setDetailVentasxBox] = useState(null);
  const [sumTotalVentas, setSumTotalVentas] = useState(null);
  const [sumTotalEfectivo, setSumTotalEfectivo] = useState(null);
  const [sumTotalTarjetas, setSumTotalTarjetas] = useState(null);
  const [sumTotalYape, setSumTotalYape] = useState(null);
  const [sumTotalPlin, setSumTotalPlin] = useState(null);
  const [dataBoxesOpen, setDataBoxesOpen] = useState([]);
  const [hasBoxesOpen, setHasBoxesOpen] = useState(false);
  const [montoCierreCaja, setMontoCierreCaja] = useState(0);
  const [actualizarData, setActualizarData] = useState(false);
  const [existeCajasAbiertas, setExisteCajasAbiertas] = useState(false);
  const [mostrarAlertaAperturaCaja, setMostrarAlertaAperturaCaja] = useState(false);
  const handleAddSales=()=>{

  }
  const saveMontoCierreCaja=(dataMontoCierreCaja)=>{
    setMontoCierreCaja(dataMontoCierreCaja);
  }
  const changeVisibleAlertAperturaCaja=(estado=true)=>{
    setMostrarAlertaAperturaCaja(estado);
  }
  const actualizarDataCaja=async()=>{
    setActualizarData(!actualizarData);
  }
  const saveDataBoxesOpen=(boxesOpen)=>{
    setDataBoxesOpen(boxesOpen);
  }
  const changeValidateAdmin=()=>{
    setHasValidateAdmin(true);
  }
  const saveCurrentChange=async(currentChangeMoney)=>{
    setCurrentChange(currentChangeMoney);
    // await AsyncStorage.setItem(`changeMoney-${fecha}`);
  }
  const saveStoreSelected=(storeSelected)=>{
    setListStores(storeSelected);
  }
  const saveNameStoreSelected=(nameStore)=>{
    setNameStoreSelected(nameStore);
  }
  const saveDetailVentas=(detailVentas)=>{
    setDetailVentasxBox(detailVentas);
  }
  const saveSumTotalVentas=(totalVentas)=>{
    setSumTotalVentas(totalVentas);
  }
  const saveSumTotalEfectivo=(totalEfectivo)=>{
    setSumTotalEfectivo(totalEfectivo);
  }
  const saveSumTotalTarjetas=(totalTarjetas)=>{
    setSumTotalTarjetas(totalTarjetas);
  }
  const saveSumTotalYape=(totalYape)=>{
    setSumTotalYape(totalYape);
  }
  const saveSumTotalPlin=(totalPlin)=>{
    setSumTotalPlin(totalPlin);
  }
  const saveListStores=(listStores)=>{
    setListStores(listStores);
  }
  const saveExisteCajasAbiertas=(existeCajasAbiertas)=>{
    setExisteCajasAbiertas(existeCajasAbiertas)
  }
  const removeBoxOpen=(idBoxOpen)=>{
    const nuevaListaBoxOpen = dataBoxesOpen.filter(box=>box!=null).filter(box=>box['idCaja']!==idBoxOpen);
    setDataBoxesOpen(nuevaListaBoxOpen);
  }
  const llamarDataCajaPorIdTienda=async(idTienda)=>{
    const idCaja = boxesOpen.filter(caja=>caja['Tienda_idTienda']==idTienda)[0]['idCaja'];
    const nuevoMontoApertura = boxesOpen.filter(caja=>caja['Tienda_idTienda']==idTienda)[0]['detalleEfectivoInicial']
    const responseDetailVenta = await getDetailVentasByIdCaja(idCaja);
    const jsonDetailVentas = await responseDetailVenta.json();

    const responseSumTotalVentas = await getSumTotalVentasByIdCaja(idCaja);
    const jsonSumTotalVentas =await responseSumTotalVentas.json();
    const messageSumTotalVentas = jsonSumTotalVentas['message'];

    setMontoApertura(nuevoMontoApertura)
    setDetailVentasxBox(jsonDetailVentas['message']);
    setSumTotalVentas(messageSumTotalVentas['totalVentas'] ? messageSumTotalVentas['totalVentas'] : 0);
    setSumTotalEfectivo(messageSumTotalVentas['totalVentasEfectivo'] ? messageSumTotalVentas['totalVentasEfectivo']: 0);
    setSumTotalTarjetas(messageSumTotalVentas['totalVentasTarjeta'] ? messageSumTotalVentas['totalVentasTarjeta'] : 0);
    setSumTotalYape(messageSumTotalVentas['totalVentasYape'] ? messageSumTotalVentas['totalVentasYape']: 0);
    setSumTotalPlin(messageSumTotalVentas['totalVentasPlin'] ? messageSumTotalVentas['totalVentasPlin'] : 0);

  }
  const saveMontoApertura=(nuevoMontoApertura)=>{
    setMontoApertura(nuevoMontoApertura)
  }
  return (
    <ContextBox.Provider value={{
      actualizarData,
      mostrarAlertaAperturaCaja, changeVisibleAlertAperturaCaja,
      saveDataBoxesOpen,
      montoCierreCaja,
      saveMontoCierreCaja,
      existeCajasAbiertas, 
      saveExisteCajasAbiertas,
      saveListStores,removeBoxOpen,
      hasBoxesOpen, dataBoxesOpen,
      saveMontoApertura,montoApertura,
      llamarDataCajaPorIdTienda,
      sumTotalEfectivo, sumTotalTarjetas, 
      sumTotalYape, sumTotalPlin, 
      saveSumTotalEfectivo, saveSumTotalTarjetas, 
      saveSumTotalYape, saveSumTotalPlin,sumTotalVentas, 
      saveSumTotalVentas, detailVentasxBox, 
      saveDetailVentas,boxesOpen,saveNameStoreSelected,
      nameStoreSelected,saveStoreSelected,listStores,
      changeValidateAdmin,hasValidateAdmin,
      saveCurrentChange, currentChange,
      initialMoney, handleAddSales, 
      sales, actualizarDataCaja}}>
      {children}
    </ContextBox.Provider>
  )
};