const express = require('express')
const cors = require('cors')

const app = express()
const corsOptions = {
  origin: 'http://localhost/5173',
  optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
}

app.use(cors(corsOptions))

app.get('/api', (req, res) => {
    res.json({fruits: ['banana', 'papaya', 'grape']})
})

app.listen(3000, console.log('server started on port 3000'))