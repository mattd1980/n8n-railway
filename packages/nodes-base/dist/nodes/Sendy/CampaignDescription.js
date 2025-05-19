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
        name: "Create",
        value: "create",
        description: "Create a campaign",
        action: "Create a campaign"
      }
    ],
    default: "create"
  }
];
const campaignFields = [
  /* -------------------------------------------------------------------------- */
  /*                                campaign:create                             */
  /* -------------------------------------------------------------------------- */
  {
    displayName: "From Name",
    name: "fromName",
    type: "string",
    displayOptions: {
      show: {
        resource: ["campaign"],
        operation: ["create"]
      }
    },
    default: "",
    description: "The 'From name' of your campaign"
  },
  {
    displayName: "From Email",
    name: "fromEmail",
    type: "string",
    displayOptions: {
      show: {
        resource: ["campaign"],
        operation: ["create"]
      }
    },
    default: "",
    description: "The 'From email' of your campaign"
  },
  {
    displayName: "Reply To",
    name: "replyTo",
    type: "string",
    displayOptions: {
      show: {
        resource: ["campaign"],
        operation: ["create"]
      }
    },
    default: "",
    description: "The 'Reply to' of your campaign"
  },
  {
    displayName: "Title",
    name: "title",
    type: "string",
    displayOptions: {
      show: {
        resource: ["campaign"],
        operation: ["create"]
      }
    },
    default: "",
    description: "The 'Title' of your campaign"
  },
  {
    displayName: "Subject",
    name: "subject",
    type: "string",
    displayOptions: {
      show: {
        resource: ["campaign"],
        operation: ["create"]
      }
    },
    default: "",
    description: "The 'Subject' of your campaign"
  },
  {
    displayName: "HTML Text",
    name: "htmlText",
    type: "string",
    displayOptions: {
      show: {
        resource: ["campaign"],
        operation: ["create"]
      }
    },
    default: "",
    description: "The 'HTML version' of your campaign"
  },
  {
    displayName: "Send Campaign",
    name: "sendCampaign",
    type: "boolean",
    displayOptions: {
      show: {
        resource: ["campaign"],
        operation: ["create"]
      }
    },
    default: false,
    description: "Whether to send the campaign as well and not just create a draft. Default is false."
  },
  {
    displayName: "Brand ID",
    name: "brandId",
    type: "string",
    displayOptions: {
      show: {
        operation: ["create"],
        resource: ["campaign"],
        sendCampaign: [false]
      }
    },
    required: true,
    default: ""
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
        operation: ["create"]
      }
    },
    options: [
      {
        displayName: "Exclude List IDs",
        name: "excludeListIds",
        type: "string",
        default: "",
        description: "Lists to exclude from your campaign. List IDs should be single or comma-separated."
      },
      {
        displayName: "Exclude Segment IDs",
        name: "excludeSegmentIds",
        type: "string",
        default: "",
        description: "Segments to exclude from your campaign. Segment IDs should be single or comma-separated."
      },
      {
        displayName: "List IDs",
        name: "listIds",
        type: "string",
        default: "",
        description: "List IDs should be single or comma-separated"
      },
      {
        displayName: "Plain Text",
        name: "plainText",
        type: "string",
        default: "",
        description: "The 'Plain text version' of your campaign"
      },
      {
        displayName: "Querystring",
        name: "queryString",
        type: "string",
        default: "",
        description: "Google Analytics tags"
      },
      {
        displayName: "Segment IDs",
        name: "segmentIds",
        type: "string",
        default: "",
        description: "Segment IDs should be single or comma-separated"
      },
      {
        displayName: "Track Clicks",
        name: "trackClicks",
        type: "boolean",
        default: true,
        description: "Whether to disable clicks tracking. Default is true."
      },
      {
        displayName: "Track Opens",
        name: "trackOpens",
        type: "boolean",
        default: true,
        description: "Whether to disable opens tracking. Default is true."
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