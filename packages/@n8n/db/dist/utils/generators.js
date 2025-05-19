"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateNanoId = generateNanoId;
exports.generateHostInstanceId = generateHostInstanceId;
const n8n_workflow_1 = require("n8n-workflow");
const nanoid_1 = require("nanoid");
const nanoid = (0, nanoid_1.customAlphabet)(n8n_workflow_1.ALPHABET, 16);
function generateNanoId() {
    return nanoid();
}
function generateHostInstanceId(instanceType) {
    return `${instanceType}-${nanoid()}`;
}
//# sourceMappingURL=generators.js.map