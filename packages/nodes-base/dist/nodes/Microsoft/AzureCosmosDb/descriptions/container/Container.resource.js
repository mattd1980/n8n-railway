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
var Container_resource_exports = {};
__export(Container_resource_exports, {
  description: () => description
});
module.exports = __toCommonJS(Container_resource_exports);
var create = __toESM(require("./create.operation"));
var del = __toESM(require("./delete.operation"));
var get = __toESM(require("./get.operation"));
var getAll = __toESM(require("./getAll.operation"));
var import_errorHandler = require("../../helpers/errorHandler");
var import_utils = require("../../helpers/utils");
const description = [
  {
    displayName: "Operation",
    name: "operation",
    type: "options",
    noDataExpression: true,
    displayOptions: {
      show: {
        resource: ["container"]
      }
    },
    options: [
      {
        name: "Create",
        value: "create",
        description: "Create a container",
        routing: {
          request: {
            method: "POST",
            url: "/colls"
          },
          output: {
            postReceive: [import_errorHandler.handleError]
          }
        },
        action: "Create container"
      },
      {
        name: "Delete",
        value: "delete",
        description: "Delete a container",
        routing: {
          request: {
            method: "DELETE",
            url: '=/colls/{{ $parameter["container"] }}'
          },
          output: {
            postReceive: [
              import_errorHandler.handleError,
              {
                type: "set",
                properties: {
                  value: '={{ { "deleted": true } }}'
                }
              }
            ]
          }
        },
        action: "Delete container"
      },
      {
        name: "Get",
        value: "get",
        description: "Retrieve a container",
        routing: {
          request: {
            method: "GET",
            url: '=/colls/{{ $parameter["container"] }}'
          },
          output: {
            postReceive: [import_errorHandler.handleError, import_utils.simplifyData]
          }
        },
        action: "Get container"
      },
      {
        name: "Get Many",
        value: "getAll",
        description: "Retrieve a list of containers",
        routing: {
          request: {
            method: "GET",
            url: "/colls"
          },
          output: {
            postReceive: [
              import_errorHandler.handleError,
              {
                type: "rootProperty",
                properties: {
                  property: "DocumentCollections"
                }
              },
              import_utils.simplifyData
            ]
          }
        },
        action: "Get many containers"
      }
    ],
    default: "getAll"
  },
  ...create.description,
  ...del.description,
  ...get.description,
  ...getAll.description
];
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  description
});
//# sourceMappingURL=Container.resource.js.map