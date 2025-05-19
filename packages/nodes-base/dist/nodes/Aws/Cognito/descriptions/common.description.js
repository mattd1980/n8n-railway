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
var common_description_exports = {};
__export(common_description_exports, {
  groupResourceLocator: () => groupResourceLocator,
  userPoolResourceLocator: () => userPoolResourceLocator,
  userResourceLocator: () => userResourceLocator
});
module.exports = __toCommonJS(common_description_exports);
const userPoolResourceLocator = {
  displayName: "User Pool",
  name: "userPool",
  required: true,
  type: "resourceLocator",
  default: {
    mode: "list",
    value: ""
  },
  routing: {
    send: {
      type: "body",
      property: "UserPoolId"
    }
  },
  modes: [
    {
      displayName: "From list",
      name: "list",
      type: "list",
      typeOptions: {
        searchListMethod: "searchUserPools",
        searchable: true
      }
    },
    {
      displayName: "By ID",
      name: "id",
      type: "string",
      validation: [
        {
          type: "regex",
          properties: {
            regex: "^[\\w-]+_[0-9a-zA-Z]+$",
            errorMessage: 'The ID must follow the pattern "xxxxxx_xxxxxxxxxxx"'
          }
        }
      ],
      placeholder: "e.g. eu-central-1_ab12cdefgh"
    }
  ]
};
const groupResourceLocator = {
  displayName: "Group",
  name: "group",
  default: {
    mode: "list",
    value: ""
  },
  routing: {
    send: {
      type: "body",
      property: "GroupName"
    }
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
      hint: "Enter the group name",
      validation: [
        {
          type: "regex",
          properties: {
            regex: "^[\\w+=,.@-]+$",
            errorMessage: "The group name must follow the allowed pattern."
          }
        }
      ],
      placeholder: "e.g. Admins"
    }
  ],
  required: true,
  type: "resourceLocator"
};
const userResourceLocator = {
  displayName: "User",
  name: "user",
  default: {
    mode: "list",
    value: ""
  },
  modes: [
    {
      displayName: "From List",
      name: "list",
      type: "list",
      typeOptions: {
        searchListMethod: "searchUsers",
        searchable: true
      }
    },
    {
      displayName: "By ID",
      name: "id",
      type: "string",
      hint: "Enter the user ID",
      placeholder: "e.g. 02bd9fd6-8f93-4758-87c3-1fb73740a315",
      validation: [
        {
          type: "regex",
          properties: {
            regex: "^[\\w-]+-[0-9a-zA-Z]+$",
            errorMessage: 'The ID must follow the pattern "xxxxxx-xxxxxxxxxxx"'
          }
        }
      ]
    }
  ],
  routing: {
    send: {
      type: "body",
      property: "Username"
    }
  },
  required: true,
  type: "resourceLocator"
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  groupResourceLocator,
  userPoolResourceLocator,
  userResourceLocator
});
//# sourceMappingURL=common.description.js.map