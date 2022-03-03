const request = require('request')

const forecast = (latitude, longitude, callback) => {

    const url = 'http://api.weatherstack.com/current?access_key=27f589cbfd13e814ce1b00102fe8d6b5&query=' + latitude + ',' + longitude +'&units=f'

    request({url, json:true}, (error, {body}) => {
        if (error) {
            callback('Unable to connect to weather service!')
        } else if (body.error){
            callback('Unable to find location')
        }else {
             callback(undefined, body.current.weather_descriptions[0] + ". It is currently "+ body.current.temperature +" degrees out. It feels like " + body.current.feelslike+ " degrees.")
        }   
    })
}

module.exports = forecast