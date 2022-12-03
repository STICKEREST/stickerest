import { unwatchFile } from "fs";
import passport from "passport";

import {Strategy as LocalStrategy} from "passport-local";
import { Database, getDb } from "../db";

import bcrypt from 'bcrypt';
import { Request } from "express";



let callOneTimeOnly = false;

export function setupPassport(){

    const connection : Database = getDb();

    if (callOneTimeOnly)
        return;
        
    passport.use(
        new LocalStrategy({
            usernameField : "email",
            passwordField : "password"
        },
        async (email, password, done ) => {

            async function getUserByEmail (email : string) {
                let pro = new Promise((resolve, reject) => {
                    let query = `SELECT * FROM Utilizer U WHERE U.email = '${email}';`;
                    connection.query(query, function(err: any, rows: any[]) {
                        if(err) throw err;
                        resolve(rows[0]);
                    });
                });

                return pro.then((val) => { return val;});
            }

            const user : any = await getUserByEmail(email);

            // Modwel.findUsernam()

            const checkPassword = async (password : string, passExisting : string) : Promise<boolean>  => {

                return await bcrypt.compare(password, passExisting);
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