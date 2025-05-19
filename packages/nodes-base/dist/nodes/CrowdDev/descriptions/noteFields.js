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
var noteFields_exports = {};
__export(noteFields_exports, {
  noteFields: () => noteFields,
  noteOperations: () => noteOperations
});
module.exports = __toCommonJS(noteFields_exports);
var import_utils = require("./utils");
var import_GenericFunctions = require("../GenericFunctions");
const displayOpts = (0, import_utils.showFor)(["note"]);
const displayFor = {
  resource: displayOpts(),
  createOrUpdate: displayOpts(["create", "update"]),
  id: displayOpts(["delete", "find", "update"])
};
const noteOperations = {
  displayName: "Operation",
  name: "operation",
  type: "options",
  displayOptions: displayFor.resource.displayOptions,
  noDataExpression: true,
  default: "find",
  options: [
    {
      name: "Create",
      value: "create",
      description: "Create a note",
      action: "Create a note",
      routing: {
        send: { preSend: [import_GenericFunctions.notePresend] },
        request: {
          method: "POST",
          url: "/note"
        }
      }
    },
    {
      name: "Delete",
      value: "delete",
      description: "Delete a note",
      action: "Delete a note",
      routing: {
        request: {
          method: "DELETE",
          url: "=/note"
        }
      }
    },
    {
      name: "Find",
      value: "find",
      description: "Find a note",
      action: "Find a note",
      routing: {
        request: {
          method: "GET",
          url: '=/note/{{$parameter["id"]}}'
        }
      }
    },
    {
      name: "Update",
      value: "update",
      description: "Update a note",
      action: "Update a note",
      routing: {
        send: { preSend: [import_GenericFunctions.notePresend] },
        request: {
          method: "PUT",
          url: '=/note/{{$parameter["id"]}}'
        }
      }
    }
  ]
};
const commonFields = [
  {
    displayName: "Body",
    name: "body",
    description: "The body of the note",
    type: "string",
    typeOptions: {
      rows: 4
    },
    default: ""
  }
];
const noteFields = [
  Object.assign((0, import_utils.getId)(), { description: "The ID of the note" }, displayFor.id),
  ...commonFields.map((0, import_utils.mapWith)(displayFor.createOrUpdate))
];
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  noteFields,
  noteOperations
});
//# sourceMappingURL=noteFields.js.map