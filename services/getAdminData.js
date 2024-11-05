
// AWS : https://f6xc1q5l88.execute-api.us-east-1.amazonaws.com/beta/document
// FLY : https://mercadomovilback.fly.dev/admin/document
// AWS CONTENT TYPE : text/plain
// Localhost : http://192.168.0.116:8080/admin/document
export  function fetchDataAdminSunat(document) {
    return globalThis.fetch("https://mercadomovilback.fly.dev/admin/document",{
        method : 'POST',
        headers:{
            'Content-Type': 'application/json'
        },
        body:JSON.stringify({document})
    })
}