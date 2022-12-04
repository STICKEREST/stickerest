import { getDb, Database } from "../db";
import * as express from "express";
import {Request, Response, NextFunction}  from 'express';
const session = require('express-session');
const mysqlStore = require('express-mysql-session')(session);

const sessionMiddleware = (req : Request, res: Response, next : NextFunction) => {

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

    return session({
        name: process.env.SESSION_NAME,
        resave: false,
        saveUninitialized: false,
        store: sessionStore,
        secret: process.env.SESSION_SECRET,
        cookie: {
            maxAge: 1000 * 60 * 60 * 2,
            sameSite: true
        }
    })(req,res,next);
}

export default sessionMiddleware;