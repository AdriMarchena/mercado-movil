export function checkEmptyFieldsObject(data={}) {
    const values = Object.keys(data);
    const lengEmtpyFields = values.filter(key=>data[key]==="").length;
    
    const emailInput = "email" in data;
    if (lengEmtpyFields>0) {
        return {
            error:true,
            message :"Complete los campos"
        } 
    }
    if (emailInput) {
        var validRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
        if (!data["email"].trim().match(validRegex)) {
            return {
                error:true,
                message : "Email inválido"
            }
        }
    }
    return {
        error : false,
        message : ""
    }
}