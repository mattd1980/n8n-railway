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
var ReactionDescription_exports = {};
__export(ReactionDescription_exports, {
  reactionFields: () => reactionFields,
  reactionOperations: () => reactionOperations
});
module.exports = __toCommonJS(ReactionDescription_exports);
const reactionOperations = [
  {
    displayName: "Operation",
    name: "operation",
    type: "options",
    noDataExpression: true,
    displayOptions: {
      show: {
        resource: ["reaction"]
      }
    },
    options: [
      {
        name: "Add",
        value: "add",
        description: "Adds a reaction to a message",
        action: "Add a reaction"
      },
      {
        name: "Get",
        value: "get",
        description: "Get the reactions of a message",
        action: "Get a reaction"
      },
      {
        name: "Remove",
        value: "remove",
        description: "Remove a reaction of a message",
        action: "Remove a reaction"
      }
    ],
    default: "add"
  }
];
const reactionFields = [
  {
    displayName: "Channel Name or ID",
    name: "channelId",
    type: "options",
    typeOptions: {
      loadOptionsMethod: "getChannels"
    },
    required: true,
    default: "",
    displayOptions: {
      show: {
        resource: ["reaction"],
        operation: ["add", "get", "remove"]
      }
    },
    description: 'Channel containing the message. Choose from the list, or specify an ID using an <a href="https://docs.n8n.io/code/expressions/">expression</a>.'
  },
  {
    displayName: "Emoji",
    name: "name",
    type: "string",
    required: true,
    default: "",
    displayOptions: {
      show: {
        resource: ["reaction"],
        operation: ["add", "remove"]
      }
    },
    description: "Name of emoji",
    placeholder: "+1"
  },
  {
    displayName: "Timestamp",
    name: "timestamp",
    type: "string",
    required: true,
    default: "",
    displayOptions: {
      show: {
        resource: ["reaction"],
        operation: ["add", "get", "remove"]
      }
    },
    description: "Timestamp of the message"
  }
];
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  reactionFields,
  reactionOperations
});
//# sourceMappingURL=ReactionDescription.js.map