import {UserController} from "../controller/UserController";
import { checkJWT } from '../verifyJWT'
import { Router } from "express"

const userRoutes = Router();

userRoutes.get("/get-all-user", checkJWT('get-all'), UserController.getAllUsers);
userRoutes.post("/sign-in", UserController.signIn)
userRoutes.post("/sign-up", UserController.createUser)

export default userRoutes;
