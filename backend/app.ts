import express, { Express } from 'express';
import bodyParser from 'body-parser';
import { initDb, getDb, Database } from './db';
import usersRoutes from './routes/users.routes';
import auth from './routes/auth/auth.routes';
// import sessionMiddleware from './middlewares/session.middleware';
import passport from 'passport';
import { setupPassport } from './middlewares/passport.middleware';
import sessionMiddleware from './middlewares/session.middleware';
// const session = require('express-session');
// const mysqlStore = require('express-mysql-session')(session);
// import MySQLStore from 'express-mysql-session';
require('dotenv').config();

const app: Express = express();

const port = process.env.PORT || 5000;

setupPassport();

const connection : Database = getDb();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(sessionMiddleware);
app.use(passport.initialize());
app.use(passport.session());

app.get("/api/demo", (req,res) => {
  console.log(req.isAuthenticated());
  res.json({sessionId : req.sessionID});
})

app.use('/users', usersRoutes);

app.use('/auth', sessionMiddleware, auth);

app.get('/', (req, res) => res.send('Hello from Homepage') );


app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})
