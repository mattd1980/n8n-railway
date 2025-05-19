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
var AliasDescription_exports = {};
__export(AliasDescription_exports, {
  aliasFields: () => aliasFields,
  aliasOperations: () => aliasOperations
});
module.exports = __toCommonJS(AliasDescription_exports);
const aliasOperations = [
  {
    displayName: "Operation",
    name: "operation",
    type: "options",
    noDataExpression: true,
    displayOptions: {
      show: {
        resource: ["alias"]
      }
    },
    options: [
      {
        name: "Create",
        value: "create",
        description: "Create an alias",
        action: "Create an alias"
      }
    ],
    default: "create"
  }
];
const aliasFields = [
  /* -------------------------------------------------------------------------- */
  /*                                 alias:create                               */
  /* -------------------------------------------------------------------------- */
  {
    displayName: "Alias",
    name: "alias",
    type: "string",
    required: true,
    displayOptions: {
      show: {
        resource: ["alias"],
        operation: ["create"]
      }
    },
    default: "",
    description: "The name of the alias"
  },
  {
    displayName: "Distinct ID",
    name: "distinctId",
    type: "string",
    required: true,
    displayOptions: {
      show: {
        resource: ["alias"],
        operation: ["create"]
      }
    },
    default: "",
    description: "The user's distinct ID"
  },
  {
    displayName: "Additional Fields",
    name: "additionalFields",
    type: "collection",
    placeholder: "Add Field",
    displayOptions: {
      show: {
        resource: ["alias"],
        operation: ["create"]
      }
    },
    default: {},
    options: [
      {
        displayName: "Context",
        name: "contextUi",
        type: "fixedCollection",
        placeholder: "Add Property",
        default: {},
        typeOptions: {
          multipleValues: true
        },
        options: [
          {
            displayName: "Context",
            name: "contextValues",
            values: [
              {
                displayName: "Key",
                name: "key",
                type: "string",
                default: ""
              },
              {
                displayName: "Value",
                name: "value",
                type: "string",
                default: ""
              }
            ]
          }
        ]
      },
      {
        displayName: "Timestamp",
        name: "timestamp",
        type: "dateTime",
        default: "",
        description: "If not set, it'll automatically be set to the current time"
      }
    ]
  }
];
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  aliasFields,
  aliasOperations
});
//# sourceMappingURL=AliasDescription.js.map