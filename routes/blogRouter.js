const { Router } = require('express')
const blogController = require('../controllers/blogController')

const blogRouter = Router()

blogRouter.get('/api/getArticles', blogController.ArticlesGet)
blogRouter.get('/api/getArticle/:articleId', blogController.ArticleGet)
blogRouter.get('/api/getComments/:articleId', blogController.commentsGet)
blogRouter.post('/api/postNewComment', blogController.jwtAuthenticate, blogController.commentPost)

blogRouter.post('/api/signup', blogController.signUpPost)
blogRouter.post('/api/login', blogController.loginPost)

blogRouter.get('/api/auth', blogController.jwtAuthenticate ,blogController.authGet)

module.exports = blogRouter