import express, { Router } from 'express';
import { getDb, Database } from '../db';
import { createUser, getUser, getUsers, logUser } from '../controllers/users.controller';

const router: Router = express.Router();
const connection: Database = getDb();

//all routes here are starting with /users

router.get('/', getUsers(connection));

router.post('/register', createUser(connection));

router.post('/login', logUser(connection));

router.get('/:nickname', getUser(connection));

// router.delete('/:nickname', deleteUser(connection));

// router.patch('/:nickname', updateUser(connection));



export default router;