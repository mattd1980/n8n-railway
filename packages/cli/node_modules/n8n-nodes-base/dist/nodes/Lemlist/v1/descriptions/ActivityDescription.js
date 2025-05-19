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
var ActivityDescription_exports = {};
__export(ActivityDescription_exports, {
  activityFields: () => activityFields,
  activityOperations: () => activityOperations
});
module.exports = __toCommonJS(ActivityDescription_exports);
const activityOperations = [
  {
    displayName: "Operation",
    name: "operation",
    type: "options",
    noDataExpression: true,
    default: "getAll",
    options: [
      {
        name: "Get Many",
        value: "getAll",
        action: "Get many activities"
      }
    ],
    displayOptions: {
      show: {
        resource: ["activity"]
      }
    }
  }
];
const activityFields = [
  // ----------------------------------
  //        activity: getAll
  // ----------------------------------
  {
    displayName: "Return All",
    name: "returnAll",
    type: "boolean",
    default: false,
    description: "Whether to return all results or only up to a given limit",
    displayOptions: {
      show: {
        resource: ["activity"],
        operation: ["getAll"]
      }
    }
  },
  {
    displayName: "Limit",
    name: "limit",
    type: "number",
    default: 5,
    description: "Max number of results to return",
    typeOptions: {
      minValue: 1,
      maxValue: 1e3
    },
    displayOptions: {
      show: {
        resource: ["activity"],
        operation: ["getAll"],
        returnAll: [false]
      }
    }
  },
  {
    displayName: "Filters",
    name: "filters",
    type: "collection",
    placeholder: "Add Filter",
    default: {},
    displayOptions: {
      show: {
        resource: ["activity"],
        operation: ["getAll"]
      }
    },
    options: [
      {
        displayName: "Campaign Name or ID",
        name: "campaignId",
        type: "options",
        default: "",
        typeOptions: {
          loadOptionsMethod: "getCampaigns"
        },
        description: 'ID of the campaign to retrieve activity for. Choose from the list, or specify an ID using an <a href="https://docs.n8n.io/code/expressions/">expression</a>.'
      },
      {
        displayName: "Type",
        name: "type",
        type: "options",
        default: "emailsOpened",
        description: "Type of activity to retrieve",
        options: [
          {
            name: "Emails Bounced",
            value: "emailsBounced"
          },
          {
            name: "Emails Clicked",
            value: "emailsClicked"
          },
          {
            name: "Emails Opened",
            value: "emailsOpened"
          },
          {
            name: "Emails Replied",
            value: "emailsReplied"
          },
          {
            name: "Emails Send Failed",
            value: "emailsSendFailed"
          },
          {
            name: "Emails Sent",
            value: "emailsSent"
          },
          {
            name: "Emails Unsubscribed",
            value: "emailsUnsubscribed"
          }
        ]
      }
    ]
  }
];
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  activityFields,
  activityOperations
});
//# sourceMappingURL=ActivityDescription.js.map