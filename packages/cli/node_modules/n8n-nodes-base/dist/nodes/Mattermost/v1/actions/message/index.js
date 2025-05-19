"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
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
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);
var message_exports = {};
__export(message_exports, {
  delete: () => del,
  descriptions: () => descriptions,
  post: () => post,
  postEphemeral: () => postEphemeral
});
module.exports = __toCommonJS(message_exports);
var del = __toESM(require("./del"));
var post = __toESM(require("./post"));
var postEphemeral = __toESM(require("./postEphemeral"));
const descriptions = [
  {
    displayName: "Operation",
    name: "operation",
    type: "options",
    noDataExpression: true,
    displayOptions: {
      show: {
        resource: ["message"]
      }
    },
    options: [
      {
        name: "Delete",
        value: "delete",
        description: "Soft delete a post, by marking the post as deleted in the database",
        action: "Delete a message"
      },
      {
        name: "Post",
        value: "post",
        description: "Post a message into a channel",
        action: "Post a message"
      },
      {
        name: "Post Ephemeral",
        value: "postEphemeral",
        description: "Post an ephemeral message into a channel",
        action: "Post an ephemeral message"
      }
    ],
    default: "post"
  },
  ...del.description,
  ...post.description,
  ...postEphemeral.description
];
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  delete: null,
  descriptions,
  post,
  postEphemeral
});
//# sourceMappingURL=index.js.map