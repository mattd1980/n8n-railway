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
var HelpScoutTrigger_node_exports = {};
__export(HelpScoutTrigger_node_exports, {
  HelpScoutTrigger: () => HelpScoutTrigger
});
module.exports = __toCommonJS(HelpScoutTrigger_node_exports);
var import_crypto = require("crypto");
var import_n8n_workflow = require("n8n-workflow");
var import_GenericFunctions = require("./GenericFunctions");
class HelpScoutTrigger {
  constructor() {
    this.description = {
      displayName: "Help Scout Trigger",
      name: "helpScoutTrigger",
      icon: "file:helpScout.svg",
      group: ["trigger"],
      version: 1,
      description: "Starts the workflow when Help Scout events occur",
      defaults: {
        name: "Help Scout Trigger"
      },
      inputs: [],
      outputs: [import_n8n_workflow.NodeConnectionTypes.Main],
      credentials: [
        {
          name: "helpScoutOAuth2Api",
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
          displayName: "Events",
          name: "events",
          type: "multiOptions",
          options: [
            {
              name: "Conversation - Assigned",
              value: "convo.assigned"
            },
            {
              name: "Conversation - Created",
              value: "convo.created"
            },
            {
              name: "Conversation - Deleted",
              value: "convo.deleted"
            },
            {
              name: "Conversation - Merged",
              value: "convo.merged"
            },
            {
              name: "Conversation - Moved",
              value: "convo.moved"
            },
            {
              name: "Conversation - Status",
              value: "convo.status"
            },
            {
              name: "Conversation - Tags",
              value: "convo.tags"
            },
            {
              name: "Conversation Agent Reply - Created",
              value: "convo.agent.reply.created"
            },
            {
              name: "Conversation Customer Reply - Created",
              value: "convo.customer.reply.created"
            },
            {
              name: "Conversation Note - Created",
              value: "convo.note.created"
            },
            {
              name: "Customer - Created",
              value: "customer.created"
            },
            {
              name: "Rating - Received",
              value: "satisfaction.ratings"
            }
          ],
          default: [],
          required: true
        }
      ]
    };
    this.webhookMethods = {
      default: {
        async checkExists() {
          const webhookUrl = this.getNodeWebhookUrl("default");
          const webhookData = this.getWorkflowStaticData("node");
          const events = this.getNodeParameter("events");
          const endpoint = "/v2/webhooks";
          const data = await import_GenericFunctions.helpscoutApiRequestAllItems.call(
            this,
            "_embedded.webhooks",
            "GET",
            endpoint,
            {}
          );
          for (const webhook of data) {
            if (webhook.url === webhookUrl) {
              for (const event of events) {
                if (!webhook.events.includes(event) && webhook.state === "enabled") {
                  return false;
                }
              }
            }
            webhookData.webhookId = webhook.id;
            return true;
          }
          return false;
        },
        async create() {
          const webhookData = this.getWorkflowStaticData("node");
          const webhookUrl = this.getNodeWebhookUrl("default");
          const events = this.getNodeParameter("events");
          const endpoint = "/v2/webhooks";
          const body = {
            url: webhookUrl,
            events,
            secret: (0, import_n8n_workflow.randomString)(10).toLowerCase()
          };
          const responseData = await import_GenericFunctions.helpscoutApiRequest.call(
            this,
            "POST",
            endpoint,
            body,
            {},
            void 0,
            { resolveWithFullResponse: true }
          );
          if (responseData.headers["resource-id"] === void 0) {
            return false;
          }
          webhookData.webhookId = responseData.headers["resource-id"];
          webhookData.secret = body.secret;
          return true;
        },
        async delete() {
          const webhookData = this.getWorkflowStaticData("node");
          if (webhookData.webhookId !== void 0) {
            const endpoint = `/v2/webhooks/${webhookData.webhookId}`;
            try {
              await import_GenericFunctions.helpscoutApiRequest.call(this, "DELETE", endpoint);
            } catch (error) {
              return false;
            }
            delete webhookData.webhookId;
            delete webhookData.secret;
          }
          return true;
        }
      }
    };
  }
  async webhook() {
    const req = this.getRequestObject();
    const bodyData = this.getBodyData();
    const headerData = this.getHeaderData();
    const webhookData = this.getWorkflowStaticData("node");
    if (headerData["x-helpscout-signature"] === void 0) {
      return {};
    }
    const computedSignature = (0, import_crypto.createHmac)("sha1", webhookData.secret).update(req.rawBody).digest("base64");
    if (headerData["x-helpscout-signature"] !== computedSignature) {
      return {};
    }
    return {
      workflowData: [this.helpers.returnJsonArray(bodyData)]
    };
  }
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  HelpScoutTrigger
});
//# sourceMappingURL=HelpScoutTrigger.node.js.map