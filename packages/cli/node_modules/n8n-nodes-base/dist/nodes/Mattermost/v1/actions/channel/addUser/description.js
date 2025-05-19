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
  channelAddUserDescription: () => channelAddUserDescription
});
module.exports = __toCommonJS(description_exports);
const channelAddUserDescription = [
  {
    displayName: "Channel Name or ID",
    name: "channelId",
    type: "options",
    typeOptions: {
      loadOptionsMethod: "getChannels"
    },
    options: [],
    default: "",
    required: true,
    displayOptions: {
      show: {
        operation: ["addUser"],
        resource: ["channel"]
      }
    },
    description: 'The ID of the channel to invite user to. Choose from the list, or specify an ID using an <a href="https://docs.n8n.io/code/expressions/">expression</a>.'
  },
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
        operation: ["addUser"],
        resource: ["channel"]
      }
    },
    description: 'The ID of the user to invite into channel. Choose from the list, or specify an ID using an <a href="https://docs.n8n.io/code/expressions/">expression</a>.'
  }
];
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  channelAddUserDescription
});
//# sourceMappingURL=description.js.map