import { View, Text, FlatList, useWindowDimensions } from 'react-native'
import React from 'react'
import { COLORS } from '../assets/theme/theme'
import { Skeleton } from 'moti/skeleton'

export default function ListaCargandoDatosVertical({title, styles, numColumns=1, filas=4}) {
    const {width}=useWindowDimensions();
    const listaVacia = Array.from({length : filas},(_)=>null)
    return (
    <View style={[{flex:1, paddingHorizontal:30, paddingVertical:20},{...styles}]}>
      <Text style={{fontSize:22, color:COLORS.negro, fontWeight:'bold', marginBottom:10}}>{title}</Text>
        <View>
            <FlatList
                data={listaVacia}
                renderItem={(_)=><View style={{marginHorizontal:10}}><Skeleton height={250}  radius={10} colorMode='light' width={width-250} /></View>}
                numColumns={numColumns}
                ItemSeparatorComponent={()=><Text></Text>}
                showsVerticalScrollIndicator={false}
            />
        </View>
    </View>
  )
};