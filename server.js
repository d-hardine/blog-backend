const express = require('express')
const blogRouter = require('./routes/blogRouter')
const blogEditorRouter = require('./routes/blogEditorRouter')

// Load environment variables
require('dotenv').config();

//express initialization
const app = express()

//access html body
app.use(express.json())
app.use(express.urlencoded({extended: true}))

//routes middleware
app.use(blogRouter)
app.use(blogEditorRouter)

// Need to require the entire Passport config module so server.js knows about it
require('./configs/passport')

app.listen(8100, console.log('server started on port 8100'))