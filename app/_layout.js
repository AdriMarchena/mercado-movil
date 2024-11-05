import React from 'react';
import { Slot } from 'expo-router';
import GlobalStateAdmin from '../Context/GlobalStateAdmin'
import GlobalStateProduct from '../Context/GlobalStateProduct';
import GlobalStateVenta from '../Context/GlobalStateVenta';
import GlobalStateBox from '../Context/GlobalStateBox';


export default function Root() {
  return (
    <GlobalStateProduct>
      <GlobalStateAdmin>
        <GlobalStateVenta>
          <GlobalStateBox>
            <Slot/>
          </GlobalStateBox>
        </GlobalStateVenta>
      </GlobalStateAdmin>
    </GlobalStateProduct>
    
    )
}