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
        name: "Get",
        value: "get",
        description: "Get single event by ID",
        action: "Get an event by ID"
      }
    ],
    default: "get"
  }
];
const eventFields = [
  /* -------------------------------------------------------------------------- */
  /*                                 event:get                                  */
  /* -------------------------------------------------------------------------- */
  {
    displayName: "Room ID",
    name: "roomId",
    type: "string",
    default: "",
    placeholder: "!123abc:matrix.org",
    displayOptions: {
      show: {
        operation: ["get"],
        resource: ["event"]
      }
    },
    required: true,
    description: "The room related to the event"
  },
  {
    displayName: "Event ID",
    name: "eventId",
    type: "string",
    default: "",
    placeholder: "$1234abcd:matrix.org",
    displayOptions: {
      show: {
        operation: ["get"],
        resource: ["event"]
      }
    },
    required: true,
    description: "The room related to the event"
  }
];
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  eventFields,
  eventOperations
});
//# sourceMappingURL=EventDescription.js.map