const axios = require('axios')

const TOKEN_URL = 'https://github.com/login/oauth/access_token'
const USER_URL = 'https://api.github.com/user'

const gitHubClientId ="74117a69360e7fbfdabc"
const gitHubClientSecret = "11f30cc178c831d95f15887af826dd898dce2e90"

async function getGitHubUser(code) {
  const token = await getAccessToken(code)
  return getUser(token)
}

async function getAccessToken(code) {
  const response = await axios.post(
    TOKEN_URL,
    {
      client_id: gitHubClientId,
      client_secret: gitHubClientSecret,
      code,
    },
    {
      headers: {Accept: 'application/json'},
    }
  )

  return response.data.access_token
}

async function getUser(token) {
  const response = await axios.get(USER_URL, {
    headers: {Authorization: `Bearer ${token}`},
  })

  return response.data 
}

module.exports = {
  getGitHubUser
}