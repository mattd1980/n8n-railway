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
var CampaignDescription_exports = {};
__export(CampaignDescription_exports, {
  campaignFields: () => campaignFields,
  campaignOperations: () => campaignOperations
});
module.exports = __toCommonJS(CampaignDescription_exports);
const campaignOperations = [
  {
    displayName: "Operation",
    name: "operation",
    type: "options",
    noDataExpression: true,
    displayOptions: {
      show: {
        resource: ["campaign"]
      }
    },
    options: [
      {
        name: "Get",
        value: "get",
        action: "Get a campaign"
      },
      {
        name: "Get Many",
        value: "getAll",
        action: "Get many campaigns"
      },
      {
        name: "Get Metrics",
        value: "getMetrics",
        action: "Get metrics for a campaign"
      }
    ],
    default: "get"
  }
];
const campaignFields = [
  /* -------------------------------------------------------------------------- */
  /*                                   campaign:get                             */
  /* -------------------------------------------------------------------------- */
  {
    displayName: "Campaign ID",
    name: "campaignId",
    type: "number",
    required: true,
    default: 0,
    displayOptions: {
      show: {
        resource: ["campaign"],
        operation: ["get"]
      }
    },
    description: "The unique identifier for the campaign"
  },
  /* -------------------------------------------------------------------------- */
  /*                                   campaign:getMetrics                      */
  /* -------------------------------------------------------------------------- */
  {
    displayName: "Campaign ID",
    name: "campaignId",
    type: "number",
    required: true,
    default: 0,
    displayOptions: {
      show: {
        resource: ["campaign"],
        operation: ["getMetrics"]
      }
    },
    description: "The unique identifier for the campaign"
  },
  {
    displayName: "Period",
    name: "period",
    type: "options",
    default: "days",
    displayOptions: {
      show: {
        resource: ["campaign"],
        operation: ["getMetrics"]
      }
    },
    description: "Specify metric period",
    options: [
      {
        name: "Hours",
        value: "hours"
      },
      {
        name: "Days",
        value: "days"
      },
      {
        name: "Weeks",
        value: "weeks"
      },
      {
        name: "Months",
        value: "months"
      }
    ]
  },
  {
    displayName: "JSON Parameters",
    name: "jsonParameters",
    type: "boolean",
    default: false,
    displayOptions: {
      show: {
        resource: ["campaign"],
        operation: ["getMetrics"]
      }
    }
  },
  {
    displayName: "Additional Fields",
    name: "additionalFields",
    type: "collection",
    placeholder: "Add Field",
    default: {},
    displayOptions: {
      show: {
        resource: ["campaign"],
        operation: ["getMetrics"],
        jsonParameters: [false]
      }
    },
    options: [
      {
        displayName: "Steps",
        name: "steps",
        type: "number",
        default: 0,
        description: "Integer specifying how many steps to return. Defaults to the maximum number of timeperiods available, or 12 when using the months period. Maximum timeperiods available are 24 hours, 45 days, 12 weeks and 120 months",
        typeOptions: {
          minValue: 0,
          maxValue: 120
        }
      },
      {
        displayName: "Type",
        name: "type",
        type: "options",
        default: "empty",
        description: "Specify metric type",
        options: [
          {
            name: "Email",
            value: "email"
          },
          {
            name: "Empty",
            value: "empty"
          },
          {
            name: "Push",
            value: "push"
          },
          {
            name: "Slack",
            value: "slack"
          },
          {
            name: "Twilio",
            value: "twilio"
          },
          {
            name: "Urban Airship",
            value: "urbanAirship"
          },
          {
            name: "Webhook",
            value: "webhook"
          }
        ]
      }
    ]
  }
];
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  campaignFields,
  campaignOperations
});
//# sourceMappingURL=CampaignDescription.js.map