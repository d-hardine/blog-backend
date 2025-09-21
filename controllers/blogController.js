const bcrypt = require('bcryptjs')
const db = require('../db/queries')
const passport = require('passport')

// Load environment variables
require('dotenv').config();

//jwt stuff
const jwt = require('jsonwebtoken')
const jwtAuthenticate = passport.authenticate('jwt', { session: false })

const articlesGet = async (req, res) => {
    const categoryName = req.params.categoryName //if the user clicked category tag on navigation sidebar
    const searchTerm = req.query.q //if the user trying to search articles
    const articles = await db.getArticles(categoryName, searchTerm)
    res.json(articles)
}

const categoriesGet = async (req, res) => {
    const categories = await db.getCategories()
    res.json(categories)
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
    await db.addNewComment(articleId, req.user.id, newComment)
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
    return res.status(200).json(req.user)
}

const commentDelete = async (req, res) => {
    await db.deleteComment(req.body.commentId) //delete the comment
    const comments = await db.getComments(req.body.articleId) //fetch the updated comments
    res.status(200).json(comments)
}

module.exports = { articlesGet, categoriesGet, ArticleGet, commentsGet, commentPost, signUpPost, loginPost, jwtAuthenticate, authGet, commentDelete }