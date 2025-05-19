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
var CustomerIo_node_exports = {};
__export(CustomerIo_node_exports, {
  CustomerIo: () => CustomerIo
});
module.exports = __toCommonJS(CustomerIo_node_exports);
var import_n8n_workflow = require("n8n-workflow");
var import_CampaignDescription = require("./CampaignDescription");
var import_CustomerDescription = require("./CustomerDescription");
var import_EventDescription = require("./EventDescription");
var import_GenericFunctions = require("./GenericFunctions");
var import_SegmentDescription = require("./SegmentDescription");
class CustomerIo {
  constructor() {
    this.description = {
      displayName: "Customer.io",
      name: "customerIo",
      icon: { light: "file:customerio.svg", dark: "file:customerio.dark.svg" },
      group: ["output"],
      version: 1,
      subtitle: '={{$parameter["operation"] + ": " + $parameter["resource"]}}',
      description: "Consume Customer.io API",
      defaults: {
        name: "Customer.io"
      },
      usableAsTool: true,
      inputs: [import_n8n_workflow.NodeConnectionTypes.Main],
      outputs: [import_n8n_workflow.NodeConnectionTypes.Main],
      credentials: [
        {
          name: "customerIoApi",
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
              name: "Customer",
              value: "customer"
            },
            {
              name: "Event",
              value: "event"
            },
            {
              name: "Campaign",
              value: "campaign"
            },
            {
              name: "Segment",
              value: "segment"
            }
          ],
          default: "customer"
        },
        // CAMPAIGN
        ...import_CampaignDescription.campaignOperations,
        ...import_CampaignDescription.campaignFields,
        // CUSTOMER
        ...import_CustomerDescription.customerOperations,
        ...import_CustomerDescription.customerFields,
        // EVENT
        ...import_EventDescription.eventOperations,
        ...import_EventDescription.eventFields,
        // SEGMENT
        ...import_SegmentDescription.segmentOperations,
        ...import_SegmentDescription.segmentFields
      ]
    };
  }
  async execute() {
    const returnData = [];
    const items = this.getInputData();
    const resource = this.getNodeParameter("resource", 0);
    const operation = this.getNodeParameter("operation", 0);
    const body = {};
    let responseData;
    for (let i = 0; i < items.length; i++) {
      try {
        if (resource === "campaign") {
          if (operation === "get") {
            const campaignId = this.getNodeParameter("campaignId", i);
            const endpoint = `/campaigns/${campaignId}`;
            responseData = await import_GenericFunctions.customerIoApiRequest.call(this, "GET", endpoint, body, "beta");
            responseData = responseData.campaign;
          }
          if (operation === "getAll") {
            const endpoint = "/campaigns";
            responseData = await import_GenericFunctions.customerIoApiRequest.call(this, "GET", endpoint, body, "beta");
            responseData = responseData.campaigns;
          }
          if (operation === "getMetrics") {
            const campaignId = this.getNodeParameter("campaignId", i);
            const jsonParameters = this.getNodeParameter("jsonParameters", i);
            if (jsonParameters) {
              const additionalFieldsJson = this.getNodeParameter(
                "additionalFieldsJson",
                i
              );
              if (additionalFieldsJson !== "") {
                if ((0, import_GenericFunctions.validateJSON)(additionalFieldsJson) !== void 0) {
                  Object.assign(body, JSON.parse(additionalFieldsJson));
                } else {
                  throw new import_n8n_workflow.NodeOperationError(
                    this.getNode(),
                    "Additional fields must be a valid JSON",
                    { itemIndex: i }
                  );
                }
              }
            } else {
              const additionalFields = this.getNodeParameter("additionalFields", i);
              const period = this.getNodeParameter("period", i);
              let endpoint = `/campaigns/${campaignId}/metrics`;
              if (period !== "days") {
                endpoint = `${endpoint}?period=${period}`;
              }
              if (additionalFields.steps) {
                body.steps = additionalFields.steps;
              }
              if (additionalFields.type) {
                if (additionalFields.type === "urbanAirship") {
                  additionalFields.type = "urban_airship";
                } else {
                  body.type = additionalFields.type;
                }
              }
              responseData = await import_GenericFunctions.customerIoApiRequest.call(this, "GET", endpoint, body, "beta");
              responseData = responseData.metric;
            }
          }
        }
        if (resource === "customer") {
          if (operation === "upsert") {
            const id = this.getNodeParameter("id", i);
            const jsonParameters = this.getNodeParameter("jsonParameters", i);
            if (jsonParameters) {
              const additionalFieldsJson = this.getNodeParameter(
                "additionalFieldsJson",
                i
              );
              if (additionalFieldsJson !== "") {
                if ((0, import_GenericFunctions.validateJSON)(additionalFieldsJson) !== void 0) {
                  Object.assign(body, JSON.parse(additionalFieldsJson));
                } else {
                  throw new import_n8n_workflow.NodeOperationError(
                    this.getNode(),
                    "Additional fields must be a valid JSON",
                    { itemIndex: i }
                  );
                }
              }
            } else {
              const additionalFields = this.getNodeParameter("additionalFields", i);
              if (additionalFields.customProperties) {
                const data = {};
                additionalFields.customProperties.customProperty.map((property) => {
                  data[property.key] = property.value;
                });
                body.data = data;
              }
              if (additionalFields.email) {
                body.email = additionalFields.email;
              }
              if (additionalFields.createdAt) {
                body.created_at = new Date(additionalFields.createdAt).getTime() / 1e3;
              }
            }
            const endpoint = `/customers/${id}`;
            responseData = await import_GenericFunctions.customerIoApiRequest.call(this, "PUT", endpoint, body, "tracking");
            responseData = Object.assign({ id }, body);
          }
          if (operation === "delete") {
            const id = this.getNodeParameter("id", i);
            body.id = id;
            const endpoint = `/customers/${id}`;
            await import_GenericFunctions.customerIoApiRequest.call(this, "DELETE", endpoint, body, "tracking");
            responseData = {
              success: true
            };
          }
        }
        if (resource === "event") {
          if (operation === "track") {
            const customerId = this.getNodeParameter("customerId", i);
            const eventName = this.getNodeParameter("eventName", i);
            const jsonParameters = this.getNodeParameter("jsonParameters", i);
            body.name = eventName;
            if (jsonParameters) {
              const additionalFieldsJson = this.getNodeParameter(
                "additionalFieldsJson",
                i
              );
              if (additionalFieldsJson !== "") {
                if ((0, import_GenericFunctions.validateJSON)(additionalFieldsJson) !== void 0) {
                  Object.assign(body, JSON.parse(additionalFieldsJson));
                } else {
                  throw new import_n8n_workflow.NodeOperationError(
                    this.getNode(),
                    "Additional fields must be a valid JSON",
                    { itemIndex: i }
                  );
                }
              }
            } else {
              const additionalFields = this.getNodeParameter("additionalFields", i);
              const data = {};
              if (additionalFields.customAttributes) {
                additionalFields.customAttributes.customAttribute.map((property) => {
                  data[property.key] = property.value;
                });
              }
              if (additionalFields.type) {
                data.type = additionalFields.type;
              }
              body.data = data;
            }
            const endpoint = `/customers/${customerId}/events`;
            await import_GenericFunctions.customerIoApiRequest.call(this, "POST", endpoint, body, "tracking");
            responseData = {
              success: true
            };
          }
          if (operation === "trackAnonymous") {
            const eventName = this.getNodeParameter("eventName", i);
            const jsonParameters = this.getNodeParameter("jsonParameters", i);
            body.name = eventName;
            if (jsonParameters) {
              const additionalFieldsJson = this.getNodeParameter(
                "additionalFieldsJson",
                i
              );
              if (additionalFieldsJson !== "") {
                if ((0, import_GenericFunctions.validateJSON)(additionalFieldsJson) !== void 0) {
                  Object.assign(body, JSON.parse(additionalFieldsJson));
                } else {
                  throw new import_n8n_workflow.NodeOperationError(
                    this.getNode(),
                    "Additional fields must be a valid JSON",
                    { itemIndex: i }
                  );
                }
              }
            } else {
              const additionalFields = this.getNodeParameter("additionalFields", i);
              const data = {};
              if (additionalFields.customAttributes) {
                additionalFields.customAttributes.customAttribute.map((property) => {
                  data[property.key] = property.value;
                });
              }
              body.data = data;
            }
            const endpoint = "/events";
            await import_GenericFunctions.customerIoApiRequest.call(this, "POST", endpoint, body, "tracking");
            responseData = {
              success: true
            };
          }
        }
        if (resource === "segment") {
          const segmentId = this.getNodeParameter("segmentId", i);
          const customerIds = this.getNodeParameter("customerIds", i);
          body.id = segmentId;
          body.ids = customerIds.split(",");
          let endpoint = "";
          if (operation === "add") {
            endpoint = `/segments/${segmentId}/add_customers`;
          } else {
            endpoint = `/segments/${segmentId}/remove_customers`;
          }
          responseData = await import_GenericFunctions.customerIoApiRequest.call(this, "POST", endpoint, body, "tracking");
          responseData = {
            success: true
          };
        }
        if (Array.isArray(responseData)) {
          returnData.push.apply(returnData, responseData);
        } else {
          returnData.push(responseData);
        }
      } catch (error) {
        if (this.continueOnFail()) {
          returnData.push({ error: error.message });
          continue;
        }
        throw error;
      }
    }
    return [this.helpers.returnJsonArray(returnData)];
  }
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  CustomerIo
});
//# sourceMappingURL=CustomerIo.node.js.map