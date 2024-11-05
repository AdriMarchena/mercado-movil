// URL : "https://mercadomovilback.fly.dev/product/"
const BASE_URL_PRODUCT = "https://mercadomovilback.fly.dev/product/"
export function fetchDataProductCategories(idAdmin) {
    return globalThis.fetch(BASE_URL_PRODUCT+'productCategories',{
        method : 'POST',
        headers:{
            'Content-Type': 'application/json'
        },
        body:JSON.stringify({
            idAdmin : idAdmin
        }),
        
    })
}
export function fetchDataProductStandard(idUser) {
    return globalThis.fetch(BASE_URL_PRODUCT+`?idUser=${idUser}`,{
        method:'GET',
    })
}
export function fetchPrevStockByProductStandard(idUser, codProducto) {
    return globalThis.fetch(BASE_URL_PRODUCT+`stock?idUser=${idUser}&codigoProducto=${codProducto}`,{
        method : 'GET'
    })
}