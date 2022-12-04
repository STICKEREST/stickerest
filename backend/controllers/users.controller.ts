import { Database } from "../db";
import bcrypt, { hash } from 'bcrypt';
import { ExecException } from "child_process";
import passport from "passport";
import { NextFunction, Request, Response } from "express";

export const getUsers = (connection: Database) : any => {
    return (req : any, res : any) : void => {
        connection.query('SELECT * FROM Utilizer;', function (err: any, rows: any, fields: any) {
          if (err) throw err
      
          res.send(rows)
        })
    }
}

export const createUser = (connection: Database) : any => {
    return async (req : any, res : any) : Promise<void> => {
        const user = req.body;

        const hashedPw = await bcrypt.hash(user.password, 0); //salt not used atm

        connection.query(
            `INSERT INTO Utilizer (email,nickname, password) VALUES ('${user.email}', '${user.nickname}','${hashedPw}');`, 
            function (err: any, rows: any, fields: any) {
                if (err) res.status(500).send();
            
                res.status(201).send();
            })
    }
}

export const logUser = (connection: Database) : any => {

    return  (req : Request, res : Response, next : NextFunction) : void => {
        passport.authenticate("local", (error, user, info) => {
            if(!user) return res.status(401).json({
                message: "username or password is not matched"
            })

            req.login(user , (err) => {
                if(err) throw err;

                req.session.save();

                res.status(201).json("Successfully logged in!");
            })
        })(req,res,next);
    }

}

export const getUser = (connection: Database) : any => {

    return (req : Request, res : Response) : void => {
        const { nickname } = req.params;
    
        connection.query(
            `SELECT * FROM Utilizer U WHERE U.nickname = '${nickname}';`, 
            function (err: any, rows: any, fields: any) {
                if (err) throw err

                console.log(rows);
            
                res.send(rows)
            })
    }

}

// export const deleteUser = (connection : Database) : any => {
//     return (req : any, res : any) : void => {
//         const { nickname } = req.params;
    
//         connection.query(
//             `DELETE FROM Utilizer U WHERE U.nickname = '${nickname}';`, 
//             function (err: any, rows: any, fields: any) {
//                 if (err) throw err
            
//                 res.send(rows)
//             })
//     }
// }

// export const updateUser = (connection : Database) : any => {
//     return (req : any, res : any) : void => {
//         const { nickname } = req.params;
//         const { email, password } = req.body; 
    
//         let updates : string[] = [];
    
//         if(email)
//             updates.push(`U.email = '${email}'`);
//         if(password)
//             updates.push(`U.password = '${password}'`);
    
//         const query : string = updates.reduce((acc : string, update : string, index : number) => 
//                                             acc = acc + update + (index !== updates.length-1 ? "," : "")
//                                         ,"");
    
//         if(updates.length != 0)
//             connection.query(
//                 `UPDATE Utilizer U SET ${query} WHERE U.nickname = '${nickname}';`, 
//                 function (err: any, rows: any, fields: any) {
//                     if (err) throw err
                
//                     res.send(rows)
//                 })
//         else
//             res.send("No modifications have been made");
//     }
// }