const bcrypt = require('bcryptjs')
const db = require('../db/queries')
const passport = require('passport')

// Load environment variables
require('dotenv').config();

//jwt stuff
const jwt = require('jsonwebtoken')
const jwtAuthenticate = passport.authenticate('jwt', { session: false })

const ArticlesGet = async (req, res) => {
    const articles = await db.getArticles()
    res.json(articles)
}

const ArticleGet = async (req, res) => {
    const article = await db.getArticle(req.params.articleId)
    res.json(article)
}

const commentsGet = async (req, res) => {
    const comments = await db.getComments(req.params.articleId)
    res.json(comments)
}

const commentPost = async (req, res) => {
    const {articleId, userId, newComment} = req.body
    await db.addNewComment(articleId, userId, newComment)
    const comments = await db.getComments(articleId)
    res.status(200).json(comments)
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
            opts.expiresIn = '7d' //expires in 7 days
            const secret = process.env.JWT_SECRET
            const username = findUserInDb.username
            const userId = findUserInDb.id
            const token = jwt.sign({ username, userId }, secret, opts)
            return res.status(200).json({
                message: 'auth passed',
                username: username,
                userId: userId,
                token
            })
        } else
            res.status(401).json({message: 'auth failed'})
    }
    res.status(401).json({message: 'auth failed'})
}

const authGet = (req, res) => {
    return res.status(200).send("Yay! You're authenticated!")
}

module.exports = { ArticlesGet, ArticleGet, commentsGet, commentPost, signUpPost, loginPost, jwtAuthenticate, authGet }