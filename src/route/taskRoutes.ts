import { Router } from "express"
import { checkJWT } from '../verifyJWT'
import { TaskController } from "../controller/TaskController";

const taskRoutes = Router();

taskRoutes.get("/get-all-to-do", checkJWT('get-all-to-do'), TaskController.getAllTasks);
taskRoutes.get("/get-to-do-by-id/:id", checkJWT('get-to-do-by-id'), TaskController.getTaskById)
taskRoutes.post("/add-to-do", checkJWT('add-to-do'), TaskController.addTask('add-to-do'))
taskRoutes.post("/assign-to-do", checkJWT('assign-to-do'), TaskController.addTask('assign-to-do'))
taskRoutes.put("/update-to-do", checkJWT('update-to-do'), TaskController.updateTask)
taskRoutes.delete('/remove-to-do', checkJWT('remove-to-do'), TaskController.removeTask)

export default taskRoutes;
