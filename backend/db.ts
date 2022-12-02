require('dotenv').config();

export interface Database {
    query : any,
    connect : any
}

let connection : Database | undefined = undefined;


export const initDb = () : Database => {
    if (connection) {
        console.warn("Trying to init DB again!");
        return connection;
    }

    const mysql = require('mysql2');
    connection = mysql.createConnection(process.env.DATABASE_URL);

    connection!.connect();

    return connection!;
}

export const getDb = () : Database => {
    if(!connection)
        initDb();

    return connection!;
}
