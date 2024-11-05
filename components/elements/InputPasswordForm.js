import { StyleSheet } from 'react-native'
import React,{useState} from 'react'
import { MaterialCommunityIcons } from '@expo/vector-icons';
import StyleTextInput from './styleTextInput';
import {COLORS} from '../../assets/theme/theme'
import StyleView from './styleView';
import { Feather } from '@expo/vector-icons';

const InputPassword =({ inputText,changeDataAdmin,...props})=>{
    const [showPassword, setshowPassword] = useState(false);
    const changeShowPassword=()=>{
        setshowPassword(!showPassword)
    }
    return(
        <StyleView>
            <Feather name="lock" size={16} color={COLORS.negro} />
            <StyleTextInput  changeDataAdmin={changeDataAdmin} secureTextEntry={!showPassword} inputText={inputText} {...props}/>
            <MaterialCommunityIcons
                name={showPassword ? 'eye-off' : 'eye'}
                size={22}
                style={styles.icon}
                color={COLORS.negro}
                onPress={changeShowPassword}
            />
        </StyleView>
    )
};
export default InputPassword;
const styles = StyleSheet.create({
    "icon":{
        marginRight : 7,
        color : COLORS.blue2
    }
})