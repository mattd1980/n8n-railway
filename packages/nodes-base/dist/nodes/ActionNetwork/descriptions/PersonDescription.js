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
var PersonDescription_exports = {};
__export(PersonDescription_exports, {
  personFields: () => personFields,
  personOperations: () => personOperations
});
module.exports = __toCommonJS(PersonDescription_exports);
var import_SharedFields = require("./SharedFields");
const personOperations = [
  {
    displayName: "Operation",
    name: "operation",
    type: "options",
    noDataExpression: true,
    displayOptions: {
      show: {
        resource: ["person"]
      }
    },
    options: [
      {
        name: "Create",
        value: "create",
        action: "Create a person"
      },
      {
        name: "Get",
        value: "get",
        action: "Get a person"
      },
      {
        name: "Get Many",
        value: "getAll",
        action: "Get many people"
      },
      {
        name: "Update",
        value: "update",
        action: "Update a person"
      }
    ],
    default: "create"
  }
];
const personFields = [
  // ----------------------------------------
  //              person: create
  // ----------------------------------------
  (0, import_SharedFields.makeSimpleField)("person", "create"),
  {
    displayName: "Email Address",
    // on create, only _one_ must be passed in
    name: "email_addresses",
    type: "fixedCollection",
    default: {},
    placeholder: "Add Email Address Field",
    description: "Person\u2019s email addresses",
    displayOptions: {
      show: {
        resource: ["person"],
        operation: ["create"]
      }
    },
    options: [
      {
        displayName: "Email Addresses Fields",
        name: "email_addresses_fields",
        values: [
          {
            displayName: "Address",
            name: "address",
            type: "string",
            default: "",
            description: "Person's email address"
          },
          {
            displayName: "Primary",
            name: "primary",
            type: "hidden",
            default: true,
            description: "Whether this is the person's primary email address"
          },
          {
            displayName: "Status",
            name: "status",
            type: "options",
            default: "subscribed",
            description: "Subscription status of this email address",
            options: [
              {
                name: "Bouncing",
                value: "bouncing"
              },
              {
                name: "Previous Bounce",
                value: "previous bounce"
              },
              {
                name: "Previous Spam Complaint",
                value: "previous spam complaint"
              },
              {
                name: "Spam Complaint",
                value: "spam complaint"
              },
              {
                name: "Subscribed",
                value: "subscribed"
              },
              {
                name: "Unsubscribed",
                value: "unsubscribed"
              }
            ]
          }
        ]
      }
    ]
  },
  {
    displayName: "Additional Fields",
    name: "additionalFields",
    type: "collection",
    placeholder: "Add Field",
    default: {},
    displayOptions: {
      show: {
        resource: ["person"],
        operation: ["create"]
      }
    },
    options: import_SharedFields.personAdditionalFieldsOptions
  },
  // ----------------------------------------
  //               person: get
  // ----------------------------------------
  {
    displayName: "Person ID",
    name: "personId",
    description: "ID of the person to retrieve",
    type: "string",
    required: true,
    default: "",
    displayOptions: {
      show: {
        resource: ["person"],
        operation: ["get"]
      }
    }
  },
  (0, import_SharedFields.makeSimpleField)("person", "get"),
  // ----------------------------------------
  //              person: getAll
  // ----------------------------------------
  {
    displayName: "Return All",
    name: "returnAll",
    type: "boolean",
    default: false,
    description: "Whether to return all results or only up to a given limit",
    displayOptions: {
      show: {
        resource: ["person"],
        operation: ["getAll"]
      }
    }
  },
  {
    displayName: "Limit",
    name: "limit",
    type: "number",
    default: 25,
    description: "Max number of results to return",
    typeOptions: {
      minValue: 1,
      maxValue: 25
    },
    displayOptions: {
      show: {
        resource: ["person"],
        operation: ["getAll"],
        returnAll: [false]
      }
    }
  },
  (0, import_SharedFields.makeSimpleField)("person", "getAll"),
  // ----------------------------------------
  //              person: update
  // ----------------------------------------
  {
    displayName: "Person ID",
    name: "personId",
    description: "ID of the person to update",
    type: "string",
    required: true,
    default: "",
    displayOptions: {
      show: {
        resource: ["person"],
        operation: ["update"]
      }
    }
  },
  (0, import_SharedFields.makeSimpleField)("person", "update"),
  {
    displayName: "Update Fields",
    name: "updateFields",
    type: "collection",
    placeholder: "Add Field",
    default: {},
    displayOptions: {
      show: {
        resource: ["person"],
        operation: ["update"]
      }
    },
    options: import_SharedFields.personAdditionalFieldsOptions
  }
];
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  personFields,
  personOperations
});
//# sourceMappingURL=PersonDescription.js.map