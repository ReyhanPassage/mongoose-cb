const bcrypt = require('bcrypt')

let password = 'Hello123'
let hash = '$2b$08$7qDioRMmRTD9YrnLF4/b0OcFhbElIaSxQO/N5N6.cVowOFuv6768y'

// Hashing
bcrypt.hash(password, 8)
    .then(res => {
        console.log({
            password , res
        })
    })

// Compare
// akan return true or false
bcrypt.compare(password, hash)
    .then(res => {
        console.log(res)
    })

    
/*
try catch examples
try {
    let resp1 = await axios.get(username)
    let resp2 = await axios.get(email)
    let resp3 = await axios.post(newuser)
} catch (err) {
    console.log(err)
}
    axios.get(username)
        .then(res => {
            axios.get(email)
                .then(res => {
                    axios.post(new user)
                        .then(res => {
                        }).catch(err => {
                        })
                }).catch(err => {
                })
        }).catch(err => {
        })
*/