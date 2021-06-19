import {getRepository} from "typeorm";
import {Request, Response} from "express";
import * as jwt from "jsonwebtoken";
import {Users} from "../entity/User";

export class UserController {
    static getAllUsers = async (req: Request, res: Response) => {
        const userRepository = getRepository(Users)
        const users = await userRepository.find();
        res.json(users)
    }

    static createUser = async (req: Request, res: Response) => {
        const userRepository = getRepository(Users)
        const userFromReq = req.body
        const user = await userRepository.findOne({username: userFromReq.username })

        if (user) {
            res.json('There is already a user exist with that username')
        }
        else {
            const user = new Users()
            user.username = userFromReq.username
            user.pwd = userFromReq.pwd
            await userRepository.insert({
                username: user.username,
                pwd: user.pwd
            })

            res.json('Your account is successfully registered')
        }
    }
    static signIn = async (req: Request, res: Response) => {
        const userRepository = getRepository(Users)
        const userFromReq = req.body
        const user = await userRepository.findOne({username: userFromReq.username, pwd: userFromReq.pwd})
        if (!user) {
            res.json("No user match your username and password")
        }
        else {
            const token = jwt.sign(
                { username: user.username },
                process.env.jwtSecret,
                { expiresIn: "1h" }
            );
            //Send the jwt in the response
            res.json(token);
        }
    }
}
