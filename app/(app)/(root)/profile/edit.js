import { View, Text, Image, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import { COLORS } from '../../../../assets/theme/theme'
import * as FileSystem from 'expo-file-system';
import * as ImagePicker from 'expo-image-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Feather } from '@expo/vector-icons';

import { MotiView } from 'moti';
import { Skeleton } from 'moti/skeleton';

const imgDir = FileSystem.documentDirectory + 'images/'

const ensureDirExists = async()=>{
    const dirInfo = await FileSystem.getInfoAsync(imgDir);
    if (!dirInfo.exists) {
        await FileSystem.makeDirectoryAsync(imgDir, {intermediates:true})
    }
}


export default function edit() {
    const [loading, setLoading] = useState(true);
    const [userData, setUserData] = useState(null);
    const [image, setImage] = useState('');
    useEffect(()=>{
        async function fetchDataStorageUser() {
            setLoading(true);
            const user = await AsyncStorage.getItem("admin-data");
            const jsonUser = JSON.parse(user);
            const idUser = jsonUser.idUser;
            const data = await globalThis.fetch(`https://mercadomovilback.fly.dev/admin/${idUser}`,{
                method:'GET',
                mode:'cors'
            });
            const jsonData = await data.json();
            setUserData(jsonData.message);
            setImage(jsonData.message.urlImagen);
            setLoading(false);
        }
        fetchDataStorageUser();

    },[]);
    const selectImage =async (useLibrary)=>{
        let result;
        const options = {
            mediaTypes : ImagePicker.MediaTypeOptions.Images,
            allowsEditing : true,
            aspect : [4, 3],
            quality : 0.75,
        }
        if (useLibrary) {
            result = await ImagePicker.launchImageLibraryAsync(options);
        }else {
            await ImagePicker.requestCameraPermissionsAsync();

            result = await ImagePicker.launchCameraAsync(options)
        }

        if (!result.canceled) {
            saveImage(result.assets[0].uri);
        }
    }
    const saveImage =async(uri)=>{
        await ensureDirExists();
        const filename = new Date().getTime()+'.jpg';
        const dest = imgDir + filename;
        await FileSystem.copyAsync({from : uri, to : dest});
        setImage(dest);
    }
    if (loading) {
        return (
            <View style={{flex:1, backgroundColor:COLORS.blanco, paddingHorizontal:30}}>
                <View style={{width:"100%", height:80, alignItems:'center', justifyContent:'center'}} >
                    <Skeleton 
                        width={60}
                        height={60}
                        radius={60}
                        colorMode='light'
                    />
                </View>
            </View>
        )
    }
    return (
        <View style={{flex:1, backgroundColor:COLORS.blanco, paddingHorizontal:30}}>
            <View style={{width:"100%", height:80, alignItems:'center', justifyContent:'center'}} >
               <View >
                    <TouchableOpacity onPress={()=>selectImage(true)}>
                        <Image
                        style={{width:70, height:70, borderRadius:70, borderWidth:1, borderColor:COLORS.negro_opaco}}
                        source={{
                            uri : image
                        }}
                        /> 
                    </TouchableOpacity>
                    <View style={{position:'absolute', bottom:0, right:0, marginBottom:-10, marginRight:-10, backgroundColor:COLORS.azul_opaco, width:30, height:30, alignItems:'center', justifyContent:'center', borderRadius:30}}>
                        <Feather name="camera" size={24} color={COLORS.blanco} />
                    </View>
               </View>
            </View>
        </View>
      )
};