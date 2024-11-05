export function fetchEmailSender(name, email) {
    return globalThis.fetch("https://mercadomovilback.fly.dev/admin/signup/send/email",{
        method : 'POST',
        headers : {
            'Content-Type': 'application/json'
        },
        body : JSON.stringify({email,name})
    })
}
