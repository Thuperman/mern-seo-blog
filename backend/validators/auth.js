const {check} = require('express-validator');

exports.signupValidator = [
    check('name')
        .not()
        .isEmpty()
        .withMessage('Name is required'),
    check('email')
        .isEmail()
        .withMessage('Email is required'),
    check('password')
        .isLength({min: 6})
        .withMessage('Password must be 6 characters or greater.')
];

exports.signinValidator = [
    check('email')
        .isEmail()
        .withMessage('Email is required'),
    check('password')
        .isLength({min: 6})
        .withMessage('Password must be 6 characters or greater.')
];