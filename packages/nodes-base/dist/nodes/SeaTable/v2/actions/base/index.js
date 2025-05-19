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
var base_exports = {};
__export(base_exports, {
  collaborator: () => collaborator,
  descriptions: () => descriptions,
  metadata: () => metadata,
  snapshot: () => snapshot
});
module.exports = __toCommonJS(base_exports);
var collaborator = __toESM(require("./collaborator.operation"));
var metadata = __toESM(require("./metadata.operation"));
var snapshot = __toESM(require("./snapshot.operation"));
const descriptions = [
  {
    displayName: "Operation",
    name: "operation",
    type: "options",
    noDataExpression: true,
    displayOptions: {
      show: {
        resource: ["base"]
      }
    },
    options: [
      {
        name: "Snapshot",
        value: "snapshot",
        description: "Create a snapshot of the base",
        action: "Create a snapshot"
      },
      {
        name: "Metadata",
        value: "metadata",
        description: "Get the complete metadata of the base",
        action: "Get metadata of a base"
      },
      {
        name: "Collaborator",
        value: "collaborator",
        description: "Get the username from the email or name of a collaborator",
        action: "Get username from email or name"
      }
    ],
    default: "snapshot"
  },
  ...snapshot.description,
  ...metadata.description,
  ...collaborator.description
];
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  collaborator,
  descriptions,
  metadata,
  snapshot
});
//# sourceMappingURL=index.js.map