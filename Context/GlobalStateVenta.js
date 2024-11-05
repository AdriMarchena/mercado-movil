import { useContext, useEffect, useState } from "react";
import ContextVenta from "./ContextVenta";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { getProductInventoryByIdUser } from "../services/products";
import { Alert } from "react-native";
import { getClientByIdUser, saveVenta } from "../services/getDetailVenta";
export function useVentaGlobalContext() {
    return useContext(ContextVenta);
}
export default function GlobalStateVenta({children}) {
    const [numProducts, setNumProducts] = useState(0);
    const [loadingPage, setLoadingPage] = useState(false);
    const [historyListaProductos, setHistoryListaProductos] = useState([]);
    const [listProducts, setListProducts] = useState([]);
    const [products, setProducts] = useState([]);
    const [totalVenta, setTotalVenta] = useState(0);
    const [dataToSend, setDataToSend] = useState(null);
    const [listClients, setListClients] = useState([]);
    const [historyListClients, setHistoryListClients] = useState([]);
    const [actualizarData, setActualizarData] = useState(false);
    const handleAddProduct=(idProducto, producto)=>{
        let nuevaLista;
        const existeEseProducto = products.filter((prod)=>idProducto===prod.idProducto).length > 0;
        if (existeEseProducto) {
            nuevaLista = products.map((prod)=>{
                if (prod.idProducto===idProducto) {
                    return {
                        ...prod,
                        cantidad : prod.cantidad + 1
                    }
                }
                return prod
            });
        }
        if (!existeEseProducto) {
            const nuevoProd = {
                ...producto,
                cantidad : 1
            }
            nuevaLista = [
                ...products,
                nuevoProd
            ]
        }
        const total = nuevaLista.reduce(
            (accum, current)=>(accum+ current.precioVenta*current.cantidad),0)
        setTotalVenta(total)
        setProducts(nuevaLista);
        setNumProducts(nuevaLista.length);
    }
    const resetDataProductList=()=>{
        setProducts([]);
        setNumProducts(0);
        setTotalVenta(0);
    }
    const handleMinusProduct=(idProducto)=>{
        const nuevaLista = products.map((prod)=>{
            if (idProducto === prod.idProducto && prod.cantidad > 0) {
                return {...prod, cantidad : prod.cantidad -1 }
            }
            return prod
        }).filter((prod)=>prod.cantidad > 0);
        const total = nuevaLista.reduce(
            (accum,current)=>(accum + current.precioVenta*current.cantidad), 0
        )
        setProducts(nuevaLista);
        setNumProducts(nuevaLista.length);
        setTotalVenta(total);
    }
    const changeQueryProduct=(text)=>{
        const nuevaListaProductos = historyListaProductos.filter((item)=>
        item.codigoProducto.toUpperCase().includes(text.toUpperCase()))
        setListProducts(nuevaListaProductos);
    }
    const handleAddDetailProduct=(data)=>{
        setDataToSend(data);
    }
    const saveListProducts=(listProducts)=>{
        setListProducts(listProducts);
    }
    const saveHistoryListProducts=(newHistoryListProducts)=>{
        setHistoryListaProductos(newHistoryListProducts);
    }
    const saveHistoryListClient=(newListClient)=>{
        setHistoryListClients(newListClient)
    }
    const handleTipoPago=(idTipoPago)=>{
        setDataToSend(prev=>({
            ...prev,
            idTipoPagoVenta : idTipoPago
        }))
    }
    const actualizarDataVentas=async()=>{
        setActualizarData(!actualizarData);
    }
    const changeQueryClient=(text)=>{
        if (historyListClients.length==0) {
            Alert.alert("Error","No hay resultados");
            return;
        }
        const nuevaLista = historyListClients.filter(item=>{
            const nombreCompleto = item['nombre']+" "+item['apellido'];
            return nombreCompleto.toUpperCase().includes(text.toUpperCase())
        });
        setListClients(nuevaLista);
    }
    const addClientToList=(newClient)=>{
        const nuevaLista = [
            ...listClients,
            newClient
        ]
        setListClients(nuevaLista);
        setHistoryListClients(nuevaLista);
    }
    const setClientsListData=(newList)=>{
        setListClients(newList);
    }
    const handleSubmit=async (dataToSend)=>{
        // Momentaneo 
        // TODO : Arreglar
        const montoTotal = dataToSend.listaProductos.reduce((prev,current)=>prev+(current['cantidad']*current['precioUnitario']),0)
        const newDataToSend={
            ...dataToSend,
            subtotal : montoTotal,
            descuento : 0,
            total : montoTotal
        }
        const responseIdVenta = await saveVenta(newDataToSend);
        return await responseIdVenta.json();
    }
    const clearStorageData=()=>{
        setNumProducts(0);
        setDataToSend(null);
        setTotalVenta(0);
        setProducts([])
    }
    return (
        <ContextVenta.Provider value={{
            actualizarData,
            actualizarDataVentas,
            resetDataProductList, changeQueryClient,
            saveHistoryListProducts, saveHistoryListClient,
            saveListProducts,listClients, addClientToList, setClientsListData,clearStorageData,dataToSend,handleSubmit,totalVenta, handleTipoPago, handleAddDetailProduct, products,handleAddProduct, handleMinusProduct,changeQueryProduct,numProducts, loadingPage, listProducts}}>
            {children}
        </ContextVenta.Provider>
    )
}