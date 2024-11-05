import { useContext, useEffect, useState } from "react";
import ContextProduct from "./ContextProduct";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { saveProductInventory } from "../services/saveData";
import { fetchDataProductCategories, fetchDataProductStandard } from "../services/getProductCategories";
import { getDataVerifyStore, getDataVerifySupplier } from "../services/getDataVerify";
import { Alert } from "react-native";
import { AgregarSeleccionPorId } from "../utils/lib/AgregarSeleccion";

function AgregarSeleccion(lista) {
    const nuevaLista = lista.map((val, key)=>{
      if (key==0) {
        return {
          ...val,
          seleccionado : true
        }
      }
      return {
        ...val,
        seleccionado : false
      }
    });
    return nuevaLista;
}

export function useProductGlobalContext() {
    return useContext(ContextProduct);
}
export default function GlobalStateProduct({children}) {
    const [dataInventory, setDataInventory] = useState();
    const [numProducts, setNumProducts] = useState(0);
    const [loadingPage, setLoadingPage] = useState(false);
    const [historyListProducts, setHistoryListProducts] = useState([]);
    const [listProducts, setListProducts] = useState([]);
    const [listCategories, setListCategories] = useState([]);
    const [products, setProducts] = useState([]);
    const [registroIngreso, setRegistroIngreso] = useState(false);
    const [idAdmin, setIdAdmin] = useState("");
    const [listSuppliers, setListSuppliers] = useState([]);
    const [historyListSupplier, setHistoryListSupplier] = useState([]);
    const [listStores, setListStores] = useState([]);
    const [defaultStore, setDefaultStore] = useState(null);


    useEffect(()=>{
        async function getDataProductStorage() {
            setLoadingPage(true);

            // Data almacenada del usuario en el dispositivo
            const storageAdmin = await AsyncStorage.getItem("admin-data");
            const jsonStorageAdmin = JSON.parse(storageAdmin);
            // Valido si hay sesión iniciada
            if (jsonStorageAdmin) {
                try {
                    const idUser = jsonStorageAdmin['idUser'];
                    setIdAdmin(idUser);
                    
                    const categories = await fetchDataProductCategories(idUser);
                    const jsonCategories = await categories.json();

                    const productStandard = await fetchDataProductStandard(idUser);
                    const jsonProductStandard = await productStandard.json();

                    const dataStorageProduct = await AsyncStorage.getItem("product-data");
                    const jsonProductStorage = JSON.parse(dataStorageProduct);
                    
                    let nuevosProductoStandard;
                    if (jsonProductStorage) {
                        let contador= 0;
                        const listProductStorage = jsonProductStorage['listProducts'];
                        nuevosProductoStandard = jsonProductStandard.message.map((prod)=>{
                            if (contador < listProductStorage.length && prod.idProducto == listProductStorage[contador].idProducto) {
                                const obj = {
                                    ...prod,
                                    cantidad : listProductStorage[contador].cantidad,
                                    precioCompra : "0.00",
                                    precioVenta : "0.00",
                                    stock : 0
                                }
                                contador+=1;
                                return obj;
                            }
                            return {
                                ...prod,
                                cantidad : 0,
                                precioCompra : "0.00",
                                precioVenta : "0.00",
                                stock : 0
                            }
                        });
                        if (jsonProductStorage["numProducts"]>0) {
                            setRegistroIngreso(true);
                        }

                        setProducts(jsonProductStorage['listProducts'])
                        setNumProducts(jsonProductStorage['numProducts']);
                    }
                    if (!jsonProductStorage) {
                        nuevosProductoStandard = jsonProductStandard.message.map((prod)=>{
                            return {
                                ...prod,
                                cantidad : 0,
                                precioCompra : "0.00",
                                precioVenta : "0.00",
                                stock : 0
                            }
                        })
                    }

                    setListProducts(nuevosProductoStandard);
                    setHistoryListProducts(nuevosProductoStandard);

                    const nuevaListaCategoria = [{nombre : "Todos"}, ...jsonCategories.message];
                    setListCategories(nuevaListaCategoria);            

                    // Data Tienda y proveedor
                    const responseDataStore = await getDataVerifyStore(idUser);
                    const responseDataSupplier = await getDataVerifySupplier(idUser);

                    const jsonDataStore = await responseDataStore.json();
                    const jsonDataSupplier = await responseDataSupplier.json();

                    if (jsonDataStore.error || jsonDataSupplier.error) {
                        Alert.alert("Algo salió mal");
                        setLoadingPage(false);
                        return;
                    }

                    // Se pide la data almacenada de la tienda establecida por defecto
                    const storageDefaultStore = await AsyncStorage.getItem(`default-store-idAdmin-${idUser}`);
                    const jsonStorageDefStore = JSON.parse(storageDefaultStore);
                    let idDefStore = null;
                    if (jsonStorageDefStore) {
                        const dataDefaultStore = jsonStorageDefStore['defaultStore'];
                        idDefStore = dataDefaultStore['idTienda'];
                        setDefaultStore(dataDefaultStore);    
                    }
                    const newListSupplier = AgregarSeleccion(jsonDataSupplier ? jsonDataSupplier.message : []);
                    const newListStore = idDefStore ?  AgregarSeleccionPorId(jsonDataStore ? jsonDataStore.message : [], idDefStore, 'idTienda') :  AgregarSeleccion(jsonDataStore ? jsonDataStore.message : []);
                    setListStores(newListStore);
                    setListSuppliers(newListSupplier);
                } catch (err) {
                    console.log("Error Global State Product : ",err.message);
                }
            }


            setLoadingPage(false);
        }
        getDataProductStorage();
    },[]);    
    const actualizarDataProductos=()=>{
        
    }
    const handleAddProduct=async(idProducto,product)=>{
        setNumProducts(prev=>prev+1);
        let nuevaLista;
        // Agregamos al carrito
        const existeEseProducto = products.filter((prod)=>idProducto===prod.idProducto).length > 0;
        if (existeEseProducto) {
            nuevaLista = products.map((prod)=>{
                if (prod.idProducto === idProducto) {
                    return {...prod, 
                        cantidad : prod.cantidad+1,
                        stock : prod.cantidad + 1
                    }
                }
                return prod
            });
        }
        if (!existeEseProducto) {
            const nuevoProd = {
                ...product,
                cantidad : 1,
                stock : 1
            }
            nuevaLista = [
                ...products,
                nuevoProd
            ]
        }

        setProducts(nuevaLista);
        const newListProducts = listProducts.map((item)=>{
            if (item.idProducto === idProducto) {
                return {
                    ...item,
                    cantidad : item.cantidad + 1,
                    stock : item.cantidad +1
                }
            }
            return item
        });
        setListProducts(newListProducts);
        setHistoryListProducts(newListProducts);
        const data = JSON.stringify({numProducts:numProducts+1, listProducts:nuevaLista});
        await AsyncStorage.setItem("product-data", data);
        
    }
    const handleDeleteProduct=async(idProducto)=>{
        const nuevaLista = products.filter((prod)=>idProducto!== prod.idProducto);
        const totalItems = nuevaLista.reduce((prev,current)=>prev+current.cantidad,0)
        setNumProducts(totalItems);
        setProducts(nuevaLista);
        const newListProducts = historyListProducts.map((prod)=>{
            if (idProducto === prod.idProducto) {
                return {
                    ...prod,
                    cantidad : 0,
                    stock : 0
                }
            }
            return prod
        });
        setListProducts(newListProducts);
        setHistoryListProducts(newListProducts);
        const data = JSON.stringify({numProducts: totalItems, listProducts : products});
        await AsyncStorage.setItem("product-data",data);
    }
    const handleMinusProduct=async(idProducto)=>{
        setNumProducts(prev=>prev-1);
        // Disminuimos la cantidad
        const nuevaLista = products.map((prod)=>{
            if (idProducto === prod.idProducto && prod.cantidad > 0) {
                return {...prod, 
                    cantidad : prod.cantidad - 1,
                    stock : prod.cantidad -1
                
                }
            }
            return prod
        }).filter((prod)=>prod.cantidad > 0);
        setProducts(nuevaLista);
        const newListProducts = historyListProducts.map((prod)=>{
            if (idProducto === prod.idProducto && prod.cantidad > 0) {
                return {...prod, 
                    cantidad : prod.cantidad - 1,
                    stock : prod.cantidad -1 
                }
            }
            return prod
        });
        setHistoryListProducts(newListProducts);
        setListProducts(newListProducts);
        const data = JSON.stringify({numProducts:numProducts-1, listProducts:nuevaLista});
        await AsyncStorage.setItem("product-data", data);
    }
    const clearStorageDataProduct=async()=>{
        setLoadingPage(true);
        const data = JSON.stringify({numProducts:0, listProducts:[]});
        await AsyncStorage.setItem("product-data",data);
        setNumProducts(0);
        setProducts([]);
        const dataProductStandard = await fetchDataProductStandard(idAdmin);
        const jsonProductStandard = await dataProductStandard.json();
        const formatearCantidad = jsonProductStandard.message.map((prod)=>{
            return {
                ...prod,
                cantidad : 0,
                precioCompra : "0.00",
                precioVenta : "0.00",
                stock : 0
            }
        })
        setHistoryListProducts(formatearCantidad);
        setListProducts(formatearCantidad);
        setLoadingPage(false);
    }
    const initialValueSupplierStore=(dataSupplier)=>{
        setListSuppliers(dataSupplier);
    }
    const addProductsInventory=async()=>{
        setDataInventory(prev=>({
            ...prev,
            listaProductos : products
        }));
    }
    const saveHistoryListSuppplier=(dataListSupplier)=>{
        setHistoryListSupplier(dataListSupplier)
    }
    const saveListSupplier=(dataListSupplier)=>{
        setListSuppliers(dataListSupplier)
    }
    const addSupplierStore=(idProveedor, idTienda, idUsuario, idUsuarioIngresado)=>{
        const newDataInventory={
            ...dataInventory,
            idProveedor,
            idTienda,
            idUsuario,
            idUsuarioIngresado
        }
        setDataInventory(newDataInventory);
    }
    const handleAddSupplier=(dataSupplier)=>{
        setListSuppliers(prev=>([
            ...prev,
            dataSupplier
        ]));
        setHistoryListSupplier(prev=>([
            ...prev,
            dataSupplier
        ]));
    }
    const changeQuerySupplier=(text)=>{
        if (historyListSupplier.length===0) {
            Alert.alert("Error","No hay resultados");
            return;
        }
        const nuevaLista = historyListSupplier.filter(item=>item['nombre'].toUpperCase().includes(text.trim().toUpperCase()));
        setListSuppliers(nuevaLista);
    }
    const onChangeSupplier=(newListSupplier)=>{
        setListSuppliers(newListSupplier);
    }
    const onChangeStore=(newListStore)=>{
        setListStores(newListStore);
    }
    const handleAddStore=(dataStore)=>{
        const nuevaLista = [
            ...listStores,
            dataStore
        ]
        setListStores(nuevaLista);
    }
    const handleChangeProductStandard=(dataProduct)=>{
        setProducts(dataProduct);
    }
    const handleSubmitProductsInventory=async()=>{
        
        const dataToSend={
            ...dataInventory,
            listaProductos : products
        }
        await saveProductInventory(dataToSend);
        await clearStorageDataProduct();

    }
    const changeQuery=(query)=>{
        const nuevaListaProductos=historyListProducts.filter((prod)=>
            prod.codigoProducto.toUpperCase().includes(query.toUpperCase())
        )
        setListProducts(nuevaListaProductos)
    }
    const filtrarPorCategoria=async(categoria)=>{
        setLoadingPage(true);
        if (categoria=="Todos") {
            const nuevaListaCategoria = historyListProducts;
            setListProducts(nuevaListaCategoria);
            return;
        }
        const nuevaListaCategoria = historyListProducts.filter((val)=>String(categoria).toUpperCase().includes(val.categoria.toUpperCase()));
        setListProducts(nuevaListaCategoria);
        setLoadingPage(false);
    }
    const saveListStores=(dataListStores)=>{
        setListStores(dataListStores);
    }
    return (
        <ContextProduct.Provider value={{
            saveListStores, historyListSupplier, changeQuerySupplier,
            defaultStore, saveHistoryListSuppplier, saveListSupplier,
            handleDeleteProduct,onChangeStore, onChangeSupplier,handleAddStore, handleChangeProductStandard, handleAddSupplier,initialValueSupplierStore, listStores, listSuppliers, registroIngreso,filtrarPorCategoria,changeQuery,listCategories, listProducts, historyListProducts, loadingPage,dataInventory,  addProductsInventory, addSupplierStore, handleSubmitProductsInventory, numProducts, handleAddProduct, handleMinusProduct, products, clearStorageDataProduct}}>
            {children}
        </ContextProduct.Provider>
    )
}