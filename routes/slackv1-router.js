const express = require('express')
const slackv1Router = express.Router()

slackv1Router.post('/sassy', (req,res) => {
  res.send('hello')
})

module.exports = slackv1Router