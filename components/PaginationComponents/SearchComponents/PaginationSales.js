import { useState } from "react";
import { TextInput, StyleSheet, View, useWindowDimensions } from "react-native";
import { Feather, FontAwesome5, Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { COLORS } from "../../../assets/theme/theme";
import { StyleTextSubTitle } from "../../TextComponents";

export default function PaginationSales({currentPage, totalPages, goToPrevPage, goToNextPage, goToFirstPage, goToLastPage}) {
    return (
        <View style={styles.container}>
            <FontAwesome5 name="caret-left" size={25} color={COLORS.naranja} width={30} left={10} onPress={goToFirstPage}/>
            <View style={{flexDirection: 'row'}}>
                <FontAwesome5 name="angle-left" size={25} color={COLORS.naranja} width={30} onPress={goToPrevPage}/>
                <StyleTextSubTitle style={{top: 2}}>{`${currentPage}/${totalPages}`}</StyleTextSubTitle>
                <FontAwesome5 name="angle-right" size={25} color={COLORS.naranja} width={30} left={20} onPress={goToNextPage}/>
            </View>
            <FontAwesome5 name="caret-right" size={25} color={COLORS.naranja} width={30} left={10} onPress={goToLastPage}/>
        </View>
    )
}

const styles = StyleSheet.create({
    "container": {
        flexDirection: 'row',
        justifyContent: 'space-between',
        height: '15%',
        alignItems: 'center'
    }
})