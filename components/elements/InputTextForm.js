import React from 'react';
import StyleTextInput from './styleTextInput';
import StyleView from './styleView';
const InputText = ({ style = {}, changeDataAdmin,inputText, ...props})=>{
    let stylesView = {
        ...style
    }
    return (
        <StyleView style={stylesView}>
            <StyleTextInput changeDataAdmin={changeDataAdmin} inputText={inputText} {...props} />
        </StyleView>
        )
};
export default InputText;