import express from "express"
import {getListUsers, createUsers, updateUsers, deleteUsers, Registers, Login} from "../controller/UserController.js"

const route = express.Router();
route.get("/list-user", getListUsers);
route.post("/user", createUsers);
route.patch('/role/:id', updateUsers);
route.delete('/role/:id', deleteUsers);

route.post('/register', Registers);
route.post('/login', Login);

export default route;