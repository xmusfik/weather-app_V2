const request = require('request')

const forecast = (latitude, longitude, callback) => {
    const url = 'https://api.darksky.net/forecast/bb078a10048d58a18fbfd4f522b9c703/' + latitude + ',' + longitude + '?units=si'
    request({ url, json: true }, (error, { body }) => {
        if (error) {
            callback('Unable to connect Weather app', undefined)
        } else if (body.error) {
            callback('Unable to find the place', undefined)
        } else {
            callback(undefined, 'It is currently ' + body.currently.temperature + ' degrees out.There is a ' + body.currently.precipProbability + ' % chance of rain')
        }
    })

}
module.exports = forecast