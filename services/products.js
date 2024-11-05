const BASE_URL ="https://mercadomovilback.fly.dev/product/"

export function getProductInventoryByIdUser (idUser) {
    return globalThis.fetch(`${BASE_URL}inventory/products?idUsuario=${idUser}`,{
        method : 'GET',
        mode:'cors'
    })
}   
export function getRegisterProductByIdUser(idUser) {
    return globalThis.fetch(`${BASE_URL}inventory/register?idUsuario=${idUser}`,{
        method : 'GET',
        mode : 'cors'
    })
}
export function getProductInventoryByIdUserAndIdStore(idUser, idTienda) {
    return globalThis.fetch(`${BASE_URL}inventory/products?idUsuario=${idUser}&idTienda=${idTienda}`,{
        method : 'GET',
        mode : 'cors'
    })
}