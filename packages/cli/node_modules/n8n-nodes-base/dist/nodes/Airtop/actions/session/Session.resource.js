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
var Session_resource_exports = {};
__export(Session_resource_exports, {
  create: () => create,
  description: () => description,
  save: () => save,
  terminate: () => terminate
});
module.exports = __toCommonJS(Session_resource_exports);
var create = __toESM(require("./create.operation"));
var save = __toESM(require("./save.operation"));
var terminate = __toESM(require("./terminate.operation"));
const description = [
  {
    displayName: "Operation",
    name: "operation",
    type: "options",
    noDataExpression: true,
    displayOptions: {
      show: {
        resource: ["session"]
      }
    },
    options: [
      {
        name: "Create Session",
        value: "create",
        description: "Create an Airtop browser session",
        action: "Create a session"
      },
      {
        name: "Save Profile on Termination",
        value: "save",
        description: "Save in a profile changes made in your browsing session such as cookies and local storage",
        action: "Save a profile on session termination"
      },
      {
        name: "Terminate Session",
        value: "terminate",
        description: "Terminate a session",
        action: "Terminate a session"
      }
    ],
    default: "create"
  },
  ...create.description,
  ...save.description,
  ...terminate.description
];
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  create,
  description,
  save,
  terminate
});
//# sourceMappingURL=Session.resource.js.map