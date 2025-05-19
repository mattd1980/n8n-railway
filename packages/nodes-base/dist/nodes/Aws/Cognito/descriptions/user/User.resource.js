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
          send: {
            preSend: [import_utils.preSendUserFields]
          },
          request: {
            method: "POST",
            headers: {
              "X-Amz-Target": "AWSCognitoIdentityProviderService.AdminAddUserToGroup"
            },
            ignoreHttpStatusErrors: true
          },
          output: {
            postReceive: [
              import_errorHandler.handleError,
              {
                type: "set",
                properties: {
                  value: '={{ { "addedToGroup": true } }}'
                }
              }
            ]
          }
        }
      },
      {
        name: "Create",
        value: "create",
        description: "Create a new user",
        action: "Create user",
        routing: {
          send: {
            preSend: [import_utils.preSendUserFields]
          },
          request: {
            method: "POST",
            headers: {
              "X-Amz-Target": "AWSCognitoIdentityProviderService.AdminCreateUser"
            },
            ignoreHttpStatusErrors: true
          },
          output: {
            postReceive: [
              import_errorHandler.handleError,
              {
                type: "rootProperty",
                properties: {
                  property: "User"
                }
              }
            ]
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
            preSend: [import_utils.preSendUserFields]
          },
          request: {
            method: "POST",
            headers: {
              "X-Amz-Target": "AWSCognitoIdentityProviderService.AdminDeleteUser"
            },
            ignoreHttpStatusErrors: true
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
        }
      },
      {
        name: "Get",
        value: "get",
        description: "Retrieve information of an existing user",
        action: "Get user",
        routing: {
          send: {
            preSend: [import_utils.preSendUserFields]
          },
          request: {
            method: "POST",
            headers: {
              "X-Amz-Target": "AWSCognitoIdentityProviderService.AdminGetUser"
            },
            ignoreHttpStatusErrors: true
          },
          output: {
            postReceive: [import_errorHandler.handleError, import_utils.simplifyUser]
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
            headers: {
              "X-Amz-Target": "AWSCognitoIdentityProviderService.ListUsers"
            },
            ignoreHttpStatusErrors: true
          },
          output: {
            postReceive: [
              import_errorHandler.handleError,
              import_utils.simplifyUser,
              {
                type: "rootProperty",
                properties: {
                  property: "Users"
                }
              }
            ]
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
          send: {
            preSend: [import_utils.preSendUserFields]
          },
          request: {
            method: "POST",
            headers: {
              "X-Amz-Target": "AWSCognitoIdentityProviderService.AdminRemoveUserFromGroup"
            },
            ignoreHttpStatusErrors: true
          },
          output: {
            postReceive: [
              import_errorHandler.handleError,
              {
                type: "set",
                properties: {
                  value: '={{ { "removedFromGroup": true } }}'
                }
              }
            ]
          }
        }
      },
      {
        name: "Update",
        value: "update",
        description: "Update an existing user",
        action: "Update user",
        routing: {
          send: {
            preSend: [import_utils.preSendUserFields]
          },
          request: {
            method: "POST",
            headers: {
              "X-Amz-Target": "AWSCognitoIdentityProviderService.AdminUpdateUserAttributes"
            },
            ignoreHttpStatusErrors: true
          },
          output: {
            postReceive: [
              import_errorHandler.handleError,
              {
                type: "set",
                properties: {
                  value: '={{ { "updated": true } }}'
                }
              }
            ]
          }
        }
      }
    ]
  },
  ...create.description,
  ...del.description,
  ...get.description,
  ...getAll.description,
  ...update.description,
  ...addToGroup.description,
  ...removeFromGroup.description
];
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  description
});
//# sourceMappingURL=User.resource.js.map