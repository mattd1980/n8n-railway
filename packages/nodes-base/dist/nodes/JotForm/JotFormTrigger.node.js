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
var JotFormTrigger_node_exports = {};
__export(JotFormTrigger_node_exports, {
  JotFormTrigger: () => JotFormTrigger
});
module.exports = __toCommonJS(JotFormTrigger_node_exports);
var import_n8n_workflow = require("n8n-workflow");
var import_GenericFunctions = require("./GenericFunctions");
class JotFormTrigger {
  constructor() {
    this.description = {
      displayName: "JotForm Trigger",
      name: "jotFormTrigger",
      // eslint-disable-next-line n8n-nodes-base/node-class-description-icon-not-svg
      icon: "file:jotform.png",
      group: ["trigger"],
      version: 1,
      description: "Handle JotForm events via webhooks",
      defaults: {
        name: "JotForm Trigger"
      },
      inputs: [],
      outputs: [import_n8n_workflow.NodeConnectionTypes.Main],
      credentials: [
        {
          name: "jotFormApi",
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
          displayName: "Form Name or ID",
          name: "form",
          type: "options",
          required: true,
          typeOptions: {
            loadOptionsMethod: "getForms"
          },
          default: "",
          description: 'Choose from the list, or specify an ID using an <a href="https://docs.n8n.io/code/expressions/">expression</a>'
        },
        {
          displayName: "Resolve Data",
          name: "resolveData",
          type: "boolean",
          default: true,
          // eslint-disable-next-line n8n-nodes-base/node-param-description-boolean-without-whether
          description: "By default does the webhook-data use internal keys instead of the names. If this option gets activated, it will resolve the keys automatically to the actual names."
        },
        {
          displayName: "Only Answers",
          name: "onlyAnswers",
          type: "boolean",
          default: true,
          description: "Whether to return only the answers of the form and not any of the other data"
        }
      ]
    };
    this.methods = {
      loadOptions: {
        // Get all the available forms to display them to user so that they can
        // select them easily
        async getForms() {
          const returnData = [];
          const qs = {
            limit: 1e3
          };
          const forms = await import_GenericFunctions.jotformApiRequest.call(this, "GET", "/user/forms", {}, qs);
          if (!Array.isArray(forms?.content)) return [];
          for (const form of forms.content) {
            const formName = form.title;
            const formId = form.id;
            returnData.push({
              name: formName,
              value: formId
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
          const formId = this.getNodeParameter("form");
          const endpoint = `/form/${formId}/webhooks`;
          try {
            const responseData = await import_GenericFunctions.jotformApiRequest.call(this, "GET", endpoint);
            const webhookUrls = Object.values(responseData.content);
            const webhookUrl = this.getNodeWebhookUrl("default");
            if (!webhookUrls.includes(webhookUrl)) {
              return false;
            }
            const webhookIds = Object.keys(responseData.content);
            webhookData.webhookId = webhookIds[webhookUrls.indexOf(webhookUrl)];
          } catch (error) {
            return false;
          }
          return true;
        },
        async create() {
          const webhookUrl = this.getNodeWebhookUrl("default");
          const webhookData = this.getWorkflowStaticData("node");
          const formId = this.getNodeParameter("form");
          const endpoint = `/form/${formId}/webhooks`;
          const body = {
            webhookURL: webhookUrl
          };
          const { content } = await import_GenericFunctions.jotformApiRequest.call(this, "POST", endpoint, body);
          webhookData.webhookId = Object.keys(content)[0];
          return true;
        },
        async delete() {
          let responseData;
          const webhookData = this.getWorkflowStaticData("node");
          const formId = this.getNodeParameter("form");
          const endpoint = `/form/${formId}/webhooks/${webhookData.webhookId}`;
          try {
            responseData = await import_GenericFunctions.jotformApiRequest.call(this, "DELETE", endpoint);
          } catch (error) {
            return false;
          }
          if (responseData.message !== "success") {
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
    const formId = this.getNodeParameter("form");
    const resolveData = this.getNodeParameter("resolveData", false);
    const onlyAnswers = this.getNodeParameter("onlyAnswers", false);
    const { data } = req.body;
    const rawRequest = (0, import_n8n_workflow.jsonParse)(data.rawRequest);
    data.rawRequest = rawRequest;
    let returnData;
    if (!resolveData) {
      if (onlyAnswers) {
        returnData = data.rawRequest;
      } else {
        returnData = data;
      }
      return {
        workflowData: [this.helpers.returnJsonArray(returnData)]
      };
    }
    const endpoint = `/form/${formId}/questions`;
    const responseData = await import_GenericFunctions.jotformApiRequest.call(this, "GET", endpoint, {});
    const questionNames = {};
    for (const question of Object.values(responseData.content)) {
      questionNames[question.name] = question.text;
    }
    let questionKey;
    const questionsData = {};
    for (const key of Object.keys(rawRequest)) {
      if (!key.includes("_")) {
        continue;
      }
      questionKey = key.split("_").slice(1).join("_");
      if (questionNames[questionKey] === void 0) {
        continue;
      }
      questionsData[questionNames[questionKey]] = rawRequest[key];
    }
    if (onlyAnswers) {
      returnData = questionsData;
    } else {
      data.rawRequest = questionsData;
      returnData = data;
    }
    return {
      workflowData: [this.helpers.returnJsonArray(returnData)]
    };
  }
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  JotFormTrigger
});
//# sourceMappingURL=JotFormTrigger.node.js.map