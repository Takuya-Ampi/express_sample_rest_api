const mongoose = require('mongoose')
const User = require('../models/user')
module.exports = {
  // 全てのユーザーを取得する。
  find_users : async (req, res) => {
    await User.find({})
      .exec()
      .then(users => {
        res.json(users)
      })
      .catch(err => {
        res.send(err)
      })
  },

  // 新しいユーザーを作成する。
  create_user : async (req, res) => {
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
  },


  // 特定のユーザーを取得する。
  find_user : async (req, res) => {
    await User.findById(req.params.user_id)
      .exec()
      .then(user => {
        res.json(user)
      })
      .catch(err => {
        res.send(err)
      })
  },

  // 特定のユーザーを更新する。
  update_user : async (req, res) => {
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
      await result.save()
      .then(result => {
        res.json({ message: "User created"})
      })
      .catch(err => {
        res.send(err)
      })
  },

  // 特定のユーザーを削除する。
  delete_user : async (req, res) => {
    await User.deleteOne({
      _id: req.params.user_id
    })
      .exec()
      .then(() => res.json({ message: "Successfully deleted"}))
      .catch(err => res.send(err))
  }
}
