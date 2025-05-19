"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getGlobalScopes = void 0;
const role_maps_ee_1 = require("../roles/role-maps.ee");
const getGlobalScopes = (principal) => role_maps_ee_1.GLOBAL_SCOPE_MAP[principal.role] ?? [];
exports.getGlobalScopes = getGlobalScopes;
//# sourceMappingURL=getGlobalScopes.ee.js.map