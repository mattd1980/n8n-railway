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
var MicrosoftGraphSecurity_node_exports = {};
__export(MicrosoftGraphSecurity_node_exports, {
  MicrosoftGraphSecurity: () => MicrosoftGraphSecurity
});
module.exports = __toCommonJS(MicrosoftGraphSecurity_node_exports);
var import_n8n_workflow = require("n8n-workflow");
var import_descriptions = require("./descriptions");
var import_GenericFunctions = require("./GenericFunctions");
class MicrosoftGraphSecurity {
  constructor() {
    this.description = {
      displayName: "Microsoft Graph Security",
      name: "microsoftGraphSecurity",
      icon: "file:microsoftGraph.svg",
      group: ["transform"],
      version: 1,
      subtitle: '={{$parameter["operation"] + ": " + $parameter["resource"]}}',
      description: "Consume the Microsoft Graph Security API",
      defaults: {
        name: "Microsoft Graph Security"
      },
      usableAsTool: true,
      inputs: [import_n8n_workflow.NodeConnectionTypes.Main],
      outputs: [import_n8n_workflow.NodeConnectionTypes.Main],
      credentials: [
        {
          name: "microsoftGraphSecurityOAuth2Api",
          required: true
        }
      ],
      properties: [
        {
          displayName: "Resource",
          name: "resource",
          type: "options",
          noDataExpression: true,
          options: [
            {
              name: "Secure Score",
              value: "secureScore"
            },
            {
              name: "Secure Score Control Profile",
              value: "secureScoreControlProfile"
            }
          ],
          default: "secureScore"
        },
        ...import_descriptions.secureScoreOperations,
        ...import_descriptions.secureScoreFields,
        ...import_descriptions.secureScoreControlProfileOperations,
        ...import_descriptions.secureScoreControlProfileFields
      ]
    };
  }
  async execute() {
    const items = this.getInputData();
    const returnData = [];
    const resource = this.getNodeParameter("resource", 0);
    const operation = this.getNodeParameter("operation", 0);
    let responseData;
    for (let i = 0; i < items.length; i++) {
      try {
        if (resource === "secureScore") {
          if (operation === "get") {
            const secureScoreId = this.getNodeParameter("secureScoreId", i);
            responseData = await import_GenericFunctions.msGraphSecurityApiRequest.call(
              this,
              "GET",
              `/secureScores/${secureScoreId}`
            );
            delete responseData["@odata.context"];
          } else if (operation === "getAll") {
            const qs = {};
            const { filter, includeControlScores } = this.getNodeParameter("filters", i);
            if (filter) {
              qs.$filter = (0, import_GenericFunctions.tolerateDoubleQuotes)(filter);
            }
            const returnAll = this.getNodeParameter("returnAll", 0);
            if (!returnAll) {
              qs.$count = true;
              qs.$top = this.getNodeParameter("limit", 0);
            }
            responseData = await import_GenericFunctions.msGraphSecurityApiRequest.call(this, "GET", "/secureScores", {}, qs).then((response) => response.value);
            if (!includeControlScores) {
              responseData = responseData.map(({ controlScores: _controlScores, ...rest }) => rest);
            }
          }
        } else if (resource === "secureScoreControlProfile") {
          if (operation === "get") {
            const secureScoreControlProfileId = this.getNodeParameter(
              "secureScoreControlProfileId",
              i
            );
            const endpoint = `/secureScoreControlProfiles/${secureScoreControlProfileId}`;
            responseData = await import_GenericFunctions.msGraphSecurityApiRequest.call(this, "GET", endpoint);
            delete responseData["@odata.context"];
          } else if (operation === "getAll") {
            const qs = {};
            const { filter } = this.getNodeParameter("filters", i);
            if (filter) {
              qs.$filter = (0, import_GenericFunctions.tolerateDoubleQuotes)(filter);
            }
            const returnAll = this.getNodeParameter("returnAll", 0);
            if (!returnAll) {
              qs.$count = true;
              qs.$top = this.getNodeParameter("limit", 0);
            }
            responseData = await import_GenericFunctions.msGraphSecurityApiRequest.call(this, "GET", "/secureScoreControlProfiles", {}, qs).then((response) => response.value);
          } else if (operation === "update") {
            const body = {
              vendorInformation: {
                provider: this.getNodeParameter("provider", i),
                vendor: this.getNodeParameter("vendor", i)
              }
            };
            const updateFields = this.getNodeParameter("updateFields", i);
            if (!Object.keys(updateFields).length) {
              import_GenericFunctions.throwOnEmptyUpdate.call(this);
            }
            if (Object.keys(updateFields).length) {
              Object.assign(body, updateFields);
            }
            const id = this.getNodeParameter("secureScoreControlProfileId", i);
            const endpoint = `/secureScoreControlProfiles/${id}`;
            const headers = { Prefer: "return=representation" };
            responseData = await import_GenericFunctions.msGraphSecurityApiRequest.call(
              this,
              "PATCH",
              endpoint,
              body,
              {},
              headers
            );
            delete responseData["@odata.context"];
          }
        }
      } catch (error) {
        if (this.continueOnFail()) {
          returnData.push({ error: error.message });
          continue;
        }
        throw error;
      }
      Array.isArray(responseData) ? returnData.push(...responseData) : returnData.push(responseData);
    }
    return [this.helpers.returnJsonArray(returnData)];
  }
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  MicrosoftGraphSecurity
});
//# sourceMappingURL=MicrosoftGraphSecurity.node.js.map