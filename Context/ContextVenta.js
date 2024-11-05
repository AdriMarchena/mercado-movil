import { createContext } from "react";

export default createContext({
    numProducts : 0,
    loadingPage : false,
    listProducts : [],
    products : [],
    dataSale : {},
    dataToSend : {},
    totalVenta : 0,
    listClients : [],
    actualizarData : false,
    changeQueryProduct : (text)=>{},
    changeQueryClient:(text)=>{},
    handleAddProduct : (idProducto, product)=>{},
    handleMinusProduct : (idProducto)=>{},
    handleAddDetailProduct : ()=>{},
    handleTipoPago : ()=>{},
    handleSubmit:async()=>{},
    clearStorageData:()=>{},
    addClientToList:()=>{},
    setClientsListData:()=>{},
    saveListProducts : (listProducts)=>{},
    saveHistoryListProducts : (listProducts)=>{},
    resetDataProductList : ()=>{},
    actualizarDataVentas : async()=>{},
    saveHistoryListClient : (listClients)=>{}
});