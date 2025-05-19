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
var FormIoTrigger_node_exports = {};
__export(FormIoTrigger_node_exports, {
  FormIoTrigger: () => FormIoTrigger
});
module.exports = __toCommonJS(FormIoTrigger_node_exports);
var import_n8n_workflow = require("n8n-workflow");
var import_GenericFunctions = require("./GenericFunctions");
class FormIoTrigger {
  constructor() {
    this.description = {
      displayName: "Form.io Trigger",
      name: "formIoTrigger",
      icon: "file:formio.svg",
      group: ["trigger"],
      version: 1,
      subtitle: '={{$parameter["event"]}}',
      description: "Handle form.io events via webhooks",
      defaults: {
        name: "Form.io Trigger"
      },
      inputs: [],
      outputs: [import_n8n_workflow.NodeConnectionTypes.Main],
      credentials: [
        {
          name: "formIoApi",
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
          typeOptions: {
            loadOptionsMethod: "getProjects"
          },
          required: true,
          default: "",
          description: 'Choose from the list, or specify an ID using an <a href="https://docs.n8n.io/code/expressions/">expression</a>'
        },
        {
          displayName: "Form Name or ID",
          name: "formId",
          type: "options",
          typeOptions: {
            loadOptionsDependsOn: ["projectId"],
            loadOptionsMethod: "getForms"
          },
          required: true,
          default: "",
          description: 'Choose from the list, or specify an ID using an <a href="https://docs.n8n.io/code/expressions/">expression</a>'
        },
        {
          displayName: "Trigger Events",
          name: "events",
          type: "multiOptions",
          options: [
            {
              name: "Submission Created",
              value: "create"
            },
            {
              name: "Submission Updated",
              value: "update"
            }
          ],
          required: true,
          default: []
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
        async getProjects() {
          const projects = await import_GenericFunctions.formIoApiRequest.call(this, "GET", "/project", {});
          const returnData = [];
          for (const project of projects) {
            returnData.push({
              name: project.title,
              value: project._id
            });
          }
          return returnData;
        },
        async getForms() {
          const projectId = this.getCurrentNodeParameter("projectId");
          const forms = await import_GenericFunctions.formIoApiRequest.call(this, "GET", `/project/${projectId}/form`, {});
          const returnData = [];
          for (const form of forms) {
            returnData.push({
              name: form.title,
              value: form._id
            });
          }
          return returnData;
        }
      }
    };
    this.webhookMethods = {
      default: {
        async checkExists() {
          const webhookData = this.getWorkflowStaticData("node");
          const webhookUrl = this.getNodeWebhookUrl("default");
          const formId = this.getNodeParameter("formId");
          const projectId = this.getNodeParameter("projectId");
          const method = this.getNodeParameter("events");
          const actions = await import_GenericFunctions.formIoApiRequest.call(
            this,
            "GET",
            `/project/${projectId}/form/${formId}/action`
          );
          for (const action of actions) {
            if (action.name === "webhook") {
              if (action.settings.url === webhookUrl && action.method.length === method.length && action.method.every((value) => method.includes(value))) {
                webhookData.webhookId = action._id;
                return true;
              }
            }
          }
          return false;
        },
        async create() {
          const webhookData = this.getWorkflowStaticData("node");
          const formId = this.getNodeParameter("formId");
          const projectId = this.getNodeParameter("projectId");
          const webhookUrl = this.getNodeWebhookUrl("default");
          const method = this.getNodeParameter("events");
          const payload = {
            data: {
              name: "webhook",
              title: `webhook-n8n:${webhookUrl}`,
              method,
              handler: ["after"],
              priority: 0,
              settings: {
                method: "post",
                block: false,
                url: webhookUrl
              },
              condition: {
                field: "submit"
              }
            }
          };
          const webhook = await import_GenericFunctions.formIoApiRequest.call(
            this,
            "POST",
            `/project/${projectId}/form/${formId}/action`,
            payload
          );
          webhookData.webhookId = webhook._id;
          return true;
        },
        async delete() {
          const webhookData = this.getWorkflowStaticData("node");
          const formId = this.getNodeParameter("formId");
          const projectId = this.getNodeParameter("projectId");
          await import_GenericFunctions.formIoApiRequest.call(
            this,
            "DELETE",
            `/project/${projectId}/form/${formId}/action/${webhookData.webhookId}`
          );
          delete webhookData.webhookId;
          return true;
        }
      }
    };
  }
  async webhook() {
    const req = this.getRequestObject();
    const simple = this.getNodeParameter("simple");
    let response = req.body.request;
    if (simple) {
      response = response.data;
    }
    return {
      workflowData: [this.helpers.returnJsonArray(response)]
    };
  }
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  FormIoTrigger
});
//# sourceMappingURL=FormIoTrigger.node.js.map