// import { getDb, Database } from "../db";
// import * as express from "express";
// import {Request, Response, NextFunction}  from 'express';
// import session, * as expressSession from "express-session";
// import expressMySqlSession from "express-mysql-session";

// // import connection from 

// // const connection : any = getDb();


// // const MySQLStore   = expressMySqlSession(expressSession);



// // const sessionStore = new MySQLStore({}, connection);

// const sessionMiddleware = (req : Request, res: Response, next : NextFunction) => {

//     // req.session.save();

//     return session({
//         secret: process.env.SESSION_SECRET!,
//         resave: false,
//         saveUninitialized: false,
//         // store: sessionStore,
//         // store: new 
//     })(req,res,next);
// }

// export default sessionMiddleware;