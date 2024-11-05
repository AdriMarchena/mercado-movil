import { View, Text, SafeAreaView, StyleSheet, TouchableOpacity } from 'react-native'
import React, { useEffect, useRef, useState }  from 'react'
import { COLORS } from '../assets/theme/theme';
import {DropDownCategories, InputPasswordForm, InputTextEmail, InputTextForm, InputTextPhone, InputTextSunat, InputTextUsername} from './elements'
import { ActivityIndicator } from 'react-native';
import { stylesFormLogin } from '../assets/theme/stylesForm';
import { StyleTextSubTitle } from './TextComponents';

export default function FormLogin({title, loading=false,errorAdmin=null,inputs,changeDataAdmin, buttonText=null,saveData, getDataAdminSunat, validDocument={}, onEndEmailInputText, AfterTitleComponent,children}) {
    return (
    <SafeAreaView style={styles.mainContainer}>
       
        <Text style={styles.mainHeader}>{title}</Text>
        {AfterTitleComponent}
        <View style={styles.inputContainer}>
            {
                inputs.map((val,key)=>{
                    if (val.inputText === "password") {
                        return (
                            <View key={key}>
                                <StyleTextSubTitle style={{marginVertical : 5}}>{val.titleInput ? val.titleInput :  "Contraseña"}</StyleTextSubTitle>
                                <InputPasswordForm changeDataAdmin={text=>changeDataAdmin(text, val.inputText)} inputText={val.inputText} {...val}/>
                                {errorAdmin ? errorAdmin.type === "password" || errorAdmin.type==="submit" ? <View style={styles.errorStyleInput}>
                                    <Text style={{color : COLORS.red, fontSize : 16,fontWeight:'bold'}}>Error : {errorAdmin.message}</Text>
                                </View> : null : null}


                            </View>
                        )
                    }
                    if (val.inputText === "document") {
                        return (
                            <View key={key}>
                                <StyleTextSubTitle style={{marginVertical : 5}}>{val.titleInput ? val.titleInput : "Documento"}</StyleTextSubTitle>
                                <InputTextSunat style={errorAdmin ? errorAdmin.type ==="document" || errorAdmin.type === "submit" ? {borderColor : COLORS.red,shadowColor: COLORS.red,shadowOffset: {width: 0,height: 1},shadowOpacity: 0.20,shadowRadius: 1.41,elevation: 2} : {} : {}} loading={loading} getDataAdminSUNAT={getDataAdminSunat} validDocument={validDocument} changeDataAdmin={text=>changeDataAdmin(text, val.inputText)} inputText={val.inputText} keyboardType="decimal-pad" {...val}/>
                                {errorAdmin ? errorAdmin.type === "document" || errorAdmin.type==="submit" ? <View style={styles.errorStyleInput}>
                                    <Text style={{color : COLORS.red, fontSize : 16,fontWeight:'bold'}}>Error : {errorAdmin.message}</Text>
                                </View> : null : null}

                            </View>
                        )
                    }
                    if (val.inputText==="categories") {
                        return <DropDownCategories key={key} fun={val.funDropdown} valueField={val.valueField} labelField={val.labelField}  placeholder={val.placeholder} dataCategorie={val.dataCategories} {...val} />
                    }
                    if (val.inputText==="phone") {
                        return (
                            <View key={key}>
                                <StyleTextSubTitle style={{marginVertical : 5}}>{val.titleInput ? val.titleInput : "Telefono"}</StyleTextSubTitle>
                                <InputTextPhone style={errorAdmin ? errorAdmin.type ==="phone" || errorAdmin.type === "submit" ? {borderColor : COLORS.red,shadowColor: COLORS.red,shadowOffset: {width: 0,height: 1},shadowOpacity: 0.20,shadowRadius: 1.41,elevation: 2} : {} : {}} changeDataAdmin={text=>changeDataAdmin(text, val.inputText)} inputText={val.inputText} {...val}/>
                                {errorAdmin ? errorAdmin.type === "phone" || errorAdmin.type==="submit" ? <View style={styles.errorStyleInput}>
                                    <Text style={{color : COLORS.red, fontSize : 16,fontWeight:'bold'}}>Error : {errorAdmin.message}</Text>
                                </View> : null : null}

                            </View>
                        )
                    }
                    if (val.inputText==="email") {
                        return(
                            <View key={key}>
                                <StyleTextSubTitle style={{marginVertical : 5}}>{val.titleInput ? val.titleInput : "Correo electronico"}</StyleTextSubTitle>
                                <InputTextEmail style={errorAdmin ? errorAdmin.type ==="email" || errorAdmin.type === "submit" ? {borderColor : COLORS.red,shadowColor: COLORS.red,shadowOffset: {width: 0,height: 1},shadowOpacity: 0.20,shadowRadius: 1.41,elevation: 2} : {} : {}} onEndEditing={onEndEmailInputText} changeDataAdmin={text=>changeDataAdmin(text, val.inputText)} inputText={val.inputText} {...val} />
                                {errorAdmin ? errorAdmin.type === "email" || errorAdmin.type==="submit" ? <View style={styles.errorStyleInput}>
                                    <Text style={{color : COLORS.red, fontSize : 16,fontWeight:'bold'}}>Error : {errorAdmin.message}</Text>
                                </View> : null : null}
                            </View>
                        )
                    }
                    if (val.inputText === "username") {
                        return (
                        <View  key={key} style={{flexDirection:'column'}}>
                            <StyleTextSubTitle style={{marginVertical : 5}}>{val.titleInput ? val.titleInput : "Usuario"}</StyleTextSubTitle>
                            <InputTextUsername changeDataAdmin={text => changeDataAdmin(text, val.inputText)} inputText={val.inpuText} {...val} />
                        </View>)
                    }
                    return (
                        <View key={key} >
                            <StyleTextSubTitle style={{marginVertical : 5}}>{val.titleInput ? val.titleInput : ""}</StyleTextSubTitle>
                            <InputTextForm  style={errorAdmin ? errorAdmin.type ==="phone" || errorAdmin.type === "submit" ? {borderColor : COLORS.red,shadowColor: COLORS.red,shadowOffset: {width: 0,height: 1},shadowOpacity: 0.20,shadowRadius: 1.41,elevation: 2} : {} : {}}  changeDataAdmin={text=>changeDataAdmin(text, val.inputText)} inputText={val.inputText} {...val}/>
                            {errorAdmin ? errorAdmin.type === val.inputText || errorAdmin.type === "Submit" ? <View style={styles.errorStyleInput}>
                                    <Text style={{color : COLORS.red, fontSize : 16,fontWeight:'bold'}}>Error : {errorAdmin.message}</Text>
                                </View> : null :null }
                        </View>
                    )                        
                })
            }
        </View>
        {children}
        {!loading ? 
        (buttonText ? 
        <TouchableOpacity onPress={saveData} style={stylesFormLogin.loginButton}>
            <Text style={stylesFormLogin.textStyleLoginButton}>{buttonText}</Text>
        </TouchableOpacity> : null) :
        (buttonText && <View style={styles.loginButton}>
            <ActivityIndicator/>
        </View>)}
    </SafeAreaView>
  )
};
const styles = StyleSheet.create({
    "mainContainer":{
        height : "auto",
        paddingHorizontal : 30,
        marginBottom : 15
    },
    "mainHeader":{
        fontSize:30,
        color:COLORS.negro,
        fontWeight : "bold",
        marginBottom:25
    },
    "labelTextStyle":{
        marginVertical:5, 
        fontWeight:'bold', 
        color :COLORS.negro,
    },
    "inputContainer":{
        paddingVertical : 5,
        marginBottom : 10        
    },
    "icon":{
        marginRight : 7,
        color : COLORS.blue2
    },
    "loginButton":{
        width:"100%",
        backgroundColor : COLORS.naranja,
        color : COLORS.blanco,
        paddingVertical : 15,
        display:"flex",
        borderRadius : 10
    },
    "textStyle":{
        color : COLORS.blanco,
        textAlign:"center",
        fontSize:16,
        fontWeight : "bold",
    },
    "errorStyle":{
        width : "100%",
        height : 30,
        justifyContent : "center",
        alignItems : "center",
        marginBottom : 10
    },
    "errorStyleInput":{
        width : "100%",
        height : 20,
        marginBottom: 10
    }
})