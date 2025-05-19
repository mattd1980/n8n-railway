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
var TeamDescription_exports = {};
__export(TeamDescription_exports, {
  teamFields: () => teamFields,
  teamOperations: () => teamOperations
});
module.exports = __toCommonJS(TeamDescription_exports);
const teamOperations = [
  {
    displayName: "Operation",
    name: "operation",
    type: "options",
    noDataExpression: true,
    default: "get",
    options: [
      {
        name: "Get",
        value: "get",
        action: "Get a team"
      },
      {
        name: "Get Credits",
        value: "getCredits",
        action: "Get team credits"
      }
    ],
    displayOptions: {
      show: {
        resource: ["team"]
      }
    }
  }
];
const teamFields = [
  // ----------------------------------
  //        team: get
  // ----------------------------------
];
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  teamFields,
  teamOperations
});
//# sourceMappingURL=TeamDescription.js.map