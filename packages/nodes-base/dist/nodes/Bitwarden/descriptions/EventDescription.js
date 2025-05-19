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
    default: "get",
    options: [
      {
        name: "Get Many",
        value: "getAll",
        action: "Get many events"
      }
    ],
    displayOptions: {
      show: {
        resource: ["event"]
      }
    }
  }
];
const eventFields = [
  // ----------------------------------
  //       event: getAll
  // ----------------------------------
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
    typeOptions: {
      minValue: 1
    },
    default: 10,
    description: "Max number of results to return",
    displayOptions: {
      show: {
        resource: ["event"],
        operation: ["getAll"],
        returnAll: [false]
      }
    }
  },
  {
    displayName: "Filters",
    name: "filters",
    type: "collection",
    placeholder: "Add Filter",
    default: {},
    options: [
      {
        displayName: "Acting User ID",
        name: "actingUserId",
        type: "string",
        default: "",
        description: "The unique identifier of the acting user",
        placeholder: "4a59c8c7-e05a-4d17-8e85-acc301343926"
      },
      {
        displayName: "End Date",
        name: "end",
        type: "dateTime",
        default: "",
        description: "The end date for the search"
      },
      {
        displayName: "Item ID",
        name: "itemID",
        type: "string",
        default: "",
        description: "The unique identifier of the item that the event describes",
        placeholder: "5e59c8c7-e05a-4d17-8e85-acc301343926"
      },
      {
        displayName: "Start Date",
        name: "start",
        type: "dateTime",
        default: "",
        description: "The start date for the search"
      }
    ],
    displayOptions: {
      show: {
        resource: ["event"],
        operation: ["getAll"]
      }
    }
  }
];
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  eventFields,
  eventOperations
});
//# sourceMappingURL=EventDescription.js.map