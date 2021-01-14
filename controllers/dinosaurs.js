const express = require('express')
const router = express.Router()
const fs = require('fs')

// index route
router.get('/', (req, res)=>{
    let dinosaurs = fs.readFileSync('./dinosaurs.json')
    let dinoData = JSON.parse(dinosaurs)
    res.render('dinosaurs/index.ejs', {
        myDinos: dinoData
    })
})

// get new dino form
router.get('/new', (req, res)=>{
    res.render('dinosaurs/new.ejs')
})

// edit dino route
router.get('/edit/:idx', (req, res)=>{
    let dinosaurs = fs.readFileSync('./dinosaurs.json')
    let dinoData = JSON.parse(dinosaurs)

    // get array index from url parameter
    let dinoIndex = req.params.idx
    res.render('dinosaurs/edit.ejs', {
        myDino: dinoData[dinoIndex],
        dinoIdx: dinoIndex
    })
})

// show dino route
router.get('/:idx', (req, res)=>{
    // get dinosaur data from json file
    let dinosaurs = fs.readFileSync('./dinosaurs.json')
    let dinoData = JSON.parse(dinosaurs)

    // get array index from url parameter
    let dinoIndex = req.params.idx

    // render page with data of the specified animal
    res.render('dinosaurs/show.ejs', {myDino: dinoData[dinoIndex]})
})

// post dino route
router.post('/', (req, res)=>{
    // read the dinosaurs json file
    let dinosaurs = fs.readFileSync('./dinosaurs.json')
    let dinoData = JSON.parse(dinosaurs)

    // add new dino to the array
    dinoData.push(req.body)

    // save new dinosaurs array to the json file (convert back to json first)
    fs.writeFileSync('./dinosaurs.json', JSON.stringify(dinoData))

    // redirect to the GET /dinosaurs route (index)
    res.redirect('/dinosaurs')
})

// delete a dino
router.delete('/:idx', (req, res)=>{
    let dinosaurs = fs.readFileSync('./dinosaurs.json')
    let dinoData = JSON.parse(dinosaurs)

    // remove the deleted dinosaur from the dinosaurs array
    dinoData.splice(req.params.idx, 1)

    // save the new dinosaurs to the data.json file
    fs.writeFileSync('./dinosaurs.json', JSON.stringify(dinoData))

    console.log('deleted')
    res.redirect('/dinosaurs')
})

// put route
router.put('/:idx', (req, res)=>{
    let dinosaurs = fs.readFileSync('./dinosaurs.json')
    let dinoData = JSON.parse(dinosaurs)

    dinoData[req.params.idx].name = req.body.name
    dinoData[req.params.idx].name = req.body.type

    // save the edited dinosaurs to the json file
    fs.writeFileSync('./dinosaurs.json', JSON.stringify(dinoData))

    res.redirect('/dinosaurs')
})

module.exports = router