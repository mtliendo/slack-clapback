const express = require('express')
const slackv1Router = express.Router()
const {getSlackToken} = require('../services/slack-oauth')
const {clapback,getFormData} = require('../services/slack-transforms')
const crypto = require('crypto')

const {CLIENT_ID, CLIENT_SECRET} = process.env

slackv1Router.post('/sassy', (req,res) => {
  
  const {text} = req.body
  const formData = getFormData(req.body)
  const timestamp = req.get('X-Slack-Request-Timestamp')
  const baseString = `v0:${timestamp}:${formData}`
  const hmac = crypto.createHmac('sha256', baseString)
  const clapbackText = clapback(text)

  console.log('the hmac value is:', hmac)

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
    console.log(data)
    data.access_token ? 
      res.redirect('https://github.com/mtliendo/slack-clapback/blob/master/README.md') 
    : res.json({error: 'no authentication given'})
  })
  .catch(e => console.log(e))
})

module.exports = slackv1Router