const express = require('express'),
      router = express.Router(),
      { signup } = require('../controllers/auth');

// validators
const {signupValidator} = require('../validators/auth');
const {runValidation} = require('../validators/index');


router.post('/signup', signupValidator, runValidation, signup);

module.exports = router;