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
var ProfileDescription_exports = {};
__export(ProfileDescription_exports, {
  profileFields: () => profileFields,
  profileOperations: () => profileOperations
});
module.exports = __toCommonJS(ProfileDescription_exports);
const profileOperations = [
  {
    displayName: "Operation",
    name: "operation",
    type: "options",
    noDataExpression: true,
    displayOptions: {
      show: {
        resource: ["profile"]
      }
    },
    options: [
      {
        name: "Get",
        value: "get",
        action: "Get a profile"
      }
    ],
    default: "get"
  }
];
const profileFields = [
  {
    displayName: "Details",
    name: "details",
    type: "options",
    required: true,
    default: "identity",
    description: "Details of my account to retrieve",
    options: [
      {
        name: "Blocked Users",
        value: "blockedUsers",
        description: "Return the blocked users of the logged-in user"
      },
      {
        name: "Friends",
        value: "friends",
        description: "Return the friends of the logged-in user"
      },
      {
        name: "Identity",
        value: "identity",
        description: "Return the identity of the logged-in user"
      },
      {
        name: "Karma",
        value: "karma",
        description: "Return the subreddit karma for the logged-in user"
      },
      {
        name: "Preferences",
        value: "prefs",
        description: "Return the settings preferences of the logged-in user"
      },
      {
        name: "Saved",
        value: "saved",
        description: "Return the saved posts for the user"
      },
      {
        name: "Trophies",
        value: "trophies",
        description: "Return the trophies of the logged-in user"
      }
    ],
    displayOptions: {
      show: {
        resource: ["profile"],
        operation: ["get"]
      }
    }
  },
  {
    displayName: "Return All",
    name: "returnAll",
    type: "boolean",
    default: false,
    description: "Whether to return all results or only up to a given limit",
    displayOptions: {
      show: {
        resource: ["profile"],
        operation: ["get"],
        details: ["saved"]
      }
    }
  },
  {
    displayName: "Limit",
    name: "limit",
    type: "number",
    default: 100,
    description: "Max number of results to return",
    typeOptions: {
      minValue: 1,
      maxValue: 100
    },
    displayOptions: {
      show: {
        resource: ["profile"],
        operation: ["get"],
        details: ["saved"],
        returnAll: [false]
      }
    }
  }
];
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  profileFields,
  profileOperations
});
//# sourceMappingURL=ProfileDescription.js.map