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
var OnfleetTrigger_node_exports = {};
__export(OnfleetTrigger_node_exports, {
  OnfleetTrigger: () => OnfleetTrigger
});
module.exports = __toCommonJS(OnfleetTrigger_node_exports);
var import_n8n_workflow = require("n8n-workflow");
var import_OnfleetWebhookDescription = require("./descriptions/OnfleetWebhookDescription");
var import_GenericFunctions = require("./GenericFunctions");
var import_WebhookMapping = require("./WebhookMapping");
class OnfleetTrigger {
  constructor() {
    this.description = {
      displayName: "Onfleet Trigger",
      name: "onfleetTrigger",
      icon: "file:Onfleet.svg",
      group: ["trigger"],
      version: 1,
      subtitle: '={{$parameter["triggerOn"]}}',
      description: "Starts the workflow when Onfleet events occur",
      defaults: {
        name: "Onfleet Trigger"
      },
      inputs: [],
      outputs: [import_n8n_workflow.NodeConnectionTypes.Main],
      credentials: [
        {
          name: "onfleetApi",
          required: true,
          testedBy: "onfleetApiTest"
        }
      ],
      webhooks: [
        {
          name: "setup",
          httpMethod: "GET",
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
      properties: [import_OnfleetWebhookDescription.eventDisplay, import_OnfleetWebhookDescription.eventNameField]
    };
    this.webhookMethods = {
      default: {
        async checkExists() {
          const webhookData = this.getWorkflowStaticData("node");
          const webhookUrl = this.getNodeWebhookUrl("default");
          const endpoint = "/webhooks";
          const webhooks = await import_GenericFunctions.onfleetApiRequest.call(this, "GET", endpoint);
          for (const webhook of webhooks) {
            if (webhook.url === webhookUrl && webhook.trigger === event) {
              webhookData.webhookId = webhook.id;
              return true;
            }
          }
          return false;
        },
        async create() {
          const { name = "" } = this.getNodeParameter("additionalFields");
          const triggerOn = this.getNodeParameter("triggerOn");
          const webhookData = this.getWorkflowStaticData("node");
          const webhookUrl = this.getNodeWebhookUrl("default");
          if (webhookUrl.includes("//localhost")) {
            throw new import_n8n_workflow.NodeOperationError(
              this.getNode(),
              'The Webhook can not work on "localhost". Please, either setup n8n on a custom domain or start with "--tunnel"!'
            );
          }
          let newWebhookName = `n8n-webhook:${webhookUrl}`;
          if (name) {
            newWebhookName = `n8n-webhook:${name}`;
          }
          const path = "/webhooks";
          const body = {
            name: newWebhookName,
            url: webhookUrl,
            trigger: import_WebhookMapping.webhookMapping[triggerOn].key
          };
          try {
            const webhook = await import_GenericFunctions.onfleetApiRequest.call(this, "POST", path, body);
            if (webhook.id === void 0) {
              throw new import_n8n_workflow.NodeApiError(this.getNode(), webhook, {
                message: "Onfleet webhook creation response did not contain the expected data"
              });
            }
            webhookData.id = webhook.id;
          } catch (error) {
            const { httpCode = "" } = error;
            if (httpCode === "422") {
              throw new import_n8n_workflow.NodeOperationError(
                this.getNode(),
                "A webhook with the identical URL probably exists already. Please delete it manually in Onfleet!"
              );
            }
            throw error;
          }
          return true;
        },
        async delete() {
          const webhookData = this.getWorkflowStaticData("node");
          const endpoint = `/webhooks/${webhookData.id}`;
          await import_GenericFunctions.onfleetApiRequest.call(this, "DELETE", endpoint);
          return true;
        }
      }
    };
  }
  /**
   * Triggered function when an Onfleet webhook is executed
   */
  async webhook() {
    const req = this.getRequestObject();
    if (this.getWebhookName() === "setup") {
      const res = this.getResponseObject();
      res.status(200).send(req.query.check);
      return { noWebhookResponse: true };
    }
    const returnData = this.getBodyData();
    return {
      workflowData: [this.helpers.returnJsonArray(returnData)]
    };
  }
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  OnfleetTrigger
});
//# sourceMappingURL=OnfleetTrigger.node.js.map