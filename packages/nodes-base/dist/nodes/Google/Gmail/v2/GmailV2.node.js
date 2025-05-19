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
var GmailV2_node_exports = {};
__export(GmailV2_node_exports, {
  GmailV2: () => GmailV2
});
module.exports = __toCommonJS(GmailV2_node_exports);
var import_n8n_workflow = require("n8n-workflow");
var import_DraftDescription = require("./DraftDescription");
var import_LabelDescription = require("./LabelDescription");
var import_loadOptions = require("./loadOptions");
var import_MessageDescription = require("./MessageDescription");
var import_ThreadDescription = require("./ThreadDescription");
var import_configureWaitTillDate = require("../../../../utils/sendAndWait/configureWaitTillDate.util");
var import_descriptions = require("../../../../utils/sendAndWait/descriptions");
var import_utils = require("../../../../utils/sendAndWait/utils");
var import_GenericFunctions = require("../GenericFunctions");
const versionDescription = {
  displayName: "Gmail",
  name: "gmail",
  icon: "file:gmail.svg",
  group: ["transform"],
  version: [2, 2.1],
  subtitle: '={{$parameter["operation"] + ": " + $parameter["resource"]}}',
  description: "Consume the Gmail API",
  defaults: {
    name: "Gmail"
  },
  inputs: [import_n8n_workflow.NodeConnectionTypes.Main],
  outputs: [import_n8n_workflow.NodeConnectionTypes.Main],
  usableAsTool: true,
  credentials: [
    {
      name: "googleApi",
      required: true,
      displayOptions: {
        show: {
          authentication: ["serviceAccount"]
        }
      }
    },
    {
      name: "gmailOAuth2",
      required: true,
      displayOptions: {
        show: {
          authentication: ["oAuth2"]
        }
      }
    }
  ],
  webhooks: import_descriptions.sendAndWaitWebhooksDescription,
  properties: [
    {
      displayName: "Authentication",
      name: "authentication",
      type: "options",
      options: [
        {
          // eslint-disable-next-line n8n-nodes-base/node-param-display-name-miscased
          name: "OAuth2 (recommended)",
          value: "oAuth2"
        },
        {
          name: "Service Account",
          value: "serviceAccount"
        }
      ],
      default: "oAuth2"
    },
    {
      displayName: "Resource",
      name: "resource",
      type: "options",
      noDataExpression: true,
      options: [
        {
          name: "Message",
          value: "message"
        },
        {
          name: "Label",
          value: "label"
        },
        {
          name: "Draft",
          value: "draft"
        },
        {
          name: "Thread",
          value: "thread"
        }
      ],
      default: "message"
    },
    //-------------------------------
    // Draft Operations
    //-------------------------------
    ...import_DraftDescription.draftOperations,
    ...import_DraftDescription.draftFields,
    //-------------------------------
    // Label Operations
    //-------------------------------
    ...import_LabelDescription.labelOperations,
    ...import_LabelDescription.labelFields,
    //-------------------------------
    // Message Operations
    //-------------------------------
    ...import_MessageDescription.messageOperations,
    ...import_MessageDescription.messageFields,
    ...(0, import_utils.getSendAndWaitProperties)([
      {
        displayName: "To",
        name: "sendTo",
        type: "string",
        default: "",
        required: true,
        placeholder: "e.g. info@example.com"
      }
    ]),
    //-------------------------------
    // Thread Operations
    //-------------------------------
    ...import_ThreadDescription.threadOperations,
    ...import_ThreadDescription.threadFields
    //-------------------------------
  ]
};
class GmailV2 {
  constructor(baseDescription) {
    this.methods = {
      loadOptions: {
        getLabels: import_loadOptions.getLabels,
        getThreadMessages: import_loadOptions.getThreadMessages,
        getGmailAliases: import_loadOptions.getGmailAliases
      }
    };
    this.webhook = import_utils.sendAndWaitWebhook;
    this.description = {
      ...baseDescription,
      ...versionDescription
    };
  }
  async execute() {
    const items = this.getInputData();
    const returnData = [];
    const resource = this.getNodeParameter("resource", 0);
    const operation = this.getNodeParameter("operation", 0);
    const nodeVersion = this.getNode().typeVersion;
    const instanceId = this.getInstanceId();
    if (resource === "message" && operation === import_n8n_workflow.SEND_AND_WAIT_OPERATION) {
      const email = (0, import_utils.createEmail)(this);
      await import_GenericFunctions.googleApiRequest.call(this, "POST", "/gmail/v1/users/me/messages/send", {
        raw: await (0, import_GenericFunctions.encodeEmail)(email)
      });
      const waitTill = (0, import_configureWaitTillDate.configureWaitTillDate)(this);
      await this.putExecutionToWait(waitTill);
      return [this.getInputData()];
    }
    let responseData;
    for (let i = 0; i < items.length; i++) {
      try {
        if (resource === "label") {
          if (operation === "create") {
            const labelName = this.getNodeParameter("name", i);
            const labelListVisibility = this.getNodeParameter(
              "options.labelListVisibility",
              i,
              "labelShow"
            );
            const messageListVisibility = this.getNodeParameter(
              "options.messageListVisibility",
              i,
              "show"
            );
            const body = {
              labelListVisibility,
              messageListVisibility,
              name: labelName
            };
            responseData = await import_GenericFunctions.googleApiRequest.call(
              this,
              "POST",
              "/gmail/v1/users/me/labels",
              body
            );
          }
          if (operation === "delete") {
            const labelId = this.getNodeParameter("labelId", i);
            const endpoint = `/gmail/v1/users/me/labels/${labelId}`;
            responseData = await import_GenericFunctions.googleApiRequest.call(this, "DELETE", endpoint);
            responseData = { success: true };
          }
          if (operation === "get") {
            const labelId = this.getNodeParameter("labelId", i);
            const endpoint = `/gmail/v1/users/me/labels/${labelId}`;
            responseData = await import_GenericFunctions.googleApiRequest.call(this, "GET", endpoint);
          }
          if (operation === "getAll") {
            const returnAll = this.getNodeParameter("returnAll", i);
            responseData = await import_GenericFunctions.googleApiRequest.call(this, "GET", "/gmail/v1/users/me/labels");
            responseData = this.helpers.returnJsonArray(responseData.labels);
            if (!returnAll) {
              const limit = this.getNodeParameter("limit", i);
              responseData = responseData.splice(0, limit);
            }
          }
        }
        if (resource === "message") {
          if (operation === "send") {
            const options = this.getNodeParameter("options", i);
            const sendTo = this.getNodeParameter("sendTo", i);
            let qs = {};
            const to = import_GenericFunctions.prepareEmailsInput.call(this, sendTo, "To", i);
            let cc = "";
            let bcc = "";
            let replyTo = "";
            if (options.ccList) {
              cc = import_GenericFunctions.prepareEmailsInput.call(this, options.ccList, "CC", i);
            }
            if (options.bccList) {
              bcc = import_GenericFunctions.prepareEmailsInput.call(this, options.bccList, "BCC", i);
            }
            if (options.replyTo) {
              replyTo = import_GenericFunctions.prepareEmailsInput.call(this, options.replyTo, "ReplyTo", i);
            }
            let attachments = [];
            if (options.attachmentsUi) {
              attachments = await import_GenericFunctions.prepareEmailAttachments.call(
                this,
                options.attachmentsUi,
                i
              );
              if (attachments.length) {
                qs = {
                  userId: "me",
                  uploadType: "media"
                };
              }
            }
            let from = "";
            if (options.senderName) {
              const { emailAddress } = await import_GenericFunctions.googleApiRequest.call(
                this,
                "GET",
                "/gmail/v1/users/me/profile"
              );
              from = `${options.senderName} <${emailAddress}>`;
            }
            let appendAttribution = options.appendAttribution;
            if (appendAttribution === void 0) {
              appendAttribution = nodeVersion >= 2.1;
            }
            const email = {
              from,
              to,
              cc,
              bcc,
              replyTo,
              subject: this.getNodeParameter("subject", i),
              ...import_GenericFunctions.prepareEmailBody.call(this, i, appendAttribution, instanceId),
              attachments
            };
            const endpoint = "/gmail/v1/users/me/messages/send";
            const body = {
              raw: await (0, import_GenericFunctions.encodeEmail)(email)
            };
            responseData = await import_GenericFunctions.googleApiRequest.call(this, "POST", endpoint, body, qs);
          }
          if (operation === "reply") {
            const messageIdGmail = this.getNodeParameter("messageId", i);
            const options = this.getNodeParameter("options", i);
            responseData = await import_GenericFunctions.replyToEmail.call(this, messageIdGmail, options, i);
          }
          if (operation === "get") {
            const id = this.getNodeParameter("messageId", i);
            const endpoint = `/gmail/v1/users/me/messages/${id}`;
            const qs = {};
            const options = this.getNodeParameter("options", i, {});
            const simple = this.getNodeParameter("simple", i);
            if (simple) {
              qs.format = "metadata";
              qs.metadataHeaders = ["From", "To", "Cc", "Bcc", "Subject"];
            } else {
              qs.format = "raw";
            }
            responseData = await import_GenericFunctions.googleApiRequest.call(this, "GET", endpoint, {}, qs);
            let nodeExecutionData;
            if (!simple) {
              const dataPropertyNameDownload = options.dataPropertyAttachmentsPrefixName || "attachment_";
              nodeExecutionData = await import_GenericFunctions.parseRawEmail.call(
                this,
                responseData,
                dataPropertyNameDownload
              );
            } else {
              const [json, _] = await import_GenericFunctions.simplifyOutput.call(this, [responseData]);
              nodeExecutionData = { json };
            }
            responseData = [nodeExecutionData];
          }
          if (operation === "getAll") {
            const returnAll = this.getNodeParameter("returnAll", i);
            const options = this.getNodeParameter("options", i, {});
            const filters = this.getNodeParameter("filters", i, {});
            const qs = {};
            Object.assign(qs, import_GenericFunctions.prepareQuery.call(this, filters, i), options, i);
            if (returnAll) {
              responseData = await import_GenericFunctions.googleApiRequestAllItems.call(
                this,
                "messages",
                "GET",
                "/gmail/v1/users/me/messages",
                {},
                qs
              );
            } else {
              qs.maxResults = this.getNodeParameter("limit", i);
              responseData = await import_GenericFunctions.googleApiRequest.call(
                this,
                "GET",
                "/gmail/v1/users/me/messages",
                {},
                qs
              );
              responseData = responseData.messages;
            }
            if (responseData === void 0) {
              responseData = [];
            }
            const simple = this.getNodeParameter("simple", i);
            if (simple) {
              qs.format = "metadata";
              qs.metadataHeaders = ["From", "To", "Cc", "Bcc", "Subject"];
            } else {
              qs.format = "raw";
            }
            for (let index = 0; index < responseData.length; index++) {
              responseData[index] = await import_GenericFunctions.googleApiRequest.call(
                this,
                "GET",
                `/gmail/v1/users/me/messages/${responseData[index].id}`,
                {},
                qs
              );
              if (!simple) {
                const dataPropertyNameDownload = options.dataPropertyAttachmentsPrefixName || "attachment_";
                responseData[index] = await import_GenericFunctions.parseRawEmail.call(
                  this,
                  responseData[index],
                  dataPropertyNameDownload
                );
              }
            }
            if (simple) {
              responseData = this.helpers.returnJsonArray(
                await import_GenericFunctions.simplifyOutput.call(this, responseData)
              );
            }
          }
          if (operation === "delete") {
            const id = this.getNodeParameter("messageId", i);
            const endpoint = `/gmail/v1/users/me/messages/${id}`;
            responseData = await import_GenericFunctions.googleApiRequest.call(this, "DELETE", endpoint);
            responseData = { success: true };
          }
          if (operation === "markAsRead") {
            const id = this.getNodeParameter("messageId", i);
            const endpoint = `/gmail/v1/users/me/messages/${id}/modify`;
            const body = {
              removeLabelIds: ["UNREAD"]
            };
            responseData = await import_GenericFunctions.googleApiRequest.call(this, "POST", endpoint, body);
          }
          if (operation === "markAsUnread") {
            const id = this.getNodeParameter("messageId", i);
            const endpoint = `/gmail/v1/users/me/messages/${id}/modify`;
            const body = {
              addLabelIds: ["UNREAD"]
            };
            responseData = await import_GenericFunctions.googleApiRequest.call(this, "POST", endpoint, body);
          }
          if (operation === "addLabels") {
            const id = this.getNodeParameter("messageId", i);
            const labelIds = this.getNodeParameter("labelIds", i);
            const endpoint = `/gmail/v1/users/me/messages/${id}/modify`;
            const body = {
              addLabelIds: labelIds
            };
            responseData = await import_GenericFunctions.googleApiRequest.call(this, "POST", endpoint, body);
          }
          if (operation === "removeLabels") {
            const id = this.getNodeParameter("messageId", i);
            const labelIds = this.getNodeParameter("labelIds", i);
            const endpoint = `/gmail/v1/users/me/messages/${id}/modify`;
            const body = {
              removeLabelIds: labelIds
            };
            responseData = await import_GenericFunctions.googleApiRequest.call(this, "POST", endpoint, body);
          }
        }
        if (resource === "draft") {
          if (operation === "create") {
            const options = this.getNodeParameter("options", i);
            let qs = {};
            let to = "";
            let cc = "";
            let bcc = "";
            let replyTo = "";
            let fromAlias = "";
            let threadId = null;
            if (options.sendTo) {
              to += import_GenericFunctions.prepareEmailsInput.call(this, options.sendTo, "To", i);
            }
            if (options.ccList) {
              cc = import_GenericFunctions.prepareEmailsInput.call(this, options.ccList, "CC", i);
            }
            if (options.bccList) {
              bcc = import_GenericFunctions.prepareEmailsInput.call(this, options.bccList, "BCC", i);
            }
            if (options.replyTo) {
              replyTo = import_GenericFunctions.prepareEmailsInput.call(this, options.replyTo, "ReplyTo", i);
            }
            if (options.fromAlias) {
              fromAlias = options.fromAlias;
            }
            if (options.threadId && typeof options.threadId === "string") {
              threadId = options.threadId;
            }
            let attachments = [];
            if (options.attachmentsUi) {
              attachments = await import_GenericFunctions.prepareEmailAttachments.call(
                this,
                options.attachmentsUi,
                i
              );
              if (attachments.length) {
                qs = {
                  userId: "me",
                  uploadType: "media"
                };
              }
            }
            const email = {
              from: fromAlias,
              to,
              cc,
              bcc,
              replyTo,
              subject: this.getNodeParameter("subject", i),
              ...import_GenericFunctions.prepareEmailBody.call(this, i),
              attachments
            };
            const body = {
              message: {
                raw: await (0, import_GenericFunctions.encodeEmail)(email),
                threadId: threadId || void 0
              }
            };
            responseData = await import_GenericFunctions.googleApiRequest.call(
              this,
              "POST",
              "/gmail/v1/users/me/drafts",
              body,
              qs
            );
          }
          if (operation === "get") {
            const id = this.getNodeParameter("messageId", i);
            const endpoint = `/gmail/v1/users/me/drafts/${id}`;
            const qs = {};
            const options = this.getNodeParameter("options", i);
            qs.format = "raw";
            responseData = await import_GenericFunctions.googleApiRequest.call(this, "GET", endpoint, {}, qs);
            const dataPropertyNameDownload = options.dataPropertyAttachmentsPrefixName || "attachment_";
            const nodeExecutionData = await import_GenericFunctions.parseRawEmail.call(
              this,
              responseData.message,
              dataPropertyNameDownload
            );
            nodeExecutionData.json.messageId = nodeExecutionData.json.id;
            nodeExecutionData.json.id = responseData.id;
            responseData = [nodeExecutionData];
          }
          if (operation === "delete") {
            const id = this.getNodeParameter("messageId", i);
            const endpoint = `/gmail/v1/users/me/drafts/${id}`;
            responseData = await import_GenericFunctions.googleApiRequest.call(this, "DELETE", endpoint);
            responseData = { success: true };
          }
          if (operation === "getAll") {
            const returnAll = this.getNodeParameter("returnAll", i);
            const options = this.getNodeParameter("options", i);
            const qs = {};
            Object.assign(qs, options);
            if (returnAll) {
              responseData = await import_GenericFunctions.googleApiRequestAllItems.call(
                this,
                "drafts",
                "GET",
                "/gmail/v1/users/me/drafts",
                {},
                qs
              );
            } else {
              qs.maxResults = this.getNodeParameter("limit", i);
              responseData = await import_GenericFunctions.googleApiRequest.call(
                this,
                "GET",
                "/gmail/v1/users/me/drafts",
                {},
                qs
              );
              responseData = responseData.drafts;
            }
            if (responseData === void 0) {
              responseData = [];
            }
            qs.format = "raw";
            for (let index = 0; index < responseData.length; index++) {
              responseData[index] = await import_GenericFunctions.googleApiRequest.call(
                this,
                "GET",
                `/gmail/v1/users/me/drafts/${responseData[index].id}`,
                {},
                qs
              );
              const dataPropertyNameDownload = options.dataPropertyAttachmentsPrefixName || "attachment_";
              const id = responseData[index].id;
              responseData[index] = await import_GenericFunctions.parseRawEmail.call(
                this,
                responseData[index].message,
                dataPropertyNameDownload
              );
              responseData[index].json.messageId = responseData[index].json.id;
              responseData[index].json.id = id;
            }
          }
        }
        if (resource === "thread") {
          if (operation === "delete") {
            const id = this.getNodeParameter("threadId", i);
            const endpoint = `/gmail/v1/users/me/threads/${id}`;
            responseData = await import_GenericFunctions.googleApiRequest.call(this, "DELETE", endpoint);
            responseData = { success: true };
          }
          if (operation === "get") {
            const id = this.getNodeParameter("threadId", i);
            const endpoint = `/gmail/v1/users/me/threads/${id}`;
            const options = this.getNodeParameter("options", i);
            const onlyMessages = options.returnOnlyMessages || false;
            const qs = {};
            const simple = this.getNodeParameter("simple", i);
            if (simple) {
              qs.format = "metadata";
              qs.metadataHeaders = ["From", "To", "Cc", "Bcc", "Subject"];
            } else {
              qs.format = "full";
            }
            responseData = await import_GenericFunctions.googleApiRequest.call(this, "GET", endpoint, {}, qs);
            if (onlyMessages) {
              responseData = this.helpers.returnJsonArray(
                await import_GenericFunctions.simplifyOutput.call(this, responseData.messages)
              );
            } else {
              responseData.messages = await import_GenericFunctions.simplifyOutput.call(
                this,
                responseData.messages
              );
              responseData = [{ json: responseData }];
            }
          }
          if (operation === "getAll") {
            const returnAll = this.getNodeParameter("returnAll", i);
            const filters = this.getNodeParameter("filters", i);
            const qs = {};
            Object.assign(qs, import_GenericFunctions.prepareQuery.call(this, filters, i));
            if (returnAll) {
              responseData = await import_GenericFunctions.googleApiRequestAllItems.call(
                this,
                "threads",
                "GET",
                "/gmail/v1/users/me/threads",
                {},
                qs
              );
            } else {
              qs.maxResults = this.getNodeParameter("limit", i);
              responseData = await import_GenericFunctions.googleApiRequest.call(
                this,
                "GET",
                "/gmail/v1/users/me/threads",
                {},
                qs
              );
              responseData = responseData.threads;
            }
            if (responseData === void 0) {
              responseData = [];
            }
            responseData = this.helpers.returnJsonArray(responseData);
          }
          if (operation === "reply") {
            const messageIdGmail = this.getNodeParameter("messageId", i);
            const options = this.getNodeParameter("options", i);
            responseData = await import_GenericFunctions.replyToEmail.call(this, messageIdGmail, options, i);
          }
          if (operation === "trash") {
            const id = this.getNodeParameter("threadId", i);
            const endpoint = `/gmail/v1/users/me/threads/${id}/trash`;
            responseData = await import_GenericFunctions.googleApiRequest.call(this, "POST", endpoint);
          }
          if (operation === "untrash") {
            const id = this.getNodeParameter("threadId", i);
            const endpoint = `/gmail/v1/users/me/threads/${id}/untrash`;
            responseData = await import_GenericFunctions.googleApiRequest.call(this, "POST", endpoint);
          }
          if (operation === "addLabels") {
            const id = this.getNodeParameter("threadId", i);
            const labelIds = this.getNodeParameter("labelIds", i);
            const endpoint = `/gmail/v1/users/me/threads/${id}/modify`;
            const body = {
              addLabelIds: labelIds
            };
            responseData = await import_GenericFunctions.googleApiRequest.call(this, "POST", endpoint, body);
          }
          if (operation === "removeLabels") {
            const id = this.getNodeParameter("threadId", i);
            const labelIds = this.getNodeParameter("labelIds", i);
            const endpoint = `/gmail/v1/users/me/threads/${id}/modify`;
            const body = {
              removeLabelIds: labelIds
            };
            responseData = await import_GenericFunctions.googleApiRequest.call(this, "POST", endpoint, body);
          }
        }
        const executionData = this.helpers.constructExecutionMetaData(
          this.helpers.returnJsonArray(responseData),
          {
            itemData: { item: i }
          }
        );
        returnData.push(...executionData);
      } catch (error) {
        error.message = `${error.message} (item ${i})`;
        if (this.continueOnFail()) {
          returnData.push({ json: { error: error.message }, pairedItem: { item: i } });
          continue;
        }
        throw new import_n8n_workflow.NodeOperationError(this.getNode(), error, {
          description: error.description,
          itemIndex: i
        });
      }
    }
    if (["draft", "message", "thread"].includes(resource) && ["get", "getAll"].includes(operation)) {
      return [(0, import_GenericFunctions.unescapeSnippets)(returnData)];
    }
    return [returnData];
  }
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  GmailV2
});
//# sourceMappingURL=GmailV2.node.js.map