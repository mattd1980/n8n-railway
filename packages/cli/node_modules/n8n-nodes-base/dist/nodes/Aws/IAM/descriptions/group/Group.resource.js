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
var Group_resource_exports = {};
__export(Group_resource_exports, {
  description: () => description
});
module.exports = __toCommonJS(Group_resource_exports);
var create = __toESM(require("./create.operation"));
var del = __toESM(require("./delete.operation"));
var get = __toESM(require("./get.operation"));
var getAll = __toESM(require("./getAll.operation"));
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
    default: "getAll",
    displayOptions: {
      show: {
        resource: ["group"]
      }
    },
    options: [
      {
        name: "Create",
        value: "create",
        action: "Create group",
        description: "Create a new group",
        routing: {
          request: {
            method: "POST",
            url: "",
            body: {
              Action: "CreateGroup",
              Version: import_constants.CURRENT_VERSION,
              GroupName: '={{ $parameter["groupName"] }}'
            },
            ignoreHttpStatusErrors: true
          },
          output: {
            postReceive: [import_errorHandler.handleError]
          }
        }
      },
      {
        name: "Delete",
        value: "delete",
        action: "Delete group",
        description: "Delete an existing group",
        routing: {
          send: {
            preSend: [import_utils.deleteGroupMembers]
          },
          request: {
            method: "POST",
            url: "",
            body: {
              Action: "DeleteGroup",
              Version: import_constants.CURRENT_VERSION,
              GroupName: '={{ $parameter["group"] }}'
            },
            ignoreHttpStatusErrors: true
          },
          output: {
            postReceive: [import_errorHandler.handleError]
          }
        }
      },
      {
        name: "Get",
        value: "get",
        action: "Get group",
        description: "Retrieve details of an existing group",
        routing: {
          request: {
            method: "POST",
            url: "",
            body: {
              Action: "GetGroup",
              Version: import_constants.CURRENT_VERSION,
              GroupName: '={{ $parameter["group"] }}'
            },
            ignoreHttpStatusErrors: true
          },
          output: {
            postReceive: [import_errorHandler.handleError, import_utils.simplifyGetGroupsResponse]
          }
        }
      },
      {
        name: "Get Many",
        value: "getAll",
        action: "Get many groups",
        description: "Retrieve a list of groups",
        routing: {
          request: {
            method: "POST",
            url: "",
            body: {
              Action: "ListGroups",
              Version: import_constants.CURRENT_VERSION
            },
            ignoreHttpStatusErrors: true
          },
          output: {
            postReceive: [import_errorHandler.handleError, import_utils.simplifyGetAllGroupsResponse]
          }
        }
      },
      {
        name: "Update",
        value: "update",
        action: "Update group",
        description: "Update an existing group",
        routing: {
          request: {
            method: "POST",
            url: "",
            body: {
              Action: "UpdateGroup",
              Version: import_constants.CURRENT_VERSION,
              GroupName: '={{ $parameter["group"] }}',
              NewGroupName: '={{ $parameter["groupName"] }}'
            },
            ignoreHttpStatusErrors: true
          },
          output: {
            postReceive: [import_errorHandler.handleError]
          }
        }
      }
    ]
  },
  ...create.description,
  ...del.description,
  ...get.description,
  ...getAll.description,
  ...update.description
];
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  description
});
//# sourceMappingURL=Group.resource.js.map