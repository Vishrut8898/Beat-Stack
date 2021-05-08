const express = require('express')
const router = express.Router()

const User = require("../models/User");
const Song = require('../models/Song');

router.get('/', async (req, res) => {
  User.find({}, (err, data) => {
    if (err) throw err;
    res.render("homepage", { user: req.user });
  });
})

router.get('/about', async (req, res) => {
  res.render('about');
})

module.exports = router