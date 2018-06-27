const axios = require('axios')
const qs = require('qs')

const getSlackToken = (creds) => {

  const url = 'https://slack.com/api/oauth.access'
  const data = {
    client_id: creds.client_id,
    client_secret: creds.client_secret,
    code: creds.code
   }

  const options = {
    method: 'post',
    headers: { 'content-type': 'application/x-www-form-urlencoded' },
    data: qs.stringify(data),
    url,
  }

  return axios(options)
  .then(res => res.data)
  .catch(e=> e)
}

module.exports.getSlackToken = getSlackToken