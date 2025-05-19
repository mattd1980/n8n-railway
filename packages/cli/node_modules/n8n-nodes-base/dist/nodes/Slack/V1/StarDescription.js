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
var StarDescription_exports = {};
__export(StarDescription_exports, {
  starFields: () => starFields,
  starOperations: () => starOperations
});
module.exports = __toCommonJS(StarDescription_exports);
const starOperations = [
  {
    displayName: "Operation",
    name: "operation",
    type: "options",
    noDataExpression: true,
    displayOptions: {
      show: {
        resource: ["star"]
      }
    },
    options: [
      {
        name: "Add",
        value: "add",
        description: "Add a star to an item",
        action: "Add a star"
      },
      {
        name: "Delete",
        value: "delete",
        description: "Delete a star from an item",
        action: "Delete a star"
      },
      {
        name: "Get Many",
        value: "getAll",
        description: "Get many stars of autenticated user",
        action: "Get many stars"
      }
    ],
    default: "add"
  }
];
const starFields = [
  /* -------------------------------------------------------------------------- */
  /*                                star:add                                    */
  /* -------------------------------------------------------------------------- */
  {
    displayName: "Options",
    name: "options",
    type: "collection",
    displayOptions: {
      show: {
        operation: ["add"],
        resource: ["star"]
      }
    },
    default: {},
    description: "Options to set",
    placeholder: "Add option",
    options: [
      {
        displayName: "Channel Name or ID",
        name: "channelId",
        type: "options",
        typeOptions: {
          loadOptionsMethod: "getChannels"
        },
        default: "",
        description: 'Channel to add star to, or channel where the message to add star to was posted (used with timestamp). Choose from the list, or specify an ID using an <a href="https://docs.n8n.io/code/expressions/">expression</a>.'
      },
      {
        displayName: "File Comment",
        name: "fileComment",
        type: "string",
        default: "",
        description: "File comment to add star to"
      },
      {
        displayName: "File ID",
        name: "fileId",
        type: "string",
        default: "",
        description: "File to add star to"
      },
      {
        displayName: "Timestamp",
        name: "timestamp",
        type: "string",
        default: "",
        description: "Timestamp of the message to add star to"
      }
    ]
  },
  /* ----------------------------------------------------------------------- */
  /*                                 star:delete                             */
  /* ----------------------------------------------------------------------- */
  {
    displayName: "Options",
    name: "options",
    type: "collection",
    displayOptions: {
      show: {
        operation: ["delete"],
        resource: ["star"]
      }
    },
    default: {},
    description: "Options to set",
    placeholder: "Add option",
    options: [
      {
        displayName: "Channel Name or ID",
        name: "channelId",
        type: "options",
        typeOptions: {
          loadOptionsMethod: "getChannels"
        },
        default: "",
        description: 'Channel to add star to, or channel where the message to add star to was posted (used with timestamp). Choose from the list, or specify an ID using an <a href="https://docs.n8n.io/code/expressions/">expression</a>.'
      },
      {
        displayName: "File ID",
        name: "fileId",
        type: "string",
        default: "",
        description: "File to add star to"
      },
      {
        displayName: "File Comment",
        name: "fileComment",
        type: "string",
        default: "",
        description: "File comment to add star to"
      },
      {
        displayName: "Timestamp",
        name: "timestamp",
        type: "string",
        default: "",
        description: "Timestamp of the message to add star to"
      }
    ]
  },
  /* -------------------------------------------------------------------------- */
  /*                                 star:getAll                                */
  /* -------------------------------------------------------------------------- */
  {
    displayName: "Return All",
    name: "returnAll",
    type: "boolean",
    displayOptions: {
      show: {
        resource: ["star"],
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
        resource: ["star"],
        operation: ["getAll"],
        returnAll: [false]
      }
    },
    typeOptions: {
      minValue: 1,
      maxValue: 100
    },
    default: 50,
    description: "Max number of results to return"
  }
];
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  starFields,
  starOperations
});
//# sourceMappingURL=StarDescription.js.map