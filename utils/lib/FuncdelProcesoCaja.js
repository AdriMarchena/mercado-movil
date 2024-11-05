import { fetchCurrentChangeMoney, getBoxes, getBoxesOpen, getDetailVentasByIdCaja, getMontoCierreCajaPasado } from "../../services/fetchDataBoxes";
import { getDataVerifyStore } from "../../services/getDataVerify";
import { formatearFechaActualYYYMMdd } from "./FormatterDate";
 
export async function traerTipoDeCambioActual(){
    const fechaActual = formatearFechaActualYYYMMdd();
    const currentChangeServer = await fetchCurrentChangeMoney(fechaActual);
    const jsonCurrentChangeServer = await currentChangeServer.json();
    return jsonCurrentChangeServer['message']['venta'];
}
export async function traerTiendasdelUsuario(idUsuario) {
    const respuestaTiendas = await getDataVerifyStore(idUsuario);
    const jsonRespuesta = await respuestaTiendas.json();
    return jsonRespuesta;
}
export async function traerVentasdelDiadeHoy(idCaja) {
    const responseVentas = await getDetailVentasByIdCaja(idCaja);
    const jsonResponseVentas = await responseVentas.json();
    return jsonResponseVentas;
}
export async function traerCajasDelDiadeHoy(idUsuario) {
    const respuestaCajas = await getBoxes(idUsuario);
    const jsonRespuestaCajas = await respuestaCajas.json();
    return jsonRespuestaCajas['message']
}
export async function traerMontoCierreCajaPasado(idUsuario, idTienda) {
    const respuestaMontoPasado = await getMontoCierreCajaPasado(idUsuario, idTienda);
    const jsonRespuestaMontoPasado = await respuestaMontoPasado.json();
    return jsonRespuestaMontoPasado;
}
export function hayCajasAbiertas(listaCajas=[]) {
    // Iterar sobre cada tienda
    for (let tienda of listaCajas) {
        // Verificar si la tienda tiene al menos una caja abierta
        if (tienda.cajas.length > 0 ) {
            if (tienda.cajas.some(elemento => elemento.cerrada === 0)) {
                return true; // Si hay al menos una caja abierta, devolver true                
            }
        }
    }
    return false; // Si no se encontraron cajas abiertas, devolver false
}
