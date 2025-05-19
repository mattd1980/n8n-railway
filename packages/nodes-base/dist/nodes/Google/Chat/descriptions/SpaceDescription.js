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
var SpaceDescription_exports = {};
__export(SpaceDescription_exports, {
  spaceFields: () => spaceFields,
  spaceOperations: () => spaceOperations
});
module.exports = __toCommonJS(SpaceDescription_exports);
var import_GenericFunctions = require("../GenericFunctions");
const spaceOperations = [
  {
    displayName: "Operation",
    name: "operation",
    noDataExpression: true,
    type: "options",
    displayOptions: {
      show: {
        resource: ["space"]
      }
    },
    options: [
      {
        name: "Get",
        value: "get",
        description: "Get a space",
        action: "Get a space"
      },
      {
        name: "Get Many",
        value: "getAll",
        description: "Get many spaces the caller is a member of",
        action: "Get many spaces"
      }
    ],
    default: "get"
  }
];
const spaceFields = [
  /* -------------------------------------------------------------------------- */
  /*                                 space:get                                  */
  /* -------------------------------------------------------------------------- */
  {
    displayName: "Space ID",
    name: "spaceId",
    type: "string",
    required: true,
    displayOptions: {
      show: {
        resource: ["space"],
        operation: ["get"]
      }
    },
    default: "",
    description: 'Resource name of the space, in the form "spaces/*"'
  },
  /* -------------------------------------------------------------------------- */
  /*                                 space:getAll                               */
  /* -------------------------------------------------------------------------- */
  ...(0, import_GenericFunctions.getPagingParameters)("space")
];
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  spaceFields,
  spaceOperations
});
//# sourceMappingURL=SpaceDescription.js.map