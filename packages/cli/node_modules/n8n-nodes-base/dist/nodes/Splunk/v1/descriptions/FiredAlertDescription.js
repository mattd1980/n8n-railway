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
var FiredAlertDescription_exports = {};
__export(FiredAlertDescription_exports, {
  firedAlertOperations: () => firedAlertOperations
});
module.exports = __toCommonJS(FiredAlertDescription_exports);
const firedAlertOperations = [
  {
    displayName: "Operation",
    name: "operation",
    type: "options",
    noDataExpression: true,
    displayOptions: {
      show: {
        resource: ["firedAlert"]
      }
    },
    options: [
      {
        name: "Get Report",
        value: "getReport",
        description: "Retrieve a fired alerts report",
        action: "Get a fired alerts report"
      }
    ],
    default: "getReport"
  }
];
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  firedAlertOperations
});
//# sourceMappingURL=FiredAlertDescription.js.map