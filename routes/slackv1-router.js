const express = require('express')
const slackv1Router = express.Router()
const {getSlackToken} = require('../services/slack-oauth')
const {clapback} = require('../services/slack-transforms')

const {CLIENT_ID, CLIENT_SECRET} = process.env

slackv1Router.post('/sassy', (req,res) => {
  const {text} = req.body
  const clapbackText = clapback(text)
  res.status(200).json({
    response_type: "in_channel",
    text: clapbackText
  })
})

slackv1Router.get('/auth', (req,res) => {
  const creds = {
    client_id: CLIENT_ID,
    client_secret: CLIENT_SECRET,
    code: req.query.code
  }

  getSlackToken(creds)
  .then(data => {
    data.token ? 
      res.redirect(200,'https://github.com/mtliendo/slack-clapback') 
    : res.json({error: 'no authentication given'})
  })
  .catch(e => console.log(e))
})

module.exports = slackv1Router