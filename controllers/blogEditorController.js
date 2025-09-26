const bcrypt = require('bcryptjs')
const db = require('../db/queries')
const passport = require('passport')

// Load environment variables
require('dotenv').config();

//jwt stuff
const jwt = require('jsonwebtoken')
const jwtAuthenticate = passport.authenticate('jwt', { session: false })

const editorLoginPost = async (req, res) => {
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
                editor: true,
                token
            })
        } else
            res.status(401).json({message: 'auth failed'})
    }
    res.status(401).json({message: 'auth failed'})
}

const authGet = (req, res) => {
    return res.status(200).json(req.user)
}

const getArticles = async (req, res) => {
    const articles = await db.getEditorArticles(req.params.userId)
    res.json(articles)
}

const createArticlePost = async (req, res) => {
    const {editorTitle, categoryId, editorBody} = req.body
    await db.createArticle(editorTitle, editorBody, Number(categoryId), req.user.id)
    res.send('api is working')
}

module.exports = { jwtAuthenticate, editorLoginPost, authGet, getArticles, createArticlePost }