if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config()
}

const express = require('express')
const app = express()
const expressLayouts = require('express-ejs-layouts')
const bodyParser = require('body-parser')
const methodOverride = require('method-override')
const passport = require("passport");
const flash = require("connect-flash");
const session = require("express-session");

// Passport config
require("./config/passport")(passport);

// setting routes
const userRouter = require('./routes/users')
const indexRouter = require('./routes/index')
const artistRouter = require('./routes/artists')
const songRouter = require('./routes/songs')

// setting app usage
app.set('view engine', 'ejs')
app.set('views', __dirname + '/views')
app.use(methodOverride('_method'))
app.use(express.static('public'))
app.use(bodyParser.urlencoded({ limit: '10mb', extended: false }))

// Express session middleware
app.use(
    session({
      secret: "secret",
      resave: true,
      saveUninitialized: true,
    })
  );

// Passport middleware
app.use(passport.initialize());
app.use(passport.session());

// Connect flash
app.use(flash());

// Global vars
app.use((req, res, next) => {
    res.locals.success_msg = req.flash("success_msg");
    res.locals.error_msg = req.flash("error_msg");
    res.locals.error = req.flash("error");
    next();
});


// mongoose connection
const mongoose = require('mongoose')
mongoose.connect('mongodb://localhost/beat-stack', { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true })
const db = mongoose.connection
db.on('error', error => console.error(error))
db.once('open', () => console.log('Connected to Mongoose'))

// routes
app.use('/', indexRouter)
app.use('/users', userRouter)
app.use('/artists', artistRouter)
app.use('/songs', songRouter)

// listening to port
app.listen(process.env.PORT || 4000, () => {
    console.log('Ready To Go!!!')
})