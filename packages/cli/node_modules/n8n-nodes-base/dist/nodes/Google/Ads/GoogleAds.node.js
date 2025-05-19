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
var GoogleAds_node_exports = {};
__export(GoogleAds_node_exports, {
  GoogleAds: () => GoogleAds
});
module.exports = __toCommonJS(GoogleAds_node_exports);
var import_n8n_workflow = require("n8n-workflow");
var import_CampaignDescription = require("./CampaignDescription");
class GoogleAds {
  constructor() {
    this.description = {
      displayName: "Google Ads",
      name: "googleAds",
      icon: "file:googleAds.svg",
      group: ["transform"],
      version: 1,
      subtitle: '={{$parameter["operation"] + ": " + $parameter["resource"]}}',
      description: "Use the Google Ads API",
      defaults: {
        name: "Google Ads"
      },
      usableAsTool: true,
      inputs: [import_n8n_workflow.NodeConnectionTypes.Main],
      outputs: [import_n8n_workflow.NodeConnectionTypes.Main],
      credentials: [
        {
          name: "googleAdsOAuth2Api",
          required: true,
          testedBy: {
            request: {
              method: "GET",
              url: "/v17/customers:listAccessibleCustomers"
            }
          }
        }
      ],
      requestDefaults: {
        returnFullResponse: true,
        baseURL: "https://googleads.googleapis.com",
        headers: {
          "developer-token": "={{$credentials.developerToken}}"
        }
      },
      properties: [
        {
          displayName: "Resource",
          name: "resource",
          type: "options",
          noDataExpression: true,
          options: [
            {
              name: "Campaign",
              value: "campaign"
            }
          ],
          default: "campaign"
        },
        //-------------------------------
        // Campaign Operations
        //-------------------------------
        ...import_CampaignDescription.campaignOperations,
        {
          displayName: "Divide field names expressed with <i>micros</i> by 1,000,000 to get the actual value",
          name: "campaigsNotice",
          type: "notice",
          default: "",
          displayOptions: {
            show: {
              resource: ["campaign"]
            }
          }
        },
        ...import_CampaignDescription.campaignFields
      ]
    };
  }
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  GoogleAds
});
//# sourceMappingURL=GoogleAds.node.js.map