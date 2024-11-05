import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native'
import React from 'react'
import { COLORS } from '../assets/theme/theme'

export default function CardList({seleccionado, title, description, Icon, handleChangeData, idCard}) {
    const handlePress=()=>{
        handleChangeData(idCard);
    }
    return (
    <TouchableOpacity
    onPress={handlePress}
    style={[styles.CardStyle, seleccionado && styles.CardStyleSelect]}>
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
                    style={{borderRadius : 30}}
                />
            }
        </View>
        <View style={{marginHorizontal : 5}}>
            <Text style={styles.StyleTextTitle}>{title}</Text>
            <Text style={styles.StyleTextDescription}>{description}</Text>
        </View>
    </TouchableOpacity>
    )
};
const styles = StyleSheet.create({
    "CardStyle":{
        width:"100%", 
        borderWidth:1, 
        borderRadius:5, 
        backgroundColor:COLORS.blanco, 
        borderColor:COLORS.negro, 
        paddingHorizontal:7, 
        paddingVertical:15,
        flexDirection : 'row',
        alignItems:'center',

    }, 
    "CardStyleSelect":{
        backgroundColor:COLORS.verde_acuarela_opaco, 
        borderColor:COLORS.verde_acuarela
    },
    "StyleTextTitle":{
        color:COLORS.negro, 
        fontWeight:'bold', 
        fontSize:18
    },
    "StyleTextDescription":{
        color:COLORS.negro
    }
})