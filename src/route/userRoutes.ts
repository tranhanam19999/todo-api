import {UserController} from "../controller/UserController";
import { checkJWT } from '../verifyJWT'
import { Router } from "express"

const userRoutes = Router();

userRoutes.get("/all", checkJWT('get-all'), UserController.getAllUsers);
userRoutes.post("/sign-in", UserController.signIn)
userRoutes.post("/sign-up", UserController.createUser)
userRoutes.delete('/all', checkJWT('del-all'), UserController.removeAll)

export default userRoutes;
