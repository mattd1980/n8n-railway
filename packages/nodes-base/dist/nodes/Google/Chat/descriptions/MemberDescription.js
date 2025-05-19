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
var MemberDescription_exports = {};
__export(MemberDescription_exports, {
  memberFields: () => memberFields,
  memberOperations: () => memberOperations
});
module.exports = __toCommonJS(MemberDescription_exports);
var import_GenericFunctions = require("../GenericFunctions");
const memberOperations = [
  {
    displayName: "Operation",
    name: "operation",
    noDataExpression: true,
    type: "options",
    displayOptions: {
      show: {
        resource: ["member"]
      }
    },
    options: [
      {
        name: "Get",
        value: "get",
        description: "Get a membership",
        action: "Get a member"
      },
      {
        name: "Get Many",
        value: "getAll",
        description: "Get many memberships in a space",
        action: "Get many members"
      }
    ],
    default: "get"
  }
];
const memberFields = [
  /* -------------------------------------------------------------------------- */
  /*                                 member:get                                 */
  /* -------------------------------------------------------------------------- */
  {
    displayName: "Member ID",
    name: "memberId",
    type: "string",
    required: true,
    displayOptions: {
      show: {
        resource: ["member"],
        operation: ["get"]
      }
    },
    default: "",
    description: 'Member to be retrieved in the form "spaces/*/members/*"'
  },
  /* -------------------------------------------------------------------------- */
  /*                                 member:getAll                              */
  /* -------------------------------------------------------------------------- */
  {
    displayName: "Space Name or ID",
    name: "spaceId",
    type: "options",
    required: true,
    typeOptions: {
      loadOptionsMethod: "getSpaces"
    },
    displayOptions: {
      show: {
        resource: ["member"],
        operation: ["getAll"]
      }
    },
    default: [],
    description: 'The name of the space for which to retrieve members, in the form "spaces/*". Choose from the list, or specify an ID using an <a href="https://docs.n8n.io/code/expressions/">expression</a>.'
  },
  ...(0, import_GenericFunctions.getPagingParameters)("member")
];
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  memberFields,
  memberOperations
});
//# sourceMappingURL=MemberDescription.js.map