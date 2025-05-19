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
var Item_resource_exports = {};
__export(Item_resource_exports, {
  description: () => description
});
module.exports = __toCommonJS(Item_resource_exports);
var create = __toESM(require("./create.operation"));
var del = __toESM(require("./delete.operation"));
var get = __toESM(require("./get.operation"));
var getAll = __toESM(require("./getAll.operation"));
var query = __toESM(require("./query.operation"));
var update = __toESM(require("./update.operation"));
var import_constants = require("../../helpers/constants");
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
        resource: ["item"]
      }
    },
    options: [
      {
        name: "Create",
        value: "create",
        description: "Create a new item",
        routing: {
          send: {
            preSend: [import_utils.validatePartitionKey]
          },
          request: {
            method: "POST",
            url: '=/colls/{{ $parameter["container"] }}/docs',
            headers: {
              [import_constants.HeaderConstants.X_MS_DOCUMENTDB_IS_UPSERT]: "True"
            }
          },
          output: {
            postReceive: [import_errorHandler.handleError]
          }
        },
        action: "Create item"
      },
      {
        name: "Delete",
        value: "delete",
        description: "Delete an existing item",
        routing: {
          send: {
            preSend: [import_utils.validatePartitionKey]
          },
          request: {
            method: "DELETE",
            url: '=/colls/{{ $parameter["container"] }}/docs/{{ $parameter["item"] }}'
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
        action: "Delete item"
      },
      {
        name: "Get",
        value: "get",
        description: "Retrieve an item",
        routing: {
          send: {
            preSend: [import_utils.validatePartitionKey]
          },
          request: {
            method: "GET",
            url: '=/colls/{{ $parameter["container"]}}/docs/{{$parameter["item"]}}',
            headers: {
              [import_constants.HeaderConstants.X_MS_DOCUMENTDB_IS_UPSERT]: "True"
            }
          },
          output: {
            postReceive: [import_errorHandler.handleError, import_utils.simplifyData]
          }
        },
        action: "Get item"
      },
      {
        name: "Get Many",
        value: "getAll",
        description: "Retrieve a list of items",
        routing: {
          request: {
            method: "GET",
            url: '=/colls/{{ $parameter["container"] }}/docs'
          },
          output: {
            postReceive: [
              import_errorHandler.handleError,
              {
                type: "rootProperty",
                properties: {
                  property: "Documents"
                }
              },
              import_utils.simplifyData
            ]
          }
        },
        action: "Get many items"
      },
      {
        name: "Execute Query",
        value: "query",
        routing: {
          request: {
            method: "POST",
            url: '=/colls/{{ $parameter["container"] }}/docs',
            headers: {
              "Content-Type": "application/query+json",
              "x-ms-documentdb-isquery": "True",
              "x-ms-documentdb-query-enablecrosspartition": "True"
            }
          },
          output: {
            postReceive: [
              import_errorHandler.handleError,
              {
                type: "rootProperty",
                properties: {
                  property: "Documents"
                }
              },
              import_utils.simplifyData
            ]
          }
        },
        action: "Query items"
      },
      {
        name: "Update",
        value: "update",
        description: "Update an existing item",
        routing: {
          send: {
            preSend: [import_utils.validatePartitionKey]
          },
          request: {
            method: "PUT",
            url: '=/colls/{{ $parameter["container"] }}/docs/{{ $parameter["item"] }}',
            headers: {
              "Content-Type": "application/json-patch+json"
            }
          },
          output: {
            postReceive: [import_errorHandler.handleError]
          }
        },
        action: "Update item"
      }
    ],
    default: "getAll"
  },
  ...create.description,
  ...del.description,
  ...get.description,
  ...getAll.description,
  ...query.description,
  ...update.description
];
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  description
});
//# sourceMappingURL=Item.resource.js.map