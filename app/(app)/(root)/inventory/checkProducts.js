import { View, Text, FlatList, Image, StyleSheet, TouchableOpacity } from 'react-native'
import React from 'react'
import { useProductGlobalContext } from '../../../../Context/GlobalStateProduct'
import { CardProductStandarHorizontal } from '../../../../components/elements';
import { COLORS } from '../../../../assets/theme/theme';
import { router } from 'expo-router';
import { BasicButton, StyleText, StyleTextTitle } from '../../../../components';



export default function checkProducts() {
    const {products, addProductsInventory, handleDeleteProduct} = useProductGlobalContext();
    const handleSubmit=async()=>{
        await addProductsInventory();
        router.push("inventory/verifyData");
    }
    return (
    <View style={{flex:1, backgroundColor:COLORS.blanco, paddingHorizontal:10, paddingVertical:15}}>
        <Text style={{fontSize:22, color:COLORS.negro, marginHorizontal:20, fontWeight:'bold'}}>Productos añadidos</Text>
        <View style={{paddingVertical:10}}>
            <FlatList
                style={{marginVertical:10}}
                data={products}
                renderItem={({item})=><CardProductStandarHorizontal deleteProduct={handleDeleteProduct} product={item}/>}
                ItemSeparatorComponent={()=><Text></Text>}
            />
        </View>
        <View style={{width:"100%", paddingHorizontal:10}}>
            <BasicButton handleSubmit={handleSubmit} >
                <StyleText style={{fontWeight : 'bold', color : COLORS.blanco}}>Continuar</StyleText>
            </BasicButton>
        </View>
    </View>
  )
};
