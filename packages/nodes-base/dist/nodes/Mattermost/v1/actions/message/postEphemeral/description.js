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
  messagePostEphemeralDescription: () => messagePostEphemeralDescription
});
module.exports = __toCommonJS(description_exports);
const messagePostEphemeralDescription = [
  {
    displayName: "User Name or ID",
    name: "userId",
    type: "options",
    typeOptions: {
      loadOptionsMethod: "getUsers"
    },
    options: [],
    default: "",
    required: true,
    displayOptions: {
      show: {
        operation: ["postEphemeral"],
        resource: ["message"]
      }
    },
    description: 'ID of the user to send the ephemeral message to. Choose from the list, or specify an ID using an <a href="https://docs.n8n.io/code/expressions/">expression</a>.'
  },
  {
    displayName: "Channel Name or ID",
    name: "channelId",
    type: "options",
    typeOptions: {
      loadOptionsMethod: "getChannels"
    },
    default: "",
    required: true,
    displayOptions: {
      show: {
        operation: ["postEphemeral"],
        resource: ["message"]
      }
    },
    description: 'ID of the channel to send the ephemeral message in. Choose from the list, or specify an ID using an <a href="https://docs.n8n.io/code/expressions/">expression</a>.'
  },
  {
    displayName: "Message",
    name: "message",
    type: "string",
    default: "",
    displayOptions: {
      show: {
        operation: ["postEphemeral"],
        resource: ["message"]
      }
    },
    description: "Text to send in the ephemeral message"
  }
];
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  messagePostEphemeralDescription
});
//# sourceMappingURL=description.js.map