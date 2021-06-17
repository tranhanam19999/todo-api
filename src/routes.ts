import {UserController} from "./controller/UserController";

export const Routes = [{
    method: "get",
    route: "/users",
    controller: UserController,
    action: "all"
}, {
    method: "get",
    route: "/users/:id",
    controller: UserController,
    action: "one"
}, {
    method: "post",
    route: "/users/sign-up",
    controller: UserController,
    action: "createUser"
}, {
    method: "post",
    route: "/users/sign-in",
    controller: UserController,
    action: "logIn"
}, {
    method: "delete",
    route: "/users/:id",
    controller: UserController,
    action: "remove"
}, {
    method: "delete",
    route: "/usersDeleteAll",
    controller: UserController,
    action: "removeAll"
}];
