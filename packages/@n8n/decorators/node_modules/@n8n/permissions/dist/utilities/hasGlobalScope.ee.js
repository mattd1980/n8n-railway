"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.hasGlobalScope = void 0;
const getGlobalScopes_ee_1 = require("./getGlobalScopes.ee");
const hasScope_ee_1 = require("./hasScope.ee");
const hasGlobalScope = (principal, scope, scopeOptions) => {
    const global = (0, getGlobalScopes_ee_1.getGlobalScopes)(principal);
    return (0, hasScope_ee_1.hasScope)(scope, { global }, undefined, scopeOptions);
};
exports.hasGlobalScope = hasGlobalScope;
//# sourceMappingURL=hasGlobalScope.ee.js.map