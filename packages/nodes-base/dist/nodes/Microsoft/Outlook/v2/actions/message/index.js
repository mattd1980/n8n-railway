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
  description: () => description,
  get: () => get,
  getAll: () => getAll,
  move: () => move,
  reply: () => reply,
  send: () => send,
  sendAndWait: () => sendAndWait,
  update: () => update
});
module.exports = __toCommonJS(message_exports);
var import_n8n_workflow = require("n8n-workflow");
var del = __toESM(require("./delete.operation"));
var get = __toESM(require("./get.operation"));
var getAll = __toESM(require("./getAll.operation"));
var move = __toESM(require("./move.operation"));
var reply = __toESM(require("./reply.operation"));
var send = __toESM(require("./send.operation"));
var sendAndWait = __toESM(require("./sendAndWait.operation"));
var update = __toESM(require("./update.operation"));
const description = [
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
        description: "Delete a message",
        action: "Delete a message"
      },
      {
        name: "Get",
        value: "get",
        description: "Retrieve a single message",
        action: "Get a message"
      },
      {
        name: "Get Many",
        value: "getAll",
        description: "List and search messages",
        action: "Get many messages"
      },
      {
        name: "Move",
        value: "move",
        description: "Move a message to a folder",
        action: "Move a message"
      },
      {
        name: "Reply",
        value: "reply",
        description: "Create a reply to a message",
        action: "Reply to a message"
      },
      {
        name: "Send",
        value: "send",
        description: "Send a message",
        action: "Send a message"
      },
      {
        name: "Send and Wait for Response",
        value: import_n8n_workflow.SEND_AND_WAIT_OPERATION,
        description: "Send a message and wait for response",
        action: "Send message and wait for response"
      },
      {
        name: "Update",
        value: "update",
        description: "Update a message",
        action: "Update a message"
      }
    ],
    default: "send"
  },
  ...del.description,
  ...get.description,
  ...getAll.description,
  ...move.description,
  ...reply.description,
  ...send.description,
  ...sendAndWait.description,
  ...update.description
];
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  delete: null,
  description,
  get,
  getAll,
  move,
  reply,
  send,
  sendAndWait,
  update
});
//# sourceMappingURL=index.js.map