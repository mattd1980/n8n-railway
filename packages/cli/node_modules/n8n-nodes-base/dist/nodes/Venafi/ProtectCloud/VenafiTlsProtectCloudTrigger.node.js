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
var VenafiTlsProtectCloudTrigger_node_exports = {};
__export(VenafiTlsProtectCloudTrigger_node_exports, {
  VenafiTlsProtectCloudTrigger: () => VenafiTlsProtectCloudTrigger
});
module.exports = __toCommonJS(VenafiTlsProtectCloudTrigger_node_exports);
var import_n8n_workflow = require("n8n-workflow");
var import_GenericFunctions = require("./GenericFunctions");
class VenafiTlsProtectCloudTrigger {
  constructor() {
    this.description = {
      displayName: "Venafi TLS Protect Cloud Trigger",
      name: "venafiTlsProtectCloudTrigger",
      icon: "file:../venafi.svg",
      group: ["trigger"],
      version: 1,
      description: "Starts the workflow when Venafi events occur",
      defaults: {
        name: "Venafi TLS Protect Cloud Trigger"
      },
      credentials: [
        {
          name: "venafiTlsProtectCloudApi",
          required: true
        }
      ],
      webhooks: [
        {
          name: "default",
          httpMethod: "POST",
          responseMode: "onReceived",
          path: "webhook"
        }
      ],
      inputs: [],
      outputs: [import_n8n_workflow.NodeConnectionTypes.Main],
      properties: [
        {
          // eslint-disable-next-line n8n-nodes-base/node-param-display-name-wrong-for-dynamic-options
          displayName: "Resource",
          name: "resource",
          type: "options",
          noDataExpression: true,
          typeOptions: {
            loadOptionsMethod: "getActivityTypes"
          },
          required: true,
          default: [],
          description: 'Choose from the list, or specify an ID using an <a href="https://docs.n8n.io/code/expressions/">expression</a>. Choose from the list, or specify IDs using an <a href="https://docs.n8n.io/code/expressions/">expression</a>. Choose from the list, or specify an ID using an <a href="https://docs.n8n.io/code/expressions/">expression</a>.'
        },
        {
          // eslint-disable-next-line n8n-nodes-base/node-param-display-name-wrong-for-dynamic-multi-options
          displayName: "Trigger On",
          name: "triggerOn",
          type: "multiOptions",
          typeOptions: {
            loadOptionsMethod: "getActivitySubTypes",
            loadOptionsDependsOn: ["resource"]
          },
          required: true,
          default: [],
          description: 'Choose from the list, or specify an ID using an <a href="https://docs.n8n.io/code/expressions/">expression</a>. Choose from the list, or specify IDs using an <a href="https://docs.n8n.io/code/expressions/">expression</a>. Choose from the list, or specify an ID using an <a href="https://docs.n8n.io/code/expressions/">expression</a>. Choose from the list, or specify IDs using an <a href="https://docs.n8n.io/code/expressions/">expression</a>.'
        }
      ]
    };
    this.methods = {
      loadOptions: {
        async getActivityTypes() {
          const activitytypes = await import_GenericFunctions.venafiApiRequest.call(this, "GET", "/v1/activitytypes");
          return activitytypes.map(
            ({ key, readableName }) => ({
              name: readableName,
              value: key
            })
          );
        },
        async getActivitySubTypes() {
          const resource = this.getCurrentNodeParameter("resource");
          const activitytypes = await import_GenericFunctions.venafiApiRequest.call(this, "GET", "/v1/activitytypes");
          const activity = activitytypes.find(({ key }) => key === resource);
          const subActivities = activity.values.map(({ key, readableName }) => ({
            name: readableName,
            value: key
          }));
          subActivities.unshift({ name: "[All]", value: "*" });
          return subActivities;
        }
      }
    };
    this.webhookMethods = {
      default: {
        async checkExists() {
          const webhookUrl = this.getNodeWebhookUrl("default");
          const { connectors } = await import_GenericFunctions.venafiApiRequest.call(this, "GET", "/v1/connectors");
          for (const connector of connectors) {
            const {
              id,
              status,
              properties: {
                target: {
                  connection: { url }
                }
              }
            } = connector;
            if (url === webhookUrl && status === "Active") {
              await import_GenericFunctions.venafiApiRequest.call(this, "DELETE", `/v1/connectors/${id}`);
              return false;
            }
          }
          return false;
        },
        async create() {
          const webhookUrl = this.getNodeWebhookUrl("default");
          const resource = this.getNodeParameter("resource");
          const body = {
            name: `n8n-webhook (${webhookUrl})`,
            properties: {
              connectorKind: "WEBHOOK",
              target: {
                type: "generic",
                connection: {
                  url: webhookUrl
                }
              },
              filter: {
                activityTypes: [resource]
              }
            }
          };
          const responseData = await import_GenericFunctions.venafiApiRequest.call(this, "POST", "/v1/connectors", body);
          if (responseData.id === void 0) {
            return false;
          }
          const webhookData = this.getWorkflowStaticData("node");
          webhookData.webhookId = responseData.id;
          return true;
        },
        async delete() {
          const webhookData = this.getWorkflowStaticData("node");
          if (webhookData.webhookId !== void 0) {
            try {
              await import_GenericFunctions.venafiApiRequest.call(this, "DELETE", `/v1/connectors/${webhookData.webhookId}`);
            } catch (error) {
              return false;
            }
            delete webhookData.webhookId;
          }
          return true;
        }
      }
    };
  }
  async webhook() {
    const { events } = this.getBodyData();
    const triggerOn = this.getNodeParameter("triggerOn");
    if (Array.isArray(events) && events[0]?.message?.includes("TESTING CONNECTION...")) {
      const res = this.getResponseObject();
      res.status(200).end();
      return {
        noWebhookResponse: true
      };
    }
    if (!triggerOn.includes("*") && !triggerOn.includes(events[0]?.eventName)) return {};
    return {
      workflowData: [this.helpers.returnJsonArray(events)]
    };
  }
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  VenafiTlsProtectCloudTrigger
});
//# sourceMappingURL=VenafiTlsProtectCloudTrigger.node.js.map