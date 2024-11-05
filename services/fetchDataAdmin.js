export function getValidateAdminExist(dataAdmin) {
    return globalThis.fetch("https://mercadomovilback.fly.dev/admin/validate/exist-admin",{
        method : 'POST',
        headers:{
            'Content-Type': 'application/json'
        },
        body:JSON.stringify(dataAdmin)
    })
}