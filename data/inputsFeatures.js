import { format } from "date-fns";
import { COLORS } from "../assets/theme/theme";
import { FontAwesome5, MaterialIcons,AntDesign } from "@expo/vector-icons";
export default [ 
    {'title':'Caja Chica','icon':<FontAwesome5 name="box" size={40} color={COLORS.white} />,'url':'admin/home/boxcash'} ,   
    {'title':'Venta', 'icon':<MaterialIcons name="monetization-on" size={40} color={COLORS.white} />, 'url':'admin/home/suppliers'},
    {'title':'Inventario', 'icon':<MaterialIcons name="storage" size={40} color={COLORS.white} />, 'url':'admin/home/employers'},    
    {'title':'Locales','icon':<MaterialIcons name="store" size={40} color={COLORS.white} />,'url':'admin/home/stores'},
]