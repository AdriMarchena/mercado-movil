import { View, Text, StyleSheet, TouchableWithoutFeedback } from 'react-native'
import React , {useState}from 'react'
import StyleTextInput from './styleTextInput';
import { COLORS } from '../../assets/theme/theme';
import { MaterialCommunityIcons, AntDesign } from '@expo/vector-icons';
import StyleView from './styleView';
import { ActivityIndicator } from 'react-native';
const CheckDocument=({validDocument})=>{
    if (validDocument.status === "wait") {
        return null;
    }
    if (validDocument.valid) {
        return <AntDesign name="checkcircle" size={18} color={COLORS.verde_acuarela} />
    }
    return <AntDesign name="exclamationcircle" size={18} color={COLORS.red} />

}   

export default function InputTextSunatForm({ style,loading=false, changeDataAdmin,getDataAdminSUNAT,validDocument,inputText, ...props}) {
    return (
    <View style={styles.mainContainer}>
        <StyleView style={style} >
            <AntDesign name="idcard" size={16} color={COLORS.negro} />
            <StyleTextInput changeDataAdmin={changeDataAdmin} onEndEditing={getDataAdminSUNAT}  inputText={inputText}  {...props} />
            <Text style={{marginRight:5}}>{<CheckDocument validDocument={validDocument} />}</Text>
        </StyleView>
    </View>
  )
};
const styles = StyleSheet.create({
    "icon":{
        color : COLORS.white
    },
    "buttonStyle":{
        display : "flex",
        flexDirection : "row",
        alignItems : "center",
        justifyContent : "center",
        backgroundColor : COLORS.red,
        paddingHorizontal : 15,
        paddingVertical : 12,
        borderRadius : 5,
        marginLeft : 10,
        marginTop : -10
    },
    "mainContainer":{
        width : "100%",
        display : 'flex',
        flexDirection : "row",
        justifyContent : "center",
        alignItems : "center",
    },
    "viewInput":{
        width : "100%"
    },
    "textStyle":{
        color : COLORS.white,
        fontWeight : 'bold'
    }
})