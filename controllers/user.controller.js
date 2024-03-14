const User = require('../models/user.model')

exports.findAll = async(req, res) => {
    console.log("Find all users")

    try {
        const result = await User.find()
        res.status(200).json({data: result});
        // res.status(200).send("Hello")

    } catch (err) {
        console.log(`Error reading users, ${err}`)
    }
}

exports.findOne = async(req, res) => {
    console.log("Find a user")

    const username = req.params.username    // Apo to express, etsi mporoume na diavasoume Path Params
    try {
        const result = await User.findOne({username: username})
        res.status(200).json({data: result}) // metatrepei se JSON kai to Express metatrepei to content se JSON (den einai default pou einai to html)
    } catch(err) {
        console.log("Problem in reading user", $(err))
    }
}

exports.create = async(rew, res) => {
    console.log("Insert user")

    console.log(req.body)

    const newUser = new User({
        username: req.body.username,
        password: req.body.password,
        name: req.body.name,
        surname: req.body.surname,
        email: req.body.email,
        address: req.body.address,
        phone: req.body.phone,
        products: req.body.products
    })

    try {
        const result = await newUser.save()
        res.status(200).json({data: result})
        console.log("User saved")
    } catch(err) {
        res.status(400).json({data: err})
    }
}

exports.update = async(req, res) => {
    const username = req.params.username;

    console.log("Update user with username ", username)

    const updateUser = {
        name: req.body.name,
        surname: req.body.surname,
        email: req.body.email,
        address: req.body.address,
        phone: req.body.phoners
    }

    try {
        const result = await User.findOneAndUpdate(
            {username: username},
            updateUser,
            {new: true} // An den iparxei sto collection mas na to dimiourgisei 
        )
        res.status(200).json({data: result})
        console.log("Success in updating user ", username)
    } catch(err) {
        res.status(400).json({data: err})
        console.log("Problem in updating user ", user)
    }
}

exports.delete = async(req, res) => {
    const username = req.params.username

    console.log("Delete user: ", username)

    try {
        const result = await User.findOneAndDelete({username: username})
        res.status(200).json({data: result})
        console.log("Success in deleting user ", username)
    } catch (err) {
        res.json({data: err})
        console.log("Problem in deleting user")
    }
}
