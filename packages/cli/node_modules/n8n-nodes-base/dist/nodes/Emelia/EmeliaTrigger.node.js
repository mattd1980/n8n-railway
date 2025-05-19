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
var EmeliaTrigger_node_exports = {};
__export(EmeliaTrigger_node_exports, {
  EmeliaTrigger: () => EmeliaTrigger
});
module.exports = __toCommonJS(EmeliaTrigger_node_exports);
var import_n8n_workflow = require("n8n-workflow");
var import_GenericFunctions = require("./GenericFunctions");
class EmeliaTrigger {
  constructor() {
    this.description = {
      displayName: "Emelia Trigger",
      name: "emeliaTrigger",
      icon: "file:emelia.svg",
      subtitle: '={{$parameter["operation"] + ": " + $parameter["resource"]}}',
      group: ["trigger"],
      version: 1,
      description: "Handle Emelia campaign activity events via webhooks",
      defaults: {
        name: "Emelia Trigger"
      },
      inputs: [],
      outputs: [import_n8n_workflow.NodeConnectionTypes.Main],
      credentials: [
        {
          name: "emeliaApi",
          required: true,
          testedBy: "emeliaApiTest"
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
          displayName: "Campaign Name or ID",
          name: "campaignId",
          type: "options",
          description: 'Choose from the list, or specify an ID using an <a href="https://docs.n8n.io/code/expressions/">expression</a>',
          typeOptions: {
            loadOptionsMethod: "getCampaigns"
          },
          required: true,
          default: ""
        },
        {
          displayName: "Events",
          name: "events",
          type: "multiOptions",
          required: true,
          default: [],
          options: [
            {
              name: "Email Bounced",
              value: "bounced"
            },
            {
              name: "Email Opened",
              value: "opened"
            },
            {
              name: "Email Replied",
              value: "replied"
            },
            {
              name: "Email Sent",
              value: "sent"
            },
            {
              name: "Link Clicked",
              value: "clicked"
            },
            {
              name: "Unsubscribed Contact",
              value: "unsubscribed"
            }
          ]
        }
      ]
    };
    this.methods = {
      credentialTest: {
        emeliaApiTest: import_GenericFunctions.emeliaApiTest
      },
      loadOptions: {
        async getCampaigns() {
          const responseData = await import_GenericFunctions.emeliaGraphqlRequest.call(this, {
            query: `
					query GetCampaigns {
						campaigns {
							_id
							name
						}
					}`,
            operationName: "GetCampaigns",
            variables: "{}"
          });
          return responseData.data.campaigns.map((campaign) => ({
            name: campaign.name,
            value: campaign._id
          }));
        }
      }
    };
    this.webhookMethods = {
      default: {
        async checkExists() {
          const webhookUrl = this.getNodeWebhookUrl("default");
          const campaignId = this.getNodeParameter("campaignId");
          const { webhooks } = await import_GenericFunctions.emeliaApiRequest.call(this, "GET", "/webhook");
          for (const webhook of webhooks) {
            if (webhook.url === webhookUrl && webhook.campaignId === campaignId) {
              return true;
            }
          }
          return false;
        },
        async create() {
          const webhookUrl = this.getNodeWebhookUrl("default");
          const webhookData = this.getWorkflowStaticData("node");
          const events = this.getNodeParameter("events");
          const campaignId = this.getNodeParameter("campaignId");
          const body = {
            hookUrl: webhookUrl,
            events: events.map((e) => e.toUpperCase()),
            campaignId
          };
          const { webhookId } = await import_GenericFunctions.emeliaApiRequest.call(this, "POST", "/webhook/webhook", body);
          webhookData.webhookId = webhookId;
          return true;
        },
        async delete() {
          const webhookData = this.getWorkflowStaticData("node");
          const webhookUrl = this.getNodeWebhookUrl("default");
          const campaignId = this.getNodeParameter("campaignId");
          try {
            const body = {
              hookUrl: webhookUrl,
              campaignId
            };
            await import_GenericFunctions.emeliaApiRequest.call(this, "DELETE", "/webhook/webhook", body);
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
  EmeliaTrigger
});
//# sourceMappingURL=EmeliaTrigger.node.js.map