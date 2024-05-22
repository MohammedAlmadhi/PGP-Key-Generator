const express = require("express")
const app = express()
const db = require('./config/database')
const Key = require('./models/Key');
const User = require('./models/User');
const bodyParser = require('body-parser')
const session = require('express-session')
const flash = require('connect-flash')
const path = require('path');
const passport = require('passport')
const passportSetup = require('./config/passport-setup')

app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, 'views'));

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

// Serve static files
app.use('/css', express.static(path.join(__dirname, 'public/css')));
app.use('/js', express.static(path.join(__dirname, 'public/js')));
app.use('/images', express.static(path.join(__dirname, 'images')));

// session and flash config .
app.use(session({
  secret: 'secret',
  resave: false,
  saveUninitialized: false,
  cookie: {maxAge: 60000 * 15}
}))
app.use(flash())

// bring passport 
app.use(passport.initialize())
app.use(passport.session())

//store user object 
app.get('*', (req,res,next)=> {
  res.locals.user = req.user || null
  next()
})


// bring user routes
const users = require('./routes/user-routes')
app.use('/user', users)

// Key routes
const keyRoutes = require('./routes/key-routes')
app.use('/', keyRoutes);

// Handle 404
app.use((req, res, next) => {
  res.status(404).send('404: Page not found');
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('500: Internal Server Error');
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});