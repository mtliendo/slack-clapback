require('dotenv').config()
const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const slackv1Router = require('./routes/slackv1-router')
const {PORT} = process.env

app.use(bodyParser.urlencoded({extended:false}))
app.use('/slack/v1',slackv1Router)

app.listen(PORT, () => console.log(`server running on port: ${PORT}`))