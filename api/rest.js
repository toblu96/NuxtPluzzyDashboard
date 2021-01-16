import axios from 'axios'

const bodyParser = require('body-parser')
const app = require('express')()

app.use(bodyParser.json())

// serverside fetch (cors)
app.all('/serverFetch', async (req, res) => {
  try {

    const response = await axios({
      method: req.method,
      url: req.query.url,
      headers: req.headers
    })

    console.log(response.data)

    res.json(response.data)
  } catch (err) {
    return res.status(err.response.status).send({
      message: err.response.statusText
    });
  }
})

module.exports = app