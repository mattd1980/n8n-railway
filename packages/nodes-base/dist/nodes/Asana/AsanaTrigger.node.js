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
var AsanaTrigger_node_exports = {};
__export(AsanaTrigger_node_exports, {
  AsanaTrigger: () => AsanaTrigger
});
module.exports = __toCommonJS(AsanaTrigger_node_exports);
var import_n8n_workflow = require("n8n-workflow");
var import_GenericFunctions = require("./GenericFunctions");
class AsanaTrigger {
  constructor() {
    this.description = {
      displayName: "Asana Trigger",
      name: "asanaTrigger",
      icon: "file:asana.svg",
      group: ["trigger"],
      version: 1,
      description: "Starts the workflow when Asana events occur.",
      defaults: {
        name: "Asana Trigger"
      },
      inputs: [],
      outputs: [import_n8n_workflow.NodeConnectionTypes.Main],
      credentials: [
        {
          name: "asanaApi",
          required: true,
          displayOptions: {
            show: {
              authentication: ["accessToken"]
            }
          }
        },
        {
          name: "asanaOAuth2Api",
          required: true,
          displayOptions: {
            show: {
              authentication: ["oAuth2"]
            }
          }
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
          displayName: "Authentication",
          name: "authentication",
          type: "options",
          options: [
            {
              name: "Access Token",
              value: "accessToken"
            },
            {
              name: "OAuth2",
              value: "oAuth2"
            }
          ],
          default: "accessToken"
        },
        {
          displayName: "Resource",
          name: "resource",
          type: "string",
          default: "",
          required: true,
          description: "The resource ID to subscribe to. The resource can be a task or project."
        },
        {
          displayName: "Workspace Name or ID",
          name: "workspace",
          type: "options",
          typeOptions: {
            loadOptionsMethod: "getWorkspaces"
          },
          options: [],
          default: "",
          description: 'The workspace ID the resource is registered under. This is only required if you want to allow overriding existing webhooks. Choose from the list, or specify an ID using an <a href="https://docs.n8n.io/code/expressions/">expression</a>.'
        }
      ]
    };
    this.methods = {
      loadOptions: {
        // Get all the available workspaces to display them to user so that they can
        // select them easily
        async getWorkspaces() {
          const workspaces = await import_GenericFunctions.getWorkspaces.call(this);
          workspaces.unshift({
            name: "",
            value: ""
          });
          return workspaces;
        }
      }
    };
    this.webhookMethods = {
      default: {
        async checkExists() {
          const webhookData = this.getWorkflowStaticData("node");
          const webhookUrl = this.getNodeWebhookUrl("default");
          const resource = this.getNodeParameter("resource");
          const workspace = this.getNodeParameter("workspace");
          const { data } = await import_GenericFunctions.asanaApiRequest.call(this, "GET", "/webhooks", {}, { workspace });
          for (const webhook of data) {
            if (webhook.resource.gid === resource && webhook.target === webhookUrl) {
              webhookData.webhookId = webhook.gid;
              return true;
            }
          }
          return false;
        },
        async create() {
          const webhookData = this.getWorkflowStaticData("node");
          const webhookUrl = this.getNodeWebhookUrl("default");
          if (webhookUrl.includes("%20")) {
            throw new import_n8n_workflow.NodeOperationError(
              this.getNode(),
              "The name of the Asana Trigger Node is not allowed to contain any spaces!"
            );
          }
          const resource = this.getNodeParameter("resource");
          const body = {
            resource,
            target: webhookUrl
          };
          const responseData = await import_GenericFunctions.asanaApiRequest.call(this, "POST", "/webhooks", body);
          if (responseData.data === void 0 || responseData.data.gid === void 0) {
            return false;
          }
          webhookData.webhookId = responseData.data.gid;
          return true;
        },
        async delete() {
          const webhookData = this.getWorkflowStaticData("node");
          if (webhookData.webhookId !== void 0) {
            const body = {};
            try {
              await import_GenericFunctions.asanaApiRequest.call(this, "DELETE", `/webhooks/${webhookData.webhookId}`, body);
            } catch (error) {
              return false;
            }
            delete webhookData.webhookId;
            delete webhookData.webhookEvents;
            delete webhookData.hookSecret;
          }
          return true;
        }
      }
    };
  }
  async webhook() {
    const bodyData = this.getBodyData();
    const headerData = this.getHeaderData();
    const req = this.getRequestObject();
    const webhookData = this.getWorkflowStaticData("node");
    if (headerData["x-hook-secret"] !== void 0) {
      webhookData.hookSecret = headerData["x-hook-secret"];
      const res = this.getResponseObject();
      res.set("X-Hook-Secret", webhookData.hookSecret);
      res.status(200).end();
      return {
        noWebhookResponse: true
      };
    }
    if (bodyData.events === void 0 || !Array.isArray(bodyData.events) || bodyData.events.length === 0) {
      return {};
    }
    return {
      workflowData: [this.helpers.returnJsonArray(req.body.events)]
    };
  }
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  AsanaTrigger
});
//# sourceMappingURL=AsanaTrigger.node.js.map