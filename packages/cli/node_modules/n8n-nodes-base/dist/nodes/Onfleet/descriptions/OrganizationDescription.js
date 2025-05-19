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
var OrganizationDescription_exports = {};
__export(OrganizationDescription_exports, {
  organizationFields: () => organizationFields,
  organizationOperations: () => organizationOperations
});
module.exports = __toCommonJS(OrganizationDescription_exports);
const organizationOperations = [
  {
    displayName: "Operation",
    name: "operation",
    type: "options",
    noDataExpression: true,
    displayOptions: {
      show: {
        resource: ["organization"]
      }
    },
    options: [
      {
        name: "Get My Organization",
        value: "get",
        description: "Retrieve your own organization's details",
        action: "Get my organization"
      },
      {
        name: "Get Delegatee Details",
        value: "getDelegatee",
        description: "Retrieve the details of an organization with which you are connected",
        action: "Get a delegatee's details"
      }
    ],
    default: "get"
  }
];
const organizationFields = [
  {
    displayName: "Organization ID",
    name: "id",
    type: "string",
    displayOptions: {
      show: {
        resource: ["organization"],
        operation: ["getDelegatee"]
      }
    },
    default: "",
    required: true,
    description: "The ID of the delegatees for lookup"
  }
];
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  organizationFields,
  organizationOperations
});
//# sourceMappingURL=OrganizationDescription.js.map