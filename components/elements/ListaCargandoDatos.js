import { View, Text, useWindowDimensions, FlatList } from 'react-native'
import React from 'react'
import { Skeleton } from 'moti/skeleton';

export default function ListaCargandoDatos() {
    const {width} = useWindowDimensions();
    const listaVacia = Array.from({length : 5},()=>null);

  return (
    <View style={{marginTop:10}}>
        <FlatList
            data={listaVacia}
            renderItem={(_)=><Skeleton  height={80} radius={10} colorMode='light'width={width-20} />}
            ItemSeparatorComponent={()=><Text></Text>}
        />
    </View>
  )
}