import { Injectable } from "@angular/core";
import { Adapter } from "../helpers/adapter";

export class User {
    constructor(id, firstName, lastName, role, login, password, birthday) {
        this.id = id;
        this.firstName = firstName;
        this.lastName = lastName;
        this.role = role;
        this.login = login;
        this.password = password;
        this.birthday = birthday;
    }

    public id: string;
    public login: string;
    public password: string;
    public firstName: string;
    public lastName: string;
    public role: string;
    public birthday: string;
}

@Injectable({
    providedIn: "root",
})
export class UserAdapter implements Adapter<User> {
    adapt(u: any): User {
        return new User(u.id, u.firstName, u.lastName, u.role, u.login, u.password, u.birthday);
    }
}