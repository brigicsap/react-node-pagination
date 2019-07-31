const express = require('express')
const request = require('request')
const cors = require('cors')
const bodyParser = require('body-parser')
const port = 7777
const app = express()
const routes = require('./routes/index')

app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())
app.use(cors())

app.use('/', routes)

app.listen(port, () => console.log(`Server running on port ${port}`))
