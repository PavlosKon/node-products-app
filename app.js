const express = require('express')
const app = express()
const port = 3000
const mongoose = require('mongoose')

app.use(express.json())

mongoose.connect(process.env.MONGODB_URI)   // Apo tin 20+ mporoume apla na valouem ena flag sto .env
.then(
    () => { console.log("Connection to MongoDB established")},
    err => { console.log("Connection error", err)}
)

// app.get('/api/user', (req, res) => {

// })
const user = require('./routes/user.route') // Exoume ekxorisei oles tis kliseis tou route
const userProduct = require('./routes/user.products.route.js')

app.use('/api/users', user)  //middleware otan paei /user na kalesei ta functions tou const user
app.use('/api/user-products', userProduct)

app.listen(port, () => {
    console.log("Server is up")
})

