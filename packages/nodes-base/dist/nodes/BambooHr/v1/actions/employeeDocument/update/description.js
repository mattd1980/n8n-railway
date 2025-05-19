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
  employeeDocumentUpdateDescription: () => employeeDocumentUpdateDescription
});
module.exports = __toCommonJS(description_exports);
const employeeDocumentUpdateDescription = [
  {
    displayName: "Employee ID",
    name: "employeeId",
    type: "string",
    required: true,
    displayOptions: {
      show: {
        operation: ["update"],
        resource: ["employeeDocument"]
      }
    },
    default: ""
  },
  {
    displayName: "File ID",
    name: "fileId",
    type: "string",
    required: true,
    displayOptions: {
      show: {
        operation: ["update"],
        resource: ["employeeDocument"]
      }
    },
    default: ""
  },
  {
    displayName: "Update Fields",
    name: "updateFields",
    type: "collection",
    placeholder: "Add Field",
    default: {},
    displayOptions: {
      show: {
        operation: ["update"],
        resource: ["employeeDocument"]
      }
    },
    options: [
      {
        displayName: "Employee Document Category Name or ID",
        name: "categoryId",
        type: "options",
        typeOptions: {
          loadOptionsMethod: "getEmployeeDocumentCategories",
          loadOptionsDependsOn: ["employeeId"]
        },
        default: "",
        description: 'ID of the new category of the file. Choose from the list, or specify an ID using an <a href="https://docs.n8n.io/code/expressions/">expression</a>.'
      },
      {
        displayName: "Name",
        name: "name",
        type: "string",
        default: "",
        description: "New name of the file"
      },
      {
        displayName: "Share with Employee",
        name: "shareWithEmployee",
        type: "boolean",
        default: true,
        description: "Whether this file is shared or not"
      }
    ]
  }
];
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  employeeDocumentUpdateDescription
});
//# sourceMappingURL=description.js.map