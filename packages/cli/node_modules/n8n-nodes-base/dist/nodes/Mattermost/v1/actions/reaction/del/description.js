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
  reactionDeleteDescription: () => reactionDeleteDescription
});
module.exports = __toCommonJS(description_exports);
const reactionDeleteDescription = [
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
        resource: ["reaction"],
        operation: ["delete"]
      }
    },
    description: 'ID of the user whose reaction to delete. Choose from the list, or specify an ID using an <a href="https://docs.n8n.io/code/expressions/">expression</a>.'
  },
  {
    displayName: "Post ID",
    name: "postId",
    type: "string",
    default: "",
    placeholder: "3moacfqxmbdw38r38fjprh6zsr",
    required: true,
    displayOptions: {
      show: {
        resource: ["reaction"],
        operation: ["delete"]
      }
    },
    description: "ID of the post whose reaction to delete. Obtainable from the post link: <code>https://mattermost.internal.n8n.io/[server]/pl/[postId]</code>"
  },
  {
    displayName: "Emoji Name",
    name: "emojiName",
    type: "string",
    default: "",
    required: true,
    displayOptions: {
      show: {
        resource: ["reaction"],
        operation: ["delete"]
      }
    },
    description: "Name of the emoji to delete"
  }
];
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  reactionDeleteDescription
});
//# sourceMappingURL=description.js.map