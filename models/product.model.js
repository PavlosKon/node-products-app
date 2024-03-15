const mongoose = require('mongoose')

const schema = mongoose.Schema

let productSchema = new schema({
    product: {type: String, required: true},
    cost: {type: Number, required: true},
    description: {type: String, required: true},
    quantity: {type: Number, required: true}
}, {
    collection: 'products',
    timestamps: true
})

module.exports = mongoose.model('Product', productSchema)