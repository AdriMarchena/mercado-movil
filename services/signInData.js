
function SignInAdmin(admin) {
    return fetch(`https://f6xc1q5l88.execute-api.us-east-1.amazonaws.com/beta/signin`,{
        method : 'POST',
        headers : {
            'Content-type':'application/json',
        },
        body: JSON.stringify(admin)
    })
}
module.exports = {SignInAdmin}