const BASE_URL = "https://mercadomovilback.fly.dev/suppliers/"
export function getDataSupplierByIdSupplier(idSupplier, idAdmin) {
    return globalThis.fetch(`${BASE_URL}data-supplier?idUser=${idAdmin}&idSupplier=${idSupplier}`,{
        method : 'GET'
    })
}
export function getProductStoredByIdSupplier(idSupplier) {
    return globalThis.fetch(`${BASE_URL}data-supplier/product-stored?idSupplier=${idSupplier}`,{
        method : 'GET'
    });
}