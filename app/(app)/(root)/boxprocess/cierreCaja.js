import { View, Text, useWindowDimensions } from 'react-native'
import React, { useState } from 'react'
import Constants from 'expo-constants';
import { useBoxGlobalContext } from '../../../../Context/GlobalStateBox';
import { Loading, OnBoardingViewBoxes, StyleText, StyleTextSubTitle, StyleTextTitle } from '../../../../components';
export default function cierreCaja() {
    const {dataBoxesOpen} = useBoxGlobalContext();
    const { height } = useWindowDimensions();
    const [loading, setLoading] = useState(false);
    if (loading) {
      return(<Loading/>)
    }
    return (
      <View style={[{marginTop : Constants.statusBarHeight, flex : 1, justifyContent:'center', alignItems:'center'}]}>
          <StyleTextTitle>Cajas abiertas ({dataBoxesOpen.length})</StyleTextTitle>
          {
            dataBoxesOpen.length > 0 ?
            <View style={{height : height - 100}}>
              <OnBoardingViewBoxes
              setLoading={setLoading}
                  data={dataBoxesOpen}
              />
            </View> :
            <View style={{flex : 1, justifyContent:'center', alignItems:'center', flexDirection : 'column'}}>
              <StyleTextSubTitle>No hay cajas abiertas</StyleTextSubTitle>
              <StyleText>Regresar al inicio</StyleText>
            </View>
          }
      </View>
    )
};