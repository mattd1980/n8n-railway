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
var TrelloTrigger_node_exports = {};
__export(TrelloTrigger_node_exports, {
  TrelloTrigger: () => TrelloTrigger
});
module.exports = __toCommonJS(TrelloTrigger_node_exports);
var import_n8n_workflow = require("n8n-workflow");
var import_GenericFunctions = require("./GenericFunctions");
class TrelloTrigger {
  constructor() {
    this.description = {
      displayName: "Trello Trigger",
      name: "trelloTrigger",
      icon: "file:trello.svg",
      group: ["trigger"],
      version: 1,
      description: "Starts the workflow when Trello events occur",
      defaults: {
        name: "Trello Trigger"
      },
      inputs: [],
      outputs: [import_n8n_workflow.NodeConnectionTypes.Main],
      credentials: [
        {
          name: "trelloApi",
          required: true
        }
      ],
      webhooks: [
        {
          name: "setup",
          httpMethod: "HEAD",
          responseMode: "onReceived",
          path: "webhook"
        },
        {
          name: "default",
          httpMethod: "POST",
          responseMode: "onReceived",
          path: "webhook"
        }
      ],
      properties: [
        {
          displayName: "Model ID",
          name: "id",
          type: "string",
          default: "",
          placeholder: "4d5ea62fd76aa1136000000c",
          required: true,
          description: "ID of the model of which to subscribe to events"
        }
      ]
    };
    this.webhookMethods = {
      default: {
        async checkExists() {
          const credentials = await this.getCredentials("trelloApi");
          const endpoint = `tokens/${credentials.apiToken}/webhooks`;
          const responseData = await import_GenericFunctions.apiRequest.call(this, "GET", endpoint, {});
          const idModel = this.getNodeParameter("id");
          const webhookUrl = this.getNodeWebhookUrl("default");
          for (const webhook of responseData) {
            if (webhook.idModel === idModel && webhook.callbackURL === webhookUrl) {
              const webhookData = this.getWorkflowStaticData("node");
              webhookData.webhookId = webhook.id;
              return true;
            }
          }
          return false;
        },
        async create() {
          const webhookUrl = this.getNodeWebhookUrl("default");
          const credentials = await this.getCredentials("trelloApi");
          const idModel = this.getNodeParameter("id");
          const endpoint = `tokens/${credentials.apiToken}/webhooks`;
          const body = {
            description: `n8n Webhook - ${idModel}`,
            callbackURL: webhookUrl,
            idModel
          };
          const responseData = await import_GenericFunctions.apiRequest.call(this, "POST", endpoint, body);
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
            const credentials = await this.getCredentials("trelloApi");
            const endpoint = `tokens/${credentials.apiToken}/webhooks/${webhookData.webhookId}`;
            const body = {};
            try {
              await import_GenericFunctions.apiRequest.call(this, "DELETE", endpoint, body);
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
    const webhookName = this.getWebhookName();
    if (webhookName === "setup") {
      const res = this.getResponseObject();
      res.status(200).end();
      return {
        noWebhookResponse: true
      };
    }
    const bodyData = this.getBodyData();
    return {
      workflowData: [this.helpers.returnJsonArray(bodyData)]
    };
  }
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  TrelloTrigger
});
//# sourceMappingURL=TrelloTrigger.node.js.map