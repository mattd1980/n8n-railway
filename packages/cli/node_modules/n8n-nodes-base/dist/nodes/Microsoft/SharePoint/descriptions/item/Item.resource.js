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
var update = __toESM(require("./update.operation"));
var upsert = __toESM(require("./upsert.operation"));
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
        description: "Create an item in an existing list",
        routing: {
          request: {
            method: "POST",
            url: '=/sites/{{ $parameter["site"] }}/lists/{{ $parameter["list"] }}/items'
          },
          output: {
            postReceive: [import_utils.handleErrorPostReceive]
          }
        },
        action: "Create item in a list"
      },
      {
        name: "Create or Update",
        value: "upsert",
        description: "Create a new record, or update the current one if it already exists (upsert)",
        routing: {
          request: {
            method: "POST",
            url: '=/sites/{{ $parameter["site"] }}/lists/{{ $parameter["list"] }}/items'
          },
          output: {
            postReceive: [import_utils.handleErrorPostReceive]
          }
        },
        action: "Create or update item (upsert)"
      },
      {
        name: "Delete",
        value: "delete",
        description: "Delete an item from a list",
        routing: {
          request: {
            method: "DELETE",
            url: '=/sites/{{ $parameter["site"] }}/lists/{{ $parameter["list"] }}/items/{{ $parameter["item"] }}'
          },
          output: {
            postReceive: [
              import_utils.handleErrorPostReceive,
              {
                type: "set",
                properties: {
                  value: '={{ { "deleted": true } }}'
                }
              }
            ]
          }
        },
        action: "Delete an item"
      },
      {
        name: "Get",
        value: "get",
        description: "Retrieve an item from a list",
        routing: {
          request: {
            ignoreHttpStatusErrors: true,
            method: "GET",
            url: '=/sites/{{ $parameter["site"] }}/lists/{{ $parameter["list"] }}/items/{{ $parameter["item"] }}'
          },
          output: {
            postReceive: [import_utils.handleErrorPostReceive, import_utils.simplifyItemPostReceive]
          }
        },
        action: "Get an item"
      },
      {
        name: "Get Many",
        value: "getAll",
        description: "Get specific items in a list or list many items",
        routing: {
          request: {
            method: "GET",
            url: '=/sites/{{ $parameter["site"] }}/lists/{{ $parameter["list"] }}/items'
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
              import_utils.simplifyItemPostReceive
            ]
          }
        },
        action: "Get many items"
      },
      {
        name: "Update",
        value: "update",
        description: "Update an item in an existing list",
        routing: {
          request: {
            method: "PATCH",
            url: '=/sites/{{ $parameter["site"] }}/lists/{{ $parameter["list"] }}/items'
          },
          output: {
            postReceive: [import_utils.handleErrorPostReceive]
          }
        },
        action: "Update item in a list"
      }
    ],
    default: "getAll"
  },
  ...create.description,
  ...del.description,
  ...get.description,
  ...getAll.description,
  ...update.description,
  ...upsert.description
];
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  description
});
//# sourceMappingURL=Item.resource.js.map