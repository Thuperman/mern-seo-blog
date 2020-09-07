const User = require('../models/user'),
      shortId = require('shortid'), 
      jwt = require('jsonwebtoken'),
    //   user = require('../models/user'),
      expressJwt = require('express-jwt');
      require('dotenv').config();

    exports.signup = (req, res) => {
        User.findOne({email: req.body.email}).exec((err, user) => {
            if(user) {
                return res.status(400).json({
                    error: 'Email is taken'
                });
            };
            const {name, email, password} = req.body;
            let username = shortId.generate();
            let profile = `${process.env.CLIENT_URL}/profile/${username}`;

            let newUser = new User({ name, email, password, profile, username });
            newUser.save((err, success) => {
                if(err) {
                    return res.status(400).json({
                        error: err
                    });
                }
                // res.json({
                //     user: success
                // });
                res.json({
                    message: 'Signup success! Please sign in.'
                });
            });
        });
    }

    exports.signin = (req, res) => {
        const { email, password } = req.body
        //check if user exists
        User.findOne({ email }).exec((err, user) => {
            if(err || !user) {
                return res.status(400).json({
                    error: 'User with that email does not exist. Please signup!'
                });
            }
            //authenticate user
            if(!user.authenticate(password)) {
                return res.status(400).json({
                    error: 'Email &/or password incorrect. Please try again.'
                });
            }

            //generate a json web token and send it to the client
            const token = jwt.sign({_id: user._id}, process.env.JWT_SECRET, {expiresIn: '1d'});

            res.cookie('token', token, {expiresIn: '1d'})
            const {_id, username, name, email, role} = user;
            return res.json({
                token, 
                user
            });
        });
    }

    exports.signout = (req, res) => {
        res.clearCookie('token');
        res.json({
            message: 'Signout success'
        });
    }

    exports.requireSignin = expressJwt({
        secret: process.env.JWT_SECRET,
        algorithms: ["HS256"], // added later
        userProperty: "auth",
    });