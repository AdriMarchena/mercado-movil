import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import React, { useState } from 'react'
import { StyleText, StyleTextSubTitle, StyleTextTitle } from '../TextComponents';
import { AntDesign } from '@expo/vector-icons';

export default function CardListToggle({ topData, bottomData }) {
    console.log(topData, bottomData)
    const [expanded, setExpanded] = useState(false);
    const toggleExpand=()=>{
        setExpanded(!expanded)
    }
    /*
        Top Data es de la forma:
        {
            type : "title",
            value : "something"
        }
        BottomData es de la forma:
        {
            Component : <View><Text>Hola</Text></View>
        }
    */ 
    return (
    <TouchableOpacity onPress={toggleExpand} style={styles.itemContainer} >
        <View style={styles.itemHeader}>
            <View>
                {
                    topData && topData.map((item)=>{
                        if (item.type === "title") {
                            return(
                                <View>
                                    <StyleTextTitle>{item.value}</StyleTextTitle>
                                </View>
                            )
                        }
                        if (item.type==="subtitle") {
                            return(
                                <View>
                                    <StyleTextSubTitle>{item.value}</StyleTextSubTitle>
                                </View>
                            )
                        }
                        return (
                            <View>
                                <StyleText>{item.value}</StyleText>
                            </View>
                        )
                    })
                }
            </View>
            <View>
                {expanded ? <AntDesign name="caretup" size={24} color={COLORS.negro} /> : <AntDesign name="caretdown" size={24} color={COLORS.negro}/>}
            </View>
            {expanded && (
                <View style={styles.additionalInfoContainer}>
                    {
                        bottomData && bottomData.map(({Component})=>(<View>{Component}</View>))
                    }
                </View>
            )}
        </View>
    </TouchableOpacity>
  )
};
const styles = StyleSheet.create({
    itemContainer: {
      backgroundColor: '#ffffff',
      borderRadius: 10,
      marginVertical: 8,
      marginHorizontal: 16,
      padding: 20,
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,
      elevation: 5,
    },
    itemHeader: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    itemTitle: {
      fontSize: 18,
      fontWeight: 'bold',
      
    },
    expandIcon: {
      fontSize: 20,
    },
    additionalInfoContainer: {
      marginTop: 10,
    },
    additionalInfoText: {
      fontSize: 16,
      marginLeft : 5
    },
    rowComponentStyle:{flexDirection:'row', alignItems:'center', marginTop:5}
  });