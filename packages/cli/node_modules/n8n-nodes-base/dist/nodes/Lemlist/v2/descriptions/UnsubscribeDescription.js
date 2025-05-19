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
var UnsubscribeDescription_exports = {};
__export(UnsubscribeDescription_exports, {
  unsubscribeFields: () => unsubscribeFields,
  unsubscribeOperations: () => unsubscribeOperations
});
module.exports = __toCommonJS(UnsubscribeDescription_exports);
const unsubscribeOperations = [
  {
    displayName: "Operation",
    name: "operation",
    type: "options",
    noDataExpression: true,
    default: "add",
    options: [
      {
        name: "Add",
        value: "add",
        action: "Add an email to an unsubscribe list"
      },
      {
        name: "Delete",
        value: "delete",
        action: "Delete an email from an unsubscribe list"
      },
      {
        name: "Get Many",
        value: "getAll",
        action: "Get many unsubscribed emails"
      }
    ],
    displayOptions: {
      show: {
        resource: ["unsubscribe"]
      }
    }
  }
];
const unsubscribeFields = [
  // ----------------------------------
  //        unsubscribe: add
  // ----------------------------------
  {
    displayName: "Email",
    name: "email",
    type: "string",
    placeholder: "name@email.com",
    default: "",
    description: "Email to add to the unsubscribes",
    displayOptions: {
      show: {
        resource: ["unsubscribe"],
        operation: ["add"]
      }
    }
  },
  // ----------------------------------
  //        unsubscribe: delete
  // ----------------------------------
  {
    displayName: "Email",
    name: "email",
    type: "string",
    placeholder: "name@email.com",
    default: "",
    description: "Email to delete from the unsubscribes",
    displayOptions: {
      show: {
        resource: ["unsubscribe"],
        operation: ["delete"]
      }
    }
  },
  // ----------------------------------
  //       unsubscribe: getAll
  // ----------------------------------
  {
    displayName: "Return All",
    name: "returnAll",
    type: "boolean",
    default: false,
    description: "Whether to return all results or only up to a given limit",
    displayOptions: {
      show: {
        resource: ["unsubscribe"],
        operation: ["getAll"]
      }
    }
  },
  {
    displayName: "Limit",
    name: "limit",
    type: "number",
    default: 5,
    description: "Max number of results to return",
    typeOptions: {
      minValue: 1,
      maxValue: 1e3
    },
    displayOptions: {
      show: {
        resource: ["unsubscribe"],
        operation: ["getAll"],
        returnAll: [false]
      }
    }
  }
];
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  unsubscribeFields,
  unsubscribeOperations
});
//# sourceMappingURL=UnsubscribeDescription.js.map