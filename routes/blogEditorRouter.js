const { Router } = require('express')
const blogEditorController = require('../controllers/blogEditorController')

const blogEditorRouter = Router()

blogEditorRouter.post('/api/editor-login', blogEditorController.editorLoginPost)
blogEditorRouter.get('/api/editor-auth', blogEditorController.jwtAuthenticate ,blogEditorController.authGet)
blogEditorRouter.get('/api/get-articles/:userId', blogEditorController.getArticles)

blogEditorRouter.post('/api/create-article', blogEditorController.jwtAuthenticate, blogEditorController.createArticlePost)
blogEditorRouter.put('/api/update-article/:articleId', blogEditorController.jwtAuthenticate, blogEditorController.updateArticlePut)
blogEditorRouter.delete('/api/delete-article', blogEditorController.articleDelete)

blogEditorRouter.put('/api/update-publish', blogEditorController.updatePublishPut)

module.exports = blogEditorRouter