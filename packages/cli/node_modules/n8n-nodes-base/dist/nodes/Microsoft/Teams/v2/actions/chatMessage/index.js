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
var chatMessage_exports = {};
__export(chatMessage_exports, {
  create: () => create,
  description: () => description,
  get: () => get,
  getAll: () => getAll,
  sendAndWait: () => sendAndWait
});
module.exports = __toCommonJS(chatMessage_exports);
var import_n8n_workflow = require("n8n-workflow");
var create = __toESM(require("./create.operation"));
var get = __toESM(require("./get.operation"));
var getAll = __toESM(require("./getAll.operation"));
var sendAndWait = __toESM(require("./sendAndWait.operation"));
const description = [
  {
    displayName: "Operation",
    name: "operation",
    type: "options",
    noDataExpression: true,
    displayOptions: {
      show: {
        resource: ["chatMessage"]
      }
    },
    options: [
      {
        name: "Create",
        value: "create",
        description: "Create a message in a chat",
        action: "Create chat message"
      },
      {
        name: "Get",
        value: "get",
        description: "Get a message from a chat",
        action: "Get chat message"
      },
      {
        name: "Get Many",
        value: "getAll",
        description: "Get many messages from a chat",
        action: "Get many chat messages"
      },
      {
        name: "Send and Wait for Response",
        value: import_n8n_workflow.SEND_AND_WAIT_OPERATION,
        description: "Send a message and wait for response",
        action: "Send message and wait for response"
      }
    ],
    default: "create"
  },
  ...create.description,
  ...get.description,
  ...getAll.description,
  ...sendAndWait.description
];
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  create,
  description,
  get,
  getAll,
  sendAndWait
});
//# sourceMappingURL=index.js.map