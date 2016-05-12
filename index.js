// note: because I made this a public repo, I added the bit about secrets later
const secrets = require('./secrets')

const { get, post } = require('got')
const fs = require('mz/fs')

const payload = {
  foo: 'foo',
}

const body = {
  event_type: 'create',
  status: 'success',
  payload: JSON.stringify(payload),
}

const postOpts = {
  protocol: 'https:',
  hostname: 'platform-interview-test.herokuapp.com',
  path: '/api/events',
  auth: `${secrets.key}:x`,
  header: {
    'Accept': 'application/json',
    'Content-Length': 72,
  },
  body,
}

const POST = () => post(postOpts)
  .then(res => {
    console.log(res.headers)
    return res.body
  })
  .then(data => {
    fs.writeFile('data.json', data)
  })
  .catch(err => { console.error(err) })

const getOpts = {
  protocol: 'https:',
  hostname: 'platform-interview-test.herokuapp.com',
  path: '/api/events',
  auth: `${secrets.key}:x`,
}

const GET = () => get(getOpts)
  .then(res => {
    console.log(res.headers)
    return res.body
  })
  .then(data => {
    fs.writeFile('data.json', data)
  })
  .catch(err => { console.error(err) })

POST()
// GET()
