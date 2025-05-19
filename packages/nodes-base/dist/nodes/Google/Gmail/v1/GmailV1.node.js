"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
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
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);
var GmailV1_node_exports = {};
__export(GmailV1_node_exports, {
  GmailV1: () => GmailV1
});
module.exports = __toCommonJS(GmailV1_node_exports);
var import_isEmpty = __toESM(require("lodash/isEmpty"));
var import_n8n_workflow = require("n8n-workflow");
var import_descriptions = require("../../../../utils/descriptions");
var import_DraftDescription = require("./DraftDescription");
var import_LabelDescription = require("./LabelDescription");
var import_loadOptions = require("./loadOptions");
var import_MessageDescription = require("./MessageDescription");
var import_MessageLabelDescription = require("./MessageLabelDescription");
var import_GenericFunctions = require("../GenericFunctions");
const versionDescription = {
  displayName: "Gmail",
  name: "gmail",
  icon: "file:gmail.svg",
  group: ["transform"],
  version: 1,
  subtitle: '={{$parameter["operation"] + ": " + $parameter["resource"]}}',
  description: "Consume the Gmail API",
  defaults: {
    name: "Gmail"
  },
  inputs: [import_n8n_workflow.NodeConnectionTypes.Main],
  outputs: [import_n8n_workflow.NodeConnectionTypes.Main],
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
  properties: [
    import_descriptions.oldVersionNotice,
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
          name: "Draft",
          value: "draft"
        },
        {
          name: "Label",
          value: "label"
        },
        {
          name: "Message",
          value: "message"
        },
        {
          name: "Message Label",
          value: "messageLabel"
        }
      ],
      default: "draft"
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
    //-------------------------------
    // MessageLabel Operations
    //-------------------------------
    ...import_MessageLabelDescription.messageLabelOperations,
    ...import_MessageLabelDescription.messageLabelFields
    //-------------------------------
  ]
};
class GmailV1 {
  constructor(baseDescription) {
    this.methods = {
      loadOptions: {
        getLabels: import_loadOptions.getLabels
      }
    };
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
    let method = "GET";
    let body = {};
    let qs = {};
    let endpoint = "";
    let responseData;
    for (let i = 0; i < items.length; i++) {
      try {
        if (resource === "label") {
          if (operation === "create") {
            const labelName = this.getNodeParameter("name", i);
            const labelListVisibility = this.getNodeParameter("labelListVisibility", i);
            const messageListVisibility = this.getNodeParameter(
              "messageListVisibility",
              i
            );
            method = "POST";
            endpoint = "/gmail/v1/users/me/labels";
            body = {
              labelListVisibility,
              messageListVisibility,
              name: labelName
            };
            responseData = await import_GenericFunctions.googleApiRequest.call(this, method, endpoint, body, qs);
          }
          if (operation === "delete") {
            const labelId = this.getNodeParameter("labelId", i);
            method = "DELETE";
            endpoint = `/gmail/v1/users/me/labels/${labelId}`;
            responseData = await import_GenericFunctions.googleApiRequest.call(this, method, endpoint, body, qs);
            responseData = { success: true };
          }
          if (operation === "get") {
            const labelId = this.getNodeParameter("labelId", i);
            method = "GET";
            endpoint = `/gmail/v1/users/me/labels/${labelId}`;
            responseData = await import_GenericFunctions.googleApiRequest.call(this, method, endpoint, body, qs);
          }
          if (operation === "getAll") {
            const returnAll = this.getNodeParameter("returnAll", i);
            responseData = await import_GenericFunctions.googleApiRequest.call(
              this,
              "GET",
              "/gmail/v1/users/me/labels",
              {},
              qs
            );
            responseData = responseData.labels;
            if (!returnAll) {
              const limit = this.getNodeParameter("limit", i);
              responseData = responseData.splice(0, limit);
            }
          }
        }
        if (resource === "messageLabel") {
          if (operation === "remove") {
            const messageID = this.getNodeParameter("messageId", i);
            const labelIds = this.getNodeParameter("labelIds", i);
            method = "POST";
            endpoint = `/gmail/v1/users/me/messages/${messageID}/modify`;
            body = {
              removeLabelIds: labelIds
            };
            responseData = await import_GenericFunctions.googleApiRequest.call(this, method, endpoint, body, qs);
          }
          if (operation === "add") {
            const messageID = this.getNodeParameter("messageId", i);
            const labelIds = this.getNodeParameter("labelIds", i);
            method = "POST";
            endpoint = `/gmail/v1/users/me/messages/${messageID}/modify`;
            body = {
              addLabelIds: labelIds
            };
            responseData = await import_GenericFunctions.googleApiRequest.call(this, method, endpoint, body, qs);
          }
        }
        if (resource === "message") {
          if (operation === "send") {
            const additionalFields = this.getNodeParameter("additionalFields", i);
            let toStr = "";
            let ccStr = "";
            let bccStr = "";
            let attachmentsList = [];
            const toList = this.getNodeParameter("toList", i);
            toList.forEach((email2) => {
              toStr += `<${email2}>, `;
            });
            if (additionalFields.ccList) {
              const ccList = additionalFields.ccList;
              ccList.forEach((email2) => {
                ccStr += `<${email2}>, `;
              });
            }
            if (additionalFields.bccList) {
              const bccList = additionalFields.bccList;
              bccList.forEach((email2) => {
                bccStr += `<${email2}>, `;
              });
            }
            if (additionalFields.attachmentsUi) {
              const attachmentsUi = additionalFields.attachmentsUi;
              const attachmentsBinary = [];
              if (!(0, import_isEmpty.default)(attachmentsUi)) {
                if (attachmentsUi.hasOwnProperty("attachmentsBinary") && !(0, import_isEmpty.default)(attachmentsUi.attachmentsBinary) && items[i].binary) {
                  for (const { property } of attachmentsUi.attachmentsBinary) {
                    for (const binaryProperty of property.split(",")) {
                      const binaryData = this.helpers.assertBinaryData(i, binaryProperty);
                      const binaryDataBuffer = await this.helpers.getBinaryDataBuffer(
                        i,
                        binaryProperty
                      );
                      attachmentsBinary.push({
                        name: binaryData.fileName || "unknown",
                        content: binaryDataBuffer,
                        type: binaryData.mimeType
                      });
                    }
                  }
                }
                qs = {
                  userId: "me",
                  uploadType: "media"
                };
                attachmentsList = attachmentsBinary;
              }
            }
            const email = {
              from: additionalFields.senderName || "",
              to: toStr,
              cc: ccStr,
              bcc: bccStr,
              subject: this.getNodeParameter("subject", i),
              body: this.getNodeParameter("message", i),
              attachments: attachmentsList
            };
            if (this.getNodeParameter("includeHtml", i, false)) {
              email.htmlBody = this.getNodeParameter("htmlMessage", i);
            }
            endpoint = "/gmail/v1/users/me/messages/send";
            method = "POST";
            body = {
              raw: await (0, import_GenericFunctions.encodeEmail)(email)
            };
            responseData = await import_GenericFunctions.googleApiRequest.call(this, method, endpoint, body, qs);
          }
          if (operation === "reply") {
            const id = this.getNodeParameter("messageId", i);
            const additionalFields = this.getNodeParameter("additionalFields", i);
            let toStr = "";
            let ccStr = "";
            let bccStr = "";
            let attachmentsList = [];
            const toList = this.getNodeParameter("toList", i);
            toList.forEach((email2) => {
              toStr += `<${email2}>, `;
            });
            if (additionalFields.ccList) {
              const ccList = additionalFields.ccList;
              ccList.forEach((email2) => {
                ccStr += `<${email2}>, `;
              });
            }
            if (additionalFields.bccList) {
              const bccList = additionalFields.bccList;
              bccList.forEach((email2) => {
                bccStr += `<${email2}>, `;
              });
            }
            if (additionalFields.attachmentsUi) {
              const attachmentsUi = additionalFields.attachmentsUi;
              const attachmentsBinary = [];
              if (!(0, import_isEmpty.default)(attachmentsUi)) {
                if (attachmentsUi.hasOwnProperty("attachmentsBinary") && !(0, import_isEmpty.default)(attachmentsUi.attachmentsBinary) && items[i].binary) {
                  for (const { property } of attachmentsUi.attachmentsBinary) {
                    for (const binaryProperty of property.split(",")) {
                      const binaryData = this.helpers.assertBinaryData(i, binaryProperty);
                      const binaryDataBuffer = await this.helpers.getBinaryDataBuffer(
                        i,
                        binaryProperty
                      );
                      attachmentsBinary.push({
                        name: binaryData.fileName || "unknown",
                        content: binaryDataBuffer,
                        type: binaryData.mimeType
                      });
                    }
                  }
                }
                qs = {
                  userId: "me",
                  uploadType: "media"
                };
                attachmentsList = attachmentsBinary;
              }
            }
            endpoint = `/gmail/v1/users/me/messages/${id}`;
            qs.format = "metadata";
            const { payload } = await import_GenericFunctions.googleApiRequest.call(this, method, endpoint, body, qs);
            if (toStr === "") {
              for (const header of payload.headers) {
                if (header.name === "From") {
                  toStr = `<${(0, import_GenericFunctions.extractEmail)(header.value)}>,`;
                  break;
                }
              }
            }
            const subject = payload.headers.filter(
              (data) => data.name === "Subject"
            )[0]?.value || "";
            const references = payload.headers.filter(
              (data) => data.name === "References"
            )[0]?.value || "";
            const email = {
              from: additionalFields.senderName || "",
              to: toStr,
              cc: ccStr,
              bcc: bccStr,
              subject,
              body: this.getNodeParameter("message", i),
              attachments: attachmentsList
            };
            if (this.getNodeParameter("includeHtml", i, false)) {
              email.htmlBody = this.getNodeParameter("htmlMessage", i);
            }
            endpoint = "/gmail/v1/users/me/messages/send";
            method = "POST";
            email.inReplyTo = id;
            email.reference = references;
            body = {
              raw: await (0, import_GenericFunctions.encodeEmail)(email),
              threadId: this.getNodeParameter("threadId", i)
            };
            responseData = await import_GenericFunctions.googleApiRequest.call(this, method, endpoint, body, qs);
          }
          if (operation === "get") {
            method = "GET";
            const id = this.getNodeParameter("messageId", i);
            const additionalFields = this.getNodeParameter("additionalFields", i);
            const format = additionalFields.format || "resolved";
            if (format === "resolved") {
              qs.format = "raw";
            } else {
              qs.format = format;
            }
            endpoint = `/gmail/v1/users/me/messages/${id}`;
            responseData = await import_GenericFunctions.googleApiRequest.call(this, method, endpoint, body, qs);
            let nodeExecutionData;
            if (format === "resolved") {
              const dataPropertyNameDownload = additionalFields.dataPropertyAttachmentsPrefixName || "attachment_";
              nodeExecutionData = await import_GenericFunctions.parseRawEmail.call(
                this,
                responseData,
                dataPropertyNameDownload
              );
            } else {
              nodeExecutionData = {
                json: responseData
              };
            }
            responseData = nodeExecutionData;
          }
          if (operation === "getAll") {
            const returnAll = this.getNodeParameter("returnAll", i);
            const additionalFields = this.getNodeParameter("additionalFields", i);
            Object.assign(qs, additionalFields);
            if (qs.labelIds) {
              if (qs.labelIds == "") {
                delete qs.labelIds;
              } else {
                qs.labelIds = qs.labelIds;
              }
            }
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
            const format = additionalFields.format || "resolved";
            if (format !== "ids") {
              if (format === "resolved") {
                qs.format = "raw";
              } else {
                qs.format = format;
              }
              for (let index = 0; index < responseData.length; index++) {
                responseData[index] = await import_GenericFunctions.googleApiRequest.call(
                  this,
                  "GET",
                  `/gmail/v1/users/me/messages/${responseData[index].id}`,
                  body,
                  qs
                );
                if (format === "resolved") {
                  const dataPropertyNameDownload = additionalFields.dataPropertyAttachmentsPrefixName || "attachment_";
                  responseData[index] = await import_GenericFunctions.parseRawEmail.call(
                    this,
                    responseData[index],
                    dataPropertyNameDownload
                  );
                }
              }
            }
            if (format !== "resolved") {
              responseData = this.helpers.returnJsonArray(responseData);
            }
          }
          if (operation === "delete") {
            method = "DELETE";
            const id = this.getNodeParameter("messageId", i);
            endpoint = `/gmail/v1/users/me/messages/${id}`;
            responseData = await import_GenericFunctions.googleApiRequest.call(this, method, endpoint, body, qs);
            responseData = { success: true };
          }
        }
        if (resource === "draft") {
          if (operation === "create") {
            const additionalFields = this.getNodeParameter("additionalFields", i);
            let toStr = "";
            let ccStr = "";
            let bccStr = "";
            let attachmentsList = [];
            if (additionalFields.toList) {
              const toList = additionalFields.toList;
              toList.forEach((email2) => {
                toStr += `<${email2}>, `;
              });
            }
            if (additionalFields.ccList) {
              const ccList = additionalFields.ccList;
              ccList.forEach((email2) => {
                ccStr += `<${email2}>, `;
              });
            }
            if (additionalFields.bccList) {
              const bccList = additionalFields.bccList;
              bccList.forEach((email2) => {
                bccStr += `<${email2}>, `;
              });
            }
            if (additionalFields.attachmentsUi) {
              const attachmentsUi = additionalFields.attachmentsUi;
              const attachmentsBinary = [];
              if (!(0, import_isEmpty.default)(attachmentsUi)) {
                if (!(0, import_isEmpty.default)(attachmentsUi)) {
                  if (attachmentsUi.hasOwnProperty("attachmentsBinary") && !(0, import_isEmpty.default)(attachmentsUi.attachmentsBinary) && items[i].binary) {
                    for (const { property } of attachmentsUi.attachmentsBinary) {
                      for (const binaryProperty of property.split(",")) {
                        const binaryData = this.helpers.assertBinaryData(i, binaryProperty);
                        const binaryDataBuffer = await this.helpers.getBinaryDataBuffer(
                          i,
                          binaryProperty
                        );
                        attachmentsBinary.push({
                          name: binaryData.fileName || "unknown",
                          content: binaryDataBuffer,
                          type: binaryData.mimeType
                        });
                      }
                    }
                  }
                }
                qs = {
                  userId: "me",
                  uploadType: "media"
                };
                attachmentsList = attachmentsBinary;
              }
            }
            const email = {
              to: toStr,
              cc: ccStr,
              bcc: bccStr,
              subject: this.getNodeParameter("subject", i),
              body: this.getNodeParameter("message", i),
              attachments: attachmentsList
            };
            if (this.getNodeParameter("includeHtml", i, false)) {
              email.htmlBody = this.getNodeParameter("htmlMessage", i);
            }
            endpoint = "/gmail/v1/users/me/drafts";
            method = "POST";
            body = {
              message: {
                raw: await (0, import_GenericFunctions.encodeEmail)(email)
              }
            };
            responseData = await import_GenericFunctions.googleApiRequest.call(this, method, endpoint, body, qs);
          }
          if (operation === "get") {
            method = "GET";
            const id = this.getNodeParameter("messageId", i);
            const additionalFields = this.getNodeParameter("additionalFields", i);
            const format = additionalFields.format || "resolved";
            if (format === "resolved") {
              qs.format = "raw";
            } else {
              qs.format = format;
            }
            endpoint = `/gmail/v1/users/me/drafts/${id}`;
            responseData = await import_GenericFunctions.googleApiRequest.call(this, method, endpoint, body, qs);
            const binaryData = {};
            let nodeExecutionData;
            if (format === "resolved") {
              const dataPropertyNameDownload = additionalFields.dataPropertyAttachmentsPrefixName || "attachment_";
              nodeExecutionData = await import_GenericFunctions.parseRawEmail.call(
                this,
                responseData.message,
                dataPropertyNameDownload
              );
              nodeExecutionData.json.messageId = nodeExecutionData.json.id;
              nodeExecutionData.json.id = responseData.id;
            } else {
              nodeExecutionData = {
                json: responseData,
                binary: Object.keys(binaryData).length ? binaryData : void 0
              };
            }
            responseData = nodeExecutionData;
          }
          if (operation === "delete") {
            method = "DELETE";
            const id = this.getNodeParameter("messageId", i);
            endpoint = `/gmail/v1/users/me/drafts/${id}`;
            responseData = await import_GenericFunctions.googleApiRequest.call(this, method, endpoint, body, qs);
            responseData = { success: true };
          }
          if (operation === "getAll") {
            const returnAll = this.getNodeParameter("returnAll", i);
            const additionalFields = this.getNodeParameter("additionalFields", i);
            Object.assign(qs, additionalFields);
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
            const format = additionalFields.format || "resolved";
            if (format !== "ids") {
              if (format === "resolved") {
                qs.format = "raw";
              } else {
                qs.format = format;
              }
              for (let index = 0; index < responseData.length; index++) {
                responseData[index] = await import_GenericFunctions.googleApiRequest.call(
                  this,
                  "GET",
                  `/gmail/v1/users/me/drafts/${responseData[index].id}`,
                  body,
                  qs
                );
                if (format === "resolved") {
                  const dataPropertyNameDownload = additionalFields.dataPropertyAttachmentsPrefixName || "attachment_";
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
            if (format !== "resolved") {
              responseData = this.helpers.returnJsonArray(responseData);
            }
          }
        }
        const executionData = this.helpers.constructExecutionMetaData(
          this.helpers.returnJsonArray(responseData),
          { itemData: { item: i } }
        );
        returnData.push(...executionData);
      } catch (error) {
        if (this.continueOnFail()) {
          returnData.push({ json: { error: error.message } });
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
  GmailV1
});
//# sourceMappingURL=GmailV1.node.js.map