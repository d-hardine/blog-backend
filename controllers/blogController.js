const bcrypt = require('bcryptjs')
const db = require('../db/queries')
const passport = require('passport')

// Load environment variables
require('dotenv').config();

//jwt stuff
const jwt = require('jsonwebtoken')

const ArticlesGet = async (req, res) => {
    const articles = await db.getArticles()
    res.json(articles)
}

const ArticleGet = async (req, res) => {
    const article = await db.getArticle(req.params.articleId)
    res.json(article)
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
            opts.expiresIn = 900 //expires in 15 min
            const secret = process.env.JWT_SECRET
            const username = findUserInDb.username
            const token = jwt.sign({ username }, secret, opts)
            return res.status(200).json({
                message: 'auth passed',
                token
            })
        }
    }
    res.status(401).json({message: 'auth failed'})
}

const jwtAuthenticate = passport.authenticate('jwt', { session: false })

const protectedGet = (req, res) => {
    return res.status(200).send("Yay! You're authenticated!")
}

module.exports = { ArticlesGet, ArticleGet, signUpPost, loginPost, jwtAuthenticate, protectedGet }