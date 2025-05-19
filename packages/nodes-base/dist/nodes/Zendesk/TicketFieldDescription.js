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
var TicketFieldDescription_exports = {};
__export(TicketFieldDescription_exports, {
  ticketFieldFields: () => ticketFieldFields,
  ticketFieldOperations: () => ticketFieldOperations
});
module.exports = __toCommonJS(TicketFieldDescription_exports);
const ticketFieldOperations = [
  {
    displayName: "Operation",
    name: "operation",
    type: "options",
    noDataExpression: true,
    displayOptions: {
      show: {
        resource: ["ticketField"]
      }
    },
    options: [
      {
        name: "Get",
        value: "get",
        description: "Get a ticket field",
        action: "Get a ticket field"
      },
      {
        name: "Get Many",
        value: "getAll",
        description: "Get many system and custom ticket fields",
        action: "Get many ticket fields"
      }
    ],
    default: "get"
  }
];
const ticketFieldFields = [
  /* -------------------------------------------------------------------------- */
  /*                                 ticketField:get                            */
  /* -------------------------------------------------------------------------- */
  {
    displayName: "Ticket Field ID",
    name: "ticketFieldId",
    type: "string",
    default: "",
    required: true,
    displayOptions: {
      show: {
        resource: ["ticketField"],
        operation: ["get"]
      }
    }
  },
  /* -------------------------------------------------------------------------- */
  /*                                 ticketField:getAll                         */
  /* -------------------------------------------------------------------------- */
  {
    displayName: "Return All",
    name: "returnAll",
    type: "boolean",
    displayOptions: {
      show: {
        resource: ["ticketField"],
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
        resource: ["ticketField"],
        operation: ["getAll"],
        returnAll: [false]
      }
    },
    typeOptions: {
      minValue: 1,
      maxValue: 100
    },
    default: 100,
    description: "Max number of results to return"
  }
];
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  ticketFieldFields,
  ticketFieldOperations
});
//# sourceMappingURL=TicketFieldDescription.js.map