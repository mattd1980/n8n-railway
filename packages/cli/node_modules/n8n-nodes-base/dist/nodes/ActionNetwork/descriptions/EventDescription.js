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
var import_SharedFields = require("./SharedFields");
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
        action: "Create an event"
      },
      {
        name: "Get",
        value: "get",
        action: "Get an event"
      },
      {
        name: "Get Many",
        value: "getAll",
        action: "Get many events"
      }
    ],
    default: "create"
  }
];
const eventFields = [
  // ----------------------------------------
  //              event: create
  // ----------------------------------------
  {
    displayName: "Origin System",
    name: "originSystem",
    description: "Source where the event originated",
    type: "string",
    required: true,
    default: "",
    displayOptions: {
      show: {
        resource: ["event"],
        operation: ["create"]
      }
    }
  },
  {
    displayName: "Title",
    name: "title",
    description: "Title of the event to create",
    type: "string",
    required: true,
    default: "",
    displayOptions: {
      show: {
        resource: ["event"],
        operation: ["create"]
      }
    }
  },
  (0, import_SharedFields.makeSimpleField)("event", "create"),
  {
    displayName: "Additional Fields",
    name: "additionalFields",
    type: "collection",
    placeholder: "Add Field",
    default: {},
    displayOptions: {
      show: {
        resource: ["event"],
        operation: ["create"]
      }
    },
    options: import_SharedFields.eventAdditionalFieldsOptions
  },
  // ----------------------------------------
  //                event: get
  // ----------------------------------------
  {
    displayName: "Event ID",
    name: "eventId",
    description: "ID of the event to retrieve",
    type: "string",
    default: "",
    required: true,
    displayOptions: {
      show: {
        resource: ["event"],
        operation: ["get"]
      }
    }
  },
  (0, import_SharedFields.makeSimpleField)("event", "get"),
  // ----------------------------------------
  //              event: getAll
  // ----------------------------------------
  {
    displayName: "Return All",
    name: "returnAll",
    type: "boolean",
    default: false,
    description: "Whether to return all results or only up to a given limit",
    displayOptions: {
      show: {
        resource: ["event"],
        operation: ["getAll"]
      }
    }
  },
  {
    displayName: "Limit",
    name: "limit",
    type: "number",
    default: 50,
    description: "Max number of results to return",
    typeOptions: {
      minValue: 1
    },
    displayOptions: {
      show: {
        resource: ["event"],
        operation: ["getAll"],
        returnAll: [false]
      }
    }
  },
  (0, import_SharedFields.makeSimpleField)("event", "getAll")
];
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  eventFields,
  eventOperations
});
//# sourceMappingURL=EventDescription.js.map