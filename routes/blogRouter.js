const { Router } = require('express')
const blogController = require('../controllers/blogController')

const blogRouter = Router()

blogRouter.get('/api/getArticles', blogController.ArticlesGet)
blogRouter.get('/api/getArticle/:articleId', blogController.ArticleGet)
blogRouter.post('/api/signup', blogController.signUpPost)
blogRouter.post('/api/login', blogController.loginPost)
blogRouter.get('/api/protected', blogController.jwtAuthenticate ,blogController.protectedGet)

module.exports = blogRouter