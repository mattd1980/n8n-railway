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
var common_exports = {};
__export(common_exports, {
  groupLocator: () => groupLocator,
  groupNameParameter: () => groupNameParameter,
  paginationParameters: () => paginationParameters,
  pathParameter: () => pathParameter,
  userLocator: () => userLocator,
  userNameParameter: () => userNameParameter
});
module.exports = __toCommonJS(common_exports);
var import_utils = require("../helpers/utils");
const paginationParameters = [
  {
    displayName: "Return All",
    name: "returnAll",
    type: "boolean",
    default: false,
    description: "Whether to return all results or only up to a given limit"
  },
  {
    displayName: "Limit",
    name: "limit",
    default: 100,
    type: "number",
    validateType: "number",
    typeOptions: {
      minValue: 1
    },
    description: "Max number of results to return",
    displayOptions: {
      hide: {
        returnAll: [true]
      }
    },
    routing: {
      send: {
        property: "MaxItems",
        type: "body",
        value: "={{ $value }}"
      }
    }
  }
];
const userLocator = {
  displayName: "User",
  name: "user",
  required: true,
  type: "resourceLocator",
  default: {
    mode: "list",
    value: ""
  },
  modes: [
    {
      displayName: "From list",
      name: "list",
      type: "list",
      typeOptions: {
        searchListMethod: "searchUsers",
        searchable: true
      }
    },
    {
      displayName: "By Name",
      name: "userName",
      type: "string",
      placeholder: "e.g. Admins",
      hint: "Enter the user name",
      validation: [
        {
          type: "regex",
          properties: {
            regex: "^[\\w+=,.@-]+$",
            errorMessage: "The user name must follow the allowed pattern"
          }
        }
      ]
    }
  ]
};
const groupLocator = {
  displayName: "Group",
  name: "group",
  required: true,
  type: "resourceLocator",
  default: {
    mode: "list",
    value: ""
  },
  modes: [
    {
      displayName: "From list",
      name: "list",
      type: "list",
      typeOptions: {
        searchListMethod: "searchGroups",
        searchable: true
      }
    },
    {
      displayName: "By Name",
      name: "groupName",
      type: "string",
      placeholder: "e.g. Admins",
      hint: "Enter the group name",
      validation: [
        {
          type: "regex",
          properties: {
            regex: "^[\\w+=,.@-]+$",
            errorMessage: "The group name must follow the allowed pattern."
          }
        }
      ]
    }
  ]
};
const pathParameter = {
  displayName: "Path",
  name: "path",
  type: "string",
  validateType: "string",
  default: "/"
};
const groupNameParameter = {
  displayName: "Group Name",
  name: "groupName",
  required: true,
  type: "string",
  validateType: "string",
  typeOptions: {
    maxLength: 128,
    regex: "^[+=,.@\\-_A-Za-z0-9]+$"
  },
  default: "",
  placeholder: "e.g. GroupName",
  routing: {
    send: {
      preSend: [import_utils.validateName]
    }
  }
};
const userNameParameter = {
  displayName: "User Name",
  name: "userName",
  required: true,
  type: "string",
  validateType: "string",
  default: "",
  placeholder: "e.g. JohnSmith",
  typeOptions: {
    maxLength: 64,
    regex: "^[A-Za-z0-9+=,\\.@_-]+$"
  },
  routing: {
    send: {
      preSend: [import_utils.validateName]
    }
  }
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  groupLocator,
  groupNameParameter,
  paginationParameters,
  pathParameter,
  userLocator,
  userNameParameter
});
//# sourceMappingURL=common.js.map