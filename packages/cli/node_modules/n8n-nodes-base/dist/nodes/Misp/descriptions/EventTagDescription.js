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
var EventTagDescription_exports = {};
__export(EventTagDescription_exports, {
  eventTagFields: () => eventTagFields,
  eventTagOperations: () => eventTagOperations
});
module.exports = __toCommonJS(EventTagDescription_exports);
const eventTagOperations = [
  {
    displayName: "Operation",
    name: "operation",
    type: "options",
    displayOptions: {
      show: {
        resource: ["eventTag"]
      }
    },
    noDataExpression: true,
    options: [
      {
        name: "Add",
        value: "add",
        action: "Add a tag to an event"
      },
      {
        name: "Remove",
        value: "remove",
        action: "Remove a tag from an event"
      }
    ],
    default: "add"
  }
];
const eventTagFields = [
  // ----------------------------------------
  //             eventTag: add
  // ----------------------------------------
  {
    displayName: "Event ID",
    name: "eventId",
    description: "UUID or numeric ID of the event",
    type: "string",
    required: true,
    default: "",
    displayOptions: {
      show: {
        resource: ["eventTag"],
        operation: ["add"]
      }
    }
  },
  {
    displayName: "Tag Name or ID",
    name: "tagId",
    description: 'Choose from the list, or specify an ID using an <a href="https://docs.n8n.io/code/expressions/">expression</a>',
    type: "options",
    required: true,
    default: "",
    typeOptions: {
      loadOptionsMethod: "getTags"
    },
    displayOptions: {
      show: {
        resource: ["eventTag"],
        operation: ["add"]
      }
    }
  },
  // ----------------------------------------
  //            eventTag: remove
  // ----------------------------------------
  {
    displayName: "Event ID",
    name: "eventId",
    description: "UUID or numeric ID of the event",
    type: "string",
    required: true,
    default: "",
    displayOptions: {
      show: {
        resource: ["eventTag"],
        operation: ["remove"]
      }
    }
  },
  {
    displayName: "Tag Name or ID",
    name: "tagId",
    description: 'Choose from the list, or specify an ID using an <a href="https://docs.n8n.io/code/expressions/">expression</a>',
    type: "options",
    required: true,
    default: "",
    typeOptions: {
      loadOptionsMethod: "getTags"
    },
    displayOptions: {
      show: {
        resource: ["eventTag"],
        operation: ["remove"]
      }
    }
  }
];
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  eventTagFields,
  eventTagOperations
});
//# sourceMappingURL=EventTagDescription.js.map