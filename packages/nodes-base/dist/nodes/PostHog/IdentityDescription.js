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
var IdentityDescription_exports = {};
__export(IdentityDescription_exports, {
  identityFields: () => identityFields,
  identityOperations: () => identityOperations
});
module.exports = __toCommonJS(IdentityDescription_exports);
const identityOperations = [
  {
    displayName: "Operation",
    name: "operation",
    type: "options",
    noDataExpression: true,
    displayOptions: {
      show: {
        resource: ["identity"]
      }
    },
    options: [
      {
        name: "Create",
        value: "create",
        action: "Create an identity"
      }
    ],
    default: "create"
  }
];
const identityFields = [
  /* -------------------------------------------------------------------------- */
  /*                                 identity:create                            */
  /* -------------------------------------------------------------------------- */
  {
    displayName: "Distinct ID",
    name: "distinctId",
    type: "string",
    required: true,
    displayOptions: {
      show: {
        resource: ["identity"],
        operation: ["create"]
      }
    },
    default: "",
    description: "The identity's distinct ID"
  },
  {
    displayName: "Additional Fields",
    name: "additionalFields",
    type: "collection",
    placeholder: "Add Field",
    displayOptions: {
      show: {
        resource: ["identity"],
        operation: ["create"]
      }
    },
    default: {},
    options: [
      {
        displayName: "Properties",
        name: "propertiesUi",
        type: "fixedCollection",
        placeholder: "Add Property",
        default: {},
        typeOptions: {
          multipleValues: true
        },
        options: [
          {
            displayName: "Property",
            name: "propertyValues",
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
        displayName: "Message ID",
        name: "messageId",
        type: "string",
        default: ""
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
  identityFields,
  identityOperations
});
//# sourceMappingURL=IdentityDescription.js.map