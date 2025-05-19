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
var description_exports = {};
__export(description_exports, {
  channelSearchDescription: () => channelSearchDescription
});
module.exports = __toCommonJS(description_exports);
const channelSearchDescription = [
  {
    displayName: "Team Name or ID",
    name: "teamId",
    type: "options",
    typeOptions: {
      loadOptionsMethod: "getTeams"
    },
    options: [],
    default: "",
    required: true,
    displayOptions: {
      show: {
        operation: ["search"],
        resource: ["channel"]
      }
    },
    description: 'The Mattermost Team. Choose from the list, or specify an ID using an <a href="https://docs.n8n.io/code/expressions/">expression</a>.'
  },
  {
    displayName: "Search Term",
    name: "term",
    type: "string",
    default: "",
    placeholder: "General",
    displayOptions: {
      show: {
        operation: ["search"],
        resource: ["channel"]
      }
    },
    required: true,
    description: "The search term for Channels in a Team"
  },
  {
    displayName: "Return All",
    name: "returnAll",
    type: "boolean",
    default: false,
    description: "Whether to return all results or only up to a given limit",
    displayOptions: {
      show: {
        operation: ["search"],
        resource: ["channel"]
      }
    }
  },
  {
    displayName: "Limit",
    name: "limit",
    type: "number",
    default: 100,
    description: "Max number of results to return",
    typeOptions: {
      minValue: 1,
      maxValue: 100
    },
    displayOptions: {
      show: {
        operation: ["search"],
        resource: ["channel"],
        returnAll: [false]
      }
    }
  }
];
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  channelSearchDescription
});
//# sourceMappingURL=description.js.map