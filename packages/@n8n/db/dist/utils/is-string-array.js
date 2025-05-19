"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isStringArray = isStringArray;
function isStringArray(value) {
    return Array.isArray(value) && value.every((item) => typeof item === 'string');
}
//# sourceMappingURL=is-string-array.js.map