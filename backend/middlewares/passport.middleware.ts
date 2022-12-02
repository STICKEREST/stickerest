import { unwatchFile } from "fs";
import passport from "passport";

import {Strategy as LocalStrategy} from "passport-local";
import { Database, getDb } from "../db";

import bcrypt from 'bcrypt';
import { Request } from "express";

const connection : Database = getDb();

// console.log("I do taht");

let callOneTimeOnly = false;

export function setupPassport(){

    if (callOneTimeOnly)
        return;
        
    passport.use(
        new LocalStrategy({
            usernameField : "username",
            passwordField : "password"
        },
        async (username, password, done ) => {

            console.log('here yes');
            
            const user  : any = await ((username) => {
                connection.query(
                    `SELECT * FROM Utilizer U WHERE U.nickname = '${username}';`, 
                    function (err: any, rows: any, fields: any) {
                        if (err) throw err

                        console.log(rows[0]);
                    
                        return rows[0];
                    }); 
            })(username);

            // Modwel.findUsernam()

            console.log(username);
            console.log(user);

            const checkPassword = async (password : string, passExisting : string) : Promise<boolean>  => {

                return await bcrypt.compare(password, passExisting);
                // return await true;
            }
        
            if(user && (await checkPassword(password, user.password)))
                done(null, user);
            else
                done(null, false);
        }
        )
    );

    passport.serializeUser((user : any, done) => {

        done(null, user.email);

    });


    passport.deserializeUser (async (req : Request, email : string, done : any) => {

        try {
        const user  : any = await ((email) => {
            connection.query(
                `SELECT * FROM Utilizer U WHERE U.email = '${email}';`, 
                function (err: any, rows: any, fields: any) {
                    if (err) throw err
                
                    return rows[0];
                }); 
        })();

        done(null, user);

    } catch (error) {
        done(error);
    }

    })

    callOneTimeOnly = true;

}