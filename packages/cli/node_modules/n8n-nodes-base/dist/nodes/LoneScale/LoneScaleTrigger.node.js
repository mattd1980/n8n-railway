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
var LoneScaleTrigger_node_exports = {};
__export(LoneScaleTrigger_node_exports, {
  LoneScaleTrigger: () => LoneScaleTrigger
});
module.exports = __toCommonJS(LoneScaleTrigger_node_exports);
var import_n8n_workflow = require("n8n-workflow");
var import_GenericFunctions = require("./GenericFunctions");
class LoneScaleTrigger {
  constructor() {
    this.description = {
      displayName: "LoneScale Trigger",
      name: "loneScaleTrigger",
      icon: { light: "file:loneScale.svg", dark: "file:loneScale.dark.svg" },
      group: ["trigger"],
      version: 1,
      description: "Trigger LoneScale Workflow",
      defaults: {
        name: "LoneScale Trigger"
      },
      inputs: [],
      outputs: [import_n8n_workflow.NodeConnectionTypes.Main],
      credentials: [
        {
          name: "loneScaleApi",
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
          // eslint-disable-next-line n8n-nodes-base/node-param-display-name-wrong-for-dynamic-options
          displayName: "Workflow Name",
          name: "workflow",
          type: "options",
          noDataExpression: true,
          typeOptions: {
            loadOptionsMethod: "getWorkflows"
          },
          default: "",
          // eslint-disable-next-line n8n-nodes-base/node-param-description-missing-final-period, n8n-nodes-base/node-param-description-wrong-for-dynamic-options
          description: "Select one workflow. Choose from the list",
          required: true
        }
      ]
    };
    this.methods = {
      loadOptions: {
        async getWorkflows() {
          const data = await import_GenericFunctions.lonescaleApiRequest.call(this, "GET", "/workflows");
          return data?.map((d) => ({
            name: d.title,
            value: d.id
          }));
        }
      }
    };
    this.webhookMethods = {
      default: {
        async checkExists() {
          const webhookData = this.getWorkflowStaticData("node");
          const webhookUrl = this.getNodeWebhookUrl("default");
          const workflowId = this.getNodeParameter("workflow");
          const webhook = await import_GenericFunctions.lonescaleApiRequest.call(
            this,
            "GET",
            `/workflows/${workflowId}/hook?type=n8n`
          );
          if (webhook.target_url === webhookUrl) {
            webhookData.webhookId = webhook.webhook_id;
            return true;
          }
          return false;
        },
        async create() {
          const webhookUrl = this.getNodeWebhookUrl("default");
          const webhookData = this.getWorkflowStaticData("node");
          const workflowId = this.getNodeParameter("workflow");
          const body = {
            type: "n8n",
            target_url: webhookUrl
          };
          const webhook = await import_GenericFunctions.lonescaleApiRequest.call(
            this,
            "POST",
            `/workflows/${workflowId}/hook`,
            body
          );
          webhookData.webhookId = webhook.webhook_id;
          return true;
        },
        async delete() {
          const webhookData = this.getWorkflowStaticData("node");
          try {
            await import_GenericFunctions.lonescaleApiRequest.call(
              this,
              "DELETE",
              `/workflows/${webhookData.webhookId}/hook?type=n8n`
            );
          } catch (error) {
            return false;
          }
          delete webhookData.webhookId;
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
  LoneScaleTrigger
});
//# sourceMappingURL=LoneScaleTrigger.node.js.map