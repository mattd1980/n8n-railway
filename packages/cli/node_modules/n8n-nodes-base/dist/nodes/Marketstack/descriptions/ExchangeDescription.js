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
var ExchangeDescription_exports = {};
__export(ExchangeDescription_exports, {
  exchangeFields: () => exchangeFields,
  exchangeOperations: () => exchangeOperations
});
module.exports = __toCommonJS(ExchangeDescription_exports);
const exchangeOperations = [
  {
    displayName: "Operation",
    name: "operation",
    type: "options",
    noDataExpression: true,
    options: [
      {
        name: "Get",
        value: "get",
        action: "Get an exchange"
      }
    ],
    default: "get",
    displayOptions: {
      show: {
        resource: ["exchange"]
      }
    }
  }
];
const exchangeFields = [
  {
    displayName: "Exchange",
    name: "exchange",
    type: "string",
    required: true,
    displayOptions: {
      show: {
        resource: ["exchange"],
        operation: ["get"]
      }
    },
    default: "",
    description: 'Stock exchange to retrieve, specified by <a href="https://en.wikipedia.org/wiki/Market_Identifier_Code">Market Identifier Code</a>, e.g. <code>XNAS</code>'
  }
];
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  exchangeFields,
  exchangeOperations
});
//# sourceMappingURL=ExchangeDescription.js.map