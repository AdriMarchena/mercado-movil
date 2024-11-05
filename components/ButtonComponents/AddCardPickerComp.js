import { View, Text, StyleSheet, TouchableOpacity, FlatList } from 'react-native'
import React, { useState } from 'react'
import { StyleText, StyleTextSubTitle, StyleTextTitle } from '../TextComponents'
import { Entypo } from '@expo/vector-icons'
import { COLORS } from '../../assets/theme/theme'
import { router } from 'expo-router'
import { CardPressable } from '../CardComponents'
import { OverlayComponent } from '../OverlayComponents'

export default function AddCardPickerComp({titleComponent, IconCard=null, titleOverlay, changeDataSelect, data, path}) {
    const dataSeleccionada = data.filter((item)=>item.seleccionado)[0];
    const [showDisplay, setShowDisplay] = useState(false);
    const handleChange=()=>{
        setShowDisplay(!showDisplay);
    }
    return (
    <View style={styles.mainContainer}>
        <View style={styles.topContainer}>
            <StyleTextSubTitle>{titleComponent}</StyleTextSubTitle>
            <TouchableOpacity onPress={()=>router.push(path)} style={styles.buttonStyle}>
                <Entypo name="plus" size={16} color={COLORS.azul} />
            </TouchableOpacity>
        </View>
        <View>
            {data.length > 0 ? 
                <CardPressable handlePress={handleChange}>
                    <View>
                        {
                            IconCard
                        }
                    </View>
                    <View style={{marginHorizontal:10}}>
                        <StyleTextSubTitle>{dataSeleccionada['nombre']}</StyleTextSubTitle>
                        <StyleText><StyleText style={{fontWeight:'bold'}}>{String(dataSeleccionada['documento']).length !== 11 ? "DNI :" : "RUC :" }</StyleText> <StyleText>{dataSeleccionada['documento']}</StyleText></StyleText>
                    </View>
                </CardPressable>
                : <View style={{width:"100%", borderRadius:5, height:60, marginTop:10, backgroundColor:COLORS.negro_opaco, justifyContent:'center', alignItems:'center'}}>
                    <StyleTextSubTitle style={{color : COLORS.blanco}}>No hay data</StyleTextSubTitle>
                </View>
            }

        </View>
        {
                showDisplay ? 
                <OverlayComponent styleComponent={styles.overlay} changeVisible={handleChange}>
                    <StyleTextTitle>{titleOverlay}</StyleTextTitle>
                    <View style={{marginTop:15}}>
                        <FlatList
                            data={data}
                            renderItem={({item, index})=><CardPressable style={[item.seleccionado && styles.cardStyle]}  handlePress={()=>{
                                changeDataSelect(index)
                                handleChange()
                            }}>
                            <View>
                                {
                                    IconCard
                                }
                            </View>
                            <View style={{marginHorizontal:10}}>
                                <StyleTextSubTitle>{item['nombre']}</StyleTextSubTitle>
                                <StyleText><StyleText style={{fontWeight:'bold'}}>{String(item['documento']).length !== 11 ? "DNI :" : "RUC :" }</StyleText> <StyleText>{item['documento']}</StyleText></StyleText>
                            </View>
                            </CardPressable>}
                            showsHorizontalScrollIndicator={false}
                            ItemSeparatorComponent={()=><Text></Text>}
                        />
                    </View>
                </OverlayComponent> 
                : null
            }
    </View>
  )
};
const styles = StyleSheet.create({
    "mainContainer":{
        paddingVertical : 10,
        width:"100%",
        position:'relative'
    },
    "topContainer":{width:"100%",flexDirection:'row', alignItems:'center', justifyContent:'space-between', paddingVertical:5},
    "buttonStyle":{
        backgroundColor :COLORS.naranja,
        padding:10, 
        borderRadius:5,
    },
    "overlay":{
        paddingTop : 10
    },
    "cardStyle":{
        backgroundColor : COLORS.verde_acuarela_opaco,
        borderColor : COLORS.verde_acuarela,
    }
})