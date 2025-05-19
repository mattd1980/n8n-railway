"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getRoleScopes = exports.getGlobalScopes = exports.rolesWithScope = exports.combineScopes = exports.hasGlobalScope = exports.hasScope = exports.projectRoleSchema = void 0;
__exportStar(require("./constants.ee"), exports);
__exportStar(require("./roles/scopes/global-scopes.ee"), exports);
__exportStar(require("./roles/role-maps.ee"), exports);
__exportStar(require("./roles/all-roles"), exports);
var schemas_ee_1 = require("./schemas.ee");
Object.defineProperty(exports, "projectRoleSchema", { enumerable: true, get: function () { return schemas_ee_1.projectRoleSchema; } });
var hasScope_ee_1 = require("./utilities/hasScope.ee");
Object.defineProperty(exports, "hasScope", { enumerable: true, get: function () { return hasScope_ee_1.hasScope; } });
var hasGlobalScope_ee_1 = require("./utilities/hasGlobalScope.ee");
Object.defineProperty(exports, "hasGlobalScope", { enumerable: true, get: function () { return hasGlobalScope_ee_1.hasGlobalScope; } });
var combineScopes_ee_1 = require("./utilities/combineScopes.ee");
Object.defineProperty(exports, "combineScopes", { enumerable: true, get: function () { return combineScopes_ee_1.combineScopes; } });
var rolesWithScope_ee_1 = require("./utilities/rolesWithScope.ee");
Object.defineProperty(exports, "rolesWithScope", { enumerable: true, get: function () { return rolesWithScope_ee_1.rolesWithScope; } });
var getGlobalScopes_ee_1 = require("./utilities/getGlobalScopes.ee");
Object.defineProperty(exports, "getGlobalScopes", { enumerable: true, get: function () { return getGlobalScopes_ee_1.getGlobalScopes; } });
var getRoleScopes_ee_1 = require("./utilities/getRoleScopes.ee");
Object.defineProperty(exports, "getRoleScopes", { enumerable: true, get: function () { return getRoleScopes_ee_1.getRoleScopes; } });
__exportStar(require("./public-api-permissions.ee"), exports);
//# sourceMappingURL=index.js.map