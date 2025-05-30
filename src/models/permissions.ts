import { Role } from "./role";

export class Permissions {
    permissions : string[]

    constructor() {
        this.permissions = [];
    }

    getPermissionsByRoleName(roleName : string) {
        const newRole = new Role();
        const role = newRole.roles.find((r) => {r.name === roleName});

        return role ? role.permissions : [];
    }
}