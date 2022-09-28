const LocalStrategy = require('passport-local').Strategy;
const User = require('./models/user.js');
const passport = require('passport');

exports.initializingPassport = async (passport) => {
    try {
        passport.use(new LocalStrategy(
            async (username, password, done) => {

                const user = await User.findOne({ username: username });

                if (!user) return done(null, false, { message: "user not present" })
                if (password != user.password) return done(null, false);
                return done(null, user);

            })
        )
    } catch (err) {
        return done(error, false);
    }


    //set the id to the user
    passport.serializeUser((user, done) => {

        done(null, user.id);
    })


    //find the user
    passport.deserializeUser(async (id, done) => {
        try {
            const user = await User.findById({ _id: id });
            done(null, user);
        } catch (err) {
            done(err, false);
        }
    })
}

exports.isAuthenticated = (req, res, next) => {
    console.log(req.user, 'req.user');
    if (req.user) {
        return next();
    }

    res.send('unauthorized');
}





module.export = passport;