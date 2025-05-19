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
exports.isObjectLiteral = exports.inDevelopment = exports.inProduction = exports.inTest = void 0;
__exportStar(require("./license-state"), exports);
__exportStar(require("./types"), exports);
const { NODE_ENV } = process.env;
exports.inTest = NODE_ENV === 'test';
exports.inProduction = NODE_ENV === 'production';
exports.inDevelopment = !NODE_ENV || NODE_ENV === 'development';
var is_object_literal_1 = require("./utils/is-object-literal");
Object.defineProperty(exports, "isObjectLiteral", { enumerable: true, get: function () { return is_object_literal_1.isObjectLiteral; } });
//# sourceMappingURL=index.js.map