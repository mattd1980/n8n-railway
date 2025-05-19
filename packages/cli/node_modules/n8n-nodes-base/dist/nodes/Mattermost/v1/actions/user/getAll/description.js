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
var description_exports = {};
__export(description_exports, {
  userGetAllDescription: () => userGetAllDescription
});
module.exports = __toCommonJS(description_exports);
const userGetAllDescription = [
  {
    displayName: "Return All",
    name: "returnAll",
    type: "boolean",
    displayOptions: {
      show: {
        resource: ["user"],
        operation: ["getAll"]
      }
    },
    default: true,
    description: "Whether to return all results or only up to a given limit"
  },
  {
    displayName: "Limit",
    name: "limit",
    type: "number",
    displayOptions: {
      show: {
        resource: ["user"],
        operation: ["getAll"],
        returnAll: [false]
      }
    },
    typeOptions: {
      minValue: 1,
      maxValue: 100
    },
    default: 100,
    description: "Max number of results to return"
  },
  {
    displayName: "Additional Fields",
    name: "additionalFields",
    type: "collection",
    placeholder: "Add Field",
    displayOptions: {
      show: {
        resource: ["user"],
        operation: ["getAll"]
      }
    },
    default: {},
    options: [
      {
        displayName: "In Channel",
        name: "inChannel",
        type: "string",
        default: "",
        description: "The ID of the channel to get users for"
      },
      {
        displayName: "In Team",
        name: "inTeam",
        type: "string",
        default: "",
        description: "The ID of the team to get users for"
      },
      {
        displayName: "Not In Team",
        name: "notInTeam",
        type: "string",
        default: "",
        description: "The ID of the team to exclude users for"
      },
      {
        displayName: "Not In Channel",
        name: "notInChannel",
        type: "string",
        default: "",
        description: "The ID of the channel to exclude users for"
      },
      {
        displayName: "Sort",
        name: "sort",
        type: "options",
        options: [
          {
            name: "Created At",
            value: "createdAt"
          },
          {
            name: "Last Activity At",
            value: "lastActivityAt"
          },
          {
            name: "Status",
            value: "status"
          },
          {
            name: "Username",
            value: "username"
          }
        ],
        default: "username",
        description: "The ID of the channel to exclude users for"
      }
    ]
  }
];
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  userGetAllDescription
});
//# sourceMappingURL=description.js.map