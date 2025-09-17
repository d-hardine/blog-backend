const bcrypt = require('bcryptjs')
const db = require('../db/queries')

// Load environment variables
require('dotenv').config();

//jwt stuff
const jwt = require('jsonwebtoken')

const indexGet = (req, res) => {
    const fruits = [
    {
        id: 1,
        fruit: 'banana'
    },
    {
        id: 2,
        fruit: 'strawberry'
    },
    {
        id: 3,
        fruit: 'grape'
    }]
    res.json(fruits)
}

const signUpPost = async (req, res) => {
    const hashedPassword = await bcrypt.hash(req.body.password, 10)
    await db.createNewUser(req.body.firstName, req.body.lastName, req.body.username, req.body.email, hashedPassword)
    res.status(201).json({message: "inputted data for sign up OK"})
}

const loginPost = async (req, res) => {
    const { username, password } = req.body
    const findUserInDb = await db.lookupUser(username)
    if(findUserInDb) {
        const match = await bcrypt.compare(password, findUserInDb.password)
        if(match) {
            const opts = {}
            opts.expiresIn = 90 //expires in 1.5 min
            const secret = process.env.JWT_SECRET
            delete findUserInDb.password //remove the password column
            const token = jwt.sign(findUserInDb, secret, opts)
            return res.status(200).json({
                message: 'auth passed',
                token
            })
        }
    }
    res.status(401).json({message: 'auth failed'})
}

module.exports = { indexGet, signUpPost, loginPost }