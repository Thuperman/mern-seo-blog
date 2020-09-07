const express = require('express'),
      router = express.Router(),
      { signup, signin, signout, requireSignin } = require('../controllers/auth');

// validators
const { runValidation } = require('../validators/index');
const { signupValidator, signinValidator } = require('../validators/auth');


router.post('/signup', signupValidator, runValidation, signup);
router.post('/signin', signinValidator, runValidation, signin);
router.post('/signout', signout);
//test
router.get('/secret', requireSignin, (req, res) => {
    res.json({
        message: 'you have access to secret page.'
    });
});

module.exports = router;