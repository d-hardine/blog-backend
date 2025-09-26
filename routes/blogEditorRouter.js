const { Router } = require('express')
const blogEditotController = require('../controllers/blogEditorController')

const blogEditorRouter = Router()

blogEditorRouter.post('/api/editor-login', blogEditotController.editorLoginPost)
blogEditorRouter.get('/api/editor-auth', blogEditotController.jwtAuthenticate ,blogEditotController.authGet)
blogEditorRouter.get('/api/get-articles/:userId', blogEditotController.getArticles)

blogEditorRouter.post('/api/create-article', blogEditotController.jwtAuthenticate, blogEditotController.createArticlePost)

module.exports = blogEditorRouter