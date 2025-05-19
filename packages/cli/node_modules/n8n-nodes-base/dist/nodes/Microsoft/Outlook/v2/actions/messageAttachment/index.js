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
var messageAttachment_exports = {};
__export(messageAttachment_exports, {
  add: () => add,
  description: () => description,
  download: () => download,
  get: () => get,
  getAll: () => getAll
});
module.exports = __toCommonJS(messageAttachment_exports);
var add = __toESM(require("./add.operation"));
var download = __toESM(require("./download.operation"));
var get = __toESM(require("./get.operation"));
var getAll = __toESM(require("./getAll.operation"));
const description = [
  {
    displayName: "Operation",
    name: "operation",
    type: "options",
    noDataExpression: true,
    displayOptions: {
      show: {
        resource: ["messageAttachment"]
      }
    },
    options: [
      {
        name: "Add",
        value: "add",
        description: "Add an attachment to a message",
        action: "Add an attachment"
      },
      {
        name: "Download",
        value: "download",
        description: "Download an attachment from a message",
        action: "Download an attachment"
      },
      {
        name: "Get",
        value: "get",
        description: "Retrieve information about an attachment of a message",
        action: "Get an attachment"
      },
      {
        name: "Get Many",
        value: "getAll",
        description: "Retrieve information about the attachments of a message",
        action: "Get many attachments"
      }
    ],
    default: "add"
  },
  ...add.description,
  ...download.description,
  ...get.description,
  ...getAll.description
];
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  add,
  description,
  download,
  get,
  getAll
});
//# sourceMappingURL=index.js.map