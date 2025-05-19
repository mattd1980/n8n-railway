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
var CopperTrigger_node_exports = {};
__export(CopperTrigger_node_exports, {
  CopperTrigger: () => CopperTrigger
});
module.exports = __toCommonJS(CopperTrigger_node_exports);
var import_n8n_workflow = require("n8n-workflow");
var import_GenericFunctions = require("./GenericFunctions");
class CopperTrigger {
  constructor() {
    this.description = {
      displayName: "Copper Trigger",
      name: "copperTrigger",
      icon: "file:copper.svg",
      group: ["trigger"],
      version: 1,
      description: "Handle Copper events via webhooks",
      defaults: {
        name: "Copper Trigger"
      },
      inputs: [],
      outputs: [import_n8n_workflow.NodeConnectionTypes.Main],
      credentials: [
        {
          name: "copperApi",
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
          required: true,
          default: "",
          options: [
            {
              name: "Company",
              value: "company"
            },
            {
              name: "Lead",
              value: "lead"
            },
            {
              name: "Opportunity",
              value: "opportunity"
            },
            {
              name: "Person",
              value: "person"
            },
            {
              name: "Project",
              value: "project"
            },
            {
              name: "Task",
              value: "task"
            }
          ],
          description: "The resource which will fire the event"
        },
        {
          displayName: "Event",
          name: "event",
          type: "options",
          required: true,
          default: "",
          options: [
            {
              name: "Delete",
              value: "delete",
              description: "An existing record is removed"
            },
            {
              name: "New",
              value: "new",
              description: "A new record is created"
            },
            {
              name: "Update",
              value: "update",
              description: "Any field in the existing entity record is changed"
            }
          ],
          description: "The event to listen to"
        }
      ]
    };
    this.webhookMethods = {
      default: {
        async checkExists() {
          const webhookData = this.getWorkflowStaticData("node");
          if (webhookData.webhookId === void 0) {
            return false;
          }
          const endpoint = `/webhooks/${webhookData.webhookId}`;
          try {
            await import_GenericFunctions.copperApiRequest.call(this, "GET", endpoint);
          } catch (error) {
            return false;
          }
          return true;
        },
        async create() {
          const webhookUrl = this.getNodeWebhookUrl("default");
          const webhookData = this.getWorkflowStaticData("node");
          const resource = this.getNodeParameter("resource");
          const event = this.getNodeParameter("event");
          const endpoint = "/webhooks";
          const body = {
            target: webhookUrl,
            type: resource,
            event
          };
          const credentials = await this.getCredentials("copperApi");
          body.secret = {
            secret: (0, import_GenericFunctions.getAutomaticSecret)(credentials)
          };
          const { id } = await import_GenericFunctions.copperApiRequest.call(this, "POST", endpoint, body);
          webhookData.webhookId = id;
          return true;
        },
        async delete() {
          const webhookData = this.getWorkflowStaticData("node");
          const endpoint = `/webhooks/${webhookData.webhookId}`;
          try {
            await import_GenericFunctions.copperApiRequest.call(this, "DELETE", endpoint);
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
    const credentials = await this.getCredentials("copperApi");
    const req = this.getRequestObject();
    if (req.body.secret !== (0, import_GenericFunctions.getAutomaticSecret)(credentials)) {
      return {};
    }
    return {
      workflowData: [this.helpers.returnJsonArray(req.body)]
    };
  }
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  CopperTrigger
});
//# sourceMappingURL=CopperTrigger.node.js.map