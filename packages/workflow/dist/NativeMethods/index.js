"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NativeMethods = void 0;
const Array_methods_1 = require("./Array.methods");
const Boolean_methods_1 = require("./Boolean.methods");
const Number_methods_1 = require("./Number.methods");
const Object_Methods_1 = require("./Object.Methods");
const String_methods_1 = require("./String.methods");
const NATIVE_METHODS = [
    String_methods_1.stringMethods,
    Array_methods_1.arrayMethods,
    Number_methods_1.numberMethods,
    Object_Methods_1.objectMethods,
    Boolean_methods_1.booleanMethods,
];
exports.NativeMethods = NATIVE_METHODS;
//# sourceMappingURL=index.js.map