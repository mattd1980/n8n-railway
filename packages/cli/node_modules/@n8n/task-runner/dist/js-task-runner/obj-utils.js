"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isObject = isObject;
function isObject(maybe) {
    return (typeof maybe === 'object' && maybe !== null && !Array.isArray(maybe) && !(maybe instanceof Date));
}
//# sourceMappingURL=obj-utils.js.map