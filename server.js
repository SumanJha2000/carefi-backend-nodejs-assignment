const express = require('express');
const app = express();
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const userroute = require('./routes/user');
const btcroute = require('./routes/bitcoin')
const passport = require('passport')
const { initializingPassport } = require('./passportConfig.js')
const expressSession = require('express-session')
dotenv.config();

const PORT = process.env.PORT || 8000

//mongooose connection
mongoose.connect(process.env.MONGO_URL)
    .then(data => console.log('mongodb connected successfully'))
    .catch(err => console.log(err.message));


//middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(expressSession({
    secret: "secret", resave: true, saveUninitialized: true
}))


app.use(passport.initialize())
app.use(passport.session());
initializingPassport(passport);


//routes
app.use(userroute);
app.use(btcroute)

//server listening
app.listen(PORT, () => {
    console.log(`server is listening at port ${PORT}`)
})