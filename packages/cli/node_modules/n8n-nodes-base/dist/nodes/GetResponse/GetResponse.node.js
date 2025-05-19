"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
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
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);
var GetResponse_node_exports = {};
__export(GetResponse_node_exports, {
  GetResponse: () => GetResponse
});
module.exports = __toCommonJS(GetResponse_node_exports);
var import_moment_timezone = __toESM(require("moment-timezone"));
var import_n8n_workflow = require("n8n-workflow");
var import_ContactDescription = require("./ContactDescription");
var import_GenericFunctions = require("./GenericFunctions");
class GetResponse {
  constructor() {
    this.description = {
      displayName: "GetResponse",
      name: "getResponse",
      // eslint-disable-next-line n8n-nodes-base/node-class-description-icon-not-svg
      icon: "file:getResponse.png",
      group: ["input"],
      version: 1,
      subtitle: '={{$parameter["operation"] + ": " + $parameter["resource"]}}',
      description: "Consume GetResponse API",
      defaults: {
        name: "GetResponse"
      },
      usableAsTool: true,
      inputs: [import_n8n_workflow.NodeConnectionTypes.Main],
      outputs: [import_n8n_workflow.NodeConnectionTypes.Main],
      credentials: [
        {
          name: "getResponseApi",
          required: true,
          displayOptions: {
            show: {
              authentication: ["apiKey"]
            }
          }
        },
        {
          name: "getResponseOAuth2Api",
          required: true,
          displayOptions: {
            show: {
              authentication: ["oAuth2"]
            }
          }
        }
      ],
      properties: [
        {
          displayName: "Authentication",
          name: "authentication",
          type: "options",
          options: [
            {
              name: "API Key",
              value: "apiKey"
            },
            {
              name: "OAuth2",
              value: "oAuth2"
            }
          ],
          default: "apiKey"
        },
        {
          displayName: "Resource",
          name: "resource",
          type: "options",
          noDataExpression: true,
          options: [
            {
              name: "Contact",
              value: "contact"
            }
          ],
          default: "contact"
        },
        ...import_ContactDescription.contactOperations,
        ...import_ContactDescription.contactFields
      ]
    };
    this.methods = {
      loadOptions: {
        // Get all the campaigns to display them to user so that they can
        // select them easily
        async getCampaigns() {
          const returnData = [];
          const campaigns = await import_GenericFunctions.getresponseApiRequest.call(this, "GET", "/campaigns");
          for (const campaign of campaigns) {
            returnData.push({
              name: campaign.name,
              value: campaign.campaignId
            });
          }
          return returnData;
        },
        // Get all the tagd to display them to user so that they can
        // select them easily
        async getTags() {
          const returnData = [];
          const tags = await import_GenericFunctions.getresponseApiRequest.call(this, "GET", "/tags");
          for (const tag of tags) {
            returnData.push({
              name: tag.name,
              value: tag.tagId
            });
          }
          return returnData;
        },
        // Get all the custom fields to display them to user so that they can
        // select them easily
        async getCustomFields() {
          const returnData = [];
          const customFields = await import_GenericFunctions.getresponseApiRequest.call(this, "GET", "/custom-fields");
          for (const customField of customFields) {
            returnData.push({
              name: customField.name,
              value: customField.customFieldId
            });
          }
          return returnData;
        }
      }
    };
  }
  async execute() {
    const items = this.getInputData();
    const returnData = [];
    const length = items.length;
    const qs = {};
    let responseData;
    const resource = this.getNodeParameter("resource", 0);
    const operation = this.getNodeParameter("operation", 0);
    for (let i = 0; i < length; i++) {
      try {
        if (resource === "contact") {
          if (operation === "create") {
            const email = this.getNodeParameter("email", i);
            const campaignId = this.getNodeParameter("campaignId", i);
            const additionalFields = this.getNodeParameter("additionalFields", i);
            const body = {
              email,
              campaign: {
                campaignId
              }
            };
            Object.assign(body, additionalFields);
            if (additionalFields.customFieldsUi) {
              const customFieldValues = additionalFields.customFieldsUi.customFieldValues;
              if (customFieldValues) {
                body.customFieldValues = customFieldValues;
                for (let index = 0; index < customFieldValues.length; index++) {
                  if (!Array.isArray(customFieldValues[index].value)) {
                    customFieldValues[index].value = [customFieldValues[index].value];
                  }
                }
                delete body.customFieldsUi;
              }
            }
            responseData = await import_GenericFunctions.getresponseApiRequest.call(this, "POST", "/contacts", body);
            responseData = { success: true };
          }
          if (operation === "delete") {
            const contactId = this.getNodeParameter("contactId", i);
            const options = this.getNodeParameter("options", i);
            Object.assign(qs, options);
            responseData = await import_GenericFunctions.getresponseApiRequest.call(
              this,
              "DELETE",
              `/contacts/${contactId}`,
              {},
              qs
            );
            responseData = { success: true };
          }
          if (operation === "get") {
            const contactId = this.getNodeParameter("contactId", i);
            const options = this.getNodeParameter("options", i);
            Object.assign(qs, options);
            responseData = await import_GenericFunctions.getresponseApiRequest.call(
              this,
              "GET",
              `/contacts/${contactId}`,
              {},
              qs
            );
          }
          if (operation === "getAll") {
            const returnAll = this.getNodeParameter("returnAll", i);
            const options = this.getNodeParameter("options", i);
            const timezone = this.getTimezone();
            Object.assign(qs, options);
            const isNotQuery = ["sortBy", "sortOrder", "additionalFlags", "fields", "exactMatch"];
            const isDate = ["createdOnFrom", "createdOnTo", "changeOnFrom", "changeOnTo"];
            const dateMapToKey = {
              createdOnFrom: "[createdOn][from]",
              createdOnTo: "[createdOn][to]",
              changeOnFrom: "[changeOn][from]",
              changeOnTo: "[changeOn][to]"
            };
            for (const key of Object.keys(qs)) {
              if (!isNotQuery.includes(key)) {
                if (isDate.includes(key)) {
                  qs[`query${dateMapToKey[key]}`] = import_moment_timezone.default.tz(qs[key], timezone).format("YYYY-MM-DDTHH:mm:ssZZ");
                } else {
                  qs[`query[${key}]`] = qs[key];
                }
                delete qs[key];
              }
            }
            if (qs.sortBy) {
              qs[`sort[${qs.sortBy}]`] = qs.sortOrder || "ASC";
            }
            if (qs.exactMatch === true) {
              qs.additionalFlags = "exactMatch";
              delete qs.exactMatch;
            }
            if (returnAll) {
              responseData = await import_GenericFunctions.getResponseApiRequestAllItems.call(
                this,
                "GET",
                "/contacts",
                {},
                qs
              );
            } else {
              qs.perPage = this.getNodeParameter("limit", i);
              responseData = await import_GenericFunctions.getresponseApiRequest.call(this, "GET", "/contacts", {}, qs);
            }
          }
          if (operation === "update") {
            const contactId = this.getNodeParameter("contactId", i);
            const updateFields = this.getNodeParameter("updateFields", i);
            const body = {};
            Object.assign(body, updateFields);
            if (updateFields.customFieldsUi) {
              const customFieldValues = updateFields.customFieldsUi.customFieldValues;
              customFieldValues.forEach((entry) => {
                if (typeof entry.value === "string") {
                  entry.value = entry.value.split(",").map((value) => value.trim());
                }
              });
              if (customFieldValues) {
                body.customFieldValues = customFieldValues;
                delete body.customFieldsUi;
              }
            }
            responseData = await import_GenericFunctions.getresponseApiRequest.call(
              this,
              "POST",
              `/contacts/${contactId}`,
              body
            );
          }
        }
        const executionData = this.helpers.constructExecutionMetaData(
          this.helpers.returnJsonArray(responseData),
          { itemData: { item: i } }
        );
        returnData.push(...executionData);
      } catch (error) {
        if (this.continueOnFail()) {
          const executionErrorData = this.helpers.constructExecutionMetaData(
            this.helpers.returnJsonArray({ error: error.message }),
            { itemData: { item: i } }
          );
          returnData.push(...executionErrorData);
          continue;
        }
        throw error;
      }
    }
    return [returnData];
  }
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  GetResponse
});
//# sourceMappingURL=GetResponse.node.js.map