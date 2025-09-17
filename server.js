const express = require('express')
//const cors = require('cors')
const blogRouter = require('./routes/blogRouter')

// Load environment variables
require('dotenv').config();

//express initialization
const app = express()

//const corsOptions = {
//  origin: 'http://localhost/5173',
//  optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
//}

//app.use(cors(corsOptions))

//access html body
app.use(express.json())
app.use(express.urlencoded({extended: true}))

//routes middleware
app.use(blogRouter)

app.listen(8100, console.log('server started on port 8100'))