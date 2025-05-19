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
var versionDescription_exports = {};
__export(versionDescription_exports, {
  versionDescription: () => versionDescription
});
module.exports = __toCommonJS(versionDescription_exports);
var import_n8n_workflow = require("n8n-workflow");
var companyReport = __toESM(require("./companyReport"));
var employee = __toESM(require("./employee"));
var employeeDocument = __toESM(require("./employeeDocument"));
var file = __toESM(require("./file"));
const versionDescription = {
  credentials: [
    {
      name: "bambooHrApi",
      required: true,
      testedBy: "bambooHrApiCredentialTest"
    }
  ],
  defaults: {
    name: "BambooHR"
  },
  description: "Consume BambooHR API",
  displayName: "BambooHR",
  group: ["transform"],
  // eslint-disable-next-line n8n-nodes-base/node-class-description-icon-not-svg
  icon: "file:bambooHr.png",
  inputs: [import_n8n_workflow.NodeConnectionTypes.Main],
  name: "bambooHr",
  outputs: [import_n8n_workflow.NodeConnectionTypes.Main],
  properties: [
    {
      displayName: "Resource",
      name: "resource",
      type: "options",
      noDataExpression: true,
      options: [
        {
          name: "Company Report",
          value: "companyReport"
        },
        {
          name: "Employee",
          value: "employee"
        },
        {
          name: "Employee Document",
          value: "employeeDocument"
        },
        {
          name: "File",
          value: "file"
        }
      ],
      default: "employee"
    },
    ...employee.descriptions,
    ...employeeDocument.descriptions,
    ...file.descriptions,
    ...companyReport.descriptions
  ],
  subtitle: '={{$parameter["resource"] + ": " + $parameter["operation"]}}',
  version: 1
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  versionDescription
});
//# sourceMappingURL=versionDescription.js.map