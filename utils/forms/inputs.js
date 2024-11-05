export function inputsSignUp(dataAdmin) {
    return [
        {'placeholder':'Documento',"value":dataAdmin.document, "inputText":"document", "editable":true },
        {"placeholder":"Correo electronico", "value":dataAdmin.email, "inputText":"email", "editable":true},
        {"placeholder":"Telefono","value":dataAdmin.phone,"inputText":"phone", "editable":true},
    ]
}