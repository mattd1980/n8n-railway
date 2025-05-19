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
  employeeUpdateDescription: () => employeeUpdateDescription
});
module.exports = __toCommonJS(description_exports);
var import_sharedDescription = require("./sharedDescription");
const employeeUpdateDescription = [
  {
    displayName: "Employee ID",
    name: "employeeId",
    type: "string",
    required: true,
    displayOptions: {
      show: {
        operation: ["update"],
        resource: ["employee"]
      }
    },
    default: ""
  },
  {
    displayName: "Synced with Trax Payroll",
    name: "synced",
    type: "boolean",
    required: true,
    displayOptions: {
      show: {
        operation: ["update"],
        resource: ["employee"]
      }
    },
    default: false,
    description: "Whether the employee to create was added to a pay schedule synced with Trax Payroll"
  },
  ...(0, import_sharedDescription.updateEmployeeSharedDescription)(true),
  {
    displayName: "Update Fields",
    name: "updateFields",
    type: "collection",
    placeholder: "Add Field",
    default: {},
    displayOptions: {
      show: {
        operation: ["update"],
        resource: ["employee"]
      }
    },
    options: [
      ...(0, import_sharedDescription.updateEmployeeSharedDescription)(false),
      {
        displayName: "Work Email",
        name: "workEmail",
        type: "string",
        default: ""
      },
      {
        displayName: "Work Phone",
        name: "workPhone",
        type: "string",
        default: ""
      }
    ]
  }
];
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  employeeUpdateDescription
});
//# sourceMappingURL=description.js.map