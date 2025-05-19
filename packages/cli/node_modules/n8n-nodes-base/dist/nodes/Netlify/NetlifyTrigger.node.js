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
var NetlifyTrigger_node_exports = {};
__export(NetlifyTrigger_node_exports, {
  NetlifyTrigger: () => NetlifyTrigger
});
module.exports = __toCommonJS(NetlifyTrigger_node_exports);
var import_change_case = require("change-case");
var import_n8n_workflow = require("n8n-workflow");
var import_GenericFunctions = require("./GenericFunctions");
class NetlifyTrigger {
  constructor() {
    this.description = {
      displayName: "Netlify Trigger",
      name: "netlifyTrigger",
      icon: "file:netlify.svg",
      group: ["trigger"],
      version: 1,
      subtitle: '={{$parameter["event"]}}',
      description: "Handle netlify events via webhooks",
      defaults: {
        name: "Netlify Trigger"
      },
      inputs: [],
      outputs: [import_n8n_workflow.NodeConnectionTypes.Main],
      credentials: [
        {
          name: "netlifyApi",
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
          displayName: "Site Name or ID",
          name: "siteId",
          required: true,
          type: "options",
          default: "",
          typeOptions: {
            loadOptionsMethod: "getSites"
          },
          description: 'Select the Site ID. Choose from the list, or specify an ID using an <a href="https://docs.n8n.io/code/expressions/">expression</a>.'
        },
        {
          displayName: "Event",
          name: "event",
          type: "options",
          required: true,
          default: "",
          options: [
            {
              name: "Deploy Building",
              value: "deployBuilding"
            },
            {
              name: "Deploy Failed",
              value: "deployFailed"
            },
            {
              name: "Deploy Created",
              value: "deployCreated"
            },
            {
              name: "Form Submitted",
              value: "submissionCreated"
            }
          ]
        },
        {
          displayName: "Form Name or ID",
          name: "formId",
          type: "options",
          required: true,
          displayOptions: {
            show: {
              event: ["submissionCreated"]
            }
          },
          default: "",
          typeOptions: {
            loadOptionsMethod: "getForms"
          },
          description: 'Select a form. Choose from the list, or specify an ID using an <a href="https://docs.n8n.io/code/expressions/">expression</a>.'
        },
        {
          displayName: "Simplify",
          name: "simple",
          type: "boolean",
          displayOptions: {
            show: {
              event: ["submissionCreated"]
            }
          },
          default: true,
          description: "Whether to return a simplified version of the response instead of the raw data"
        }
      ]
    };
    this.webhookMethods = {
      default: {
        async checkExists() {
          const qs = {};
          const webhookData = this.getWorkflowStaticData("node");
          const webhookUrl = this.getNodeWebhookUrl("default");
          const event = this.getNodeParameter("event");
          qs.site_id = this.getNodeParameter("siteId");
          const webhooks = await import_GenericFunctions.netlifyApiRequest.call(this, "GET", "/hooks", {}, qs);
          for (const webhook of webhooks) {
            if (webhook.type === "url") {
              if (webhook.data.url === webhookUrl && webhook.event === (0, import_change_case.snakeCase)(event)) {
                webhookData.webhookId = webhook.id;
                return true;
              }
            }
          }
          return false;
        },
        async create() {
          const webhookUrl = this.getNodeWebhookUrl("default");
          const webhookData = this.getWorkflowStaticData("node");
          const event = this.getNodeParameter("event");
          const body = {
            event: (0, import_change_case.snakeCase)(event),
            data: {
              url: webhookUrl
            },
            site_id: this.getNodeParameter("siteId")
          };
          const formId = this.getNodeParameter("formId", "*");
          if (event === "submissionCreated" && formId !== "*") {
            body.form_id = this.getNodeParameter("formId");
          }
          const webhook = await import_GenericFunctions.netlifyApiRequest.call(this, "POST", "/hooks", body);
          webhookData.webhookId = webhook.id;
          return true;
        },
        async delete() {
          const webhookData = this.getWorkflowStaticData("node");
          try {
            await import_GenericFunctions.netlifyApiRequest.call(this, "DELETE", `/hooks/${webhookData.webhookId}`);
          } catch (error) {
            return false;
          }
          delete webhookData.webhookId;
          return true;
        }
      }
    };
    this.methods = {
      loadOptions: {
        async getSites() {
          const returnData = [];
          const sites = await import_GenericFunctions.netlifyApiRequest.call(this, "GET", "/sites");
          for (const site of sites) {
            returnData.push({
              name: site.name,
              value: site.site_id
            });
          }
          return returnData;
        },
        async getForms() {
          const returnData = [];
          const siteId = this.getNodeParameter("siteId");
          const forms = await import_GenericFunctions.netlifyApiRequest.call(this, "GET", `/sites/${siteId}/forms`);
          for (const form of forms) {
            returnData.push({
              name: form.name,
              value: form.id
            });
          }
          returnData.unshift({ name: "[All Forms]", value: "*" });
          return returnData;
        }
      }
    };
  }
  async webhook() {
    const req = this.getRequestObject();
    const simple = this.getNodeParameter("simple", false);
    const event = this.getNodeParameter("event");
    let response = req.body;
    if (simple && event === "submissionCreated") {
      response = response.data;
    }
    return {
      workflowData: [this.helpers.returnJsonArray(response)]
    };
  }
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  NetlifyTrigger
});
//# sourceMappingURL=NetlifyTrigger.node.js.map