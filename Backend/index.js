//this is the main server which handle all the requret
const connectToMongo = require('./db')
const express = require('express');
const cors = require('cors');// this enables to share file from diffrent browser's
const app = express()
const port = 5000
//port= 3000 our react application will run

// app.use is basically the middleware which helps to take content from the req
app.use(cors());
app.use(express.json())

app.get('/', (req, res) => {
  res.send('Hello World Harry!')
})

// Available Routes
app.use('/api/auth', require('./routes/auth'))
app.use('/api/notes', require('./routes/note'))


app.listen(port, () => {
  console.log(`iNotebook app listening on port http://localhost:${port}`)
})

connectToMongo();





// here we connected to Mongo, Express