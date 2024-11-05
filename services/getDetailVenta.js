export function getNumVentasByIdUser(idUser) {
    return globalThis.fetch("https://mercadomovilback.fly.dev/product/numVentas",{
        method : 'POST',
        headers : {
            'admin-idUsuario': idUser
        }
    })
}
export function getClientByIdUser(idUser) {
    return globalThis.fetch(`https://mercadomovilback.fly.dev/client/idAdmin/${idUser}`,{
        method : 'GET'
    })
}
export function getTipoComprobate() {
    return globalThis.fetch("https://mercadomovilback.fly.dev/product/tipoComprobante",{
        method: 'GET',
        mode:'cors'
    })
}
export function getTipoModoPago() {
    return globalThis.fetch("https://mercadomovilback.fly.dev/product/tipoModoPago",{
        method:'GET'
    })
}
export function saveVenta(data) {
    return globalThis.fetch("https://mercadomovilback.fly.dev/product/newSale",{
        method : 'POST',    
        headers: { 
            'Content-Type': 'application/json'
        },
        body : JSON.stringify(data)
    })
}
export function getDetailVentaByIdVenta(idVenta) {
    return globalThis.fetch(`https://mercadomovilback.fly.dev/product/detailVenta/${idVenta}`,{
        method : 'GET',
        mode : 'cors'
    })
}
export function getQrCodeByIdVentaAndidUser(idVenta, idUser) {
    return globalThis.fetch(`https://mercadomovilback.fly.dev/product/createqr`,{
        method : 'POST',
        headers : { 
            'admin-idusuario': idUser, 
            'admin-idventa': idVenta
        }
    })
}
export function saveClientVenta(dataClient) {
    return globalThis.fetch(`https://mercadomovilback.fly.dev/client/create`,{
        method : 'POST',
        headers : {
            'Content-Type': 'application/json'
        },
        body : JSON.stringify(dataClient)
    })
}
export function validateExistClient(client) {
    return globalThis.fetch(`https://mercadomovilback.fly.dev/client/validate/exist-client`,{
        method : 'POST',
        headers : {
            'Content-Type': 'application/json'
        },
        body : JSON.stringify(client)
    })
}