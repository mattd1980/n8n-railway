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
var AffinityTrigger_node_exports = {};
__export(AffinityTrigger_node_exports, {
  AffinityTrigger: () => AffinityTrigger
});
module.exports = __toCommonJS(AffinityTrigger_node_exports);
var import_n8n_workflow = require("n8n-workflow");
var import_GenericFunctions = require("./GenericFunctions");
class AffinityTrigger {
  constructor() {
    this.description = {
      displayName: "Affinity Trigger",
      name: "affinityTrigger",
      icon: { light: "file:affinity.svg", dark: "file:affinity.dark.svg" },
      group: ["trigger"],
      version: 1,
      description: "Handle Affinity events via webhooks",
      defaults: {
        name: "Affinity Trigger"
      },
      inputs: [],
      outputs: [import_n8n_workflow.NodeConnectionTypes.Main],
      credentials: [
        {
          name: "affinityApi",
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
              name: "field_value.created",
              value: "field_value.created"
            },
            {
              name: "field_value.deleted",
              value: "field_value.deleted"
            },
            {
              name: "field_value.updated",
              value: "field_value.updated"
            },
            {
              name: "field.created",
              value: "field.created"
            },
            {
              name: "field.deleted",
              value: "field.deleted"
            },
            {
              name: "field.updated",
              value: "field.updated"
            },
            {
              name: "file.created",
              value: "file.created"
            },
            {
              name: "file.deleted",
              value: "file.deleted"
            },
            {
              name: "list_entry.created",
              value: "list_entry.created"
            },
            {
              name: "list_entry.deleted",
              value: "list_entry.deleted"
            },
            {
              name: "list.created",
              value: "list.created"
            },
            {
              name: "list.deleted",
              value: "list.deleted"
            },
            {
              name: "list.updated",
              value: "list.updated"
            },
            {
              name: "note.created",
              value: "note.created"
            },
            {
              name: "note.deleted",
              value: "note.deleted"
            },
            {
              name: "note.updated",
              value: "note.updated"
            },
            {
              name: "opportunity.created",
              value: "opportunity.created"
            },
            {
              name: "opportunity.deleted",
              value: "opportunity.deleted"
            },
            {
              name: "opportunity.updated",
              value: "opportunity.updated"
            },
            {
              name: "organization.created",
              value: "organization.created"
            },
            {
              name: "organization.deleted",
              value: "organization.deleted"
            },
            {
              name: "organization.updated",
              value: "organization.updated"
            },
            {
              name: "person.created",
              value: "person.created"
            },
            {
              name: "person.deleted",
              value: "person.deleted"
            },
            {
              name: "person.updated",
              value: "person.updated"
            }
          ],
          default: [],
          required: true,
          description: "Webhook events that will be enabled for that endpoint"
        }
      ]
    };
    this.webhookMethods = {
      default: {
        async checkExists() {
          const endpoint = "/webhook";
          const responseData = await import_GenericFunctions.affinityApiRequest.call(this, "GET", endpoint, {});
          const webhookUrl = this.getNodeWebhookUrl("default");
          const events = this.getNodeParameter("events");
          for (const webhook of responseData) {
            if ((0, import_GenericFunctions.eventsExist)(webhook.subscriptions, events) && webhook.webhook_url === webhookUrl) {
              const webhookData = this.getWorkflowStaticData("node");
              webhookData.webhookId = webhook.id;
              return true;
            }
          }
          return false;
        },
        async create() {
          const webhookUrl = this.getNodeWebhookUrl("default");
          if (webhookUrl.includes("%20")) {
            throw new import_n8n_workflow.NodeOperationError(
              this.getNode(),
              "The name of the Affinity Trigger Node is not allowed to contain any spaces!"
            );
          }
          const events = this.getNodeParameter("events");
          const endpoint = "/webhook/subscribe";
          const body = {
            webhook_url: webhookUrl,
            subscriptions: events
          };
          const responseData = await import_GenericFunctions.affinityApiRequest.call(this, "POST", endpoint, body);
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
            const endpoint = `/webhook/${webhookData.webhookId}`;
            const responseData = await import_GenericFunctions.affinityApiRequest.call(this, "DELETE", endpoint);
            if (!responseData.success) {
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
    const bodyData = this.getBodyData();
    if (bodyData.type === "sample.webhook") {
      return {};
    }
    let responseData = {};
    if (bodyData.type && bodyData.body) {
      const resource = bodyData.type.split(".")[0];
      const id = bodyData.body.id;
      responseData = await import_GenericFunctions.affinityApiRequest.call(this, "GET", `/${(0, import_GenericFunctions.mapResource)(resource)}/${id}`);
      responseData.type = bodyData.type;
    }
    return {
      workflowData: [this.helpers.returnJsonArray(responseData)]
    };
  }
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  AffinityTrigger
});
//# sourceMappingURL=AffinityTrigger.node.js.map