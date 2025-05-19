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
var GoogleBusinessProfile_node_exports = {};
__export(GoogleBusinessProfile_node_exports, {
  GoogleBusinessProfile: () => GoogleBusinessProfile
});
module.exports = __toCommonJS(GoogleBusinessProfile_node_exports);
var import_n8n_workflow = require("n8n-workflow");
var import_GenericFunctions = require("./GenericFunctions");
var import_PostDescription = require("./PostDescription");
var import_ReviewDescription = require("./ReviewDescription");
class GoogleBusinessProfile {
  constructor() {
    this.description = {
      displayName: "Google Business Profile",
      name: "googleBusinessProfile",
      icon: "file:googleBusinessProfile.svg",
      group: ["input"],
      version: 1,
      subtitle: '={{$parameter["operation"] + ": " + $parameter["resource"]}}',
      description: "Consume Google Business Profile API",
      defaults: {
        name: "Google Business Profile"
      },
      usableAsTool: true,
      inputs: [import_n8n_workflow.NodeConnectionTypes.Main],
      outputs: [import_n8n_workflow.NodeConnectionTypes.Main],
      hints: [
        {
          message: "Please select a parameter in the options to modify the post",
          displayCondition: '={{$parameter["resource"] === "post" && $parameter["operation"] === "update" && Object.keys($parameter["additionalOptions"]).length === 0}}',
          whenToDisplay: "always",
          location: "outputPane",
          type: "warning"
        }
      ],
      credentials: [
        {
          name: "googleBusinessProfileOAuth2Api",
          required: true
        }
      ],
      requestDefaults: {
        baseURL: "https://mybusiness.googleapis.com/v4",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
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
              name: "Post",
              value: "post"
            },
            {
              name: "Review",
              value: "review"
            }
          ],
          default: "post"
        },
        ...import_PostDescription.postOperations,
        ...import_PostDescription.postFields,
        ...import_ReviewDescription.reviewOperations,
        ...import_ReviewDescription.reviewFields
      ]
    };
    this.methods = {
      listSearch: {
        searchAccounts: import_GenericFunctions.searchAccounts,
        searchLocations: import_GenericFunctions.searchLocations,
        searchReviews: import_GenericFunctions.searchReviews,
        searchPosts: import_GenericFunctions.searchPosts
      }
    };
  }
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  GoogleBusinessProfile
});
//# sourceMappingURL=GoogleBusinessProfile.node.js.map