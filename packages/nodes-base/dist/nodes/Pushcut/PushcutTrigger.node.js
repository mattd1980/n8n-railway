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
var PushcutTrigger_node_exports = {};
__export(PushcutTrigger_node_exports, {
  PushcutTrigger: () => PushcutTrigger
});
module.exports = __toCommonJS(PushcutTrigger_node_exports);
var import_n8n_workflow = require("n8n-workflow");
var import_GenericFunctions = require("./GenericFunctions");
class PushcutTrigger {
  constructor() {
    this.description = {
      displayName: "Pushcut Trigger",
      name: "pushcutTrigger",
      // eslint-disable-next-line n8n-nodes-base/node-class-description-icon-not-svg
      icon: "file:pushcut.png",
      group: ["trigger"],
      version: 1,
      description: "Starts the workflow when Pushcut events occur",
      defaults: {
        name: "Pushcut Trigger"
      },
      inputs: [],
      outputs: [import_n8n_workflow.NodeConnectionTypes.Main],
      credentials: [
        {
          name: "pushcutApi",
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
          displayName: "Action Name",
          name: "actionName",
          type: "string",
          description: "Choose any name you would like. It will show up as a server action in the app.",
          default: ""
        }
      ]
    };
    this.webhookMethods = {
      default: {
        async checkExists() {
          const webhookUrl = this.getNodeWebhookUrl("default");
          const webhookData = this.getWorkflowStaticData("node");
          const actionName = this.getNodeParameter("actionName");
          const endpoint = "/subscriptions";
          const webhooks = await import_GenericFunctions.pushcutApiRequest.call(this, "GET", endpoint, {});
          for (const webhook of webhooks) {
            if (webhook.url === webhookUrl && webhook.actionName === actionName) {
              webhookData.webhookId = webhook.id;
              return true;
            }
          }
          return false;
        },
        async create() {
          const webhookData = this.getWorkflowStaticData("node");
          const webhookUrl = this.getNodeWebhookUrl("default");
          const actionName = this.getNodeParameter("actionName");
          const endpoint = "/subscriptions";
          const body = {
            actionName,
            url: webhookUrl
          };
          const responseData = await import_GenericFunctions.pushcutApiRequest.call(this, "POST", endpoint, body);
          if (responseData.id === void 0) {
            return false;
          }
          webhookData.webhookId = responseData.id;
          return true;
        },
        async delete() {
          const webhookData = this.getWorkflowStaticData("node");
          if (webhookData.webhookId !== void 0) {
            const endpoint = `/subscriptions/${webhookData.webhookId}`;
            try {
              await import_GenericFunctions.pushcutApiRequest.call(this, "DELETE", endpoint);
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
    const body = this.getBodyData();
    return {
      workflowData: [this.helpers.returnJsonArray(body)]
    };
  }
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  PushcutTrigger
});
//# sourceMappingURL=PushcutTrigger.node.js.map