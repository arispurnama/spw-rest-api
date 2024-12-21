import express from "express"
import {getListUsers, createUsers, updateUsers, deleteUsers, Registers, Login, CheckUsername, getUserById, forgotPassword, gantiPassword, getOptionAdminUsers} from "../controller/UserController.js"
import { verifyToken } from "../middleware/auth.js";

const route = express.Router();
route.get("/list-user", verifyToken, getListUsers);
route.post("/user", verifyToken, createUsers);
route.patch('/user/:id', verifyToken, updateUsers);
route.delete('/user/:id', verifyToken, deleteUsers);
route.get('/user/:id', verifyToken, getUserById);

route.get('/admin/option', getOptionAdminUsers);

route.post('/register', Registers);
route.post('/login', Login);
route.post('/CheckUsername/:username', CheckUsername);
route.post('/ubahPassword/:otp', forgotPassword);
route.post('/gantiPassword/:id', verifyToken, gantiPassword);

export default route;