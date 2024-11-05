import { View, Text } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Loading, OverlayValidateAdmin } from '../../../../components'
import { useAdminGlobalContext } from '../../../../Context/GlobalStateAdmin';
import { hayCajasAbiertas, traerCajasDelDiadeHoy } from '../../../../utils/lib/FuncdelProcesoCaja';
import { useBoxGlobalContext } from '../../../../Context/GlobalStateBox';

export default function validateAdmin() {
  const [loading, setLoading] = useState(false);
  const {dataAdmin} = useAdminGlobalContext();
  const {saveExisteCajasAbiertas} = useBoxGlobalContext();
  useEffect(()=>{
    async function fetchDataBoxes() {
      setLoading(true);
      if (dataAdmin!=null) {
        const idUsuario = dataAdmin['idUser'];
        const cajasDeHoy = await traerCajasDelDiadeHoy(idUsuario);
        const existeCajasAbiertas = hayCajasAbiertas(cajasDeHoy);
        saveExisteCajasAbiertas(existeCajasAbiertas);
      }
      setLoading(false);
    }
    fetchDataBoxes();
  },[]);
  if (loading) {
    return (<Loading/>)
  }
  return (
    <OverlayValidateAdmin/>
  )
};