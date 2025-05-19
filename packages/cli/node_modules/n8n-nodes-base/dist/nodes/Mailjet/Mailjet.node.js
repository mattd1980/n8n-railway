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
var Mailjet_node_exports = {};
__export(Mailjet_node_exports, {
  Mailjet: () => Mailjet
});
module.exports = __toCommonJS(Mailjet_node_exports);
var import_n8n_workflow = require("n8n-workflow");
var import_EmailDescription = require("./EmailDescription");
var import_GenericFunctions = require("./GenericFunctions");
var import_SmsDescription = require("./SmsDescription");
class Mailjet {
  constructor() {
    this.description = {
      displayName: "Mailjet",
      name: "mailjet",
      icon: "file:mailjet.svg",
      group: ["output"],
      version: 1,
      subtitle: '={{$parameter["operation"] + ": " + $parameter["resource"]}}',
      description: "Consume Mailjet API",
      defaults: {
        name: "Mailjet"
      },
      usableAsTool: true,
      inputs: [import_n8n_workflow.NodeConnectionTypes.Main],
      outputs: [import_n8n_workflow.NodeConnectionTypes.Main],
      credentials: [
        {
          name: "mailjetEmailApi",
          required: true,
          displayOptions: {
            show: {
              resource: ["email"]
            }
          }
        },
        {
          name: "mailjetSmsApi",
          required: true,
          displayOptions: {
            show: {
              resource: ["sms"]
            }
          }
        }
      ],
      properties: [
        {
          displayName: "Resource",
          name: "resource",
          type: "options",
          noDataExpression: true,
          options: [
            {
              name: "Email",
              value: "email"
            },
            {
              name: "SMS",
              value: "sms"
            }
          ],
          default: "email"
        },
        ...import_EmailDescription.emailOperations,
        ...import_EmailDescription.emailFields,
        ...import_SmsDescription.smsOperations,
        ...import_SmsDescription.smsFields
      ]
    };
    this.methods = {
      loadOptions: {
        // Get all the available custom fields to display them to user so that they can
        // select them easily
        async getTemplates() {
          const returnData = [];
          const { Data: templates } = await import_GenericFunctions.mailjetApiRequest.call(this, "GET", "/v3/REST/template");
          for (const template of templates) {
            returnData.push({
              name: template.Name,
              value: template.ID
            });
          }
          return returnData;
        }
      }
    };
  }
  async execute() {
    const items = this.getInputData();
    const returnData = [];
    const length = items.length;
    let responseData;
    const resource = this.getNodeParameter("resource", 0);
    const operation = this.getNodeParameter("operation", 0);
    for (let i = 0; i < length; i++) {
      try {
        if (resource === "email") {
          if (operation === "send") {
            const fromEmail = this.getNodeParameter("fromEmail", i);
            const htmlBody = this.getNodeParameter("html", i);
            const textBody = this.getNodeParameter("text", i);
            const subject = this.getNodeParameter("subject", i);
            const additionalFields = this.getNodeParameter("additionalFields", i);
            const toEmail = this.getNodeParameter("toEmail", i).split(",");
            const jsonParameters = this.getNodeParameter("jsonParameters", i);
            const body = {
              From: {
                Email: fromEmail
              },
              Subject: subject,
              To: [],
              Cc: [],
              Bcc: [],
              Variables: {}
            };
            for (const email of toEmail) {
              body.To?.push({
                Email: email
              });
            }
            if (jsonParameters) {
              const variablesJson = this.getNodeParameter("variablesJson", i);
              const parsedJson = (0, import_GenericFunctions.validateJSON)(variablesJson);
              if (parsedJson === void 0) {
                throw new import_n8n_workflow.NodeOperationError(
                  this.getNode(),
                  "Parameter 'Variables (JSON)' has a invalid JSON",
                  { itemIndex: i }
                );
              }
              body.Variables = parsedJson;
            } else {
              const variables = this.getNodeParameter("variablesUi", i).variablesValues || [];
              for (const variable of variables) {
                body.Variables[variable.name] = variable.value;
              }
            }
            if (htmlBody) {
              body.HTMLPart = htmlBody;
            }
            if (textBody) {
              body.TextPart = textBody;
            }
            if (additionalFields.bccEmail) {
              const bccEmail = additionalFields.bccEmail.split(",");
              for (const email of bccEmail) {
                body.Bcc.push({
                  Email: email
                });
              }
            }
            if (additionalFields.ccAddresses) {
              const ccEmail = additionalFields.ccAddresses.split(",");
              for (const email of ccEmail) {
                body.Cc.push({
                  Email: email
                });
              }
            }
            if (additionalFields.trackOpens) {
              body.TrackOpens = additionalFields.trackOpens;
            }
            if (additionalFields.replyTo) {
              const replyTo = additionalFields.replyTo;
              body.ReplyTo = {
                Email: replyTo
              };
            }
            if (additionalFields.trackClicks) {
              body.TrackClicks = additionalFields.trackClicks;
            }
            if (additionalFields.fromName) {
              body.From.Name = additionalFields.fromName;
            }
            if (additionalFields.templateLanguage) {
              body.TemplateLanguage = additionalFields.templateLanguage;
            }
            if (additionalFields.priority) {
              body.Priority = additionalFields.priority;
            }
            responseData = await import_GenericFunctions.mailjetApiRequest.call(this, "POST", "/v3.1/send", {
              Messages: [body]
            });
            responseData = responseData.Messages;
          }
          if (operation === "sendTemplate") {
            const fromEmail = this.getNodeParameter("fromEmail", i);
            const templateId = parseInt(this.getNodeParameter("templateId", i), 10);
            const subject = this.getNodeParameter("subject", i);
            const additionalFields = this.getNodeParameter("additionalFields", i);
            const toEmail = this.getNodeParameter("toEmail", i).split(",");
            const jsonParameters = this.getNodeParameter("jsonParameters", i);
            const body = {
              From: {
                Email: fromEmail
              },
              Subject: subject,
              To: [],
              Cc: [],
              Bcc: [],
              Variables: {},
              TemplateID: templateId
            };
            for (const email of toEmail) {
              body.To.push({
                Email: email
              });
            }
            if (jsonParameters) {
              const variablesJson = this.getNodeParameter("variablesJson", i);
              const parsedJson = (0, import_GenericFunctions.validateJSON)(variablesJson);
              if (parsedJson === void 0) {
                throw new import_n8n_workflow.NodeOperationError(
                  this.getNode(),
                  "Parameter 'Variables (JSON)' has a invalid JSON",
                  { itemIndex: i }
                );
              }
              body.Variables = parsedJson;
            } else {
              const variables = this.getNodeParameter("variablesUi", i).variablesValues || [];
              for (const variable of variables) {
                body.Variables[variable.name] = variable.value;
              }
            }
            if (additionalFields.bccEmail) {
              const bccEmail = additionalFields.bccEmail.split(",");
              for (const email of bccEmail) {
                body.Bcc.push({
                  Email: email
                });
              }
            }
            if (additionalFields.ccEmail) {
              const ccEmail = additionalFields.ccEmail.split(",");
              for (const email of ccEmail) {
                body.Cc.push({
                  Email: email
                });
              }
            }
            if (additionalFields.replyTo) {
              const replyTo = additionalFields.replyTo;
              body.ReplyTo = {
                Email: replyTo
              };
            }
            if (additionalFields.trackOpens) {
              body.TrackOpens = additionalFields.trackOpens;
            }
            if (additionalFields.trackClicks) {
              body.TrackClicks = additionalFields.trackClicks;
            }
            if (additionalFields.fromName) {
              body.From.Name = additionalFields.fromName;
            }
            if (additionalFields.templateLanguage) {
              body.TemplateLanguage = additionalFields.templateLanguage;
            }
            if (additionalFields.priority) {
              body.Priority = additionalFields.priority;
            }
            responseData = await import_GenericFunctions.mailjetApiRequest.call(this, "POST", "/v3.1/send", {
              Messages: [body]
            });
            responseData = responseData.Messages;
          }
        }
        if (resource === "sms") {
          if (operation === "send") {
            const from = this.getNodeParameter("from", i);
            const to = this.getNodeParameter("to", i);
            const text = this.getNodeParameter("text", i);
            const body = {
              From: from,
              To: to,
              Text: text
            };
            responseData = await import_GenericFunctions.mailjetApiRequest.call(this, "POST", "/v4/sms-send", body);
          }
        }
        const executionData = this.helpers.constructExecutionMetaData(
          this.helpers.returnJsonArray(responseData),
          { itemData: { item: i } }
        );
        returnData.push(...executionData);
      } catch (error) {
        if (this.continueOnFail()) {
          const executionErrorData = this.helpers.constructExecutionMetaData(
            this.helpers.returnJsonArray({ error: error.message }),
            { itemData: { item: i } }
          );
          returnData.push(...executionErrorData);
          continue;
        }
        throw error;
      }
    }
    return [returnData];
  }
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  Mailjet
});
//# sourceMappingURL=Mailjet.node.js.map