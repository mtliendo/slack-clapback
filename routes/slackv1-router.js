const express = require('express')
const slackv1Router = express.Router()

slackv1Router.post('/sassy', (req,res) => {
  const {text} = req.body
  // 1. trim outside whitespace
  // 2. capitalize
  // 3. split by internal whitespace
  // 4. append 👏🏾 to the end of each work
  // 5. join back together

  const  clapbackText = text.trim().toUpperCase().split(' ').map(word => `${word} :clap::skin-tone-5:`).join(' ')
  console.log(clapbackText)
  res.status(200).send(clapbackText)
}) 

module.exports = slackv1Router