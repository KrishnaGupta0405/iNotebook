const connectToMongo = require('./db')
const express = require('express')
const app = express()
const port = 3000

app.get('/', (req, res) => {
  res.send('Hello World Harry!')
})

app.listen(port, () => {
  console.log(`Example app listening on port http://localhost:${port}`)
})
connectToMongo();

// here we connected to Mongo, Express