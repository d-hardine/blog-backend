const express = require('express')
const cors = require('cors')

const app = express()
const corsOption = {
    origin: 'http://localhost:5173'
}

app.use(cors(corsOption))

app.get('/api', (req, res) => {
    res.json({fruits: ['mango', 'grape', 'apple']})
})

app.listen(3000, console.log('server started on port 3000'))