const request=require('request')

const geocode = (address, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+ encodeURIComponent(address) +'.json?access_token=pk.eyJ1IjoicW11c2ZpayIsImEiOiJjazNhZTNqa2kwMHAwM2NwODdheDVqbGF5In0.OYFhbqs-DxcEnqd6g3zRSg&limit=2'

    request({ url, json: true }, (error, {body}) => {
        if (error) {
            callback('Unable to connect Weather app',undefined)
        } else if (body.features.length === 0) {
            callback('No address matched with your keyword',undefined)
        } else {
            callback(undefined, {
                latitude: body.features[0].center[1],
                longitude: body.features[0].center[0],
                location: body.features[0].place_name
            })
        }
    })
}
module.exports=geocode