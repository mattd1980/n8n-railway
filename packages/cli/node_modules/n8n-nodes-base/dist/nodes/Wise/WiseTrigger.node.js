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
var WiseTrigger_node_exports = {};
__export(WiseTrigger_node_exports, {
  WiseTrigger: () => WiseTrigger
});
module.exports = __toCommonJS(WiseTrigger_node_exports);
var import_crypto = require("crypto");
var import_n8n_workflow = require("n8n-workflow");
var import_GenericFunctions = require("./GenericFunctions");
class WiseTrigger {
  constructor() {
    this.description = {
      displayName: "Wise Trigger",
      name: "wiseTrigger",
      icon: "file:wise.svg",
      group: ["trigger"],
      version: 1,
      subtitle: '={{$parameter["event"]}}',
      description: "Handle Wise events via webhooks",
      defaults: {
        name: "Wise Trigger"
      },
      inputs: [],
      outputs: [import_n8n_workflow.NodeConnectionTypes.Main],
      credentials: [
        {
          name: "wiseApi",
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
          displayName: "Profile Name or ID",
          name: "profileId",
          type: "options",
          description: 'Choose from the list, or specify an ID using an <a href="https://docs.n8n.io/code/expressions/">expression</a>',
          required: true,
          typeOptions: {
            loadOptionsMethod: "getProfiles"
          },
          default: ""
        },
        {
          displayName: "Event",
          name: "event",
          type: "options",
          required: true,
          default: "",
          options: [
            {
              name: "Balance Credit",
              value: "balanceCredit",
              description: "Triggered every time a balance account is credited"
            },
            {
              name: "Balance Update",
              value: "balanceUpdate",
              description: "Triggered every time a balance account is credited or debited"
            },
            {
              name: "Transfer Active Case",
              value: "transferActiveCases",
              description: "Triggered every time a transfer's list of active cases is updated"
            },
            {
              name: "Transfer State Changed",
              value: "tranferStateChange",
              description: "Triggered every time a transfer's status is updated"
            }
          ]
        }
      ]
    };
    this.methods = {
      loadOptions: {
        async getProfiles() {
          const profiles = await import_GenericFunctions.wiseApiRequest.call(this, "GET", "v1/profiles");
          return profiles.map(({ id, type }) => ({
            name: type.charAt(0).toUpperCase() + type.slice(1),
            value: id
          }));
        }
      }
    };
    this.webhookMethods = {
      default: {
        async checkExists() {
          const webhookData = this.getWorkflowStaticData("node");
          const webhookUrl = this.getNodeWebhookUrl("default");
          const profileId = this.getNodeParameter("profileId");
          const event = this.getNodeParameter("event");
          const webhooks = await import_GenericFunctions.wiseApiRequest.call(
            this,
            "GET",
            `v3/profiles/${profileId}/subscriptions`
          );
          const trigger = (0, import_GenericFunctions.getTriggerName)(event);
          for (const webhook of webhooks) {
            if (webhook.delivery.url === webhookUrl && webhook.scope.id === profileId && webhook.trigger_on === trigger) {
              webhookData.webhookId = webhook.id;
              return true;
            }
          }
          return false;
        },
        async create() {
          const webhookUrl = this.getNodeWebhookUrl("default");
          const webhookData = this.getWorkflowStaticData("node");
          const profileId = this.getNodeParameter("profileId");
          const event = this.getNodeParameter("event");
          const trigger = (0, import_GenericFunctions.getTriggerName)(event);
          const body = {
            name: "n8n Webhook",
            trigger_on: trigger,
            delivery: {
              version: "2.0.0",
              url: webhookUrl
            }
          };
          const webhook = await import_GenericFunctions.wiseApiRequest.call(
            this,
            "POST",
            `v3/profiles/${profileId}/subscriptions`,
            body
          );
          webhookData.webhookId = webhook.id;
          return true;
        },
        async delete() {
          const webhookData = this.getWorkflowStaticData("node");
          const profileId = this.getNodeParameter("profileId");
          try {
            await import_GenericFunctions.wiseApiRequest.call(
              this,
              "DELETE",
              `v3/profiles/${profileId}/subscriptions/${webhookData.webhookId}`
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
    const headers = this.getHeaderData();
    const credentials = await this.getCredentials("wiseApi");
    if (headers["x-test-notification"] === "true") {
      const res = this.getResponseObject();
      res.status(200).end();
      return {
        noWebhookResponse: true
      };
    }
    const signature = headers["x-signature"];
    const publicKey = credentials.environment === "test" ? import_GenericFunctions.testPublicKey : import_GenericFunctions.livePublicKey;
    const sig = (0, import_crypto.createVerify)("RSA-SHA1").update(req.rawBody);
    const verified = sig.verify(publicKey, signature, "base64");
    if (!verified) {
      return {};
    }
    return {
      workflowData: [this.helpers.returnJsonArray(req.body)]
    };
  }
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  WiseTrigger
});
//# sourceMappingURL=WiseTrigger.node.js.map