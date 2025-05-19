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
    default: "getAll",
    options: [
      {
        name: "Get Many",
        value: "getAll",
        action: "Get many campaigns"
      },
      {
        name: "Get Stats",
        value: "getStats",
        action: "Get campaign stats"
      }
    ],
    displayOptions: {
      show: {
        resource: ["campaign"]
      }
    }
  }
];
const campaignFields = [
  // ----------------------------------
  //        campaign: getAll
  // ----------------------------------
  {
    displayName: "Return All",
    name: "returnAll",
    type: "boolean",
    default: false,
    description: "Whether to return all results or only up to a given limit",
    displayOptions: {
      show: {
        resource: ["campaign"],
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
        resource: ["campaign"],
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
        resource: ["campaign"],
        operation: ["getAll"]
      }
    },
    options: [
      {
        displayName: "Version",
        name: "version",
        type: "string",
        default: "v2"
      }
    ]
  },
  // ----------------------------------
  //        campaign: getStats
  // ----------------------------------
  {
    displayName: "Campaign Name or ID",
    name: "campaignId",
    type: "options",
    required: true,
    default: [],
    typeOptions: {
      loadOptionsMethod: "getCampaigns"
    },
    description: 'ID of the campaign to get stats for. Choose from the list, or specify an ID using an <a href="https://docs.n8n.io/code/expressions/">expression</a>.',
    displayOptions: {
      show: {
        resource: ["campaign"],
        operation: ["getStats"]
      }
    }
  },
  {
    displayName: "Start Date",
    name: "startDate",
    type: "dateTime",
    default: "",
    required: true,
    placeholder: "e.g. 2024-09-03 00:00:00Z",
    displayOptions: {
      show: {
        resource: ["campaign"],
        operation: ["getStats"]
      }
    }
  },
  {
    displayName: "End Date",
    name: "endDate",
    type: "dateTime",
    default: "",
    placeholder: "e.g. 2024-09-03 00:00:00Z",
    required: true,
    displayOptions: {
      show: {
        resource: ["campaign"],
        operation: ["getStats"]
      }
    }
  },
  {
    displayName: "Timezone",
    name: "timezone",
    type: "string",
    default: "",
    required: true,
    placeholder: "e.g. Europe/Paris",
    displayOptions: {
      show: {
        resource: ["campaign"],
        operation: ["getStats"]
      }
    }
  }
];
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  campaignFields,
  campaignOperations
});
//# sourceMappingURL=CampaignDescription.js.map