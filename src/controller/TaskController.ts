import {getRepository} from "typeorm";
import {Request, Response} from "express";
import * as moment from 'moment';
import * as jwt from "jsonwebtoken";
import { Tasks } from "../entity/Task";
import { Users } from "../entity/User";

export class TaskController {
    static getAllTasks = async (req: Request, res: Response) => {
        const taskRepository = getRepository(Tasks)
        const tasks = await taskRepository.find();
        res.json(tasks)
    }
    static getTaskById = async (req: Request, res: Response) => {
        const taskRepository = getRepository(Tasks)
        const taskId = req.params.id
        const task = await taskRepository.findOne({ id: taskId });
        if (task) {
            res.json(task)
            return
        }
        res.json(`No task found with an id of ${taskId}`)
        return
    }
    static updateTask = async (req: Request, res: Response) => {
        const taskRepository = getRepository(Tasks)
        const taskFromReq = req.body
        const oldTask = await taskRepository.findOne({id: taskFromReq.id})
        if (oldTask) {
            if (oldTask.taskStatus === "COMPLETE") {
                res.json("You can't update completed tasks")
                return
            }

            var dateFromReq = new Date(taskFromReq.expireDate);
            const dateFormat = "YYYY-MM-DD HH:mm:ss"
            let expireDate = moment(dateFromReq).format(dateFormat);
            let updatedDate = moment(new Date()).format(dateFormat);

            if (expireDate === 'Invalid date') {
                res.json("Wrong date format!")
                return
            }

            await taskRepository.update(taskFromReq.id, {
                taskName: taskFromReq.taskName,
                taskDescription: taskFromReq.taskDescription,
                expireDate: taskFromReq.expireDate,
                updatedTime: updatedDate
            })

            res.json(await taskRepository.findOne({id: taskFromReq.id}))
            return
        }
        else {
            res.json("Can't find task")
            return
        }
    }
    static addTask = (route: String) => {
        return async (req: Request, res: Response) => {
            const taskRepository = getRepository(Tasks)
            const userRepository = getRepository(Users)
            const taskFromReq = req.body

            const token = <string>req.headers["token"];
            let jwtPayload;
            jwtPayload = <any>jwt.verify(token, process.env.jwtSecret);
            if (route === 'assign-to-do') {
                const userAssign = await userRepository.findOne({id: taskFromReq.userId})
                if (!userAssign) {
                    res.json("You are assigning task to nobody")
                    return
                }
            }
            const userAssign = await userRepository.findOne({username: jwtPayload.username});
            if (userAssign) {
                if (userAssign.id === req.body.userId && route === 'assign-to-do') {
                    res.json("You can't assign task to yourself")
                    return
                }
                if (taskFromReq.taskStatus !== 'NEW' && taskFromReq.taskStatus !== 'COMPLETE') {
                    res.json('Wrong task status!')
                    return
                }

                //YYYY-MM-DD HH-MM-SS
                var dateFromReq = new Date(taskFromReq.expireDate);
                const dateFormat = "YYYY-MM-DD HH:mm:ss"
                let expireDate = moment(dateFromReq).format(dateFormat);
                let createdDate = moment(new Date()).format(dateFormat);
                if (expireDate === 'Invalid date') {
                    res.json("Wrong date format!")
                    return
                }

                const task = new Tasks()
                task.taskName = taskFromReq.taskName
                task.taskDescription = taskFromReq.taskDescription
                if (route === 'add-to-do') {
                    task.userId = userAssign.id
                }
                else if (taskFromReq.userId && taskFromReq.userId !== userAssign.id) {
                    task.userId = taskFromReq.userId
                }
                else {
                    console.log('route ', route)
                    res.json("Some error!")
                    return
                }
                task.expireDate = expireDate;
                task.taskStatus = taskFromReq.taskStatus;
                task.createdTime = createdDate;
                task.updatedTime = createdDate;

                await taskRepository.insert(task)
                res.json(task)
                return
            }
            else {
                res.json("Can't find your account")
            }
        }
    }
    static removeTask = async (req: Request, res: Response) => {
        const taskRepository = getRepository(Tasks)
        const taskId = req.body.id
        const task = await taskRepository.findOne({ id: taskId });
        if (task.taskStatus !== "COMPLEDTED") {
            res.json("You can't remove completed task")
            return
        }
        else if (task) {
            await taskRepository.remove(task)
            res.json(task)
        }
        else {
            res.json(`No task found with id of ${taskId}`)
            return
        }
    }
}
