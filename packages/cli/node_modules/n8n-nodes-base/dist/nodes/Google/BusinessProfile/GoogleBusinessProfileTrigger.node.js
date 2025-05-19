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
var GoogleBusinessProfileTrigger_node_exports = {};
__export(GoogleBusinessProfileTrigger_node_exports, {
  GoogleBusinessProfileTrigger: () => GoogleBusinessProfileTrigger
});
module.exports = __toCommonJS(GoogleBusinessProfileTrigger_node_exports);
var import_n8n_workflow = require("n8n-workflow");
var import_GenericFunctions = require("./GenericFunctions");
class GoogleBusinessProfileTrigger {
  constructor() {
    this.description = {
      displayName: "Google Business Profile Trigger",
      name: "googleBusinessProfileTrigger",
      icon: "file:googleBusinessProfile.svg",
      group: ["trigger"],
      version: 1,
      description: "Fetches reviews from Google Business Profile and starts the workflow on specified polling intervals.",
      subtitle: '={{"Google Business Profile Trigger"}}',
      defaults: {
        name: "Google Business Profile Trigger"
      },
      credentials: [
        {
          name: "googleBusinessProfileOAuth2Api",
          required: true
        }
      ],
      polling: true,
      inputs: [],
      outputs: [import_n8n_workflow.NodeConnectionTypes.Main],
      properties: [
        {
          displayName: "Event",
          name: "event",
          required: true,
          type: "options",
          noDataExpression: true,
          default: "reviewAdded",
          options: [
            {
              name: "Review Added",
              value: "reviewAdded"
            }
          ]
        },
        {
          displayName: "Account",
          name: "account",
          required: true,
          type: "resourceLocator",
          default: { mode: "list", value: "" },
          description: "The Google Business Profile account",
          displayOptions: { show: { event: ["reviewAdded"] } },
          modes: [
            {
              displayName: "From list",
              name: "list",
              type: "list",
              typeOptions: {
                searchListMethod: "searchAccounts",
                searchable: true
              }
            },
            {
              displayName: "By name",
              name: "name",
              type: "string",
              hint: "Enter the account name",
              validation: [
                {
                  type: "regex",
                  properties: {
                    regex: "accounts/[0-9]+",
                    errorMessage: 'The name must start with "accounts/"'
                  }
                }
              ],
              placeholder: "e.g. accounts/0123456789"
            }
          ]
        },
        {
          displayName: "Location",
          name: "location",
          required: true,
          type: "resourceLocator",
          default: { mode: "list", value: "" },
          description: "The specific location or business associated with the account",
          displayOptions: { show: { event: ["reviewAdded"] } },
          modes: [
            {
              displayName: "From list",
              name: "list",
              type: "list",
              typeOptions: {
                searchListMethod: "searchLocations",
                searchable: true
              }
            },
            {
              displayName: "By name",
              name: "name",
              type: "string",
              hint: "Enter the location name",
              validation: [
                {
                  type: "regex",
                  properties: {
                    regex: "locations/[0-9]+",
                    errorMessage: 'The name must start with "locations/"'
                  }
                }
              ],
              placeholder: "e.g. locations/0123456789"
            }
          ]
        }
      ]
    };
    this.methods = {
      listSearch: {
        searchAccounts: import_GenericFunctions.searchAccounts,
        searchLocations: import_GenericFunctions.searchLocations
      }
    };
  }
  async poll() {
    const nodeStaticData = this.getWorkflowStaticData("node");
    let responseData;
    const qs = {};
    const account = this.getNodeParameter("account").value;
    const location = this.getNodeParameter("location").value;
    const manualMode = this.getMode() === "manual";
    if (manualMode) {
      qs.pageSize = 1;
    } else {
      qs.pageSize = 50;
    }
    try {
      responseData = await import_GenericFunctions.googleApiRequest.call(
        this,
        "GET",
        `/${account}/${location}/reviews`,
        {},
        qs
      );
      if (manualMode) {
        responseData = responseData.reviews;
      } else {
        if (!nodeStaticData.totalReviewCountLastTimeChecked) {
          nodeStaticData.totalReviewCountLastTimeChecked = responseData.totalReviewCount;
          return null;
        }
        if (!responseData?.reviews?.length || nodeStaticData?.totalReviewCountLastTimeChecked === responseData?.totalReviewCount) {
          return null;
        }
        const numNewReviews = (
          // @ts-ignore
          responseData.totalReviewCount - nodeStaticData.totalReviewCountLastTimeChecked
        );
        nodeStaticData.totalReviewCountLastTimeChecked = responseData.totalReviewCount;
        responseData = responseData.reviews.slice(0, numNewReviews);
      }
      if (Array.isArray(responseData) && responseData.length) {
        return [this.helpers.returnJsonArray(responseData)];
      }
      return null;
    } catch (error) {
      throw new import_n8n_workflow.NodeApiError(this.getNode(), error);
    }
  }
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  GoogleBusinessProfileTrigger
});
//# sourceMappingURL=GoogleBusinessProfileTrigger.node.js.map