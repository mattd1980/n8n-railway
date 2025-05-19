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
var alert_exports = {};
__export(alert_exports, {
  create: () => create,
  deleteAlert: () => deleteAlert,
  description: () => description,
  executeResponder: () => executeResponder,
  get: () => get,
  merge: () => merge,
  promote: () => promote,
  search: () => search,
  status: () => status,
  update: () => update
});
module.exports = __toCommonJS(alert_exports);
var create = __toESM(require("./create.operation"));
var deleteAlert = __toESM(require("./deleteAlert.operation"));
var executeResponder = __toESM(require("./executeResponder.operation"));
var get = __toESM(require("./get.operation"));
var merge = __toESM(require("./merge.operation"));
var promote = __toESM(require("./promote.operation"));
var search = __toESM(require("./search.operation"));
var status = __toESM(require("./status.operation"));
var update = __toESM(require("./update.operation"));
const description = [
  {
    displayName: "Operation",
    name: "operation",
    type: "options",
    noDataExpression: true,
    required: true,
    options: [
      {
        name: "Create",
        value: "create",
        action: "Create an alert"
      },
      {
        name: "Delete",
        value: "deleteAlert",
        action: "Delete an alert"
      },
      {
        name: "Execute Responder",
        value: "executeResponder",
        action: "Execute responder on an alert"
      },
      {
        name: "Get",
        value: "get",
        action: "Get an alert"
      },
      {
        name: "Merge Into Case",
        value: "merge",
        action: "Merge an alert into a case"
      },
      {
        name: "Promote to Case",
        value: "promote",
        action: "Promote an alert to a case"
      },
      {
        name: "Search",
        value: "search",
        action: "Search alerts"
      },
      {
        name: "Update",
        value: "update",
        action: "Update an alert"
      },
      {
        name: "Update Status",
        value: "status",
        action: "Update an alert status"
      }
    ],
    displayOptions: {
      show: {
        resource: ["alert"]
      }
    },
    default: "create"
  },
  ...create.description,
  ...deleteAlert.description,
  ...executeResponder.description,
  ...get.description,
  ...search.description,
  ...status.description,
  ...merge.description,
  ...promote.description,
  ...update.description
];
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  create,
  deleteAlert,
  description,
  executeResponder,
  get,
  merge,
  promote,
  search,
  status,
  update
});
//# sourceMappingURL=index.js.map