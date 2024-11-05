import { StyleSheet, useWindowDimensions } from 'react-native';
import { View, Text, Image, TouchableOpacity } from 'react-native'
import { COLORS } from '../../assets/theme/theme';
import { StyleTextSubTitle } from '../TextComponents';
function BoxCategorie({item, onPress, idSelected}) {
    const {width} = useWindowDimensions();
    return(
      <TouchableOpacity onPress={onPress}>
        <View style={[styles.item, {backgroundColor : item.id === idSelected ? COLORS.verde_acuarela_opaco : COLORS.blanco}]}>
          <StyleTextSubTitle>{item.title}</StyleTextSubTitle>
        </View>
      </TouchableOpacity>
    )
}
export default BoxCategorie;
const styles = StyleSheet.create({
  "item":{
    padding : 10,
    paddingHorizontal:15,
    borderWidth : 1,
    marginTop : 10,
    paddingVertical : 20,
    borderColor : COLORS.negro,
    borderRadius : 10
  }
})