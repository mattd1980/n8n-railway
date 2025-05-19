"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isErrorLike = isErrorLike;
function isErrorLike(value) {
    if (typeof value !== 'object' || value === null)
        return false;
    const errorLike = value;
    return typeof errorLike.message === 'string';
}
//# sourceMappingURL=error-like.js.map