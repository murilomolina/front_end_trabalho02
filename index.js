const axios = require('axios')
require('dotenv').config();


const appid= process.env.api_key;
const cidade = "Oslo"
const code = "578"
const lang = "pt_br"

const url = `http://api.openweathermap.org/geo/1.0/direct?q=${cidade},${code}&limit=${1}&appid=${appid}&lang=${lang}`
axios
    .get(url)
    .then(res => {
        return res.data
    })

    .then((res) => {
        for(let prev of res) {
            console.log(`
            ${'Cidade: ' + prev.name}
            ${'Latitude: ' + prev.lat}
            ${'Longitude: ' + prev.lon}
            `)
        }
    })