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
var FlowTrigger_node_exports = {};
__export(FlowTrigger_node_exports, {
  FlowTrigger: () => FlowTrigger
});
module.exports = __toCommonJS(FlowTrigger_node_exports);
var import_n8n_workflow = require("n8n-workflow");
var import_GenericFunctions = require("./GenericFunctions");
class FlowTrigger {
  constructor() {
    this.description = {
      displayName: "Flow Trigger",
      name: "flowTrigger",
      icon: "file:flow.svg",
      group: ["trigger"],
      version: 1,
      description: "Handle Flow events via webhooks",
      defaults: {
        name: "Flow Trigger"
      },
      inputs: [],
      outputs: [import_n8n_workflow.NodeConnectionTypes.Main],
      credentials: [
        {
          name: "flowApi",
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
      properties: [
        {
          displayName: "Resource",
          name: "resource",
          type: "options",
          noDataExpression: true,
          default: "",
          options: [
            {
              name: "Project",
              value: "list"
            },
            {
              name: "Task",
              value: "task"
            }
          ],
          description: "Resource that triggers the webhook"
        },
        {
          displayName: "Project ID",
          name: "listIds",
          type: "string",
          required: true,
          default: "",
          displayOptions: {
            show: {
              resource: ["list"]
            },
            hide: {
              resource: ["task"]
            }
          },
          description: 'Lists IDs, perhaps known better as "Projects" separated by a comma (,)'
        },
        {
          displayName: "Task ID",
          name: "taskIds",
          type: "string",
          required: true,
          default: "",
          displayOptions: {
            show: {
              resource: ["task"]
            },
            hide: {
              resource: ["list"]
            }
          },
          description: "Task IDs separated by a comma (,)"
        }
      ]
    };
    this.webhookMethods = {
      default: {
        async checkExists() {
          const credentials = await this.getCredentials("flowApi");
          let webhooks;
          const qs = {};
          const webhookData = this.getWorkflowStaticData("node");
          if (!Array.isArray(webhookData.webhookIds)) {
            webhookData.webhookIds = [];
          }
          if (!webhookData.webhookIds.length) {
            return false;
          }
          qs.organization_id = credentials.organizationId;
          const endpoint = "/integration_webhooks";
          webhooks = await import_GenericFunctions.flowApiRequest.call(this, "GET", endpoint, {}, qs);
          webhooks = webhooks.integration_webhooks;
          for (const webhook of webhooks) {
            if (webhookData.webhookIds.includes(webhook.id)) {
              continue;
            } else {
              return false;
            }
          }
          return true;
        },
        async create() {
          const credentials = await this.getCredentials("flowApi");
          let resourceIds, body, responseData;
          const webhookUrl = this.getNodeWebhookUrl("default");
          const webhookData = this.getWorkflowStaticData("node");
          const resource = this.getNodeParameter("resource");
          const endpoint = "/integration_webhooks";
          if (resource === "list") {
            resourceIds = this.getNodeParameter("listIds").split(",");
          }
          if (resource === "task") {
            resourceIds = this.getNodeParameter("taskIds").split(",");
          }
          for (const resourceId of resourceIds) {
            body = {
              organization_id: credentials.organizationId,
              integration_webhook: {
                name: "n8n-trigger",
                url: webhookUrl,
                resource_type: resource,
                resource_id: parseInt(resourceId, 10)
              }
            };
            try {
              responseData = await import_GenericFunctions.flowApiRequest.call(this, "POST", endpoint, body);
            } catch (error) {
              return false;
            }
            if (responseData.integration_webhook === void 0 || responseData.integration_webhook.id === void 0) {
              return false;
            }
            webhookData.webhookIds.push(responseData.integration_webhook.id);
          }
          return true;
        },
        async delete() {
          const credentials = await this.getCredentials("flowApi");
          const qs = {};
          const webhookData = this.getWorkflowStaticData("node");
          qs.organization_id = credentials.organizationId;
          if (webhookData.webhookIds.length > 0) {
            for (const webhookId of webhookData.webhookIds) {
              const endpoint = `/integration_webhooks/${webhookId}`;
              try {
                await import_GenericFunctions.flowApiRequest.call(this, "DELETE", endpoint, {}, qs);
              } catch (error) {
                return false;
              }
            }
            delete webhookData.webhookIds;
          }
          return true;
        }
      }
    };
  }
  async webhook() {
    const req = this.getRequestObject();
    return {
      workflowData: [this.helpers.returnJsonArray(req.body)]
    };
  }
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  FlowTrigger
});
//# sourceMappingURL=FlowTrigger.node.js.map