import "reflect-metadata";
import {createConnection} from "typeorm";
import * as express from "express";
import * as bodyParser from "body-parser";
import * as cors from "cors"
import userRoutes from "./route/userRoutes";
import taskRoutes from "./route/taskRoutes";

createConnection()
.then(async connection => {
    // create express app
    const app = express();

    // Call midlewares
    app.use(cors());
    // app.use(helmet());
    app.use(bodyParser.json());

    //Set all routes from routes folder
    app.use("/users", userRoutes);
    app.use("/tasks", taskRoutes);

    app.listen(3000, () => {
      console.log("Server started on port 3000!");
    })
}).catch(error => console.log(error));
