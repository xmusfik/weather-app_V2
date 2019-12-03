const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')
const path = require('path');
const express = require('express');
const hbs = require('hbs')
const app = express()


// Path for using directory
const publicPathDir = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// handlebar setup
app.set('view engine', 'hbs');
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

//Static path declared
app.use(express.static(publicPathDir))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather App',
        name: 'Musfikur rahman'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About page',
        name: 'Musfikur rahman'
    })
})
app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help page',
        name: 'Musfikur rahman'
    })
})

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'Please input your address'
        })
    }
    geocode(req.query.address, (error, { latitude, longitude, location } = {}) => {
        if (error) {
            return res.send({
                error: 'Something not well'
            })
        }
        forecast(latitude, longitude, (error, forecastData) => {
            if (error) {
                return res.send({ error })
            }
            res.send({
                forecast: forecastData,
                location,
                address: req.query.address
            })
        })


    })
})
app.get('*', (req, res) => {
    res.render('error', {
        title: 'Eroor Page',
        notify: 'Your Page Not Found Try again Bro',

    })
})
app.listen(3000, () => {
    console.log('Server is up in port 3000')
})
module.exports = app