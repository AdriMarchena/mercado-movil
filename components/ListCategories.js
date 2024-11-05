import React from 'react'
import { FlatList } from 'react-native'
import {BoxCategorie} from './elements'
import { COLORS } from '../assets/theme/theme'
export default function ListCategories({data, setValueCategorie, valueCategorie}) {
    const renderItem=({item})=>{
      const handleClick = ()=>{
        setValueCategorie(item.id);
      }
        return(
            <BoxCategorie
              item={item}
              idSelected={valueCategorie}
              onPress={handleClick}
            />)
      }
  return (
    <FlatList
      style={{paddingVertical:10}}
        data={data}
        renderItem={renderItem}
        numColumns={1}
        keyExtractor={(item)=>item.id}
        nestedScrollEnabled={true}
        />
  )
};