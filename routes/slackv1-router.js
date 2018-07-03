const express = require('express')
const slackv1Router = express.Router()
const {getSlackToken} = require('../services/slack-oauth')
const {clapback} = require('../services/slack-transforms')

const {CLIENT_ID, CLIENT_SECRET, VERIFICATION_TOKEN} = process.env

slackv1Router.post('/sassy', (req,res) => {
  
  const {text, token} = req.body
  const clapbackText = clapback(text)

  if(token === VERIFICATION_TOKEN) {

    res.status(200).json({
      response_type: "in_channel",
      text: clapbackText
    })
  }else {
    res.status(200).json({
      response_type:'ephemeral',
      text: 'request not valid'
    })
  }
})

slackv1Router.get('/auth', (req,res) => {
  const creds = {
    client_id: CLIENT_ID,
    client_secret: CLIENT_SECRET,
    code: req.query.code
  }

  getSlackToken(creds)
  .then(data => {
    console.log(data)
    data.access_token ? 
      res.redirect('https://github.com/mtliendo/slack-clapback/blob/master/README.md') 
    : res.json({error: 'no authentication given'})
  })
  .catch(e => console.log(e))
})

module.exports = slackv1Router