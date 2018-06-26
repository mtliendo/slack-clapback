const express = require('express')
const slackv1Router = express.Router()
const {getSlackToken} = require('../services/slack-oauth')

const {CLIENT_ID, CLIENT_SECRET} = process.env

slackv1Router.post('/sassy', (req,res) => {
  const {text} = req.body
  // 1. trim outside whitespace
  // 2. capitalize
  // 3. split by internal whitespace
  // 4. append 👏🏾 to the end of each work
  // 5. join back together
  console.log(req.body)
  const  clapbackText = text.trim().toUpperCase().split(' ').map(word => `${word} :clap::skin-tone-5:`).join(' ')
  console.log(clapbackText)

  res.status(200).json({
    response_type: "in_channel",
    text: clapbackText
  })
})

slackv1Router.post('/auth', (req,res) => {
  const creds = {
    client_id: CLIENT_ID,
    client_secret: CLIENT_SECRET,
    code: req.query.code
  }
  console.log('in here')
  getSlackToken(creds)
  .then(data => {
    console.log(data)
    res.send('success')
  })
})

module.exports = slackv1Router