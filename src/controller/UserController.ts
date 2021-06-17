import {getRepository} from "typeorm";
import {NextFunction, Request, Response} from "express";
import {User} from "../entity/User";
import { ClientResponse } from "http";

export class UserController {

    private userRepository = getRepository(User);

    async all(request: Request, response: Response, next: NextFunction) {
        return this.userRepository.find();
    }

    async one(request: Request, response: Response, next: NextFunction) {
        return this.userRepository.findOne(request.params.id);
    }

    async createUser(request: Request, response: Response, next: NextFunction) {
        const userFromReq = request.body
        const user = await this.userRepository.findOne({username: userFromReq.username })
        if (user) {
            return "There is already a user exist with that username"
        }
        else {
            const user = new User()
            user.username = userFromReq.username
            user.pwd = userFromReq.pwd
            return this.userRepository.save(user);
        }
    }
    async logIn(request: Request, response: Response, next: NextFunction) {
        const userFromReq = request.body
        const user = await this.userRepository.findOne({username: userFromReq.username, pwd: userFromReq.pwd})
        if (!user) {
            return "No user match your username and password"
        }
        else {
            return user
        }
    }
    async remove(request: Request, response: Response, next: NextFunction) {
        let userToRemove = await this.userRepository.findOne(request.params.id);
        await this.userRepository.remove(userToRemove);
    }

    async removeAll(request: Request, response: Response, next: NextFunction) {
        let usersToRemove = await this.userRepository.find();
        usersToRemove.map(async user => {
            await this.userRepository.remove(user);
        })
        return 'OK!'
    }
}
