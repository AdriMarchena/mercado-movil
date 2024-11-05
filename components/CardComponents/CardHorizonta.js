import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import { COLORS } from '../../assets/theme/theme'

export default function CardHorizonta({children}) {
  return (
    <View style={styles.cardContainer}>
        {children}
    </View>
  )
}
const styles = StyleSheet.create({
    "cardContainer":{width:"100%",justifyContent:'space-evenly', borderWidth:1, borderColor : COLORS.negro, borderRadius : 5, paddingHorizontal:7, paddingVertical:15, flexDirection : 'row', alignItems:'center'}

})