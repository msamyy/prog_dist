if (process.env.NODE_ENV !== 'production') {
  require('dotenv').load()
}

const express = require('express')
const app = express()
const expressLayouts = require('express-ejs-layouts')
const bodyParser = require('body-parser')
const methodOverride = require('method-override')
const cookieParser = require('cookie-parser')
const jwt = require('jsonwebtoken')

const indexRouter = require('./routes/index')
const authorRouter = require('./routes/authors')
const authRouter = require('./routes/auth')
const bookRouter = require('./routes/books')


app.set('view engine', 'ejs')
app.set('views', __dirname + '/views')
app.set('layout', 'layouts/layout')
app.use(expressLayouts)
app.use(methodOverride('_method'))
app.use(express.static('public'))
app.use(bodyParser.urlencoded({ limit: '10mb', extended: false }))
app.use(cookieParser());

// const mongoose = require('mongoose')
// mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true })
// const db = mongoose.connection
// db.on('error', error => console.error(error))
// db.once('open', () => console.log('Connected to Mongoose'))

function authenticateToken(req, res, next) {
  console.log(req);
  const token = req.cookies.accessToken
  console.log(token);

  if (token == null) return res.sendStatus(401)

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
      if (err) {
          return res.sendStatus(401)
      }
      req.user = user;
      next();
  });
}

app.use('/', indexRouter)
app.use('/authors', authenticateToken, authorRouter)
app.use('/auth', authRouter)
app.use('/books', authenticateToken, bookRouter)

app.listen(process.env.PORT || 7776)