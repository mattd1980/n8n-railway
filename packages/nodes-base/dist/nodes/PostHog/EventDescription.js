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
var EventDescription_exports = {};
__export(EventDescription_exports, {
  eventFields: () => eventFields,
  eventOperations: () => eventOperations
});
module.exports = __toCommonJS(EventDescription_exports);
const eventOperations = [
  {
    displayName: "Operation",
    name: "operation",
    type: "options",
    noDataExpression: true,
    displayOptions: {
      show: {
        resource: ["event"]
      }
    },
    options: [
      {
        name: "Create",
        value: "create",
        description: "Create an event",
        action: "Create an event"
      }
    ],
    default: "create"
  }
];
const eventFields = [
  /* -------------------------------------------------------------------------- */
  /*                                 event:create                               */
  /* -------------------------------------------------------------------------- */
  {
    displayName: "Event",
    name: "eventName",
    type: "string",
    required: true,
    displayOptions: {
      show: {
        resource: ["event"],
        operation: ["create"]
      }
    },
    default: "",
    description: "The name of the event"
  },
  {
    displayName: "Distinct ID",
    name: "distinctId",
    type: "string",
    required: true,
    displayOptions: {
      show: {
        resource: ["event"],
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
        resource: ["event"],
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
  eventFields,
  eventOperations
});
//# sourceMappingURL=EventDescription.js.map