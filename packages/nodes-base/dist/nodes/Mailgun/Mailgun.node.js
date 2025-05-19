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
var Mailgun_node_exports = {};
__export(Mailgun_node_exports, {
  Mailgun: () => Mailgun
});
module.exports = __toCommonJS(Mailgun_node_exports);
var import_n8n_workflow = require("n8n-workflow");
class Mailgun {
  constructor() {
    this.description = {
      displayName: "Mailgun",
      name: "mailgun",
      icon: "file:mailgun.svg",
      group: ["output"],
      version: 1,
      description: "Sends an email via Mailgun",
      defaults: {
        name: "Mailgun"
      },
      usableAsTool: true,
      inputs: [import_n8n_workflow.NodeConnectionTypes.Main],
      outputs: [import_n8n_workflow.NodeConnectionTypes.Main],
      credentials: [
        {
          name: "mailgunApi",
          required: true
        }
      ],
      properties: [
        {
          displayName: "From Email",
          name: "fromEmail",
          type: "string",
          default: "",
          required: true,
          placeholder: "Admin <admin@example.com>",
          description: "Email address of the sender optional with name"
        },
        {
          displayName: "To Email",
          name: "toEmail",
          type: "string",
          default: "",
          required: true,
          placeholder: "info@example.com",
          description: "Email address of the recipient. Multiple ones can be separated by comma."
        },
        {
          displayName: "Cc Email",
          name: "ccEmail",
          type: "string",
          default: "",
          placeholder: "",
          description: "Cc Email address of the recipient. Multiple ones can be separated by comma."
        },
        {
          displayName: "Bcc Email",
          name: "bccEmail",
          type: "string",
          default: "",
          placeholder: "",
          description: "Bcc Email address of the recipient. Multiple ones can be separated by comma."
        },
        {
          displayName: "Subject",
          name: "subject",
          type: "string",
          default: "",
          placeholder: "My subject line",
          description: "Subject line of the email"
        },
        {
          displayName: "Text",
          name: "text",
          type: "string",
          typeOptions: {
            rows: 5
          },
          default: "",
          description: "Plain text message of email"
        },
        {
          displayName: "HTML",
          name: "html",
          type: "string",
          typeOptions: {
            rows: 5,
            editor: "htmlEditor"
          },
          default: "",
          description: "HTML text message of email"
        },
        {
          displayName: "Attachments",
          name: "attachments",
          type: "string",
          default: "",
          description: "Name of the binary properties which contain data which should be added to email as attachment. Multiple ones can be comma-separated."
        }
      ]
    };
  }
  async execute() {
    const items = this.getInputData();
    const returnData = [];
    const length = items.length;
    let item;
    for (let itemIndex = 0; itemIndex < length; itemIndex++) {
      try {
        item = items[itemIndex];
        const fromEmail = this.getNodeParameter("fromEmail", itemIndex);
        const toEmail = this.getNodeParameter("toEmail", itemIndex);
        const ccEmail = this.getNodeParameter("ccEmail", itemIndex);
        const bccEmail = this.getNodeParameter("bccEmail", itemIndex);
        const subject = this.getNodeParameter("subject", itemIndex);
        const text = this.getNodeParameter("text", itemIndex);
        const html = this.getNodeParameter("html", itemIndex);
        const attachmentPropertyString = this.getNodeParameter("attachments", itemIndex);
        const credentials = await this.getCredentials("mailgunApi");
        const formData = {
          from: fromEmail,
          to: toEmail,
          subject,
          text,
          html
        };
        if (ccEmail.length !== 0) {
          formData.cc = ccEmail;
        }
        if (bccEmail.length !== 0) {
          formData.bcc = bccEmail;
        }
        if (attachmentPropertyString && item.binary) {
          const attachments = [];
          const attachmentProperties = attachmentPropertyString.split(",").map((propertyName) => {
            return propertyName.trim();
          });
          for (const propertyName of attachmentProperties) {
            const binaryData = this.helpers.assertBinaryData(itemIndex, propertyName);
            const binaryDataBuffer = await this.helpers.getBinaryDataBuffer(
              itemIndex,
              propertyName
            );
            attachments.push({
              value: binaryDataBuffer,
              options: {
                filename: binaryData.fileName || "unknown"
              }
            });
          }
          if (attachments.length) {
            formData.attachment = attachments;
          }
        }
        const options = {
          method: "POST",
          formData,
          uri: `https://${credentials.apiDomain}/v3/${credentials.emailDomain}/messages`,
          json: true
        };
        let responseData;
        try {
          responseData = await this.helpers.requestWithAuthentication.call(
            this,
            "mailgunApi",
            options
          );
        } catch (error) {
          throw new import_n8n_workflow.NodeApiError(this.getNode(), error);
        }
        const executionData = this.helpers.constructExecutionMetaData(
          this.helpers.returnJsonArray(responseData),
          { itemData: { item: itemIndex } }
        );
        returnData.push(...executionData);
      } catch (error) {
        if (this.continueOnFail()) {
          const executionErrorData = this.helpers.constructExecutionMetaData(
            this.helpers.returnJsonArray({ error: error.message }),
            { itemData: { item: itemIndex } }
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
  Mailgun
});
//# sourceMappingURL=Mailgun.node.js.map