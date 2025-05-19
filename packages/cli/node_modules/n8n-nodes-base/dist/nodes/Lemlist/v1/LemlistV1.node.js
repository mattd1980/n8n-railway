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
var LemlistV1_node_exports = {};
__export(LemlistV1_node_exports, {
  LemlistV1: () => LemlistV1
});
module.exports = __toCommonJS(LemlistV1_node_exports);
var import_isEmpty = __toESM(require("lodash/isEmpty"));
var import_omit = __toESM(require("lodash/omit"));
var import_n8n_workflow = require("n8n-workflow");
var import_descriptions = require("./descriptions");
var import_GenericFunctions = require("../GenericFunctions");
const versionDescription = {
  displayName: "Lemlist",
  name: "lemlist",
  icon: "file:lemlist.svg",
  group: ["transform"],
  version: 1,
  subtitle: '={{$parameter["operation"] + ": " + $parameter["resource"]}}',
  description: "Consume the Lemlist API",
  defaults: {
    name: "Lemlist"
  },
  inputs: [import_n8n_workflow.NodeConnectionTypes.Main],
  outputs: [import_n8n_workflow.NodeConnectionTypes.Main],
  credentials: [
    {
      name: "lemlistApi",
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
          name: "Activity",
          value: "activity"
        },
        {
          name: "Campaign",
          value: "campaign"
        },
        {
          name: "Lead",
          value: "lead"
        },
        {
          name: "Team",
          value: "team"
        },
        {
          name: "Unsubscribe",
          value: "unsubscribe"
        }
      ],
      default: "activity"
    },
    ...import_descriptions.activityOperations,
    ...import_descriptions.activityFields,
    ...import_descriptions.campaignOperations,
    ...import_descriptions.campaignFields,
    ...import_descriptions.leadOperations,
    ...import_descriptions.leadFields,
    ...import_descriptions.teamOperations,
    ...import_descriptions.teamFields,
    ...import_descriptions.unsubscribeOperations,
    ...import_descriptions.unsubscribeFields
  ]
};
class LemlistV1 {
  constructor(baseDescription) {
    this.methods = {
      loadOptions: {
        async getCampaigns() {
          const campaigns = await import_GenericFunctions.lemlistApiRequest.call(this, "GET", "/campaigns");
          return campaigns.map(({ _id, name }) => ({
            name,
            value: _id
          }));
        }
      }
    };
    this.description = {
      ...baseDescription,
      ...versionDescription
    };
  }
  async execute() {
    const items = this.getInputData();
    const resource = this.getNodeParameter("resource", 0);
    const operation = this.getNodeParameter("operation", 0);
    let responseData;
    const returnData = [];
    for (let i = 0; i < items.length; i++) {
      try {
        if (resource === "activity") {
          if (operation === "getAll") {
            const returnAll = this.getNodeParameter("returnAll", i);
            const qs = {};
            const filters = this.getNodeParameter("filters", i);
            if (!(0, import_isEmpty.default)(filters)) {
              Object.assign(qs, filters);
            }
            if (returnAll) {
              responseData = await import_GenericFunctions.lemlistApiRequestAllItems.call(this, "GET", "/activities", qs);
            } else {
              qs.limit = this.getNodeParameter("limit", i);
              responseData = await import_GenericFunctions.lemlistApiRequest.call(this, "GET", "/activities", {}, qs);
            }
          }
        } else if (resource === "campaign") {
          if (operation === "getAll") {
            const returnAll = this.getNodeParameter("returnAll", i);
            if (returnAll) {
              responseData = await import_GenericFunctions.lemlistApiRequestAllItems.call(this, "GET", "/campaigns", {});
            } else {
              const qs = {
                limit: this.getNodeParameter("limit", i)
              };
              responseData = await import_GenericFunctions.lemlistApiRequest.call(this, "GET", "/campaigns", {}, qs);
            }
          }
        } else if (resource === "lead") {
          if (operation === "create") {
            const qs = {};
            const additionalFields = this.getNodeParameter("additionalFields", i);
            if (additionalFields.deduplicate !== void 0) {
              qs.deduplicate = additionalFields.deduplicate;
            }
            const body = {};
            const remainingAdditionalFields = (0, import_omit.default)(additionalFields, "deduplicate");
            if (!(0, import_isEmpty.default)(remainingAdditionalFields)) {
              Object.assign(body, remainingAdditionalFields);
            }
            const campaignId = this.getNodeParameter("campaignId", i);
            const email = this.getNodeParameter("email", i);
            const endpoint = `/campaigns/${campaignId}/leads/${email}`;
            responseData = await import_GenericFunctions.lemlistApiRequest.call(this, "POST", endpoint, body, qs);
          } else if (operation === "delete") {
            const campaignId = this.getNodeParameter("campaignId", i);
            const email = this.getNodeParameter("email", i);
            const endpoint = `/campaigns/${campaignId}/leads/${email}`;
            responseData = await import_GenericFunctions.lemlistApiRequest.call(
              this,
              "DELETE",
              endpoint,
              {},
              { action: "remove" }
            );
          } else if (operation === "get") {
            const email = this.getNodeParameter("email", i);
            responseData = await import_GenericFunctions.lemlistApiRequest.call(this, "GET", `/leads/${email}`);
          } else if (operation === "unsubscribe") {
            const campaignId = this.getNodeParameter("campaignId", i);
            const email = this.getNodeParameter("email", i);
            const endpoint = `/campaigns/${campaignId}/leads/${email}`;
            responseData = await import_GenericFunctions.lemlistApiRequest.call(this, "DELETE", endpoint);
          }
        } else if (resource === "team") {
          if (operation === "get") {
            responseData = await import_GenericFunctions.lemlistApiRequest.call(this, "GET", "/team");
          }
        } else if (resource === "unsubscribe") {
          if (operation === "add") {
            const email = this.getNodeParameter("email", i);
            responseData = await import_GenericFunctions.lemlistApiRequest.call(this, "POST", `/unsubscribes/${email}`);
          } else if (operation === "delete") {
            const email = this.getNodeParameter("email", i);
            responseData = await import_GenericFunctions.lemlistApiRequest.call(this, "DELETE", `/unsubscribes/${email}`);
          } else if (operation === "getAll") {
            const returnAll = this.getNodeParameter("returnAll", i);
            if (returnAll) {
              responseData = await import_GenericFunctions.lemlistApiRequestAllItems.call(this, "GET", "/unsubscribes", {});
            } else {
              const qs = {
                limit: this.getNodeParameter("limit", i)
              };
              responseData = await import_GenericFunctions.lemlistApiRequest.call(this, "GET", "/unsubscribes", {}, qs);
            }
          }
        }
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
      const executionData = this.helpers.constructExecutionMetaData(
        this.helpers.returnJsonArray(responseData),
        { itemData: { item: i } }
      );
      returnData.push(...executionData);
    }
    return [returnData];
  }
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  LemlistV1
});
//# sourceMappingURL=LemlistV1.node.js.map