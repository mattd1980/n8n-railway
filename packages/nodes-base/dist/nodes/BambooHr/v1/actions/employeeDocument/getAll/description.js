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
var description_exports = {};
__export(description_exports, {
  employeeDocumentGetAllDescription: () => employeeDocumentGetAllDescription
});
module.exports = __toCommonJS(description_exports);
const employeeDocumentGetAllDescription = [
  {
    displayName: "Employee ID",
    name: "employeeId",
    type: "string",
    required: true,
    displayOptions: {
      show: {
        operation: ["getAll"],
        resource: ["employeeDocument"]
      }
    },
    default: ""
  },
  {
    displayName: "Return All",
    name: "returnAll",
    type: "boolean",
    default: false,
    displayOptions: {
      show: {
        operation: ["getAll"],
        resource: ["employeeDocument"]
      }
    },
    description: "Whether to return all results or only up to a given limit"
  },
  {
    displayName: "Limit",
    name: "limit",
    type: "number",
    default: 5,
    description: "Max number of results to return",
    typeOptions: {
      minValue: 1,
      maxValue: 1e3
    },
    displayOptions: {
      show: {
        operation: ["getAll"],
        resource: ["employeeDocument"],
        returnAll: [false]
      }
    }
  },
  {
    displayName: "Simplify",
    name: "simplifyOutput",
    type: "boolean",
    default: true,
    displayOptions: {
      show: {
        operation: ["getAll"],
        resource: ["employeeDocument"]
      }
    },
    description: "Whether to return a simplified version of the response instead of the raw data"
  }
];
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  employeeDocumentGetAllDescription
});
//# sourceMappingURL=description.js.map