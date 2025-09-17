const { Router } = require('express')
const blogController = require('../controllers/blogController')

const blogRouter = Router()

blogRouter.get('/api', blogController.indexGet)
blogRouter.post('/api/signup', blogController.signUpPost)
blogRouter.post('/api/login', blogController.loginPost)

module.exports = blogRouter