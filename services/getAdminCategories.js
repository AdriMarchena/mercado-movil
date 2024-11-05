export function fetchDataAdminCategories() {
    return globalThis.fetch('https://mercadomovilback.fly.dev/product/productCategories',{
        method : 'GET'
    })
}
