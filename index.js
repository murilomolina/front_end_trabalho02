const axios = require('axios')
require('dotenv').config();


const appid = process.env.api_key;
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
        for (let prev of res) {

            const climaUrl = `http://api.openweathermap.org/data/2.5/weather?lat=${prev.lat}&lon=${prev.lon}&appid=${appid}&lang=${lang}`;

            axios.get(climaUrl)
                .then(res => {
                    const sensacaoTermicaKelvin = res.data.main.feels_like;
                    const sensacaoTermicaCelsius = sensacaoTermicaKelvin - 273.15;
                    const descricao = res.data.weather[0].description;

                    console.log(`
                    ${'Cidade: ' + prev.name}
                    ${'Latitude: ' + prev.lat}
                    ${'Longitude: ' + prev.lon}
                    Sensação Térmica: ${sensacaoTermicaCelsius.toFixed(2)} °C
                    Descrição: ${descricao}
                    `);
                })
                .catch(error => {
                    console.error('Erro ao obter dados meteorológicos:', error);
                });
        }
    })
    .catch(error => {
        console.error('Erro ao obter dados de localização:', error);
    });