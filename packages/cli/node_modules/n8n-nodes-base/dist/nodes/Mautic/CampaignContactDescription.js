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
var CampaignContactDescription_exports = {};
__export(CampaignContactDescription_exports, {
  campaignContactFields: () => campaignContactFields,
  campaignContactOperations: () => campaignContactOperations
});
module.exports = __toCommonJS(CampaignContactDescription_exports);
const campaignContactOperations = [
  {
    displayName: "Operation",
    name: "operation",
    type: "options",
    noDataExpression: true,
    displayOptions: {
      show: {
        resource: ["campaignContact"]
      }
    },
    options: [
      {
        name: "Add",
        value: "add",
        description: "Add contact to a campaign",
        action: "Add a campaign contact"
      },
      {
        name: "Remove",
        value: "remove",
        description: "Remove contact from a campaign",
        action: "Remove a campaign contact"
      }
    ],
    default: "add"
  }
];
const campaignContactFields = [
  /* -------------------------------------------------------------------------- */
  /*                               campaignContact:add                           */
  /* -------------------------------------------------------------------------- */
  {
    displayName: "Contact ID",
    name: "contactId",
    type: "string",
    required: true,
    displayOptions: {
      show: {
        resource: ["campaignContact"],
        operation: ["add", "remove"]
      }
    },
    default: ""
  },
  {
    displayName: "Campaign Name or ID",
    name: "campaignId",
    type: "options",
    description: 'Choose from the list, or specify an ID using an <a href="https://docs.n8n.io/code/expressions/">expression</a>',
    required: true,
    displayOptions: {
      show: {
        resource: ["campaignContact"],
        operation: ["add", "remove"]
      }
    },
    typeOptions: {
      loadOptionsMethod: "getCampaigns"
    },
    default: ""
  }
];
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  campaignContactFields,
  campaignContactOperations
});
//# sourceMappingURL=CampaignContactDescription.js.map