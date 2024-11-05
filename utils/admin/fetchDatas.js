import { Alert } from "react-native";
import { fetchDataAdminSunat } from "../../services/getAdminData";
import { getValidateAdminExist } from "../../services/fetchDataAdmin";

export async function fetchDataAdminStores(position=0, dataStores=[], setError, setLoading, setDataStores) {
    setLoading(true);
    const dataSUNAT  = await fetchDataAdminSunat(dataStores[position].document);
    const jsonDataSunat = await dataSUNAT.json();
    setLoading(false);
    if (jsonDataSunat.error) {
        setError("Documento Inválido");
        setTimeout(()=>{
        seterrorAdmin(null);
        }, 4000)
        return;
    }
    const result = {
        index : position,
        document : dataStores[position].document,
        phone : dataStores[position].phone,
        razSocial : jsonDataSunat.message.nombre,
        direction : dataStores[position].direction,
        startTime : dataStores[position].startTime,
        endTime : dataStores[position].endTime
    }
    setDataStores(current=>current.map(store=>(store.index === parseInt(position) ? result : store)));
}
export async function checkDocument(document) {
    const dataSUNAT = await fetchDataAdminSunat(document);
    const jsonDataSunat = await dataSUNAT.json();
    return jsonDataSunat;
}
export async function fetchDataAdmin(dataAdmin, setDataAdmin,setLoading, setErrorAdmin, setStatus) {
    setLoading(true);
    const dataSUNAT = await fetchDataAdminSunat(dataAdmin.document);
    const jsonDataSunat = await dataSUNAT.json();
    setLoading(false);
    if (jsonDataSunat.error) {
        setStatus({
            status : "response",
            valid : false
        });
        setErrorAdmin({
            type : "document",
            message : jsonDataSunat.message
        });
        setTimeout(()=>{
            setErrorAdmin(null);
        },3000);
        Alert.alert(jsonDataSunat.message);
        return;
    }
    const jsonMessage = jsonDataSunat.message;
    let nombreAdmin = jsonMessage.nombre
    let apellidoAdmin = jsonMessage.apellido;
    if (!jsonMessage.direccion) {
        let separacion = jsonMessage.nombre.split(" ");
        if (separacion.length === 4) {
            apellidoAdmin = separacion.slice(0,2).join(" ");
            nombreAdmin = separacion.slice(2,4).join(" ");
        }
        if (separacion.length===3) {
            apellidoAdmin = separacion.slice(0,2).join(" ");
            nombreAdmin = separacion.slice(2,3).join(" ");
        }
    }
    const result = {
        document : dataAdmin.document,
        nameAdmin : nombreAdmin || "",
        lastName : apellidoAdmin || "",
        direction : jsonMessage.direccion || "",
        status : jsonMessage.estado || "",
        condition : jsonMessage.condicion || "",
        email : dataAdmin.email || "",
        phone : dataAdmin.phone,
        typeDocument : dataAdmin.typeDocument
    }
    setDataAdmin(result);
    setStatus({
        status : "response",
        valid : true
    });
}
export async function fetchDataAdminRegister(dataAdmin, setDataAdmin,setLoading, setErrorAdmin, setStatus) {
    try {
        setLoading(true);
        const dataSUNAT = await fetchDataAdminSunat(dataAdmin.document);
        const jsonDataSunat = await dataSUNAT.json();
        setLoading(false);
        if (jsonDataSunat.error) {
            setStatus({
                status : "response",
                valid : false
            });
            setErrorAdmin({
                type : "document",
                message : jsonDataSunat.message
            });
            setTimeout(()=>{
                setErrorAdmin(null);
            },3000);
            Alert.alert(jsonDataSunat.message);
            return;
        }
        const jsonMessage = jsonDataSunat.message;
        let nombreAdmin = jsonMessage.nombre
        let apellidoAdmin = jsonMessage.apellido;
        if (!jsonMessage.direccion) {
            let separacion = jsonMessage.nombre.split(" ");
            if (separacion.length === 4) {
                apellidoAdmin = separacion.slice(0,2).join(" ");
                nombreAdmin = separacion.slice(2,4).join(" ");
            }
            if (separacion.length===3) {
                apellidoAdmin = separacion.slice(0,2).join(" ");
                nombreAdmin = separacion.slice(2,3).join(" ");
            }
        }
        const result = {
            document : dataAdmin.document,
            nameAdmin : nombreAdmin || "",
            lastName : apellidoAdmin || "",
            email : dataAdmin.email || "",
            phone : dataAdmin.phone,
            typeDocument : dataAdmin.typeDocument
        }
        setDataAdmin(result);
        setStatus({
            status : "response",
            valid : true
        });
    } catch (err) {
        console.log(err);
        Alert.alert("Error","Problemas de conexión");
        return
    }
}
export async function validateDataAdmin(dataAdmin) {
    const responseValidate = await getValidateAdminExist(dataAdmin);
    const jsonResponseValidate = await responseValidate.json();
    return jsonResponseValidate;
}