"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sqlite = exports.objectRetriever = exports.lowerCaser = exports.idStringifier = void 0;
const config_1 = require("@n8n/config");
const di_1 = require("@n8n/di");
const n8n_workflow_1 = require("n8n-workflow");
exports.idStringifier = {
    from: (value) => value?.toString(),
    to: (value) => typeof value === 'string' ? Number(value) : value,
};
exports.lowerCaser = {
    from: (value) => value,
    to: (value) => (typeof value === 'string' ? value.toLowerCase() : value),
};
exports.objectRetriever = {
    to: (value) => value,
    from: (value) => (typeof value === 'string' ? (0, n8n_workflow_1.jsonParse)(value) : value),
};
const jsonColumn = {
    to: (value) => di_1.Container.get(config_1.GlobalConfig).database.type === 'sqlite' ? JSON.stringify(value) : value,
    from: (value) => (typeof value === 'string' ? (0, n8n_workflow_1.jsonParse)(value) : value),
};
exports.sqlite = { jsonColumn };
//# sourceMappingURL=transformers.js.map