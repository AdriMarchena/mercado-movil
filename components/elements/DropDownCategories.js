import { View, Text } from 'react-native'
import React, { useState } from 'react'
import { Dropdown } from 'react-native-element-dropdown'
import { StyleSheet } from 'react-native'
import { COLORS } from '../../assets/theme/theme';

export default function DropDownCategories({dataCategorie, placeholder,labelField="nombre", valueField="idFamiliaProducto",fun, RenderItem=null, ...props}) {
    const [isFocus, setIsFocus] = useState(null);
    const [value, setValue] = useState(null);
    const renderLabel=()=>{
        if (value || isFocus) {
            return (
                <Text styles={[styles.label, isFocus && {color : 'blue'}]}>
                    {placeholder}
                </Text>
            )
        }
    }
    const renderItemBox=(item)=>{
        return(
            < RenderItem {...item} />
        )
    }
    return (
    <View style={styles.container}>
        {renderLabel()}
        <Dropdown
            data={dataCategorie}
            style={[styles.dropdown, isFocus && {borderColor : 'blue'}]}
            placeholderStyle = {styles.placeholderStyle}
            inputSearchStyle={styles.inputSearchStyle}
            iconStyle={styles.iconStyle}
            maxHeight={300}
            labelField={labelField}
            valueField={valueField}
            placeholder={!isFocus ? placeholder :  '...'}
            searchPlaceholder='Buscar...'
            value={value}
            onFocus={()=>setIsFocus(true)}
            onBlur={()=>setIsFocus(false)}
            onChange={item=>{
                setValue(item.idFamiliaProducto);
                setIsFocus(false);
                fun(item[valueField], valueField);
            }}
            renderItem={RenderItem ? renderItemBox : null}
        />
    </View>
  )
};
const styles = StyleSheet.create({
    "container": {
        backgroundColor: 'white',
        paddingVertical: 12,
        paddingHorizontal: 8,
        borderWidth : 1,
        borderColor :COLORS.blue2,
        borderRadius : 5,
        marginBottom : 10        
      },
    "label": {
        position: 'absolute',
        backgroundColor: 'white',
        left: 22,
        top: 8,
        zIndex: 999,
        paddingHorizontal: 8,
        fontSize: 14,
        
      },
    "placeholderStyle": {
        fontSize: 16,
    },
    "inputSearchStyle": {
        height: 40,
        fontSize: 16,

    },
    "iconStyle": {
        width: 20,
        height: 20,
    },
})