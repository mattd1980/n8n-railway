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
  channelCreateDescription: () => channelCreateDescription
});
module.exports = __toCommonJS(description_exports);
const channelCreateDescription = [
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
        operation: ["create"],
        resource: ["channel"]
      }
    },
    description: 'The Mattermost Team. Choose from the list, or specify an ID using an <a href="https://docs.n8n.io/code/expressions/">expression</a>.'
  },
  {
    displayName: "Display Name",
    name: "displayName",
    type: "string",
    default: "",
    placeholder: "Announcements",
    displayOptions: {
      show: {
        operation: ["create"],
        resource: ["channel"]
      }
    },
    required: true,
    description: "The non-unique UI name for the channel"
  },
  {
    displayName: "Name",
    name: "channel",
    type: "string",
    default: "",
    placeholder: "announcements",
    displayOptions: {
      show: {
        operation: ["create"],
        resource: ["channel"]
      }
    },
    required: true,
    description: "The unique handle for the channel, will be present in the channel URL"
  },
  {
    displayName: "Type",
    name: "type",
    type: "options",
    displayOptions: {
      show: {
        operation: ["create"],
        resource: ["channel"]
      }
    },
    options: [
      {
        name: "Private",
        value: "private"
      },
      {
        name: "Public",
        value: "public"
      }
    ],
    default: "public",
    description: "The type of channel to create"
  }
];
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  channelCreateDescription
});
//# sourceMappingURL=description.js.map