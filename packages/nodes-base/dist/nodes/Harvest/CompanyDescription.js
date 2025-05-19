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
var CompanyDescription_exports = {};
__export(CompanyDescription_exports, {
  companyOperations: () => companyOperations
});
module.exports = __toCommonJS(CompanyDescription_exports);
const resource = ["company"];
const companyOperations = [
  {
    displayName: "Operation",
    name: "operation",
    type: "options",
    noDataExpression: true,
    displayOptions: {
      show: {
        resource
      }
    },
    options: [
      {
        name: "Get",
        value: "get",
        description: "Retrieves the company for the currently authenticated user",
        action: "Retrieve the company for the currently authenticated user"
      }
    ],
    default: "get"
  }
];
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  companyOperations
});
//# sourceMappingURL=CompanyDescription.js.map