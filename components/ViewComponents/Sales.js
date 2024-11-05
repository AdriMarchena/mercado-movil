import { View, Text, StyleSheet, useWindowDimensions, Pressable, ScrollView, TouchableOpacity } from 'react-native'
import React, { useState, useEffect } from 'react'
import Constants from 'expo-constants';
import { COLORS } from '../../assets/theme/theme'
import { StyleText, StyleTextTitle, StyleTextSubTitle } from '../TextComponents';
import { FontAwesome5, MaterialIcons } from '@expo/vector-icons';
import { formatearFecha, formatearFechaActual, formatearFechaActualYYYMMdd } from '../../utils/lib/FormatterDate';
import FilterSales from '../FilterComponent/FilterSales';
import CardSale from '../CardComponents/CardSale';
import SearchInputText from '../elements/SearchInputText';
import SearchSales from '../SearchComponents/SearchSales';
import PaginationSales from '../PaginationComponents/SearchComponents/PaginationSales';
import OverlayFilterSales from '../OverlayComponents/OverlayFilterSales';
import OverlayOrderSales from '../OverlayComponents/OverlayOrderSales';
import {Calendar} from 'react-native-calendars';
import CalendarRange from './CalendarRange';

const ListOriginal = [
    {
        cod: '1',
        nroSale: 'Venta N° 0001',
        prod: '12',
        name: 'Alvaro Felipe',
        store: 'Local 1',
        total: '100',
        typeDocument: 'TC001',
        date: '07-03-2024'
    },
    {
        cod: '2',
        nroSale: 'Venta N° 0002',
        prod: '3',
        name: 'Adriana Marchena',
        store: 'Local 1',
        total: '500',
        typeDocument: 'TC001',
        date: '05-03-2024'
    },
    {
        cod: '3',
        nroSale: 'Venta N° 0003',
        prod: '10',
        name: 'Martin',
        store: 'Local 1',
        total: '50',
        typeDocument: 'B001',
        date: '08-03-2024'
    },
    {
        cod: '4',
        nroSale: 'Venta N° 0004',
        prod: '12',
        name: 'Alvaro Felipe',
        store: 'Local 2',
        total: '100',
        typeDocument: 'B001',
        date: '01-03-2024'
    },
    {
        cod: '5',
        nroSale: 'Venta N° 0005',
        prod: '3',
        name: 'Adriana Marchena',
        store: 'Local 2',
        total: '500',            
        typeDocument: 'F001',
        date: '07-03-2024'
    },
    {
        cod: '6',
        nroSale: 'Venta N° 0006',
        prod: '10',
        name: 'Martin',
        store: 'Local 2',
        total: '50',            
        typeDocument: 'F001',
        date: '02-03-2024'
    },
    {
        cod: '7',
        nroSale: 'Venta N° 0007',
        prod: '12',
        name: 'Alvaro Felipe',
        store: 'Local 1',
        total: '100',
        typeDocument: 'TC001',
        date: '07-03-2024'
    },
    {
        cod: '8',
        nroSale: 'Venta N° 0008',
        prod: '3',
        name: 'Adriana Marchena',
        store: 'Local 1',
        total: '500',
        typeDocument: 'TC001',
        date: '05-03-2024'
    },
    {
        cod: '9',
        nroSale: 'Venta N° 0009',
        prod: '10',
        name: 'Martin',
        store: 'Local 1',
        total: '50',
        typeDocument: 'B001',
        date: '08-03-2024'
    },
    {
        cod: '10',
        nroSale: 'Venta N° 0010',
        prod: '12',
        name: 'Alvaro Felipe',
        store: 'Local 2',
        total: '100',
        typeDocument: 'B001',
        date: '01-03-2024'
    },
    {
        cod: '11',
        nroSale: 'Venta N° 0011',
        prod: '3',
        name: 'Adriana Marchena',
        store: 'Local 2',
        total: '500',            
        typeDocument: 'F001',
        date: '07-03-2024'
    },
    {
        cod: '12',
        nroSale: 'Venta N° 0012',
        prod: '10',
        name: 'Martin',
        store: 'Local 2',
        total: '50',            
        typeDocument: 'F001',
        date: '02-03-2024'
    },
    {
        cod: '13',
        nroSale: 'Venta N° 0013',
        prod: '12',
        name: 'Alvaro Felipe',
        store: 'Local 1',
        total: '100',
        typeDocument: 'TC001',
        date: '07-03-2024'
    },
    {
        cod: '14',
        nroSale: 'Venta N° 0014',
        prod: '3',
        name: 'Adriana Marchena',
        store: 'Local 1',
        total: '500',
        typeDocument: 'TC001',
        date: '05-03-2024'
    },
    {
        cod: '15',
        nroSale: 'Venta N° 0015',
        prod: '10',
        name: 'Martin',
        store: 'Local 1',
        total: '50',
        typeDocument: 'B001',
        date: '08-03-2024'
    },
    {
        cod: '16',
        nroSale: 'Venta N° 0016',
        prod: '12',
        name: 'Alvaro Felipe',
        store: 'Local 2',
        total: '100',
        typeDocument: 'B001',
        date: '01-03-2024'
    },
    {
        cod: '17',
        nroSale: 'Venta N° 0017',
        prod: '3',
        name: 'Adriana Marchena',
        store: 'Local 2',
        total: '500',            
        typeDocument: 'F001',
        date: '07-03-2024'
    },
    {
        cod: '18',
        nroSale: 'Venta N° 0018',
        prod: '10',
        name: 'Martin',
        store: 'Local 2',
        total: '50',            
        typeDocument: 'F001',
        date: '02-03-2024'
    },
]

// Datos Mockeados (reemplazar por las llamadas a la API)
const tiposDocumentosMock = [
    { id: 'TC001', nombre: 'Ticket de compra' },
    { id: 'B001', nombre: 'Boleta' },
    { id: 'F001', nombre: 'Factura' },
];

const localesMock = [
    { id: 'Local 1', nombre: 'Local 1' },
    { id: 'Local 2', nombre: 'Local 2' },
    { id: 'Local 3', nombre: 'Local 3' },
    { id: 'Local 4', nombre: 'Local 4' },
    { id: 'Local 5', nombre: 'Local 5' },
];

export default function Sales({changeVisible, name}) {
    const { width, height } = useWindowDimensions();

    const [dateStartFormatView, setDateStartFormatView] = useState('');
    const [dateEndFormatView, setDateEndFormatView] = useState('');
    const [dateStartFormatOnly, setDateStartFormatOnly] = useState('');
    const [dateEndFormatOnly, setDateEndFormatOnly] = useState('');

    const [selectedOrder, setSelectedOrder] = useState('option1');

    const [showCalendar, setShowCalendar] = useState(false);
    const [showSearch, setShowSearch] = useState(false);
    const [showFilters, setShowFilters] = useState(false);
    const [showOrder, setShowOrder] = useState(false);

    // FILTRADO DINAMICO:
    const [ListSales, setListSales] = useState(ListOriginal);
    const [tiposDocumentos, setTiposDocumentos] = useState([]);
    const [locales, setLocales] = useState([]);
    const [selecciones, setSelecciones] = useState({
        tipoDocumento: [],
        local: [],
        valorMin: '',
        valorMax: '',
    });

    const [showEmpty, setShowEmpty] = useState(false);

    useEffect(() => {
        // Simular la carga de datos de la API
        setTiposDocumentos(tiposDocumentosMock);
        setLocales(localesMock);
        changeFormatDate();
    }, []);

    const actualizarSelecciones = (categoria, id) => {
        setSelecciones((prev) => {
        const isSelected = prev[categoria].includes(id);
        return {
            ...prev,
            [categoria]: isSelected
            ? prev[categoria].filter((item) => item !== id)
            : [...prev[categoria], id],
        };
        });
    };

    const actualizarRangoValor = (min, max) => {
        setSelecciones((prev) => ({
        ...prev,
        valorMin: min,
        valorMax: max,
        }));
    };

    const applyFilters = (selecciones) => {
        const resultadoModular = ListOriginal.filter(item => {
            const cumpleTipoDocumento = selecciones.tipoDocumento.length === 0 || selecciones.tipoDocumento.includes(item.typeDocument);
            const cumpleLocal = selecciones.local.length === 0 || selecciones.local.includes(item.store);
            const cumpleRangoValor = (!selecciones.valorMin || parseInt(item.total, 10) >= parseInt(selecciones.valorMin, 10)) &&
                (!selecciones.valorMax || parseInt(item.total, 10) <= parseInt(selecciones.valorMax, 10));
            const cumpleDate = isDateInRange(item.date, dateStartFormatView, dateEndFormatView);
            return cumpleTipoDocumento && cumpleLocal && cumpleRangoValor && cumpleDate;
        });
        updateListSales(resultadoModular);
    };

    const cleanFilters = (nuevasSelecciones) => {
        setSelecciones(nuevasSelecciones);
    };

    goOrder = (id) => {
        setSelectedOrder(id);
        let sortedItems;
        if (id === 'option1') {
            sortedItems = [...ListSales].sort((a, b) => a.prod - b.prod);
        } else if (id === 'option2') {
            sortedItems = [...ListSales].sort((a, b) => b.prod - a.prod);
        } else if (id === 'option3') {
            sortedItems = [...ListSales].sort((a, b) => a.total - b.total);
        } else if (id === 'option4') {
            sortedItems = [...ListSales].sort((a, b) => b.total - a.total);
        }
        setListSales(sortedItems);
    }

    showModalOrder = (val) => {
        setShowOrder(val);
    }

    showModalFilter = (val) => {
        setShowFilters(val);
    }

    showViewSearch = (val) => {
        setShowSearch(val);
    }

    getSearch = (val) => {
        const filtrados = ListOriginal.filter(item =>
            item.nroSale.toLowerCase().includes(val.toLowerCase())
        );
        setListSales(filtrados);
        setShowEmpty(filtrados.length === 0);
    }

    // Para las fechas:

    const toggleDateFormat = (date) => {
        const dateParts = date.split("-");
        // Determina el formato original y cambia en consecuencia
        return dateParts.length === 3 ? `${dateParts[2]}-${dateParts[1]}-${dateParts[0]}` : date;
    };

    changeFormatDate = () => {
        // Formato para mostrar al inicio:
            let today = formatearFechaActual();
            setDateStartFormatView(today);
            setDateEndFormatView(today);

        // Formato para enviar al calendario al inicio:
            const newDate = toggleDateFormat(today);
            setDateStartFormatOnly(newDate);
            setDateEndFormatOnly(newDate);
    
        const newFilteredSales = ListOriginal.filter(item => isDateInRange(item.date, today, today));
        updateListSales(newFilteredSales);
    }

    const changeDates = (start, end) => {
        // Formato para mostrar en vista:
            let newStart = toggleDateFormat(start);
            let newEnd = toggleDateFormat(end);
            setDateStartFormatView(newStart);
            setDateEndFormatView(newEnd);
        
        // Formato para enviar al calendario:
            setDateStartFormatOnly(start);
            setDateEndFormatOnly(end);
            
        cleanFilters({
            tipoDocumento: [],
            local: [],
            valorMin: '',
            valorMax: ''
        });

        const newFilteredSales = ListOriginal.filter(item => isDateInRange(item.date, newStart, newEnd));

        updateListSales(newFilteredSales);
    }

    const isDateInRange = (item, startDate, endDate) => {
        let startTimestamp = new Date(startDate).getTime();
        let endTimestamp = new Date(endDate).getTime();
        let dateTimestamp = new Date(item).getTime();
        return dateTimestamp >= startTimestamp && dateTimestamp <= endTimestamp;
    };

    // Paginación:
    const itemsPerPage = 10;
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);

    const goToNextPage = () => {
        setCurrentPage((prev) => (prev < totalPages ? prev + 1 : prev));
    };

    const goToPrevPage = () => {
        setCurrentPage((prev) => (prev > 1 ? prev - 1 : prev));
    };

    const paginatedSales = ListSales.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

    const updateListSales = (newList) => {
        setListSales(newList);
        setTotalPages(Math.ceil(newList.length / itemsPerPage));
        setCurrentPage(1);
        setShowEmpty(newList.length === 0);
    };

    const goToFirstPage = () => {
        setCurrentPage(1);
    };

    const goToLastPage = () => {
        setCurrentPage(totalPages);
    };
    
    return (
            <View style={styles.mainContainer}>
                {
                    !showSearch ?
                        <View>
                            <View style={{ flexDirection: 'row', alignItems: 'center', height: 60, justifyContent: 'space-between' }}>
                                <View style={styles.topStyle}>
                                    <TouchableOpacity style={{ height: 30, justifyContent: 'flex-end' }} onPress={() => setShowCalendar(!showCalendar)}>
                                        <MaterialIcons name="calendar-today" size={20} color={COLORS.naranja} />
                                    </TouchableOpacity>
                                    <View style={{ height: 30 }}>
                                        <Text style={{ marginHorizontal: 8, fontSize: 12, fontWeight: 'bold' }}>Inicio:</Text>
                                        <StyleText style={{ marginHorizontal: 5 }}>{dateStartFormatView}</StyleText>
                                    </View>
                                    <View style={[styles.line, { height: 16, top: 8 }]}></View>
                                    <View style={{ height: 30 }}>
                                        <Text style={{ marginHorizontal: 8, fontSize: 12, fontWeight: 'bold' }}>Fin:</Text>
                                        <StyleText style={{ marginHorizontal: 5 }}>{dateEndFormatView}</StyleText>
                                    </View>
                                </View>
                            </View>
                        {
                            showCalendar ?
                                <CalendarRange startDateProp={dateStartFormatOnly} endDateProp={dateEndFormatOnly} changeDates={changeDates}></CalendarRange> :
                                <View>
                                    <View style={{ width: width - 150 }}>
                                        <StyleTextTitle>Registro de Ventas</StyleTextTitle>
                                    </View>
                                    <View style={styles.styleSeparator}></View>
                                </View>
                        }
                        </View>
                        : null
                }
                {
                    !showCalendar ?
                        <SearchSales show={showViewSearch} value={getSearch}></SearchSales>
                    : null    
                }
                {
                    !showSearch && !showCalendar ?
                        <View>
                            <View style={styles.cardMenu}>
                                <TouchableOpacity style={styles.titleCard} onPress={() => { setShowOrder(!showOrder) }}>
                                    <FontAwesome5 name="sort" size={12} color={COLORS.negro} />
                                    <Text style={{ fontSize: 12, fontWeight: 'bold', left: 4 }}>Ordenar</Text>
                                </TouchableOpacity>
                                <View style={[styles.line, { height: '100%' }]}></View>
                                <TouchableOpacity style={styles.titleCard} onPress={() => { setShowFilters(!showFilters) }}>
                                    <FontAwesome5 name="filter" size={10} color={COLORS.negro} />
                                    <Text style={{ fontSize: 12, fontWeight: 'bold', left: 4 }}>Filtrar</Text>
                                </TouchableOpacity>
                            </View>
                            <View>
                                <StyleText style={{ fontWeight: 'bold', color: COLORS.gray, left: 10 }}>{ListSales.length} resultados</StyleText>
                            </View>
                            <View style={styles.styleSeparator}></View>
                        </View>
                        : null
                }
                {/* <FilterSales goFilter={goFilter}></FilterSales> */}
                <ScrollView style={!showSearch ? styles.scrollContainer : styles.scrollContainerSearch}>
                    {
                        !showCalendar ?
                            paginatedSales.map(sale => (
                                <CardSale
                                    key={sale.cod}
                                    nroSale={sale.nroSale}
                                    prod={sale.prod}
                                    name={sale.name}
                                    store={sale.store}
                                ></CardSale>
                            ))
                        : null
                    }
                    {
                        showEmpty && !showCalendar ? 
                            <View style={{alignItems:'center', justifyContent: 'center'}}>
                                <StyleText>No hay ventas para mostrar</StyleText>
                            </View>
                        : null
                    }
                </ScrollView>
                {
                    !showSearch && !showCalendar && !showEmpty ?
                        <PaginationSales
                            currentPage={currentPage}
                            totalPages={totalPages}
                            goToNextPage={goToNextPage}
                            goToPrevPage={goToPrevPage}
                            goToFirstPage={goToFirstPage}
                            goToLastPage={goToLastPage}>
                        </PaginationSales>
                    : null
                }
                {
                    !showSearch && showFilters && !showCalendar ?
                        <OverlayFilterSales
                            data={applyFilters}
                            show={showModalFilter}
                            tiposDocumentos={tiposDocumentos}
                            locales={locales}
                            selecciones={selecciones}
                            actualizarSelecciones={actualizarSelecciones}
                            actualizarRangoValor={actualizarRangoValor}
                            cleanSelected={cleanFilters}
                        />
                        : null
                }
                {
                    !showSearch && showOrder && !showCalendar ?
                        <OverlayOrderSales goOrder={goOrder} show={showModalOrder} selectedOrder={selectedOrder}></OverlayOrderSales>
                        : null
                }
            </View>
        )
  //  }
};
const styles = StyleSheet.create({
    "mainContainer":{
        paddingHorizontal: 20,
        paddingVertical: 25
    },
    "topStyle":{
        flexDirection : 'row',
        height : 60,
        alignItems : 'center',
    },
    "scrollContainer": {
        height: '50%',
        marginTop: 10
    },
    "scrollContainerSearch": {
        height: '90%',
        marginTop: 10
    },
    "line": {
        width: 1,
        backgroundColor: COLORS.negro
    },
    "styleSeparator":{
        width:"100%",
        backgroundColor : COLORS.negro_opaco,
        height: .5,
        marginTop: 10,
        marginBottom: 10
    },
    "cardMenu": {
        flexDirection: 'row',
        width: '100%',
        height: 32,
        borderWidth: 1,
        borderColor: COLORS.negro,
        marginTop: 18,
        marginBottom: 18,
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
    },
    "titleCard": {
        flexDirection: 'row',
        width: '50%',
        alignItems: 'center',
        justifyContent: 'center'
    },
})