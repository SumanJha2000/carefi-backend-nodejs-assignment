const User = require("../models/user");

const userCtrl = {
    register: async (req, res) => {
        try {
            const { name, username, password, confirmpassword } = req.body;
            const user = await User.find({ username: username });
            if (user.length) return res.status(401).json({ message: 'user already exists' });
            if (password !== confirmpassword) return res.status(400).json({ message: `incorrect password` });
            const newUser = await User.create(req.body);
            res.status(200).json({ message: 'user created successfully' });
        } catch (err) {
            res.status(400).json({ error: err.message })
        }
    },

    login: async (req, res) => {
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
    }
}


module.exports = userCtrl;