// no olvidar cambiar la ipconfig cada que cambies de red
export const fetchDataTranscript=async(data)=>{
    return globalThis.fetch(`https://mercadomovilback.fly.dev/admin/speech`,{
        method : 'POST',
        headers : {
            'Content-Type': 'multipart/form-data'
        },
        body : data
    })
};