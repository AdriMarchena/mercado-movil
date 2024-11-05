import { CONFIG } from "../config"

export function sendCodeNumber(phoneNumber) {
    return fetch(`${CONFIG.BASE_URL}/admin/signup/send/sms`,{
        method : 'POST',
        headers : {
            'admin-phone': String(phoneNumber)
        }
    })
}
export function validateCodeNumber(code) {
    return fetch(`${CONFIG.BASE_URL}/admin/signup/validate/code`,{
        method : 'POST',
        headers : {
            'admin-codenumber':String(code)
        }
    })
}