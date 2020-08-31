const express = require('express'),
      router = express.Router(),
      { signup } = require('../controllers/auth');

// validators
const {runValidation} = require('../validators/index');
const {signupValidator} = require('../validators/auth');


router.post('/signup', signupValidator, runValidation, signup);

module.exports = router;