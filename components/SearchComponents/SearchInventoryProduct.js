import { useState } from "react";
import { TextInput, StyleSheet, View, useWindowDimensions } from "react-native";
import { COLORS } from "../../assets/theme/theme";
import { Feather, Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";

export default function SearchInventoryProduct({changeQuery, styles, value}) {
    const [query, setQuery] = useState("");
    const {width} = useWindowDimensions();
    const onChangeText=(text)=>{
        setQuery(text);
        value(text);
    }
    return (
        <View style={[styles2.mainContainer, {...styles}]}>
            <View style={[styles2.subContainer, {width:(width-70)}]}>
                <TextInput onChangeText={onChangeText} placeholder='Buscar Producto...' value={query} style={styles2.inputText}/>
                <Feather name="search" size={16} color={COLORS.negro} />
            </View>
        </View>
    )
}

const styles2 = StyleSheet.create({
    "mainContainer": {
        width: "100%",
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center'
    },
    "subContainer": {
        flexDirection: 'row',
        marginRight: 5,
        borderWidth: 1,
        borderColor: COLORS.negro,
        alignItems: 'center',
        paddingHorizontal: 10,
        borderRadius: 10
    },
    "inputText": {
        flex: 1,
        padding: 5,
        paddingHorizontal: 10,
        color: COLORS.negro
    }
})