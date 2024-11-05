import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native'
import React from 'react'
import OverlayComponent from './OverlayComponent'
import { StyleText, StyleTextTitle } from '../TextComponents'
import { MaterialIcons } from '@expo/vector-icons'
import { COLORS } from '../../assets/theme/theme'
import { Feather } from '@expo/vector-icons';
function ItemOverlayCantidadesBox({id,cantidad, denominacion, total, eliminarCantidad}) {
    const eliminarItem=()=>{
        eliminarCantidad(id);
    }
    return(
        <View style={{flexDirection : 'row', alignItems:'center'}}> 
            <View style={{flex :1,
            marginRight : 5, 
                paddingHorizontal : 5, paddingVertical : 5, borderRadius : 10, borderWidth : 1, borderColor : COLORS.negro, flexDirection : 'row', justifyContent:'space-evenly', marginTop : 10, 
                alignItems : 'center'}}>
                <MaterialIcons name='money' size={16} color={COLORS.naranja} />
                <View style={styles.rowBody}>
                    <StyleText style={{width : 100}}>{cantidad}</StyleText>  
                    <StyleText>S/.{denominacion} : </StyleText>  
                </View>
                <View >
                    <StyleText style={{fontWeight:'bold'}}>S/.{total}</StyleText>
                </View>
            </View>
            <TouchableOpacity onPress={eliminarItem}>
                <Feather name="trash" size={24} color={COLORS.naranja} />
            </TouchableOpacity>
        </View>
    )
}

export default function OverlayCantidadesBox({changeVisible,data=[], eliminarCantidad}) {
    return (
    <OverlayComponent styleComponent={{paddingTop:20}} changeVisible={changeVisible}>
        <StyleTextTitle>Cuadre de Caja</StyleTextTitle>
        <View style={styles.rowBody}>
            <StyleText style={{width : 150}}>Cantidad</StyleText>
            <StyleText>Denominación</StyleText>
        </View>
        <View>
            <FlatList
                data={data}
                renderItem={({item, key})=><ItemOverlayCantidadesBox eliminarCantidad={eliminarCantidad} {...item} key={key}/>}
            />
        </View>
    </OverlayComponent>
    )
};
const styles=StyleSheet.create({
    "rowBody":{
        flexDirection : 'row',
        marginVertical :5,
        
    },
})