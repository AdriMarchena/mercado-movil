import { Alert, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import { COLORS } from '../../../../assets/theme/theme';
import { TextInput } from 'react-native';
import { useAdminGlobalContext } from '../../../../Context/GlobalStateAdmin';
import {fetchEmailSender} from '../../../../services/fetchEmailSender';

export default function Page() {
    const useAdmin = useAdminGlobalContext();
    const [sendEmail, setsendEmail] = useState(false);
    const [timeVerification, setTimeVerification] = useState(120);
    const [error, setError] = useState(null);
    const [textInputVerification, setTextInputVerification] = useState({
        box1:"",
        box2:"",
        box3:"",
        box4:"",
        box5:"",
        box6:"",        
    })
    const inputsBox = [
        {inputText : "box1", value:textInputVerification.box1},
        {inputText : "box2", value:textInputVerification.box2},
        {inputText : "box3", value:textInputVerification.box3},
        {inputText : "box4", value:textInputVerification.box4},
        {inputText : "box5", value:textInputVerification.box5},
        {inputText : "box6", value:textInputVerification.box6},
    ]
    const inputRefs = useRef([]);

    const handleChangeText =(text, input, idx)=>{
        setTextInputVerification(prev=>({
            ...prev,
            [input]:text.replace(/[^0-9]/g, '')
        }))
        if (text.length !== 0) {
            return inputRefs?.current[idx+1]?.focus()
        }
        return inputRefs?.current[idx-1]?.focus()
    }
    const handleBackSpace =(evt, idx)=>{
        const { nativeEvent } = evt;
        if (nativeEvent.key === "Backspace") {
            handleChangeText('', idx)
        }
    }
    useEffect(()=>{
        async function sendEmailCode() {
            if (!useAdmin.dataAdmin.email) {
                Alert.alert("Email inválido")
                return;                
            }
            if(timeVerification>0){
                setTimeout(()=>setTimeVerification(timeVerification-1),1000);
                if (!sendEmail) {
                    console.log("Se envío mensaje al correo : ", useAdmin.dataAdmin.email);                    
                    setsendEmail(true);
                    await fetchEmailSender(useAdmin.dataAdmin.nameAdmin, useAdmin.dataAdmin.email);

                }
            }
        }
        sendEmailCode();
    },[timeVerification]);

    function clearData() {
        setTimeVerification(0);
        setTextInputVerification({
        box1:"",
        box2:"",
        box3:"",
        box4:"",
        box5:"",
        box6:"",        
        });
    }

    const resendCode=()=>{
        setTimeVerification(120);
        setsendEmail(false);
    }
    const verifyCode=()=>{
        // const emptyBlock =Object.values(textInputVerification).filter(val=>val.length===0);
        // if (emptyBlock.length>0) {
        //     setError("Complete los espacios en blanco");
        //     setTimeout(()=>{
        //         setError(null);
        //     },3000);
        //     return;
        // }
        clearData()
        useAdmin.pushToConfigPassword()
    }   
  return (
    <SafeAreaView style={{height:"100%",backgroundColor:COLORS.blanco}} >
        <View style={{width:"100%", marginVertical:20, paddingTop:10, paddingHorizontal:30}} >
            <Text style={{fontSize:30,color:COLORS.negro,fontWeight : "bold"}}>Registro</Text>
        </View>
        <View>
            <Text style={{paddingHorizontal:30, width:"100%", marginTop:5, marginBottom:10}}>
                Ingresa el código de verificación enviado al correo electrónico : <Text style={{fontWeight:"bold"}}>{String(useAdmin.dataAdmin.email)}</Text>
            </Text>
        </View>
        <View style={{flexDirection:'row', width:"100%", justifyContent:'center', alignItems:'center', height:80, marginVertical:10, marginBottom:15}}>
            {inputsBox.map((item, index)=>(
                <TextInput
                    key={index}
                    ref={ref=>{
                        if (ref && !inputRefs.current.includes(ref)) {
                            inputRefs.current = [...inputRefs.current, ref];

                        }
                    }}
                    style={{width:50, height:60, borderWidth:1, borderColor:error ? COLORS.red : COLORS.negro, shadowColor:error && COLORS.red, shadowOffset:error && {width:0, height:1}, shadowOpacity:error && 0.22, shadowRadius:2.22, elevation:error && 3, marginHorizontal:5, fontSize:24, textAlign:'center'}}
                    maxLength={1}
                    contextMenuHidden
                    selectTextOnFocus
                    editable={true}
                    value={item.value}
                    keyboardType="decimal-pad"
                    testID={`OTPInput-${index}`}
                    onChangeText={(text)=>handleChangeText(text, item.inputText, index)}
                    onKeyPress={evt => handleBackSpace(evt, index)}
                />
            ))}
        </View>
        {error && <View style={{width:"100%", height:40, paddingHorizontal:30}}><Text style={{color:COLORS.red, fontWeight:'bold'}}>{error}</Text></View>}
        <View style={{width:"100%", justifyContent:'center', alignItems:'center', paddingHorizontal:30, marginTop:10}}>
                <TouchableOpacity onPress={verifyCode} style={{width:"100%",  paddingVertical:15, backgroundColor:COLORS.naranja, justifyContent:'center', alignItems:'center'}}>
                    <Text style={{color:COLORS.blanco,fontSize:16, fontWeight:'bold'}}>Verificar {timeVerification> 0 ? `(${timeVerification}s)` : ''}</Text>
                </TouchableOpacity>
                {
                    timeVerification <= 0 && <View style={{width:"100%", justifyContent:"center", alignItems:"center", marginTop:10}}>
                        <Text style={{color:COLORS.negro}}>¿No has recibido el código? <TouchableOpacity onPress={resendCode} ><Text style={{fontWeight:'bold', textDecorationLine:'underline', color:COLORS.negro}}>Reenviar</Text></TouchableOpacity></Text>
                    </View>
                }
        </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({});