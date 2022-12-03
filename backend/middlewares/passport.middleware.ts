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

            console.log('here yes');
            
            

            console.log("se spera");

            const user : any = ((email : string) => {
                connection.query(
                    `SELECT * FROM Utilizer U WHERE U.email = '${email}';`, 
                    function (err: any, rows: any, fields: any) {
                        if (err) throw err
        
                        // console.log(rows);
                    
                        console.log(rows[0]);
                });
            })(email);

            console.log('here yes');

            // Modwel.findUsernam()

            // console.log(email);
            // console.log("The user is");
            // console.log(user);

            const checkPassword = async (password : string, passExisting : string) : Promise<boolean>  => {

                // console.log(password);
                // console.log(passExisting);

                return await bcrypt.compare(password, passExisting);
                // return await true;
            }

            // console.log(password);
            // console.log(user.password);
        
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