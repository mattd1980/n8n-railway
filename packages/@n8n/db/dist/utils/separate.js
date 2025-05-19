"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.separate = void 0;
const separate = (array, test) => {
    const pass = [];
    const fail = [];
    array.forEach((i) => (test(i) ? pass : fail).push(i));
    return [pass, fail];
};
exports.separate = separate;
//# sourceMappingURL=separate.js.map