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
var CustomerDescription_exports = {};
__export(CustomerDescription_exports, {
  customerFields: () => customerFields,
  customerOperations: () => customerOperations
});
module.exports = __toCommonJS(CustomerDescription_exports);
const customerOperations = [
  {
    displayName: "Operation",
    name: "operation",
    type: "options",
    noDataExpression: true,
    displayOptions: {
      show: {
        resource: ["customer"]
      }
    },
    options: [
      {
        name: "Create or Update",
        value: "upsert",
        description: "Create a new customer, or update the current one if it already exists (upsert)",
        action: "Create or update a customer"
      },
      {
        name: "Delete",
        value: "delete",
        description: "Delete a customer",
        action: "Delete a customer"
      }
    ],
    default: "upsert"
  }
];
const customerFields = [
  /* -------------------------------------------------------------------------- */
  /*                                   customer:delete			            */
  /* -------------------------------------------------------------------------- */
  {
    displayName: "ID",
    name: "id",
    type: "string",
    required: true,
    default: "",
    displayOptions: {
      show: {
        resource: ["customer"],
        operation: ["delete"]
      }
    },
    description: "The unique identifier for the customer"
  },
  /* -------------------------------------------------------------------------- */
  /*                                   customer:upsert			              */
  /* -------------------------------------------------------------------------- */
  {
    displayName: "ID",
    name: "id",
    type: "string",
    required: true,
    default: "",
    displayOptions: {
      show: {
        resource: ["customer"],
        operation: ["upsert"]
      }
    },
    description: "The unique identifier for the customer"
  },
  {
    displayName: "JSON Parameters",
    name: "jsonParameters",
    type: "boolean",
    default: false,
    displayOptions: {
      show: {
        resource: ["customer"],
        operation: ["upsert"]
      }
    }
  },
  {
    displayName: "Additional Fields",
    name: "additionalFieldsJson",
    type: "json",
    typeOptions: {
      alwaysOpenEditWindow: true
    },
    default: "",
    displayOptions: {
      show: {
        resource: ["customer"],
        operation: ["upsert"],
        jsonParameters: [true]
      }
    },
    description: 'Object of values to set as described <a href="https://github.com/agilecrm/rest-api#1-companys---companies-api">here</a>'
  },
  {
    displayName: "Additional Fields",
    name: "additionalFields",
    type: "collection",
    placeholder: "Add Field",
    default: {},
    displayOptions: {
      show: {
        resource: ["customer"],
        operation: ["upsert"],
        jsonParameters: [false]
      }
    },
    options: [
      {
        displayName: "Custom Properties",
        name: "customProperties",
        type: "fixedCollection",
        default: {},
        typeOptions: {
          multipleValues: true
        },
        options: [
          {
            displayName: "Property",
            name: "customProperty",
            values: [
              {
                displayName: "Key",
                name: "key",
                type: "string",
                required: true,
                default: "",
                description: "Property name",
                placeholder: "Plan"
              },
              {
                displayName: "Value",
                name: "value",
                type: "string",
                required: true,
                default: "",
                description: "Property value",
                placeholder: "Basic"
              }
            ]
          }
        ]
      },
      {
        displayName: "Email",
        name: "email",
        type: "string",
        placeholder: "name@email.com",
        default: "",
        description: "The email address of the user"
      },
      {
        displayName: "Created At",
        name: "createdAt",
        type: "dateTime",
        default: "",
        description: "The UNIX timestamp from when the user was created"
      }
    ]
  }
];
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  customerFields,
  customerOperations
});
//# sourceMappingURL=CustomerDescription.js.map