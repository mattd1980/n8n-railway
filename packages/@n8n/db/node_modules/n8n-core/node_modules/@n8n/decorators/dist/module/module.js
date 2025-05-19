"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.N8nModule = void 0;
const di_1 = require("@n8n/di");
const module_metadata_1 = require("./module-metadata");
const N8nModule = () => (target) => {
    di_1.Container.get(module_metadata_1.ModuleMetadata).register(target);
    return (0, di_1.Service)()(target);
};
exports.N8nModule = N8nModule;
//# sourceMappingURL=module.js.map