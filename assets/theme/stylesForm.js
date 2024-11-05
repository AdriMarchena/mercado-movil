import { StyleSheet } from "react-native";
import { COLORS } from "./theme";

export const stylesFormStores = StyleSheet.create({
    "formContainer":{
      height : "100vh",
      width:"100%",
      paddingVertical:20,
      display : "flex",
      flexDirection : "column",
    },
    "loginButton":{
      width:"100%",
      backgroundColor : COLORS.blue2,
      paddingVertical : 15,
      borderRadius: 5,
      display:"flex",
  },
  "textStyle":{
    color : "#fff",
    textAlign:"center",
    fontSize:16,
    fontWeight : "bold"
  },
  "bottomStyle":{
    width :"100%",
    paddingHorizontal : 15,
    marginBottom : 15
  }
});
export const stylesFormLogin=StyleSheet.create({
  "formContainer":{
    height : 300,
    width:"100%",
    paddingVertical:20
  },
  "bottomContainer":{
    width:"100%",
    height:70,
    alignItems:'center',
    color : COLORS.blue2,
    backgroundColor:COLORS.blanco
  },
  "containerBottomContainer":{
    width : "90%",
    height:'auto',
  },  
  "textStyle":{
    textAlign : "center",
    color : COLORS.negro
  },
  "linkStyle":{
    fontWeight : "bold",
    color:COLORS.naranja,
  },
  "loginButton":{
    width:"100%",
    backgroundColor : COLORS.naranja,
    color : COLORS.blanco,
    paddingVertical : 15,
    display:"flex",
    borderRadius : 10
},
"textStyleLoginButton":{
  color : COLORS.blanco,
  textAlign:"center",
  fontSize:16,
  fontWeight : "bold",

}
})