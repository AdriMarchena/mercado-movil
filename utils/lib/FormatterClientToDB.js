export function formatterClient(dataClient) {
    return {
        nombre : dataClient['nameAdmin'] || "",
        apellido : dataClient['lastName'] || "",
        direccion : dataClient['direction'] || "",
        celular : dataClient['phone'] || "",
        documento : dataClient['document'] || "" 
    }
}