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
var BinDescription_exports = {};
__export(BinDescription_exports, {
  binFields: () => binFields,
  binOperations: () => binOperations
});
module.exports = __toCommonJS(BinDescription_exports);
var import_GenericFunctions = require("./GenericFunctions");
const binOperations = [
  {
    displayName: "Operation",
    name: "operation",
    type: "options",
    noDataExpression: true,
    displayOptions: {
      show: {
        resource: ["bin"]
      }
    },
    options: [
      {
        name: "Create",
        value: "create",
        description: "Create bin",
        routing: {
          request: {
            method: "POST",
            url: "/api/bin"
          },
          output: {
            postReceive: [import_GenericFunctions.transformBinResponse]
          }
        },
        action: "Create a bin"
      },
      {
        name: "Get",
        value: "get",
        description: "Get a bin",
        routing: {
          request: {
            method: "GET"
          },
          output: {
            postReceive: [import_GenericFunctions.transformBinResponse]
          },
          send: {
            preSend: [
              // Parse binId before sending to make sure it's in the right format
              import_GenericFunctions.buildBinAPIURL
            ]
          }
        },
        action: "Get a bin"
      },
      {
        name: "Delete",
        value: "delete",
        description: "Delete a bin",
        routing: {
          request: {
            method: "DELETE"
          },
          send: {
            preSend: [
              // Parse binId before sending to make sure it's in the right format
              import_GenericFunctions.buildBinAPIURL
            ]
          }
        },
        action: "Delete a bin"
      }
    ],
    default: "create"
  }
];
const binFields = [
  {
    displayName: "Bin ID",
    name: "binId",
    type: "string",
    default: "",
    required: true,
    displayOptions: {
      show: {
        resource: ["bin"],
        operation: ["get", "delete"]
      }
    },
    description: "Unique identifier for each bin"
  }
];
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  binFields,
  binOperations
});
//# sourceMappingURL=BinDescription.js.map