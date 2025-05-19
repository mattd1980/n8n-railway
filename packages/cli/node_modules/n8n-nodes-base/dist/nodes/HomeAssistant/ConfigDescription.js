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
var ConfigDescription_exports = {};
__export(ConfigDescription_exports, {
  configOperations: () => configOperations
});
module.exports = __toCommonJS(ConfigDescription_exports);
const configOperations = [
  {
    displayName: "Operation",
    name: "operation",
    type: "options",
    noDataExpression: true,
    displayOptions: {
      show: {
        resource: ["config"]
      }
    },
    options: [
      {
        name: "Get",
        value: "get",
        description: "Get the configuration",
        action: "Get the config"
      },
      {
        name: "Check Configuration",
        value: "check",
        description: "Check the configuration",
        action: "Check the config"
      }
    ],
    default: "get"
  }
];
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  configOperations
});
//# sourceMappingURL=ConfigDescription.js.map