"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.COMBINED_ROLE_MAP = void 0;
exports.getRoleScopes = getRoleScopes;
const role_maps_ee_1 = require("../roles/role-maps.ee");
exports.COMBINED_ROLE_MAP = Object.fromEntries(Object.values(role_maps_ee_1.ALL_ROLE_MAPS).flatMap((o) => Object.entries(o)));
function getRoleScopes(role, filters) {
    let scopes = exports.COMBINED_ROLE_MAP[role];
    if (filters) {
        scopes = scopes.filter((s) => filters.includes(s.split(':')[0]));
    }
    return scopes;
}
//# sourceMappingURL=getRoleScopes.ee.js.map