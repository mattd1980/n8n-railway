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
var TickerDescription_exports = {};
__export(TickerDescription_exports, {
  tickerFields: () => tickerFields,
  tickerOperations: () => tickerOperations
});
module.exports = __toCommonJS(TickerDescription_exports);
const tickerOperations = [
  {
    displayName: "Operation",
    name: "operation",
    type: "options",
    noDataExpression: true,
    options: [
      {
        name: "Get",
        value: "get",
        action: "Get a ticker"
      }
    ],
    default: "get",
    displayOptions: {
      show: {
        resource: ["ticker"]
      }
    }
  }
];
const tickerFields = [
  {
    displayName: "Ticker",
    name: "symbol",
    type: "string",
    required: true,
    displayOptions: {
      show: {
        resource: ["ticker"],
        operation: ["get"]
      }
    },
    default: "",
    description: "Stock symbol (ticker) to retrieve, e.g. <code>AAPL</code>"
  }
];
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  tickerFields,
  tickerOperations
});
//# sourceMappingURL=TickerDescription.js.map