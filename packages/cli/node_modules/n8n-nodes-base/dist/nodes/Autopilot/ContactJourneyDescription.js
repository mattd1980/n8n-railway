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
var ContactJourneyDescription_exports = {};
__export(ContactJourneyDescription_exports, {
  contactJourneyFields: () => contactJourneyFields,
  contactJourneyOperations: () => contactJourneyOperations
});
module.exports = __toCommonJS(ContactJourneyDescription_exports);
const contactJourneyOperations = [
  {
    displayName: "Operation",
    name: "operation",
    type: "options",
    noDataExpression: true,
    displayOptions: {
      show: {
        resource: ["contactJourney"]
      }
    },
    options: [
      {
        name: "Add",
        value: "add",
        description: "Add contact to list",
        action: "Add a contact journey"
      }
    ],
    default: "add"
  }
];
const contactJourneyFields = [
  /* -------------------------------------------------------------------------- */
  /*                                 contactJourney:add                         */
  /* -------------------------------------------------------------------------- */
  {
    displayName: "Trigger Name or ID",
    name: "triggerId",
    required: true,
    typeOptions: {
      loadOptionsMethod: "getTriggers"
    },
    type: "options",
    displayOptions: {
      show: {
        operation: ["add"],
        resource: ["contactJourney"]
      }
    },
    default: "",
    description: 'List ID. Choose from the list, or specify an ID using an <a href="https://docs.n8n.io/code/expressions/">expression</a>.'
  },
  {
    displayName: "Contact ID",
    name: "contactId",
    required: true,
    type: "string",
    displayOptions: {
      show: {
        operation: ["add"],
        resource: ["contactJourney"]
      }
    },
    default: "",
    description: "Can be ID or email"
  }
];
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  contactJourneyFields,
  contactJourneyOperations
});
//# sourceMappingURL=ContactJourneyDescription.js.map