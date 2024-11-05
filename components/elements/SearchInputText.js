import { useState } from "react";
import { TextInput, TouchableOpacity, View, useWindowDimensions } from "react-native";
import { COLORS } from "../../assets/theme/theme";
import { Feather, Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";

export default function SearchInputText({changeQuery, styles}) {
    const [query, setQuery] = useState("");
    const {width} = useWindowDimensions();
    const onChangeText=(text)=>{
        setQuery(text);
        changeQuery(text);
    }
    return (
        <View style={[{width:"100%", flexDirection:'row', alignItems:'center'},{...styles}]}>
            <View style={{height : 45,flexDirection:'row', width:"100%", marginRight:5, borderWidth:1, borderRadius : 10, borderColor : COLORS.negro, alignItems:'center', paddingHorizontal:10}}>
                <TextInput onChangeText={onChangeText} placeholder='Buscar ..' value={query} style={{ flex:1,padding:5, paddingHorizontal:10, color:COLORS.negro, fontSize : 16}}/>
                <Feather name="search" size={16} color={COLORS.negro} />
            </View>
            {/* <TouchableOpacity  onPress={()=>router.push("inventory/scan")} style={{width:40, height:40,backgroundColor:COLORS.naranja, padding:5, borderRadius:5}}>
                <Ionicons name="qr-code-sharp" size={24} color={COLORS.azul} />
            </TouchableOpacity> */}
        </View>
    )
}
