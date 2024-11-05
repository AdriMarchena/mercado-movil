import { View, Text, useWindowDimensions, Pressable, FlatList, TouchableOpacity, Image } from 'react-native'
import React, { useState } from 'react'
import { COLORS } from '../assets/theme/theme'
import { AntDesign, Entypo } from '@expo/vector-icons';
import { router } from 'expo-router';
import { OverlayComponent } from './OverlayComponents';

function CardDisplayData({data, Icon, handleChangeData, type, labelId}) {
    const handlePress=()=>{
        handleChangeData(type, data[labelId]);
    }
    return(
        <TouchableOpacity onPress={handlePress} style={[{width:"100%", borderWidth:1, borderRadius:5, backgroundColor:COLORS.blanco, borderColor:COLORS.negro, paddingHorizontal:7, paddingVertical:15, flexDirection : 'row', alignItems:'center'}, data.seleccionado && {backgroundColor:COLORS.verde_acuarela_opaco, borderColor:COLORS.verde_acuarela}]}>
            <View>
                {
                    Icon ? 
                    Icon : 
                    <Image
                        source={{
                            uri : data ? data.urlImage : null
                        }}
                        height={60}
                        width={60}
                        style={{borderRadius:30}}    
                    />
                }
            </View>
            <View style={{marginHorizontal:5}}>
                <Text style={{color:COLORS.negro, fontWeight:'bold', fontSize:16, maxWidth : 170}}>{data&&data.nombre || data.razSocial}</Text>
                <Text>{data&&data.documento || data.direccion}</Text>
            </View>
        </TouchableOpacity>
    )
}

export default function DisplayOptionScreen({listData, handleChangeDisplayData, Icon, title, handleDisplayOptions, type, labelId}) {
    const {height, width} = useWindowDimensions();
    const handlePress=()=>{
        handleDisplayOptions(type);
    }
  return (
    <OverlayComponent
        styleComponent={{paddingTop : 30}}
        changeVisible={handlePress}>
         <View style={{width:"100%", flexDirection:'row', justifyContent:'space-between', alignItems:'center', paddingVertical:5}}>
                <Text style={{color:COLORS.negro, fontWeight:'bold', fontSize:26, marginBottom:15}}>{title}</Text>
                <TouchableOpacity onPress={()=>router.push("suppliers/addSupplier")} style={{backgroundColor:COLORS.naranja, padding:5, borderRadius:10, justifyContent:'center'}}>
                    <Entypo name="plus" size={16} color={COLORS.azul} />
                </TouchableOpacity>
            </View>
            <View style={{height : height - 240, paddingVertical:10}}>
            <FlatList
                data={listData}
                renderItem={({item})=><CardDisplayData Icon={Icon} type={type } labelId={labelId} handleChangeData={handleChangeDisplayData} data={item}/>}
                showsHorizontalScrollIndicator={false}
                ItemSeparatorComponent={()=><Text></Text>}
            />
            </View> 
    </OverlayComponent>
  )
};