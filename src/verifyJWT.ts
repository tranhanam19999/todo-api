import { Request, Response, NextFunction } from "express";
import * as jwt from "jsonwebtoken";

export const checkJWT = (routeRequested) => {
    return (req: Request, res: Response, next: NextFunction) => {
        //Get the jwt token from the head
        const token = <string>req.headers["token"];
        let jwtPayload;
        //Try to validate the token and get data
        try {
            jwtPayload = <any>jwt.verify(token, process.env.jwtSecret);
            res.locals.jwtPayload = jwtPayload;
        } catch (error) {
            //If token is not valid, respond with 401 (unauthorized)
            res.status(401).send();
            return;
        }

        //The token is valid for 1 hour
        //We want to send a new token on every request
        const { username } = jwtPayload;
        const newToken = jwt.sign({ username }, process.env.jwtSecret, {
            expiresIn: "1h"
        });
        res.setHeader("token", newToken);

        //Call the next middleware or controller
        next();
    }
}
