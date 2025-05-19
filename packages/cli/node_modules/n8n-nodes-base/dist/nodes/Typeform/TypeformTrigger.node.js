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
var TypeformTrigger_node_exports = {};
__export(TypeformTrigger_node_exports, {
  TypeformTrigger: () => TypeformTrigger
});
module.exports = __toCommonJS(TypeformTrigger_node_exports);
var import_n8n_workflow = require("n8n-workflow");
var import_GenericFunctions = require("./GenericFunctions");
class TypeformTrigger {
  constructor() {
    this.description = {
      displayName: "Typeform Trigger",
      name: "typeformTrigger",
      icon: { light: "file:typeform.svg", dark: "file:typeform.dark.svg" },
      group: ["trigger"],
      version: [1, 1.1],
      subtitle: '=Form ID: {{$parameter["formId"]}}',
      description: "Starts the workflow on a Typeform form submission",
      defaults: {
        name: "Typeform Trigger"
      },
      inputs: [],
      outputs: [import_n8n_workflow.NodeConnectionTypes.Main],
      credentials: [
        {
          name: "typeformApi",
          required: true,
          displayOptions: {
            show: {
              authentication: ["accessToken"]
            }
          },
          testedBy: "testTypeformTokenAuth"
        },
        {
          name: "typeformOAuth2Api",
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
          options: [],
          default: "",
          required: true,
          description: 'Form which should trigger workflow on submission. Choose from the list, or specify an ID using an <a href="https://docs.n8n.io/code/expressions/">expression</a>.'
        },
        {
          displayName: "Simplify Answers",
          name: "simplifyAnswers",
          type: "boolean",
          default: true,
          description: 'Whether to convert the answers to a key:value pair ("FIELD_TITLE":"USER_ANSER") to be easily processable'
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
        getForms: import_GenericFunctions.getForms
      },
      credentialTest: {
        async testTypeformTokenAuth(credential) {
          const credentials = credential.data;
          const options = {
            headers: {
              authorization: `bearer ${credentials.accessToken}`
            },
            uri: "https://api.typeform.com/workspaces",
            json: true
          };
          try {
            const response = await this.helpers.request(options);
            if (!response.items) {
              return {
                status: "Error",
                message: "Token is not valid."
              };
            }
          } catch (err) {
            return {
              status: "Error",
              message: `Token is not valid; ${err.message}`
            };
          }
          return {
            status: "OK",
            message: "Authentication successful!"
          };
        }
      }
    };
    this.webhookMethods = {
      default: {
        async checkExists() {
          const webhookData = this.getWorkflowStaticData("node");
          const webhookUrl = this.getNodeWebhookUrl("default");
          const formId = this.getNodeParameter("formId");
          const endpoint = `forms/${formId}/webhooks`;
          const { items } = await import_GenericFunctions.apiRequest.call(this, "GET", endpoint, {});
          for (const item of items) {
            if (item.form_id === formId && item.url === webhookUrl) {
              webhookData.webhookId = item.tag;
              return true;
            }
          }
          return false;
        },
        async create() {
          const webhookUrl = this.getNodeWebhookUrl("default");
          const formId = this.getNodeParameter("formId");
          const webhookId = "n8n-" + (0, import_n8n_workflow.randomString)(10).toLowerCase();
          const endpoint = `forms/${formId}/webhooks/${webhookId}`;
          const body = {
            url: webhookUrl,
            enabled: true,
            verify_ssl: true
          };
          await import_GenericFunctions.apiRequest.call(this, "PUT", endpoint, body);
          const webhookData = this.getWorkflowStaticData("node");
          webhookData.webhookId = webhookId;
          return true;
        },
        async delete() {
          const formId = this.getNodeParameter("formId");
          const webhookData = this.getWorkflowStaticData("node");
          if (webhookData.webhookId !== void 0) {
            const endpoint = `forms/${formId}/webhooks/${webhookData.webhookId}`;
            try {
              const body = {};
              await import_GenericFunctions.apiRequest.call(this, "DELETE", endpoint, body);
            } catch (error) {
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
    const version = this.getNode().typeVersion;
    const bodyData = this.getBodyData();
    const simplifyAnswers = this.getNodeParameter("simplifyAnswers");
    const onlyAnswers = this.getNodeParameter("onlyAnswers");
    if (bodyData.form_response === void 0 || bodyData.form_response.definition === void 0 || bodyData.form_response.answers === void 0) {
      throw new import_n8n_workflow.NodeApiError(this.getNode(), bodyData, {
        message: "Expected definition/answers data is missing!"
      });
    }
    const answers = bodyData.form_response.answers;
    const subValueKeys = ["label", "labels"];
    if (simplifyAnswers) {
      const definition = bodyData.form_response.definition;
      const definitionsById = {};
      for (const field of definition.fields) {
        definitionsById[field.id] = field.title.replace(/\{\{/g, "[").replace(/\}\}/g, "]");
      }
      const convertedAnswers = {};
      for (const answer of answers) {
        let value = answer[answer.type];
        if (typeof value === "object") {
          for (const key of subValueKeys) {
            if (value[key] !== void 0) {
              value = value[key];
              break;
            }
          }
        }
        convertedAnswers[definitionsById[answer.field.id]] = value;
      }
      if (onlyAnswers) {
        return {
          workflowData: [this.helpers.returnJsonArray([convertedAnswers])]
        };
      } else {
        bodyData.form_response.answers = convertedAnswers;
      }
    }
    if (onlyAnswers) {
      if (version >= 1.1) {
        return {
          workflowData: [
            this.helpers.returnJsonArray([
              answers.reduce(
                (acc, answer) => {
                  acc[answer.field.id] = answer;
                  return acc;
                },
                {}
              )
            ])
          ]
        };
      }
      return {
        workflowData: [this.helpers.returnJsonArray([answers])]
      };
    } else {
      return {
        workflowData: [this.helpers.returnJsonArray([bodyData])]
      };
    }
  }
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  TypeformTrigger
});
//# sourceMappingURL=TypeformTrigger.node.js.map