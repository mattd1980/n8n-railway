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
var LemlistTrigger_node_exports = {};
__export(LemlistTrigger_node_exports, {
  LemlistTrigger: () => LemlistTrigger
});
module.exports = __toCommonJS(LemlistTrigger_node_exports);
var import_n8n_workflow = require("n8n-workflow");
var import_GenericFunctions = require("./GenericFunctions");
class LemlistTrigger {
  constructor() {
    this.description = {
      displayName: "Lemlist Trigger",
      name: "lemlistTrigger",
      icon: "file:lemlist.svg",
      group: ["trigger"],
      version: 1,
      subtitle: '={{$parameter["event"]}}',
      description: "Handle Lemlist events via webhooks",
      defaults: {
        name: "Lemlist Trigger"
      },
      inputs: [],
      outputs: [import_n8n_workflow.NodeConnectionTypes.Main],
      credentials: [
        {
          name: "lemlistApi",
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
          displayName: "Event",
          name: "event",
          type: "options",
          required: true,
          default: "",
          options: [...(0, import_GenericFunctions.getEvents)()]
        },
        {
          displayName: "Options",
          name: "options",
          type: "collection",
          placeholder: "Add Field",
          default: {},
          options: [
            {
              displayName: "Campaign Name or ID",
              name: "campaignId",
              type: "options",
              typeOptions: {
                loadOptionsMethod: "getCampaigns"
              },
              default: "",
              description: `We'll call this hook only for this campaignId. Choose from the list, or specify an ID using an <a href="https://docs.n8n.io/code/expressions/">expression</a>.`
            },
            {
              displayName: "Is First",
              name: "isFirst",
              type: "boolean",
              default: false,
              description: "Whether to call this hook only the first time this activity happened"
            }
          ]
        }
      ]
    };
    this.methods = {
      loadOptions: {
        async getCampaigns() {
          const campaigns = await import_GenericFunctions.lemlistApiRequest.call(this, "GET", "/campaigns");
          return campaigns.map(({ _id, name }) => ({
            name,
            value: _id
          }));
        }
      }
    };
    this.webhookMethods = {
      default: {
        async checkExists() {
          const webhookData = this.getWorkflowStaticData("node");
          const webhookUrl = this.getNodeWebhookUrl("default");
          const webhooks = await import_GenericFunctions.lemlistApiRequest.call(this, "GET", "/hooks");
          for (const webhook of webhooks) {
            if (webhook.targetUrl === webhookUrl) {
              await import_GenericFunctions.lemlistApiRequest.call(this, "DELETE", `/hooks/${webhookData.webhookId}`);
              return false;
            }
          }
          return false;
        },
        async create() {
          const webhookUrl = this.getNodeWebhookUrl("default");
          const webhookData = this.getWorkflowStaticData("node");
          const options = this.getNodeParameter("options");
          const event = this.getNodeParameter("event");
          const body = {
            targetUrl: webhookUrl,
            type: event
          };
          if (event.includes("*")) {
            delete body.type;
          }
          Object.assign(body, options);
          const webhook = await import_GenericFunctions.lemlistApiRequest.call(this, "POST", "/hooks", body);
          webhookData.webhookId = webhook._id;
          return true;
        },
        async delete() {
          const webhookData = this.getWorkflowStaticData("node");
          try {
            await import_GenericFunctions.lemlistApiRequest.call(this, "DELETE", `/hooks/${webhookData.webhookId}`);
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
  LemlistTrigger
});
//# sourceMappingURL=LemlistTrigger.node.js.map