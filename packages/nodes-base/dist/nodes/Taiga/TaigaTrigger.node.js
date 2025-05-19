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
var TaigaTrigger_node_exports = {};
__export(TaigaTrigger_node_exports, {
  TaigaTrigger: () => TaigaTrigger
});
module.exports = __toCommonJS(TaigaTrigger_node_exports);
var import_n8n_workflow = require("n8n-workflow");
var import_GenericFunctions = require("./GenericFunctions");
class TaigaTrigger {
  constructor() {
    this.description = {
      displayName: "Taiga Trigger",
      name: "taigaTrigger",
      icon: "file:taiga.svg",
      group: ["trigger"],
      version: 1,
      subtitle: '={{"project:" + $parameter["projectSlug"]}}',
      description: "Handle Taiga events via webhook",
      defaults: {
        name: "Taiga Trigger"
      },
      inputs: [],
      outputs: [import_n8n_workflow.NodeConnectionTypes.Main],
      credentials: [
        {
          name: "taigaApi",
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
          displayName: "Project Name or ID",
          name: "projectId",
          type: "options",
          description: 'Choose from the list, or specify an ID using an <a href="https://docs.n8n.io/code/expressions/">expression</a>',
          typeOptions: {
            loadOptionsMethod: "getUserProjects"
          },
          default: "",
          required: true
        },
        {
          displayName: "Resources",
          name: "resources",
          type: "multiOptions",
          required: true,
          default: ["all"],
          options: [
            {
              name: "All",
              value: "all"
            },
            {
              name: "Issue",
              value: "issue"
            },
            {
              name: "Milestone (Sprint)",
              value: "milestone"
            },
            {
              name: "Task",
              value: "task"
            },
            {
              name: "User Story",
              value: "userstory"
            },
            {
              name: "Wikipage",
              value: "wikipage"
            }
          ],
          description: "Resources to listen to"
        },
        {
          displayName: "Operations",
          name: "operations",
          type: "multiOptions",
          required: true,
          default: ["all"],
          description: "Operations to listen to",
          options: [
            {
              name: "All",
              value: "all"
            },
            {
              name: "Create",
              value: "create"
            },
            {
              name: "Delete",
              value: "delete"
            },
            {
              name: "Update",
              value: "change"
            }
          ]
        }
      ]
    };
    this.methods = {
      loadOptions: {
        // Get all the available projects to display them to user so that they can
        // select them easily
        async getUserProjects() {
          const returnData = [];
          const { id } = await import_GenericFunctions.taigaApiRequest.call(this, "GET", "/users/me");
          const projects = await import_GenericFunctions.taigaApiRequest.call(this, "GET", "/projects", {}, { member: id });
          for (const project of projects) {
            const projectName = project.name;
            const projectId = project.id;
            returnData.push({
              name: projectName,
              value: projectId
            });
          }
          return returnData;
        }
      }
    };
    this.webhookMethods = {
      default: {
        async checkExists() {
          const webhookUrl = this.getNodeWebhookUrl("default");
          const webhookData = this.getWorkflowStaticData("node");
          const endpoint = "/webhooks";
          const webhooks = await import_GenericFunctions.taigaApiRequest.call(this, "GET", endpoint);
          for (const webhook of webhooks) {
            if (webhook.url === webhookUrl) {
              webhookData.webhookId = webhook.id;
              webhookData.key = webhook.key;
              return true;
            }
          }
          return false;
        },
        async create() {
          const credentials = await this.getCredentials("taigaApi");
          const webhookUrl = this.getNodeWebhookUrl("default");
          const webhookData = this.getWorkflowStaticData("node");
          const projectId = this.getNodeParameter("projectId");
          const key = (0, import_GenericFunctions.getAutomaticSecret)(credentials);
          const body = {
            name: `n8n-webhook:${webhookUrl}`,
            url: webhookUrl,
            key,
            project: projectId
          };
          const { id } = await import_GenericFunctions.taigaApiRequest.call(this, "POST", "/webhooks", body);
          webhookData.webhookId = id;
          webhookData.key = key;
          return true;
        },
        async delete() {
          const webhookData = this.getWorkflowStaticData("node");
          try {
            await import_GenericFunctions.taigaApiRequest.call(this, "DELETE", `/webhooks/${webhookData.webhookId}`);
          } catch (error) {
            return false;
          }
          delete webhookData.webhookId;
          delete webhookData.key;
          return true;
        }
      }
    };
  }
  async webhook() {
    const body = this.getRequestObject().body;
    const operations = this.getNodeParameter("operations", []);
    const resources = this.getNodeParameter("resources", []);
    if (!operations.includes("all") && !operations.includes(body.action)) {
      return {};
    }
    if (!resources.includes("all") && !resources.includes(body.type)) {
      return {};
    }
    return {
      workflowData: [this.helpers.returnJsonArray(body)]
    };
  }
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  TaigaTrigger
});
//# sourceMappingURL=TaigaTrigger.node.js.map