const express= require('express')
const app = express()
const ejsLayouts = require('express-ejs-layouts')
const fs = require('fs')
const methodOverride = require('method-override')

// middleware
app.set('view engine', 'ejs')
app.use(ejsLayouts)


// method-override
app.use(methodOverride('_method'))

// body-parser middleware
app.use(express.urlencoded({extended: false}))

// controllers middleware
app.use('/dinosaurs', require('./controllers/dinosaurs.js'))
app.use('/prehistoric_creatures', require('./controllers/prehistoric_creatures.js'))

// home route
app.get('/', (req, res)=>{ 
    res.render('home.ejs')
})

app.listen(3000, ()=>{
    console.log("Port 3000")
})