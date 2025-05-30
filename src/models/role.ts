import roles from "../config/roles.json"

export class Role {
    //creating data member roles similar to imported roles
    roles : {name: string, permissions: string[]}[];

    //to initialise with roles
    constructor() {
        this.roles = roles.roles
    }

    //to get a role of given name
    getRoleByName (name: string) {
        return this.roles.find((r) => r.name === name);
    }

    //to get all the roles
    getRoles () {
        return this.roles;
    }
}

