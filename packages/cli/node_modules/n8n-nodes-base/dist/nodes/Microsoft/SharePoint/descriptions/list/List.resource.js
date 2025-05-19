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
var List_resource_exports = {};
__export(List_resource_exports, {
  description: () => description
});
module.exports = __toCommonJS(List_resource_exports);
var get = __toESM(require("./get.operation"));
var getAll = __toESM(require("./getAll.operation"));
var import_utils = require("../../helpers/utils");
const description = [
  {
    displayName: "Operation",
    name: "operation",
    type: "options",
    noDataExpression: true,
    displayOptions: {
      show: {
        resource: ["list"]
      }
    },
    options: [
      {
        name: "Get",
        value: "get",
        description: "Retrieve details of a single list",
        routing: {
          request: {
            ignoreHttpStatusErrors: true,
            method: "GET",
            url: '=/sites/{{ $parameter["site"] }}/lists/{{ $parameter["list"] }}'
          },
          output: {
            postReceive: [import_utils.handleErrorPostReceive, import_utils.simplifyListPostReceive]
          }
        },
        action: "Get list"
      },
      {
        name: "Get Many",
        value: "getAll",
        description: "Retrieve a list of",
        routing: {
          request: {
            method: "GET",
            url: '=/sites/{{ $parameter["site"] }}/lists'
          },
          output: {
            postReceive: [
              import_utils.handleErrorPostReceive,
              {
                type: "rootProperty",
                properties: {
                  property: "value"
                }
              },
              import_utils.simplifyListPostReceive
            ]
          }
        },
        action: "Get many lists"
      }
    ],
    default: "getAll"
  },
  ...get.description,
  ...getAll.description
];
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  description
});
//# sourceMappingURL=List.resource.js.map