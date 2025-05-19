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
var IncidentNoteDescription_exports = {};
__export(IncidentNoteDescription_exports, {
  incidentNoteFields: () => incidentNoteFields,
  incidentNoteOperations: () => incidentNoteOperations
});
module.exports = __toCommonJS(IncidentNoteDescription_exports);
const incidentNoteOperations = [
  {
    displayName: "Operation",
    name: "operation",
    type: "options",
    noDataExpression: true,
    displayOptions: {
      show: {
        resource: ["incidentNote"]
      }
    },
    options: [
      {
        name: "Create",
        value: "create",
        description: "Create a incident note",
        action: "Create an incident note"
      },
      {
        name: "Get Many",
        value: "getAll",
        description: "Get many incident's notes",
        action: "Get many incident notes"
      }
    ],
    default: "create"
  }
];
const incidentNoteFields = [
  /* -------------------------------------------------------------------------- */
  /*                                incidentNote:create                         */
  /* -------------------------------------------------------------------------- */
  {
    displayName: "Incident ID",
    name: "incidentId",
    type: "string",
    required: true,
    default: "",
    displayOptions: {
      show: {
        resource: ["incidentNote"],
        operation: ["create"]
      }
    },
    description: "Unique identifier for the incident"
  },
  {
    displayName: "Content",
    name: "content",
    type: "string",
    required: true,
    default: "",
    displayOptions: {
      show: {
        resource: ["incidentNote"],
        operation: ["create"]
      }
    },
    description: "The note content"
  },
  {
    displayName: "Email",
    name: "email",
    type: "string",
    placeholder: "name@email.com",
    required: true,
    default: "",
    displayOptions: {
      show: {
        resource: ["incidentNote"],
        operation: ["create"]
      }
    },
    description: "The email address of a valid user associated with the account making the request"
  },
  /* -------------------------------------------------------------------------- */
  /*                                 incidentNote:getAll                        */
  /* -------------------------------------------------------------------------- */
  {
    displayName: "Incident ID",
    name: "incidentId",
    type: "string",
    required: true,
    default: "",
    displayOptions: {
      show: {
        resource: ["incidentNote"],
        operation: ["getAll"]
      }
    },
    description: "Unique identifier for the incident"
  },
  {
    displayName: "Return All",
    name: "returnAll",
    type: "boolean",
    displayOptions: {
      show: {
        operation: ["getAll"],
        resource: ["incidentNote"]
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
        resource: ["incidentNote"],
        returnAll: [false]
      }
    },
    typeOptions: {
      minValue: 1,
      maxValue: 500
    },
    default: 100,
    description: "Max number of results to return"
  }
];
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  incidentNoteFields,
  incidentNoteOperations
});
//# sourceMappingURL=IncidentNoteDescription.js.map