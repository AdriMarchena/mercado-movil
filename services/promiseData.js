export function realizarPeticionesConLimiteDeTiempo(listaPeticiones) {
    const limiteDeTiempo = 3000;
    const request = Promise.all(listaPeticiones);
    return Promise.race([
        request,
        new Promise((_,reject)=>{
            setTimeout(()=>{
                reject(new Error("Excedido el límite de tiempo global"))
            },limiteDeTiempo)
        })
    ])
}