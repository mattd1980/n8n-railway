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
var CustomFieldDescription_exports = {};
__export(CustomFieldDescription_exports, {
  customFieldFields: () => customFieldFields,
  customFieldOperations: () => customFieldOperations
});
module.exports = __toCommonJS(CustomFieldDescription_exports);
const customFieldOperations = [
  {
    displayName: "Operation",
    name: "operation",
    type: "options",
    noDataExpression: true,
    displayOptions: {
      show: {
        resource: ["customField"]
      }
    },
    options: [
      {
        name: "Create",
        value: "create",
        description: "Create a field",
        action: "Create a custom field"
      },
      {
        name: "Delete",
        value: "delete",
        description: "Delete a field",
        action: "Delete a custom field"
      },
      {
        name: "Get Many",
        value: "getAll",
        description: "Get many fields",
        action: "Get many custom fields"
      },
      {
        name: "Update",
        value: "update",
        description: "Update a field",
        action: "Update a custom field"
      }
    ],
    default: "update"
  }
];
const customFieldFields = [
  {
    displayName: "Field ID",
    name: "id",
    type: "string",
    required: true,
    displayOptions: {
      show: {
        resource: ["customField"],
        operation: ["update", "delete"]
      }
    },
    default: "",
    description: "The ID of your custom field"
  },
  {
    displayName: "Label",
    name: "label",
    type: "string",
    required: true,
    displayOptions: {
      show: {
        resource: ["customField"],
        operation: ["update", "create"]
      }
    },
    default: "",
    description: "The label of the custom field"
  },
  {
    displayName: "Return All",
    name: "returnAll",
    type: "boolean",
    displayOptions: {
      show: {
        operation: ["getAll"],
        resource: ["customField"]
      }
    },
    default: false,
    description: "Whether to return all results or only up to a given limit"
  },
  {
    displayName: "Limit",
    name: "limit",
    type: "number",
    displayOptions: {
      show: {
        operation: ["getAll"],
        resource: ["customField"],
        returnAll: [false]
      }
    },
    typeOptions: {
      minValue: 1,
      maxValue: 500
    },
    default: 100,
    description: "Max number of results to return"
  }
];
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  customFieldFields,
  customFieldOperations
});
//# sourceMappingURL=CustomFieldDescription.js.map