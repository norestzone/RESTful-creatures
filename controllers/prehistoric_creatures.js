const express = require('express')
const router = express.Router()
const fs = require('fs')

// PC index route
router.get('/', (req, res)=>{
    let creatures = fs.readFileSync('./prehistoric_creatures.json')
    let creatureData = JSON.parse(creatures)
    res.render('prehistoric_creatures/indexpc.ejs', {
        myCreatures: creatureData
    })
})

// get new creature route
router.get('/new', (req, res)=>{
    res.render('prehistoric_creatures/newpc.ejs')
})

// edit creature route
router.get('/edit/:idx', (req, res)=>{
    let creatures = fs.readFileSync('./prehistoric_creatures.json')
    let creatureData = JSON.parse(creatures)

    // get array index from url parameter
    let creatureIndex = req.params.idx
    res.render('prehistoric_creatures/editpc.ejs', {
        myCreature: creatureData[creatureIndex],
        creatureIdx:creatureIndex
    })
})

// show creature route
router.get('/:idx', (req, res)=>{
    // get dinosaur data from json file
    let creatures = fs.readFileSync('./prehistoric_creatures.json')
    let creatureData = JSON.parse(creatures)

    // get array index from url parameter
    let creatureIndex = req.params.idx

    // render page with data of the specified animal
    res.render('prehistoric_creatures/showpc.ejs', {myCreature: creatureData[creatureIndex]})
})

// post creature route
router.post('/', (req, res)=>{
    // read the creatures json file
    let creatures = fs.readFileSync('./prehistoric_creatures.json')
    let creatureData = JSON.parse(creatures)

    // add new creature to the array
    creatureData.push(req.body)

    // save new creatures array to the json file (convert back to json first)
    fs.writeFileSync('./prehistoric_creatures.json', JSON.stringify(creatureData))

    // redirect to the GET /creatures route (index)
    res.redirect('/prehistoric_creatures')
})

// delete a creature
router.delete('/:idx', (req, res)=>{
    let creatures = fs.readFileSync('./prehistoric_creatures.json')
    let creatureData = JSON.parse(creatures)

    // remove the deleted dinosaur from the dinosaurs array
    creatureData.splice(req.params.idx, 1)

    // save the new dinosaurs to the data.json file
    fs.writeFileSync('./prehistoric_creatures.json', JSON.stringify(creatureData))

    console.log('deleted')
    res.redirect('/prehistoric_creatures')
})

// put route
router.put('/:idx', (req, res)=>{
    let creatures = fs.readFileSync('./prehistoric_creature.json')
    let creatureData = JSON.parse(creatures)

    creatureData[req.params.idx].name = req.body.name
    creatureData[req.params.idx].name = req.body.type

    // save the edited dinosaurs to the json file
    fs.writeFileSync('./prehistoric_creature.json', JSON.stringify(creatureData))

    res.redirect('/prehistoric_creature')
})

module.exports = router