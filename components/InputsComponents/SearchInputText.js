import { useEffect, useState } from "react";
import { Alert, TextInput, TouchableOpacity, View, useWindowDimensions } from "react-native";
import { COLORS } from "../../assets/theme/theme";
import { Feather, Ionicons } from "@expo/vector-icons";
import StyleInputText from "./StyleInputText";
import * as FileSystem from 'expo-file-system';
import { Audio } from "expo-av";
import { fetchDataTranscript } from "../../services/fetchTranscript";
import { StyleText } from "../TextComponents";

function ButtonMicrophone({changeRecording, changeTranscript, changeQueryText}) {
    const [recording, setRecording] = useState(null);

    const startRecording = async()=>{
        try {
            await Audio.requestPermissionsAsync();
            await Audio.setAudioModeAsync({
                allowsRecordingIOS: true,
                playsInSilentModeIOS: true,
            });
            const recordAudio = new Audio.Recording();
            await recordAudio.prepareToRecordAsync({
                android: {
                  extension: '.m4a',
                  outputFormat: Audio.RECORDING_OPTION_ANDROID_OUTPUT_FORMAT_MPEG_4,
                  audioEncoder: Audio.RECORDING_OPTION_ANDROID_AUDIO_ENCODER_AAC,
                  sampleRate: 44100,
                  numberOfChannels: 1,
                  bitRate: 128000,
                },
                ios: {
                  extension: '.wav',
                  audioQuality: Audio.RECORDING_OPTION_IOS_AUDIO_QUALITY_HIGH,
                  sampleRate: 44100,
                  numberOfChannels: 1,
                  bitRate: 128000,
                  linearPCMBitDepth: 16,
                  linearPCMIsBigEndian: false,
                  linearPCMIsFloat: false,
                },
              })
              await recordAudio.startAsync()
              setRecording(recordAudio)
        } catch (err) {
            console.error("Something went wrong");
        }
    }

    const getTranscription=async()=>{
        try {
            const url = recording.getURI();
            const info = await FileSystem.getInfoAsync(url);
            const uri = info.uri
            const formData = new FormData();
            formData.append('file', {
                uri,
                type: Platform.OS === 'ios' ? 'audio/x-wav' : 'audio/m4a',
                name: Platform.OS === 'ios' ? `${Date.now()}.wav` :`${Date.now()}.m4a`,
            });
            const data = await fetchDataTranscript(formData);
            const jsonData = await data.json();
            changeTranscript(jsonData['message']);
            changeQueryText(jsonData['message']);
        } catch (error) {
            await stopRecording();
        }
    }
    const stopRecording =async()=>{
        await recording.stopAndUnloadAsync();
        await Audio.setAudioModeAsync(
            {
              allowsRecordingIOS: false,
            }
          );
    }
    const handlePressOut=async()=>{
        changeRecording(true);
        await stopRecording();
        await getTranscription();
        changeRecording(false);
    }
    return(
        <TouchableOpacity onPressIn={startRecording} onPressOut={handlePressOut} style={{ width: 40, height : 50,marginHorizontal : 5, backgroundColor : COLORS.naranja, borderRadius : 10, justifyContent: 'center', alignItems:'center'}}>
            <Feather name="mic" size={18} color={COLORS.blanco}/>
        </TouchableOpacity>
    )
}

export default function SearchInputText({changeQuery, styles, onPressIn, showMic=false, changeRecording, changeTranscript}) {
    const [query, setQuery] = useState("");
    const [queryText, setQueryText] = useState("");
    const {width} = useWindowDimensions();
    const onChangeText=(text)=>{
        setQuery(text);
        changeQuery(text);
    }

    return (
        <View>
            <View style={[{width:"100%", flexDirection:'row', alignItems:'center'},{...styles}]}>
                <StyleInputText onPressIn={onPressIn} style={{width:showMic ? width - 110 : "100%", marginRight:5}} firstIcon={<Feather name="search" size={16} color={COLORS.negro} />}  onChangeText={onChangeText} placeholder="Buscar ..." value={query} />                
                {showMic ? <ButtonMicrophone changeRecording={changeRecording} changeQueryText={setQueryText} changeTranscript={changeTranscript} />  : null}
            </View>
            <StyleText>{queryText}</StyleText>
        </View>
    )
}
