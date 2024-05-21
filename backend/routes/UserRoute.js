import express from "express"
import {getListUsers, createUsers, updateUsers, deleteUsers, Registers, Login} from "../controller/UserController.js"
import { verifyToken } from "../middleware/auth.js";

const route = express.Router();
route.get("/list-user", verifyToken, getListUsers);
route.post("/user", verifyToken, createUsers);
route.patch('/role/:id', verifyToken, updateUsers);
route.delete('/role/:id', verifyToken, deleteUsers);

route.post('/register', Registers);
route.post('/login', Login);

export default route;