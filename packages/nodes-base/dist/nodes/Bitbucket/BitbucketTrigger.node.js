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
var BitbucketTrigger_node_exports = {};
__export(BitbucketTrigger_node_exports, {
  BitbucketTrigger: () => BitbucketTrigger
});
module.exports = __toCommonJS(BitbucketTrigger_node_exports);
var import_n8n_workflow = require("n8n-workflow");
var import_GenericFunctions = require("./GenericFunctions");
class BitbucketTrigger {
  constructor() {
    this.description = {
      displayName: "Bitbucket Trigger",
      name: "bitbucketTrigger",
      icon: "file:bitbucket.svg",
      group: ["trigger"],
      version: 1,
      description: "Handle Bitbucket events via webhooks",
      defaults: {
        name: "Bitbucket Trigger"
      },
      inputs: [],
      outputs: [import_n8n_workflow.NodeConnectionTypes.Main],
      credentials: [
        {
          name: "bitbucketApi",
          required: true,
          testedBy: "bitbucketApiTest"
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
          options: [
            {
              name: "Repository",
              value: "repository"
            },
            {
              name: "Workspace",
              value: "workspace"
            }
          ],
          default: "workspace"
        },
        {
          displayName: "Workspace Name or ID",
          name: "workspace",
          type: "options",
          displayOptions: {
            show: {
              resource: ["workspace", "repository"]
            }
          },
          typeOptions: {
            loadOptionsMethod: "getWorkspaces"
          },
          required: true,
          default: "",
          description: 'The repository of which to listen to the events. Choose from the list, or specify an ID using an <a href="https://docs.n8n.io/code/expressions/">expression</a>.'
        },
        {
          displayName: "Event Names or IDs",
          name: "events",
          type: "multiOptions",
          displayOptions: {
            show: {
              resource: ["workspace"]
            }
          },
          typeOptions: {
            loadOptionsMethod: "getWorkspaceEvents"
          },
          options: [],
          required: true,
          default: [],
          description: 'The events to listen to. Choose from the list, or specify IDs using an <a href="https://docs.n8n.io/code/expressions/">expression</a>.'
        },
        {
          displayName: "Repository Name or ID",
          name: "repository",
          type: "options",
          displayOptions: {
            show: {
              resource: ["repository"]
            }
          },
          typeOptions: {
            loadOptionsMethod: "getRepositories",
            loadOptionsDependsOn: ["workspace"]
          },
          required: true,
          default: "",
          description: 'The repository of which to listen to the events. Choose from the list, or specify an ID using an <a href="https://docs.n8n.io/code/expressions/">expression</a>.'
        },
        {
          displayName: "Event Names or IDs",
          name: "events",
          type: "multiOptions",
          displayOptions: {
            show: {
              resource: ["repository"]
            }
          },
          typeOptions: {
            loadOptionsMethod: "getRepositoriesEvents"
          },
          options: [],
          required: true,
          default: [],
          description: 'The events to listen to. Choose from the list, or specify IDs using an <a href="https://docs.n8n.io/code/expressions/">expression</a>.'
        }
      ]
    };
    this.methods = {
      credentialTest: {
        async bitbucketApiTest(credential) {
          const credentials = credential.data;
          const options = {
            method: "GET",
            auth: {
              user: credentials.username,
              password: credentials.appPassword
            },
            uri: "https://api.bitbucket.org/2.0/user",
            json: true,
            timeout: 5e3
          };
          try {
            const response = await this.helpers.request(options);
            if (!response.username) {
              return {
                status: "Error",
                message: `Token is not valid: ${response.error}`
              };
            }
          } catch (error) {
            return {
              status: "Error",
              message: `Settings are not valid: ${error}`
            };
          }
          return {
            status: "OK",
            message: "Authentication successful!"
          };
        }
      },
      loadOptions: {
        async getWorkspaceEvents() {
          const returnData = [];
          const events = await import_GenericFunctions.bitbucketApiRequestAllItems.call(
            this,
            "values",
            "GET",
            "/hook_events/workspace"
          );
          for (const event of events) {
            returnData.push({
              name: event.event,
              value: event.event,
              description: event.description
            });
          }
          return returnData;
        },
        async getRepositoriesEvents() {
          const returnData = [];
          const events = await import_GenericFunctions.bitbucketApiRequestAllItems.call(
            this,
            "values",
            "GET",
            "/hook_events/repository"
          );
          for (const event of events) {
            returnData.push({
              name: event.event,
              value: event.event,
              description: event.description
            });
          }
          return returnData;
        },
        async getRepositories() {
          const returnData = [];
          const workspace = this.getCurrentNodeParameter("workspace");
          const repositories = await import_GenericFunctions.bitbucketApiRequestAllItems.call(
            this,
            "values",
            "GET",
            `/repositories/${workspace}`
          );
          for (const repository of repositories) {
            returnData.push({
              name: repository.slug,
              value: repository.slug,
              description: repository.description
            });
          }
          return returnData;
        },
        async getWorkspaces() {
          const returnData = [];
          const workspaces = await import_GenericFunctions.bitbucketApiRequestAllItems.call(
            this,
            "values",
            "GET",
            "/workspaces"
          );
          for (const workspace of workspaces) {
            returnData.push({
              name: workspace.name,
              value: workspace.slug
            });
          }
          return returnData;
        }
      }
    };
    this.webhookMethods = {
      default: {
        async checkExists() {
          let endpoint = "";
          const resource = this.getNodeParameter("resource", 0);
          const workspace = this.getNodeParameter("workspace", 0);
          const webhookUrl = this.getNodeWebhookUrl("default");
          const webhookData = this.getWorkflowStaticData("node");
          if (resource === "workspace") {
            endpoint = `/workspaces/${workspace}/hooks`;
          }
          if (resource === "repository") {
            const repository = this.getNodeParameter("repository", 0);
            endpoint = `/repositories/${workspace}/${repository}/hooks`;
          }
          const { values: hooks } = await import_GenericFunctions.bitbucketApiRequest.call(this, "GET", endpoint);
          for (const hook of hooks) {
            if (webhookUrl === hook.url && hook.active === true) {
              webhookData.webhookId = hook.uuid.replace("{", "").replace("}", "");
              return true;
            }
          }
          return false;
        },
        async create() {
          let endpoint = "";
          const webhookUrl = this.getNodeWebhookUrl("default");
          const webhookData = this.getWorkflowStaticData("node");
          const events = this.getNodeParameter("events");
          const resource = this.getNodeParameter("resource", 0);
          const workspace = this.getNodeParameter("workspace", 0);
          if (resource === "workspace") {
            endpoint = `/workspaces/${workspace}/hooks`;
          }
          if (resource === "repository") {
            const repository = this.getNodeParameter("repository", 0);
            endpoint = `/repositories/${workspace}/${repository}/hooks`;
          }
          const body = {
            description: "n8n webhook",
            url: webhookUrl,
            active: true,
            events
          };
          const responseData = await import_GenericFunctions.bitbucketApiRequest.call(this, "POST", endpoint, body);
          webhookData.webhookId = responseData.uuid.replace("{", "").replace("}", "");
          return true;
        },
        async delete() {
          let endpoint = "";
          const webhookData = this.getWorkflowStaticData("node");
          const workspace = this.getNodeParameter("workspace", 0);
          const resource = this.getNodeParameter("resource", 0);
          if (resource === "workspace") {
            endpoint = `/workspaces/${workspace}/hooks/${webhookData.webhookId}`;
          }
          if (resource === "repository") {
            const repository = this.getNodeParameter("repository", 0);
            endpoint = `/repositories/${workspace}/${repository}/hooks/${webhookData.webhookId}`;
          }
          try {
            await import_GenericFunctions.bitbucketApiRequest.call(this, "DELETE", endpoint);
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
    const headerData = this.getHeaderData();
    const webhookData = this.getWorkflowStaticData("node");
    if (headerData["x-hook-uuid"] !== webhookData.webhookId) {
      return {};
    }
    return {
      workflowData: [this.helpers.returnJsonArray(req.body)]
    };
  }
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  BitbucketTrigger
});
//# sourceMappingURL=BitbucketTrigger.node.js.map