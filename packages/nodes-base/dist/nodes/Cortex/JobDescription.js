"use strict";
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
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
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);
var JobDescription_exports = {};
__export(JobDescription_exports, {
  jobFields: () => jobFields,
  jobOperations: () => jobOperations
});
module.exports = __toCommonJS(JobDescription_exports);
const jobOperations = [
  {
    displayName: "Operation",
    name: "operation",
    type: "options",
    noDataExpression: true,
    description: "Choose an operation",
    required: true,
    displayOptions: {
      show: {
        resource: ["job"]
      }
    },
    options: [
      {
        name: "Get",
        value: "get",
        description: "Get job details",
        action: "Get a job"
      },
      {
        name: "Report",
        value: "report",
        description: "Get job report",
        action: "Get a job report"
      }
    ],
    default: "get"
  }
];
const jobFields = [
  {
    displayName: "Job ID",
    name: "jobId",
    type: "string",
    required: true,
    displayOptions: {
      show: {
        resource: ["job"],
        operation: ["get", "report"]
      }
    },
    default: "",
    description: "ID of the job"
  }
];
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  jobFields,
  jobOperations
});
//# sourceMappingURL=JobDescription.js.map