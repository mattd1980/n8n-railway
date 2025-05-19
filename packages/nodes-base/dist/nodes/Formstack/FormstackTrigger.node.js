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
var FormstackTrigger_node_exports = {};
__export(FormstackTrigger_node_exports, {
  FormstackTrigger: () => FormstackTrigger
});
module.exports = __toCommonJS(FormstackTrigger_node_exports);
var import_n8n_workflow = require("n8n-workflow");
var import_GenericFunctions = require("./GenericFunctions");
class FormstackTrigger {
  constructor() {
    this.description = {
      displayName: "Formstack Trigger",
      name: "formstackTrigger",
      icon: "file:formstack.svg",
      group: ["trigger"],
      version: 1,
      subtitle: '=Form ID: {{$parameter["formId"]}}',
      description: "Starts the workflow on a Formstack form submission.",
      defaults: {
        name: "Formstack Trigger"
      },
      inputs: [],
      outputs: [import_n8n_workflow.NodeConnectionTypes.Main],
      credentials: [
        {
          name: "formstackApi",
          required: true,
          displayOptions: {
            show: {
              authentication: ["accessToken"]
            }
          }
        },
        {
          name: "formstackOAuth2Api",
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
          displayName: "Form Name or ID",
          name: "formId",
          type: "options",
          typeOptions: {
            loadOptionsMethod: "getForms"
          },
          default: "",
          required: true,
          description: 'The Formstack form to monitor for new submissions. Choose from the list, or specify an ID using an <a href="https://docs.n8n.io/code/expressions/">expression</a>.'
        },
        {
          displayName: "Simplify",
          name: "simple",
          type: "boolean",
          default: true,
          description: "Whether to return a simplified version of the response instead of the raw data"
        }
      ]
    };
    this.methods = {
      loadOptions: {
        getForms: import_GenericFunctions.getForms
      }
    };
    this.webhookMethods = {
      default: {
        async checkExists() {
          const webhookUrl = this.getNodeWebhookUrl("default");
          const webhookData = this.getWorkflowStaticData("node");
          const formId = this.getNodeParameter("formId");
          const endpoint = `form/${formId}/webhook.json`;
          const { webhooks } = await import_GenericFunctions.apiRequest.call(this, "GET", endpoint);
          for (const webhook of webhooks) {
            if (webhook.url === webhookUrl) {
              webhookData.webhookId = webhook.id;
              return true;
            }
          }
          return false;
        },
        async create() {
          const webhookUrl = this.getNodeWebhookUrl("default");
          const formId = this.getNodeParameter("formId");
          const endpoint = `form/${formId}/webhook.json`;
          const body = {
            url: webhookUrl,
            standardize_field_values: true,
            include_field_type: true,
            content_type: "json"
          };
          const response = await import_GenericFunctions.apiRequest.call(this, "POST", endpoint, body);
          const webhookData = this.getWorkflowStaticData("node");
          webhookData.webhookId = response.id;
          return true;
        },
        async delete() {
          const webhookData = this.getWorkflowStaticData("node");
          if (webhookData.webhookId !== void 0) {
            const endpoint = `webhook/${webhookData.webhookId}.json`;
            try {
              const body = {};
              await import_GenericFunctions.apiRequest.call(this, "DELETE", endpoint, body);
            } catch (e) {
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
    const simple = this.getNodeParameter("simple");
    const response = bodyData;
    if (simple) {
      for (const key of Object.keys(response)) {
        if (response[key].hasOwnProperty("value")) {
          response[key] = response[key].value;
        }
      }
    }
    return {
      workflowData: [this.helpers.returnJsonArray([response])]
    };
  }
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  FormstackTrigger
});
//# sourceMappingURL=FormstackTrigger.node.js.map