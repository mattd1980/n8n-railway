"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);
var router_exports = {};
__export(router_exports, {
  router: () => router
});
module.exports = __toCommonJS(router_exports);
var companyReport = __toESM(require("./companyReport"));
var employee = __toESM(require("./employee"));
var employeeDocument = __toESM(require("./employeeDocument"));
var file = __toESM(require("./file"));
async function router() {
  const items = this.getInputData();
  const operationResult = [];
  for (let i = 0; i < items.length; i++) {
    const resource = this.getNodeParameter("resource", i);
    const operation = this.getNodeParameter("operation", i);
    const bamboohr = {
      resource,
      operation
    };
    if (bamboohr.operation === "delete") {
      bamboohr.operation = "del";
    }
    try {
      if (bamboohr.resource === "employee") {
        operationResult.push(...await employee[bamboohr.operation].execute.call(this, i));
      } else if (bamboohr.resource === "employeeDocument") {
        operationResult.push(...await employeeDocument[bamboohr.operation].execute.call(this, i));
      } else if (bamboohr.resource === "file") {
        operationResult.push(...await file[bamboohr.operation].execute.call(this, i));
      } else if (bamboohr.resource === "companyReport") {
        operationResult.push(...await companyReport[bamboohr.operation].execute.call(this, i));
      }
    } catch (err) {
      if (this.continueOnFail()) {
        operationResult.push({ json: this.getInputData(i)[0].json, error: err });
      } else {
        throw err;
      }
    }
  }
  return operationResult;
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  router
});
//# sourceMappingURL=router.js.map