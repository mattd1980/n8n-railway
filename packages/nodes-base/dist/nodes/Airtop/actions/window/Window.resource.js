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
var Window_resource_exports = {};
__export(Window_resource_exports, {
  close: () => close,
  create: () => create,
  description: () => description,
  load: () => load,
  takeScreenshot: () => takeScreenshot
});
module.exports = __toCommonJS(Window_resource_exports);
var close = __toESM(require("./close.operation"));
var create = __toESM(require("./create.operation"));
var load = __toESM(require("./load.operation"));
var takeScreenshot = __toESM(require("./takeScreenshot.operation"));
var import_fields = require("../common/fields");
const description = [
  {
    displayName: "Operation",
    name: "operation",
    type: "options",
    noDataExpression: true,
    typeOptions: {
      sortable: false
    },
    displayOptions: {
      show: {
        resource: ["window"]
      }
    },
    options: [
      {
        name: "Create a New Browser Window",
        value: "create",
        description: "Create a new browser window inside a session. Can load a URL when created.",
        action: "Create a window"
      },
      {
        name: "Load URL",
        value: "load",
        description: "Load a URL in an existing window",
        action: "Load a page"
      },
      {
        name: "Take Screenshot",
        value: "takeScreenshot",
        description: "Take a screenshot of the current window",
        action: "Take screenshot"
      },
      {
        name: "Close Window",
        value: "close",
        description: "Close a window inside a session",
        action: "Close a window"
      }
    ],
    default: "create"
  },
  {
    ...import_fields.sessionIdField,
    displayOptions: {
      show: {
        resource: ["window"]
      }
    }
  },
  {
    ...import_fields.windowIdField,
    displayOptions: {
      show: {
        resource: ["window"],
        operation: ["close", "takeScreenshot", "load"]
      }
    }
  },
  ...create.description,
  ...load.description
];
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  close,
  create,
  description,
  load,
  takeScreenshot
});
//# sourceMappingURL=Window.resource.js.map