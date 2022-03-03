const path = require('path')
const express = require("express")
const hbs = require('hbs')
const geocode = require("./utils/geocode")
const forecast =  require("./utils/forecast")


const app = express()


// Define paths for Express configuration
const publicDirectoryPath = path.join(__dirname, "../public")
const viewsPath = path.join(__dirname,"../template/views")
const partialsPath = path.join(__dirname,"../template/partials")

// Setup handlebars engine and views location
app.set("view engine", "hbs")
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)



// Setup static directory to serve
app.use(express.static(publicDirectoryPath))

//Setup Express requests

app.get('',(req,res) => {
    res.render('index', {
        title: 'Weather',
        name: "Tobi Raji"
    })
})

app.get('/about',(req,res) => {
    res.render('about', {
        title: 'About Page',
        name: "Tobi Raji"
    })
})

app.get('/help',(req,res) => {
    res.render('help', {
        title: 'Help page',
        content: "You don't have to worry",
        name: "Tobi Raji"
    })
})

app.get("/weather",(req,res) => {
    if(!req.query.address) {
        return res.send ({
            error: "You must provide address"
        })
    }

    geocode(req.query.address, (error, {latitude, longitude, location} = {}) => {
        if (error) {
            return res.send ({error})
        }
        forecast(latitude, longitude, (error, forecastData) => {
            if (error) {
                return res.send({error})
            }
            res.send({
                forecast: forecastData,
                location,
                address: req.query.address
            })
        })
    })
})

app.get("/products", (req,res) => {
    if (!req.query.search){
        return res.send({
            error: "You must provide a search term"
        })
    }
    console.log(req.query.rating)
    res.send({
        product:[]
    })
})
app.get("/help/*", (req,res) => {
    res.render("help_error", {
        content: "Help article",
        name: "Tobi Raji"
    })
})

app.get("*", (req,res) => {
    res.render("all_error", {
        content: "Page",
        name: "Tobi Raji"
    })
})

app.listen(3000, () => {
    console.log('Server is up on port 3000')
})

