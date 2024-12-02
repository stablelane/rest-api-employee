const express = require('express')
const router = express.Router()
const Subscriber = require('../models/subscriber')
const subscriber = require('../models/subscriber')

router.get('/', async (req,res) => {
    try {
        const subscribers = await Subscriber.find()
        res.json(subscribers)
    } catch (err) {
        res.status(500).json({ message: err.message})
    }
})

router.get('/:id', getSubscriber, (req,res) => {
    res.json(res.subscriber)
})

router.post('/', async (req, res) => {
    const subscriber = new Subscriber({
        name: req.body.name,
        subscribedToChannel: req.body.subscribedToChannel
    })

    try {
        const newSubscriber = await subscriber.save()
        res.status(201).json(newSubscriber)
    } catch (err) {
        res.status(400).json({message: err.message})
    }
})

router.patch('/:id',getSubscriber, (req,res) => {

})

router.delete('/:id',getSubscriber, async (req,res) => {
    try {
        console.log(res)
        await res.subscriber.remove()
        res.json({ message: 'Deleted Subscriber'})
    } catch (error) {
        res.status(500).json({ message: error.message})
    }
})

async function getSubscriber(req, res, next) {
    let subscriber
    try {
        subscriber = await Subscriber.findById(req.params.id)
        if(subscriber == null) {
            return res.status(404).json({message: 'Cannot find subscriber'})
        }
    } catch (err) {
        return res.status(500).json({ message: err.message})
    }

    res.subscriber = subscriber
    next()
}
module.exports = router