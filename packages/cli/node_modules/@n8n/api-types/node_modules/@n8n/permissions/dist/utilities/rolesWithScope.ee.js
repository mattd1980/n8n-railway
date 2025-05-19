"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.rolesWithScope = rolesWithScope;
const role_maps_ee_1 = require("../roles/role-maps.ee");
function rolesWithScope(namespace, scopes) {
    if (!Array.isArray(scopes)) {
        scopes = [scopes];
    }
    return Object.keys(role_maps_ee_1.ALL_ROLE_MAPS[namespace]).filter((k) => {
        return scopes.every((s) => role_maps_ee_1.ALL_ROLE_MAPS[namespace][k].includes(s));
    });
}
//# sourceMappingURL=rolesWithScope.ee.js.map