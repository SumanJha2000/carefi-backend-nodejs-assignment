const express = require('express')
const router = express.Router();
const user = require('../controllers/user.js')



router.post('/register', user.register)
router.post('/login', (req, res) => {
    passport.authenticate('local', (err, user, info) => {
        if (err) throw err;
        console.log(user, 'user')
        if (!user) res.send("no user exists");
        else {
            req.logIn(user, err => {
                if (err) throw err;
                res.send("Successfully authenticated")

            })
        }
    })(req, res, next);

})

module.exports = router;