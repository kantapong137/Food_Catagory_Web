const axios = require('axios');
const uri = 'http://localhost:9000/trips?keyword=ภูเขา';
const encoded = encodeURI(uri);
console.log(encoded);
axios.get(encoded)
    .then(res => {
        console.log(res.data);
    })
    .catch(error => {
        console.log(error)
    })