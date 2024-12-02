const mongoose = require('mongoose')

const subscriberSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    subscribedToChannel: {
        type: String, 
        required: true
    },
    subscribeData: {
        type: Date,
        required: true,
        default: Date.now

    }
})

module.exports = mongoose.model('Subscriber', subscriberSchema)