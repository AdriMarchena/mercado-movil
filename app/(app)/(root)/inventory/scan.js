import { View, Text, Alert, Button, StyleSheet } from 'react-native'
import React, { useEffect, useState } from 'react'
import {BarCodeScanner} from 'expo-barcode-scanner';
import { COLORS } from '../../../../assets/theme/theme';
import {StyleText} from '../../../../components/elements'
export default function scan() {
    const [hasPersmissions, setHasPersmissions] = useState(null);
    const [text, setText] = useState('');
    const [scanned, setScanned] = useState(false);
    function askForPermissionCamera() {
        (async()=>{
            const {status}= await BarCodeScanner.getPermissionsAsync();
            console.log("Status : ",status);
            setHasPersmissions(status == "granted")
        })()
    }
    const handleScannedText=({type, data})=>{
        setText(data);
        setScanned(true);
        console.log('Type : '+type, 'data : '+data);
    }
    useEffect(()=>{
        askForPermissionCamera();
    },[]);
    if (hasPersmissions==null) {
        return (
            <View style={styles.container}>
                <Text>Esperando a la camara</Text>
            </View>
        )
    }
    if (hasPersmissions==false) {
        return(
            <View style={styles.container}>
                <Text style={{margin:10}}>No hay acceso a la camara</Text>
                <Button title='Dar acceso' onPress={()=>askForPermissionCamera()}></Button>
            </View>
        )
    }
  return (
    <View style={styles.container}>
        <View>
            <StyleText text={"Escaneo código QR o de barras"} style={{fontSize:16}}/>
        </View>
        <View style={styles.barcodebox}>
            <BarCodeScanner
                onBarCodeScanned={scanned ? undefined : handleScannedText}
                style={{ height: 500, width: 400 }}
            />
        </View>
        <Text style={styles.maintext}>{text}</Text>
        {scanned && <Button title={'Escanear de nuevo'} onPress={() => setScanned(false)} color={COLORS.naranja} />}
    </View>
  )
};
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.blanco,
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal : 30
      },
      maintext: {
        fontSize: 16,
        margin: 20,
      },
      barcodebox: {
        alignItems: 'center',
        justifyContent: 'center',
        height: 300,
        width: 300,
        overflow: 'hidden',
        borderRadius: 30,
        backgroundColor: 'tomato'
      }
})