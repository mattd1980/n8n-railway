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
var PersonDescription_exports = {};
__export(PersonDescription_exports, {
  personFields: () => personFields,
  personOperations: () => personOperations
});
module.exports = __toCommonJS(PersonDescription_exports);
const personOperations = [
  {
    displayName: "Operation",
    name: "operation",
    type: "options",
    noDataExpression: true,
    displayOptions: {
      show: {
        resource: ["person"]
      }
    },
    options: [
      {
        name: "Enrich",
        value: "enrich",
        action: "Enrich a person"
      }
    ],
    default: "enrich"
  }
];
const personFields = [
  /* -------------------------------------------------------------------------- */
  /*                                 person:enrich                              */
  /* -------------------------------------------------------------------------- */
  {
    displayName: "Email",
    name: "email",
    type: "string",
    placeholder: "name@email.com",
    default: "",
    displayOptions: {
      show: {
        resource: ["person"],
        operation: ["enrich"]
      }
    },
    description: "Email address (e.g \u2013 mbenioff@salesforce.com)"
  },
  {
    displayName: "First Name",
    name: "firstname",
    type: "string",
    default: "",
    displayOptions: {
      show: {
        resource: ["person"],
        operation: ["enrich"]
      }
    },
    description: "First name of the person (e.g \u2013 Marc)"
  },
  {
    displayName: "Last Name",
    name: "lastname",
    type: "string",
    default: "",
    displayOptions: {
      show: {
        resource: ["person"],
        operation: ["enrich"]
      }
    },
    description: "Last name of the person (e.g \u2013 Benioff)"
  },
  {
    displayName: "Domain",
    name: "domain",
    type: "string",
    default: "",
    displayOptions: {
      show: {
        resource: ["person"],
        operation: ["enrich"]
      }
    },
    description: "The domain name (e.g \u2013 salesforce.com)"
  }
];
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  personFields,
  personOperations
});
//# sourceMappingURL=PersonDescription.js.map