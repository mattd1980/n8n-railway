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
var FieldDescription_exports = {};
__export(FieldDescription_exports, {
  fieldFields: () => fieldFields,
  fieldOperations: () => fieldOperations
});
module.exports = __toCommonJS(FieldDescription_exports);
const fieldOperations = [
  {
    displayName: "Operation",
    name: "operation",
    type: "options",
    noDataExpression: true,
    displayOptions: {
      show: {
        resource: ["field"]
      }
    },
    options: [
      {
        name: "Get Many",
        value: "getAll",
        description: "Get many fields",
        action: "Get many fields"
      }
    ],
    default: "getAll"
  }
];
const fieldFields = [
  /* -------------------------------------------------------------------------- */
  /*                                field:getAll                                */
  /* -------------------------------------------------------------------------- */
  {
    displayName: "Table ID",
    name: "tableId",
    type: "string",
    default: "",
    required: true,
    displayOptions: {
      show: {
        resource: ["field"],
        operation: ["getAll"]
      }
    },
    description: "The table identifier"
  },
  {
    displayName: "Return All",
    name: "returnAll",
    type: "boolean",
    displayOptions: {
      show: {
        resource: ["field"],
        operation: ["getAll"]
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
        resource: ["field"],
        operation: ["getAll"],
        returnAll: [false]
      }
    },
    typeOptions: {
      minValue: 1,
      maxValue: 100
    },
    default: 50,
    description: "Max number of results to return"
  },
  {
    displayName: "Options",
    name: "options",
    type: "collection",
    placeholder: "Add Field",
    default: {},
    displayOptions: {
      show: {
        resource: ["field"],
        operation: ["getAll"]
      }
    },
    options: [
      {
        displayName: "Include Field Perms",
        name: "includeFieldPerms",
        type: "boolean",
        default: false,
        description: "Whether to get back the custom permissions for the field(s)"
      }
    ]
  }
];
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  fieldFields,
  fieldOperations
});
//# sourceMappingURL=FieldDescription.js.map