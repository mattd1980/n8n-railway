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
var EmailSendV1_node_exports = {};
__export(EmailSendV1_node_exports, {
  EmailSendV1: () => EmailSendV1
});
module.exports = __toCommonJS(EmailSendV1_node_exports);
var import_n8n_workflow = require("n8n-workflow");
var import_nodemailer = require("nodemailer");
const versionDescription = {
  displayName: "Send Email",
  name: "emailSend",
  icon: "fa:envelope",
  group: ["output"],
  version: 1,
  description: "Sends an Email",
  defaults: {
    name: "Send Email",
    color: "#00bb88"
  },
  inputs: [import_n8n_workflow.NodeConnectionTypes.Main],
  outputs: [import_n8n_workflow.NodeConnectionTypes.Main],
  credentials: [
    {
      name: "smtp",
      required: true
    }
  ],
  properties: [
    // TODO: Add choice for text as text or html  (maybe also from name)
    {
      displayName: "From Email",
      name: "fromEmail",
      type: "string",
      default: "",
      required: true,
      placeholder: "admin@example.com",
      description: "Email address of the sender optional with name"
    },
    {
      displayName: "To Email",
      name: "toEmail",
      type: "string",
      default: "",
      required: true,
      placeholder: "info@example.com",
      description: "Email address of the recipient"
    },
    {
      displayName: "CC Email",
      name: "ccEmail",
      type: "string",
      default: "",
      placeholder: "cc@example.com",
      description: "Email address of CC recipient"
    },
    {
      displayName: "BCC Email",
      name: "bccEmail",
      type: "string",
      default: "",
      placeholder: "bcc@example.com",
      description: "Email address of BCC recipient"
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
        rows: 5
      },
      default: "",
      description: "HTML text message of email"
    },
    {
      displayName: "Attachments",
      name: "attachments",
      type: "string",
      default: "",
      description: "Name of the binary properties that contain data to add to email as attachment. Multiple ones can be comma-separated."
    },
    {
      displayName: "Options",
      name: "options",
      type: "collection",
      placeholder: "Add option",
      default: {},
      options: [
        {
          displayName: "Ignore SSL Issues (Insecure)",
          name: "allowUnauthorizedCerts",
          type: "boolean",
          default: false,
          description: "Whether to connect even if SSL certificate validation is not possible"
        },
        {
          displayName: "Reply To",
          name: "replyTo",
          type: "string",
          default: "",
          placeholder: "info@example.com",
          description: "The email address to send the reply to"
        }
      ]
    }
  ]
};
class EmailSendV1 {
  constructor(baseDescription) {
    this.description = {
      ...baseDescription,
      ...versionDescription
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
        const options = this.getNodeParameter("options", itemIndex, {});
        const credentials = await this.getCredentials("smtp");
        const connectionOptions = {
          host: credentials.host,
          port: credentials.port,
          secure: credentials.secure
        };
        if (credentials.user || credentials.password) {
          connectionOptions.auth = {
            user: credentials.user,
            pass: credentials.password
          };
        }
        if (options.allowUnauthorizedCerts === true) {
          connectionOptions.tls = {
            rejectUnauthorized: false
          };
        }
        const transporter = (0, import_nodemailer.createTransport)(connectionOptions);
        const mailOptions = {
          from: fromEmail,
          to: toEmail,
          cc: ccEmail,
          bcc: bccEmail,
          subject,
          text,
          html,
          replyTo: options.replyTo
        };
        if (attachmentPropertyString && item.binary) {
          const attachments = [];
          const attachmentProperties = attachmentPropertyString.split(",").map((propertyName) => {
            return propertyName.trim();
          });
          for (const propertyName of attachmentProperties) {
            const binaryData = this.helpers.assertBinaryData(itemIndex, propertyName);
            attachments.push({
              filename: binaryData.fileName || "unknown",
              content: await this.helpers.getBinaryDataBuffer(itemIndex, propertyName)
            });
          }
          if (attachments.length) {
            mailOptions.attachments = attachments;
          }
        }
        const info = await transporter.sendMail(mailOptions);
        returnData.push({
          json: info,
          pairedItem: {
            item: itemIndex
          }
        });
      } catch (error) {
        if (this.continueOnFail()) {
          returnData.push({
            json: {
              error: error.message
            },
            pairedItem: {
              item: itemIndex
            }
          });
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
  EmailSendV1
});
//# sourceMappingURL=EmailSendV1.node.js.map