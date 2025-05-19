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
var ListDescription_exports = {};
__export(ListDescription_exports, {
  listFields: () => listFields,
  listOperations: () => listOperations
});
module.exports = __toCommonJS(ListDescription_exports);
const listOperations = [
  {
    displayName: "Operation",
    name: "operation",
    type: "options",
    noDataExpression: true,
    displayOptions: {
      show: {
        resource: ["list"]
      }
    },
    options: [
      {
        name: "Add Member",
        value: "add",
        description: "Add a member to a list",
        action: "Add Member to List"
      }
    ],
    default: "add"
  }
];
const listFields = [
  /* -------------------------------------------------------------------------- */
  /*                                list:add                        */
  /* -------------------------------------------------------------------------- */
  {
    displayName: "List",
    name: "list",
    type: "resourceLocator",
    default: { mode: "id", value: "" },
    required: true,
    description: "The list you want to add the user to",
    displayOptions: {
      show: {
        operation: ["add"],
        resource: ["list"]
      }
    },
    modes: [
      {
        displayName: "By ID",
        name: "id",
        type: "string",
        validation: [],
        placeholder: "e.g. 99923132",
        url: ""
      },
      {
        displayName: "By URL",
        name: "url",
        type: "string",
        validation: [],
        placeholder: "e.g. https://twitter.com/i/lists/99923132",
        url: ""
      }
    ]
  },
  {
    displayName: "User",
    name: "user",
    type: "resourceLocator",
    default: { mode: "username", value: "" },
    required: true,
    description: "The user you want to add to the list",
    displayOptions: {
      show: {
        operation: ["add"],
        resource: ["list"]
      }
    },
    modes: [
      {
        displayName: "By Username",
        name: "username",
        type: "string",
        validation: [],
        placeholder: "e.g. n8n",
        url: ""
      },
      {
        displayName: "By ID",
        name: "id",
        type: "string",
        validation: [],
        placeholder: "e.g. 1068479892537384960",
        url: ""
      }
    ]
  }
];
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  listFields,
  listOperations
});
//# sourceMappingURL=ListDescription.js.map