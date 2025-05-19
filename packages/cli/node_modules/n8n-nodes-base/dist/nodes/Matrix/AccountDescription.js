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
var AccountDescription_exports = {};
__export(AccountDescription_exports, {
  accountOperations: () => accountOperations
});
module.exports = __toCommonJS(AccountDescription_exports);
const accountOperations = [
  {
    displayName: "Operation",
    name: "operation",
    type: "options",
    noDataExpression: true,
    displayOptions: {
      show: {
        resource: ["account"]
      }
    },
    options: [
      {
        name: "Me",
        value: "me",
        description: "Get current user's account information",
        action: "Get the current user's account information"
      }
    ],
    default: "me"
  }
];
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  accountOperations
});
//# sourceMappingURL=AccountDescription.js.map