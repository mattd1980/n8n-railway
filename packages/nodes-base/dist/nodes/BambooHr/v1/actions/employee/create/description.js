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
  employeeCreateDescription: () => employeeCreateDescription
});
module.exports = __toCommonJS(description_exports);
var import_shareDescription = require("./shareDescription");
const employeeCreateDescription = [
  {
    displayName: "Synced with Trax Payroll",
    name: "synced",
    type: "boolean",
    required: true,
    displayOptions: {
      show: {
        operation: ["create"],
        resource: ["employee"]
      }
    },
    default: false,
    description: "Whether the employee to create was added to a pay schedule synced with Trax Payroll"
  },
  {
    displayName: "First Name",
    name: "firstName",
    type: "string",
    required: true,
    displayOptions: {
      show: {
        operation: ["create"],
        resource: ["employee"]
      }
    },
    default: ""
  },
  {
    displayName: "Last Name",
    name: "lastName",
    type: "string",
    required: true,
    displayOptions: {
      show: {
        operation: ["create"],
        resource: ["employee"]
      }
    },
    default: ""
  },
  ...(0, import_shareDescription.createEmployeeSharedDescription)(true),
  {
    displayName: "Additional Fields",
    name: "additionalFields",
    type: "collection",
    placeholder: "Add Field",
    default: {},
    displayOptions: {
      show: {
        operation: ["create"],
        resource: ["employee"]
      }
    },
    options: [
      ...(0, import_shareDescription.createEmployeeSharedDescription)(false),
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
  employeeCreateDescription
});
//# sourceMappingURL=description.js.map