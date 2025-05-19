"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.shouldLoadModule = void 0;
const shouldLoadModule = (ctx) => ctx.instance.instanceType === 'main' || ctx.instance.instanceType === 'webhook';
exports.shouldLoadModule = shouldLoadModule;
//# sourceMappingURL=insights.pre-init.js.map