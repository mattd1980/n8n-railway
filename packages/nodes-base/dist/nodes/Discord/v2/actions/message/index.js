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
  deleteMessage: () => deleteMessage,
  description: () => description,
  get: () => get,
  getAll: () => getAll,
  react: () => react,
  send: () => send,
  sendAndWait: () => sendAndWait
});
module.exports = __toCommonJS(message_exports);
var import_n8n_workflow = require("n8n-workflow");
var deleteMessage = __toESM(require("./deleteMessage.operation"));
var get = __toESM(require("./get.operation"));
var getAll = __toESM(require("./getAll.operation"));
var react = __toESM(require("./react.operation"));
var send = __toESM(require("./send.operation"));
var sendAndWait = __toESM(require("./sendAndWait.operation"));
var import_common = require("../common.description");
const description = [
  {
    displayName: "Operation",
    name: "operation",
    type: "options",
    noDataExpression: true,
    displayOptions: {
      show: {
        resource: ["message"],
        authentication: ["botToken", "oAuth2"]
      }
    },
    options: [
      {
        name: "Delete",
        value: "deleteMessage",
        description: "Delete a message in a channel",
        action: "Delete a message"
      },
      {
        name: "Get",
        value: "get",
        description: "Get a message in a channel",
        action: "Get a message"
      },
      {
        name: "Get Many",
        value: "getAll",
        description: "Retrieve the latest messages in a channel",
        action: "Get many messages"
      },
      {
        name: "React with Emoji",
        value: "react",
        description: "React to a message with an emoji",
        action: "React with an emoji to a message"
      },
      {
        name: "Send",
        value: "send",
        description: "Send a message to a channel, thread, or member",
        action: "Send a message"
      },
      {
        name: "Send and Wait for Response",
        value: import_n8n_workflow.SEND_AND_WAIT_OPERATION,
        description: "Send a message and wait for response",
        action: "Send message and wait for response"
      }
    ],
    default: "send"
  },
  {
    ...import_common.guildRLC,
    displayOptions: {
      show: {
        resource: ["message"],
        authentication: ["botToken", "oAuth2"]
      }
    }
  },
  ...getAll.description,
  ...react.description,
  ...send.description,
  ...deleteMessage.description,
  ...get.description,
  ...sendAndWait.description
];
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  deleteMessage,
  description,
  get,
  getAll,
  react,
  send,
  sendAndWait
});
//# sourceMappingURL=index.js.map