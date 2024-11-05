export function saveDataAdmin(admin) {
    return globalThis.fetch(`https://f6xc1q5l88.execute-api.us-east-1.amazonaws.com/beta/signup`,{
        method : 'POST',
        headers : {
            'Content-Type':'application/json'
        },
        body : JSON.stringify(admin)
    })    
}
export function validateExistDataSupplier(supplier) {
    return globalThis.fetch(`https://mercadomovilback.fly.dev/suppliers/validate/exist-supplier`,{
        method : 'POST',
        headers : {
            'Content-Type':'application/json'
        },
        body : JSON.stringify(supplier)
    })
}
export function saveDataSupplier(supplier) {
    return globalThis.fetch(`https://mercadomovilback.fly.dev/suppliers/`,{
        method:'POST',
        headers : {
            'Content-Type':'application/json'
        },
        body : JSON.stringify(supplier)
    });
}
export function saveDataStore(store) {
    return globalThis.fetch(`https://mercadomovilback.fly.dev/admin/stores`,{
        method : 'POST',
        headers : {
            'Content-Type':'application/json'
        },
        body : JSON.stringify(store)
    })
}
export function validateExistStore(store) {
    return globalThis.fetch(`https://mercadomovilback.fly.dev/admin/validate/exist-stores`,{
        method : 'POST',
        headers : {
            'Content-Type':'application/json'
        },
        body : JSON.stringify(store)
    })
}
export function saveProductInventory(productInventory) {
    return globalThis.fetch(`https://mercadomovilback.fly.dev/product/productInventory`,{
        method : 'POST',
        headers : {
            'Content-Type':'application/json'
        },
        body : JSON.stringify(productInventory)
    })
}