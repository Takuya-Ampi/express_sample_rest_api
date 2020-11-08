const express = require('express')
const app = express()
const router = require('./api/routes/routes')
const bodyParser = require('body-parser')
const port = process.env.PORT || 3000
const mongoose = require('mongoose')

// なくても動くっぽいのでコメントアウト
// mongoose.Promise = global.Promise

// useNewUrlParser: true, useCreateIndex: trueは公式見るといるっぽい。公式見る
mongoose.connect('mongodb://localhost:27017/jsonAPI', { useNewUrlParser: true, useCreateIndex: true })

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use('/api', router)

app.listen(port)
console.info('listen on port: ' + port)
