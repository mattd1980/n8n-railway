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
var User_resource_exports = {};
__export(User_resource_exports, {
  description: () => description
});
module.exports = __toCommonJS(User_resource_exports);
var addToGroup = __toESM(require("./addToGroup.operation"));
var create = __toESM(require("./create.operation"));
var del = __toESM(require("./delete.operation"));
var get = __toESM(require("./get.operation"));
var getAll = __toESM(require("./getAll.operation"));
var removeFromGroup = __toESM(require("./removeFromGroup.operation"));
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
        resource: ["user"]
      }
    },
    options: [
      {
        name: "Add to Group",
        value: "addToGroup",
        description: "Add an existing user to a group",
        action: "Add user to group",
        routing: {
          request: {
            method: "POST",
            url: "",
            body: {
              Action: "AddUserToGroup",
              Version: import_constants.CURRENT_VERSION,
              UserName: '={{ $parameter["user"] }}',
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
        name: "Create",
        value: "create",
        description: "Create a new user",
        action: "Create user",
        routing: {
          request: {
            method: "POST",
            url: "",
            body: {
              Action: "CreateUser",
              Version: import_constants.CURRENT_VERSION,
              UserName: '={{ $parameter["userName"] }}'
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
        description: "Delete a user",
        action: "Delete user",
        routing: {
          send: {
            preSend: [import_utils.removeUserFromGroups]
          },
          request: {
            method: "POST",
            url: "",
            body: {
              Action: "DeleteUser",
              Version: import_constants.CURRENT_VERSION,
              UserName: '={{ $parameter["user"] }}'
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
        description: "Retrieve a user",
        action: "Get user",
        routing: {
          request: {
            method: "POST",
            url: "",
            body: {
              Action: "GetUser",
              Version: import_constants.CURRENT_VERSION,
              UserName: '={{ $parameter["user"] }}'
            },
            ignoreHttpStatusErrors: true
          },
          output: {
            postReceive: [
              {
                type: "rootProperty",
                properties: {
                  property: "GetUserResponse.GetUserResult.User"
                }
              },
              import_errorHandler.handleError
            ]
          }
        }
      },
      {
        name: "Get Many",
        value: "getAll",
        description: "Retrieve a list of users",
        routing: {
          request: {
            method: "POST",
            url: "",
            body: {
              Action: "ListUsers",
              Version: import_constants.CURRENT_VERSION
            },
            ignoreHttpStatusErrors: true
          },
          output: {
            postReceive: [import_errorHandler.handleError, import_utils.simplifyGetAllUsersResponse]
          }
        },
        action: "Get many users"
      },
      {
        name: "Remove From Group",
        value: "removeFromGroup",
        description: "Remove a user from a group",
        action: "Remove user from group",
        routing: {
          request: {
            method: "POST",
            url: "",
            body: {
              Action: "RemoveUserFromGroup",
              Version: import_constants.CURRENT_VERSION,
              UserName: '={{ $parameter["user"] }}',
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
        name: "Update",
        value: "update",
        description: "Update a user",
        action: "Update user",
        routing: {
          request: {
            method: "POST",
            url: "",
            body: {
              Action: "UpdateUser",
              Version: import_constants.CURRENT_VERSION,
              NewUserName: '={{ $parameter["userName"] }}',
              UserName: '={{ $parameter["user"] }}'
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
  ...addToGroup.description,
  ...create.description,
  ...del.description,
  ...get.description,
  ...getAll.description,
  ...update.description,
  ...removeFromGroup.description
];
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  description
});
//# sourceMappingURL=User.resource.js.map