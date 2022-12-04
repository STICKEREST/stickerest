import express, { Express } from 'express';
import bodyParser from 'body-parser';
import { initDb, getDb, Database } from './db';
import usersRoutes from './routes/users.routes';
import auth from './routes/auth/auth.routes';
// import sessionMiddleware from './middlewares/session.middleware';
import passport from 'passport';
import { setupPassport } from './middlewares/passport.middleware';
const session = require('express-session');
const mysqlStore = require('express-mysql-session')(session);
// import MySQLStore from 'express-mysql-session';
require('dotenv').config();

const app: Express = express();

const port = process.env.PORT || 5000;

setupPassport();

const connection : Database = getDb();

const options = {
  connectionLimit: 10,
  password: process.env.DB_PASS,
  user: process.env.DB_USER,
  database: process.env.MYSQL_DB,
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  createDatabaseTable: true,
  ssl: {
    rejectUnauthorized: true,
  }
};

const sessionStore = new mysqlStore(options);

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(session({
  name: process.env.SESSION_NAME,
  resave: false,
  saveUninitialized: false,
  store: sessionStore,
  secret: process.env.SESSION_SECRET,
  cookie: {
      maxAge: 1000 * 60 * 60 * 2,
      sameSite: true
  }
}))

// app.use(sessionMiddleware);
app.use(passport.initialize());
app.use(passport.session());

app.get("/api/demo", (req,res) => {
  console.log(req.isAuthenticated());
  res.json({sessionId : req.sessionID});
})

app.use('/users', usersRoutes);

// app.use('/auth', sessionMiddleware, auth);

app.get('/', (req, res) => res.send('Hello from Homepage') );


app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})
