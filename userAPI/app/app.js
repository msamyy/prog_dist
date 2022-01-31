import bodyParser from 'body-parser'
import cors from 'cors'
import dotenv from 'dotenv'
import express from 'express'
import jwt from 'jsonwebtoken'
import db from './models/index.js'
import authRouter from './routes/auth.route'
import booksRouter from './routes/books.route'
import usersRouter from './routes/users.route'


dotenv.config()
const app = express();


function authenticateToken(req, res, next) {
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]

    if (token == null) return res.sendStatus(401)

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
        if (err) {
            return res.sendStatus(401)
        }
        req.user = user;
        next();
    });
}

// Cross Origin Resources Sharing, Initially all whitelisted
app.use(cors());

// Parse data in JSON
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

db.sequelize.sync();

app.use('/login', authRouter);

app.use('/users',/* authenticateToken, */usersRouter);

app.use('/books', authenticateToken, booksRouter);


//Home
app.use((req, res) => {
    res.send("<h1>User REST API is UP</h1>");

});


module.exports = app;