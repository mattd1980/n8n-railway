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
      },
      {
        name: "Get Many",
        value: "getAll",
        description: "Get many events",
        action: "Get many events"
      }
    ],
    default: "getAll"
  }
];
const eventFields = [
  /* -------------------------------------------------------------------------- */
  /*                                event:getAll                                */
  /* -------------------------------------------------------------------------- */
  {
    displayName: "Return All",
    name: "returnAll",
    type: "boolean",
    displayOptions: {
      show: {
        operation: ["getAll"],
        resource: ["event"]
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
        resource: ["event"],
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
  /* -------------------------------------------------------------------------- */
  /*                                event:create                                  */
  /* -------------------------------------------------------------------------- */
  {
    displayName: "Event Type",
    name: "eventType",
    type: "string",
    displayOptions: {
      show: {
        operation: ["create"],
        resource: ["event"]
      }
    },
    required: true,
    default: "",
    description: "The Entity ID for which an event will be created"
  },
  {
    displayName: "Event Attributes",
    name: "eventAttributes",
    type: "fixedCollection",
    typeOptions: {
      multipleValues: true
    },
    placeholder: "Add Attribute",
    default: {},
    displayOptions: {
      show: {
        resource: ["event"],
        operation: ["create"]
      }
    },
    options: [
      {
        displayName: "Attributes",
        name: "attributes",
        values: [
          {
            displayName: "Name",
            name: "name",
            type: "string",
            default: "",
            description: "Name of the attribute"
          },
          {
            displayName: "Value",
            name: "value",
            type: "string",
            default: "",
            description: "Value of the attribute"
          }
        ]
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