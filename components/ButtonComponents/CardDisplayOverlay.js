import { View, Text, StyleSheet, FlatList } from 'react-native'
import React, { useState } from 'react'
import { StyleTextSubTitle, StyleTextTitle } from '../TextComponents'
import { CardPressable } from '../CardComponents'
import { OverlayComponent } from '../OverlayComponents';
import { COLORS } from '../../assets/theme/theme';

export default function CardDisplayOverlay({title, data,IconCard=null, handleChange, styleOverlay}) {
    const dataSeleccionada = data.filter((item)=>item.seleccionado)[0];
    const [showDisplay, setShowDisplay] = useState(false);
    const handleChangeDisplay=()=>{
        setShowDisplay(!showDisplay);
    }
    return (
    <View style={{marginTop : 15}}>
        <StyleTextSubTitle>{title}</StyleTextSubTitle>
        <CardPressable style={{marginTop:10}} handlePress={handleChangeDisplay}>
            <View>
                {
                    IconCard
                }
            </View>
            <View style={{marginHorizontal:10}}>
                <StyleTextSubTitle>{dataSeleccionada['nombre'] || dataSeleccionada['razSocial'] }</StyleTextSubTitle>
            </View>
        </CardPressable>
        {
            showDisplay ? 
            <OverlayComponent visible={showDisplay} changeVisible={handleChangeDisplay} styleComponent={{paddingTop:10}}>
                <StyleTextTitle>{title}</StyleTextTitle>
                <View style={{marginTop:15}}>
                    <FlatList
                        data={data}
                        renderItem={({item,index})=><CardPressable style={[item.seleccionado && styles.cardStyle]} handlePress={()=>{
                            handleChange(index)
                            handleChangeDisplay()
                            }}>
                            <View>
                                {
                                    IconCard
                                }
                            </View>
                            <View style={{marginHorizontal : 5}}>
                                <StyleTextSubTitle>{item['nombre'] || item['razSocial']}</StyleTextSubTitle>
                            </View>
                        </CardPressable>}
                        ItemSeparatorComponent={()=><Text></Text>}
                    />
                </View>
            </OverlayComponent>
            :null
        }
    </View>
  )
};
const styles = StyleSheet.create({
    "overlay":{
        marginLeft : -30,
        marginTop: -200,

    },
    "cardStyle":{
        backgroundColor : COLORS.verde_acuarela_opaco,
        borderColor : COLORS.verde_acuarela
    }
})