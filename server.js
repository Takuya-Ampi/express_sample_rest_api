const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const port = process.env.PORT || 3000
const router = express.Router()
const mongoose = require('mongoose')
const User = require('./app/models/user')

// mongoose.Promise = global.Promise
mongoose.connect('mongodb://localhost:27017/jsonAPI', { useNewUrlParser: true, useCreateIndex: true })


app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use('/api', router)

router.use((req, res, next) => {
  console.info('Something is happening.')
  next()
})
router.get('/', (req, res) => {
  res.json({ message: "Succesfully /api a test message."})
})
router.route('/users')
  .post(async(req, res) => {
    const user = new User()

    user.twitter_id = req.body.twitter_id
    user.name = req.body.name
    user.age = req.body.age

    await user.save()
      .then(result => {
        res.json({ message: "User created"})
      })
      .catch(err => {
        res.send(err)
        console.error(err)
      })
  })
  .get(async(req, res) => {
    await User.find({})
      .exec()
      .then(users => {
        res.json(users)
      })
      .catch(err => {
        res.send(err)
      })
  })

router.route('/users/:user_id')
  .get(async(req, res) => {
    await User.findById(req.params.user_id)
      .exec()
      .then(user => {
        res.json(user)
      })
      .catch(err => {
        res.send(err)
      })
  })
  .put(async(req, res) => {
    const result =  await User.findById(req.params.user_id)
      .then(user => {
        user.twitter_id = req.body.twitter_id
        user.name = req.body.name
        user.age = req.body.age
        return user
      })
      .catch(err => {
        res.send(err)
      })
    console.log('result', result)


      await result.save()
      .then(result => {
        res.json({ message: "User created"})
      })
      .catch(err => {
        res.send(err)
      })

  })
  .delete(async(req, res) => {
    await User.deleteOne({
      _id: req.params.user_id
    })
      .exec()
      .then(() => res.json({ message: "Successfully deleted"}))
      .catch(err => res.send(err))
  })

app.listen(port)
console.info('listen on port: ' + port)
