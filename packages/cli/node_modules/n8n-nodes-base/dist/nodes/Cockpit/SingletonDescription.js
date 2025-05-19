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
var SingletonDescription_exports = {};
__export(SingletonDescription_exports, {
  singletonFields: () => singletonFields,
  singletonOperations: () => singletonOperations
});
module.exports = __toCommonJS(SingletonDescription_exports);
const singletonOperations = [
  {
    displayName: "Operation",
    name: "operation",
    type: "options",
    noDataExpression: true,
    displayOptions: {
      show: {
        resource: ["singleton"]
      }
    },
    options: [
      {
        name: "Get",
        value: "get",
        description: "Get a singleton",
        action: "Get a singleton"
      }
    ],
    default: "get"
  }
];
const singletonFields = [
  {
    displayName: "Singleton Name or ID",
    name: "singleton",
    type: "options",
    default: "",
    typeOptions: {
      loadOptionsMethod: "getSingletons"
    },
    displayOptions: {
      show: {
        resource: ["singleton"]
      }
    },
    required: true,
    description: 'Name of the singleton to operate on. Choose from the list, or specify an ID using an <a href="https://docs.n8n.io/code/expressions/">expression</a>.'
  }
];
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  singletonFields,
  singletonOperations
});
//# sourceMappingURL=SingletonDescription.js.map