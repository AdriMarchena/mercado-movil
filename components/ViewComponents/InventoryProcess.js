import { View, Text, StyleSheet, useWindowDimensions, Pressable, ScrollView, Modal, TouchableOpacity } from 'react-native'
import React, { useState, useEffect } from 'react'
import Constants from 'expo-constants';
import { COLORS } from '../../assets/theme/theme'
import { StyleText, StyleTextTitle, StyleTextSubTitle } from '../TextComponents';
import { FontAwesome5, MaterialIcons } from '@expo/vector-icons';
import { formatearFecha, formatearFechaActual, formatearFechaActualYYYMMdd } from '../../utils/lib/FormatterDate';
import OrderInventory from '../OrderComponents/OrderInventory';
import CardProduct from '../CardComponents/CardProduct';
import SearchInventoryProduct from '../SearchComponents/SearchInventoryProduct';
import FilterInventoryProcess from '../FilterComponent/FilterInventoryProcess';
import { useBoxGlobalContext } from '../../Context/GlobalStateBox';
import OverlayFilterInventoryProcess from '../OverlayComponents/OverlayFilterInventoryProcess';
import BasicButton from '../ButtonComponents/BasicButton';

const listOriginal = [
    {
        nombre: 'Arroz Añejo Costeño',
        stock: 5,
        precio: 7.5,
        img: require('../../assets/images/arroz-1.png'),
        ventas: '10',
        keyLocal: '1',
        keyProvider: '3'
    },
    {
        nombre: 'Arroz Costeño',
        stock: 10,
        precio: 10,
        img: require('../../assets/images/arroz-2.png'),
        ventas: '5',
        keyLocal: '4',
        keyProvider: '2'
    }
]

const ListStores = [
    {
        key: '1',
        nombre: 'Local 1'
    },
    {
        key: '2',
        nombre: 'Local 2'
    },
    {
        key: '3',
        nombre: 'Local 3'
    },
    {
        key: '4',
        nombre: 'Local 4'
    }
]

const ListProviders = [
    {
        key: '1',
        nombre: 'Proveedor 1'
    },
    {
        key: '2',
        nombre: 'Proveedor 2'
    },
    {
        key: '3',
        nombre: 'Proveedor 3'
    }
]

export default function InventoryProcess({changeVisible, name}) {
    const { width, height } = useWindowDimensions();
    
    const fecha = formatearFechaActual();
    const fechaFormateadaHoy = formatearFecha(new Date()).split("-")[0];

    const [ListProducts, setListProducts] = useState(listOriginal);

    const [showStores, setShowStores] = useState(false);
    const [showProviders, setShowProviders] = useState(false);

    // Cambiar por la api que lista las tiendas y proveedores:
    // const { listStores, nameStoreSelected, saveStoreSelected, saveNameStoreSelected } = useBoxGlobalContext();
    const [listStores, setListStores] = useState(ListStores);
    const [nameStore, setNameStore] = useState(ListStores[0].nombre);
    const [keyStore, setKeyStore] = useState(ListStores[0].key);

    const [listProviders, setListProviders] = useState(ListProviders);
    const [nameProvider, setNameProvider] = useState(ListProviders[0].nombre);
    const [keyProvider, setKeyProvider] = useState(ListProviders[0].key);

    const [modalVisible, setModalVisible] = useState(false);
    const [showEmpty, setShowEmpty] = useState(false);

    goOrder = (id) => {
        let sortedItems;
        if (id === 'precio') {
            sortedItems = [...ListProducts].sort((a, b) => a.precio - b.precio);
        } else if ( id === 'stock' ){
            sortedItems = [...ListProducts].sort((a, b) => b.stock - a.stock);
        } else if (id === 'ventas') {
            sortedItems = [...ListProducts].sort((a, b) => a.ventas - b.ventas);
        }
        setListProducts(sortedItems);
    }

    getSearch = (val) => {
        const filtrados = listOriginal.filter(item =>
            item.nombre.toLowerCase().includes(val.toLowerCase())
        );
        setListProducts(filtrados);
        setShowEmpty(filtrados.length === 0);
    }
    
    showViewOverlayStores = (val) => {
        setShowStores(val);
    }
    
    showViewOverlayProviders = (val) => {
        setShowProviders(val);
    }

    const handleChangeStore = (idItem) => {
        const nuevaLista = ListStores.map((data, key) => {
            if (key === idItem) {
                return {
                    ...data,
                    seleccionado: true
                }
            }
            return {
                ...data,
                seleccionado: false
            }
        });
        setListStores(nuevaLista);
        const nuevoNombre = nuevaLista.filter(tienda => tienda.seleccionado)[0]['nombre'];
        const nuevoKey = nuevaLista.filter(tienda => tienda.seleccionado)[0]['key'];
        setNameStore(nuevoNombre);
        setKeyStore(nuevoKey);
        setShowStores(false);
        filterList(nuevoKey, keyProvider);
    }

    const handleChangeProvider = (idItem) => {
        const nuevaLista = ListProviders.map((data, key) => {
            if (key === idItem) {
                return {
                    ...data,
                    seleccionado: true
                }
            }
            return {
                ...data,
                seleccionado: false
            }
        });
        setListProviders(nuevaLista);
        const nuevoNombre = nuevaLista.filter(provider => provider.seleccionado)[0]['nombre'];
        const nuevoKey = nuevaLista.filter(provider => provider.seleccionado)[0]['key'];
        setNameProvider(nuevoNombre);
        setKeyProvider(nuevoKey);
        setShowProviders(false);
        filterList(keyStore, nuevoKey);
    }

    filterList = (store, provider) => {
        console.log('keystore', keyStore);
        console.log('key proveedor', keyProvider);
        const filtrados = listOriginal.filter(item =>
            (item.keyLocal === store && item.keyProvider === provider)
        );
        setListProducts(filtrados);
        setShowEmpty(filtrados.length === 0);
    }

    return (
        <View style={styles.mainContainer}>
            <View style={{ flexDirection:'row', width:width-150 }}>
                <StyleTextTitle>Productos</StyleTextTitle>
                <FontAwesome5 name="arrow-down" size={16} color={COLORS.naranja} top={6} left={10} onPress={() => setModalVisible(true)}/>
            </View>
            <FilterInventoryProcess
                showStore={showViewOverlayStores}
                showProvider={showViewOverlayProviders}
                nameSelectedStore={nameStore}    
                nameSelectedProvider={nameProvider}>    
            </FilterInventoryProcess>
            <View style={styles.styleSeparator}></View>
            <SearchInventoryProduct value={getSearch}></SearchInventoryProduct>
            <OrderInventory goOrder={goOrder}></OrderInventory>
            {
                showEmpty ? 
                    <View style={{alignItems:'center', justifyContent: 'center'}}>
                        <StyleText>No hay productos para mostrar</StyleText>
                    </View>
                :
                    <ScrollView style={styles.scrollContainer}>
                        {
                            ListProducts.map((product, key) => (
                                <CardProduct
                                    key={key}
                                    nombre={product.nombre}
                                    stock={product.stock}
                                    precio={product.precio}
                                    sale={product.ventas}
                                    img={product.img}
                                ></CardProduct>
                            )
                        )}
                    </ScrollView>
            }
            {
                showStores ? 
                    <OverlayFilterInventoryProcess
                        title={"Local"} 
                        data={listStores}
                        handleChange={handleChangeStore}
                        show={showViewOverlayStores}
                        IconCard={<FontAwesome5 name="store-alt" size={15} color={COLORS.naranja}/>}
                    />
                : null
            }
            {
                showProviders ? 
                    <OverlayFilterInventoryProcess
                        title={"Proveedor"} 
                        data={listProviders}
                        handleChange={handleChangeProvider}
                        show={showViewOverlayProviders}
                        IconCard={<FontAwesome5 name="store-alt" size={15} color={COLORS.naranja}/>}
                    />
                : null
            }
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => {
                setModalVisible(!modalVisible);
                }}>
                <View style={styles.centeredView}>
                    <View style={[styles.modalView, { width: width - 106 }]}>
                        <StyleTextSubTitle>Escoge una opción</StyleTextSubTitle>
                        <View style={{flexDirection: 'row', alignItems: "center", justifyContent: 'flex-start', top: 20}}>
                            <MaterialIcons name="inventory" size={20} color={COLORS.naranja}/>
                            <StyleText style={{ left: 16}}>Inventario</StyleText>
                        </View>
                        <View style={{flexDirection: 'row', alignItems: "center", justifyContent: 'flex-start', top: 30, left: 2}}>
                            <FontAwesome5 name="file-invoice" size={20} color={COLORS.naranja}/>
                            <StyleText style={{ left: 16}}>Registro Inventario</StyleText>
                        </View>
                    </View>
                </View>
            </Modal>
        </View>
    )
};
const styles = StyleSheet.create({
    "mainContainer":{
        paddingHorizontal: 35,
        paddingVertical: 25
    },
    "topStyle":{
        flexDirection : 'row',
        height : 60,
        alignItems : 'center',
    },
    "scrollContainer": {
        height: '70%',
    },
    "styleSeparator":{
        width:"100%",
        backgroundColor : COLORS.negro_opaco,
        height: .5,
        marginTop: 10,
        marginBottom: 10
    },
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)', 
    },
    modalView: {
        height: 170,
        margin: 20,
        backgroundColor: COLORS.blanco,
        borderRadius: 20,
        paddingVertical: 35,
        paddingHorizontal: 75,
        alignItems: 'flex-start',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },

    modalText: {
        marginBottom: 15,
        textAlign: 'center',
    },
})