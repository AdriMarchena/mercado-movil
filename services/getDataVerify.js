// URL :  "https://mercadomovilback.fly.dev/admin/"
const BASE_URL_ADMIN = "https://mercadomovilback.fly.dev/admin/"
export function getDataVerifySupplier(idUser) {
    return fetch(BASE_URL_ADMIN+`suppliers/?idUser=${idUser}`,{
        method : 'GET',
        cache : 'no-cache',
    });
}
export function getDataVerifyStore(idUser) {
    return fetch(BASE_URL_ADMIN+`stores/?idUser=${idUser}`,{
        method: 'GET',
        cache : 'no-cache',
    });
}
export function getDetailDataUser(idUser) {
    return fetch(BASE_URL_ADMIN+`detailAdmin/?idUser=${idUser}`,{
        method:'GET',
        cache : 'no-cache',
    });
}