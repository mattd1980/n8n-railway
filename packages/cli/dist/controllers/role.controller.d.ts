import { RoleService } from '../services/role.service';
export declare class RoleController {
    private readonly roleService;
    constructor(roleService: RoleService);
    getAllRoles(): import("@n8n/permissions").AllRolesMap;
}
