const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const passport = require('passport');
const local = require('passport-local')

//User model
const User = require('../../Models/User');



//Register Handle
router.post('/users/register', (req, res) => {
    console.log('imateapot')
    const { name, email, password, password2 } = req.body;
    let errors = [];
    console.log(req.body);
    //Check required fields
    if (!name || !email || !password || !password2) {
        errors.push({ msg: 'Please fill in all fields' });
    }
    
    //Check that passwords match
    if (password !== password2) {
        errors.push({ msg: 'Passwords do not match' });
    }

    if(errors.length > 0) {
        res.json({errors});
        console.log(errors);
        
    } else {
        //Validation Passed
        User.findOne({ email: email })
            .then(user => {
                if (user) {
                    errors.push({ msg: 'Email is already registered.'})
                    res.json(errors)
                    console.log(errors)
                } else {
                    const newUser = new User({
                        name,
                        email,
                        password
                    });

                    //Hash password
                    bcrypt.genSalt(10, (err, salt) => 
                        bcrypt.hash(newUser.password, salt, (err, hash) => {
                            if (err) throw err;
                            //Set password to hashed
                            newUser.password = hash;
                            //Save user
                            newUser.save()
                                .then(user => {
                                    console.log('success')
                                    res.json({user});
                                })
                                .catch()
                    }))
                }
            })
    }
})

//Login handle
router.post('/users/login', 
  passport.authenticate('local', { failureRedirect: '/login' }),
  function(req, res) {
    res.json({user: req.user});
});

//Logout handle
router.post('/logout', function (req, res, next) {
    req.logout();
    res.json({ status: 'OK' });
});

module.exports = router