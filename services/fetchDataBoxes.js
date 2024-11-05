export function fetchCurrentChangeMoney(fecha) {
    return globalThis.fetch(`https://mercadomovilback.fly.dev/admin/tipo-cambio?fecha=${fecha}`,{
        method : 'GET',
        mode : 'cors'

    })
}
export function validateAdminPasswordForBox(idUser,password) {
    return globalThis.fetch(`https://mercadomovilback.fly.dev/admin/signin/box`,{
        method : 'POST',
        headers : {
            'Content-Type': 'application/json'
        },
        body : JSON.stringify({idAdmin : idUser, contrasenna : password}),
        mode : 'cors'

    })
}
export function saveBoxOpen(data) {
    return globalThis.fetch(`https://mercadomovilback.fly.dev/product/box/open`,{
        method : 'POST',
        headers : {
            'Content-Type': 'application/json'
        },
        body : JSON.stringify(data),
        mode : 'cors'

    })
}
export function saveBoxClose(data) {
    return globalThis.fetch(`https://mercadomovilback.fly.dev/product/box/close`,{
        method : 'POST',
        headers : {
            'Content-Type': 'application/json'
        },
        body : JSON.stringify(data),
        mode : 'cors'
    })
}
export function getCurrentBoxesByIdAdmin(idAdmin) {
    return globalThis.fetch(`https://mercadomovilback.fly.dev/product/currentBox?idAdmin=${idAdmin}`,{
        method : 'GET',
        mode : 'cors'
    })
}
export function getDetailVentasByIdCaja(idCaja) {
    return globalThis.fetch(`https://mercadomovilback.fly.dev/product/box/detailVenta?idCaja=${idCaja}`,{
        method : 'GET',
        mode : 'cors'

    })
}
export function getMontoCierreCajaPasado(idUsuario, idTienda) {
    return globalThis.fetch(`https://mercadomovilback.fly.dev/product/box/montoCierreCaja?idUsuario=${idUsuario}&idTienda=${idTienda}`,{
        method : 'GET',
        mode :'cors'
    })
}
export function getSumTotalVentasByIdCaja(idCaja) {
    return globalThis.fetch(`https://mercadomovilback.fly.dev/product/box/sumVentas?idCaja=${idCaja}`,{
        method : 'GET',
        mode : 'cors'

    })
}
export function getCheckIsOpenBoxByIdStore(idTienda) {
    return globalThis.fetch(`https://mercadomovilback.fly.dev/product/check-open-box/store?idTienda=${idTienda}`,{
        method : 'GET',
        mode : 'cors'
    })
}
export function getBoxesOpen(idUser) {
    return globalThis.fetch(`https://mercadomovilback.fly.dev/product/boxesOpen/${idUser}`,{
        method : 'GET',
        mode : 'cors'
    })
}
export function getBoxes(idUser) {
    return globalThis.fetch(`https://mercadomovilback.fly.dev/product/boxes?idAdmin=${idUser}`,{
        method : 'GET',
        mode : 'cors'
    })
}
export function getCurrentBoxData(idUser, idTienda) {
    return globalThis.fetch(`https://mercadomovilback.fly.dev/product/currentBox?idAdmin=${idUser}&idTienda=${idTienda}`,{
        method : 'GET',
        mode : 'cors'
    })
}