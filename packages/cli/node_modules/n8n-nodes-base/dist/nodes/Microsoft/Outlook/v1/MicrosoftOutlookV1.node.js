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
var MicrosoftOutlookV1_node_exports = {};
__export(MicrosoftOutlookV1_node_exports, {
  MicrosoftOutlookV1: () => MicrosoftOutlookV1
});
module.exports = __toCommonJS(MicrosoftOutlookV1_node_exports);
var import_n8n_workflow = require("n8n-workflow");
var import_descriptions = require("../../../../utils/descriptions");
var import_DraftDescription = require("./DraftDescription");
var import_DraftMessageSharedDescription = require("./DraftMessageSharedDescription");
var import_FolderDescription = require("./FolderDescription");
var import_FolderMessageDecription = require("./FolderMessageDecription");
var import_GenericFunctions = require("./GenericFunctions");
var import_MessageAttachmentDescription = require("./MessageAttachmentDescription");
var import_MessageDescription = require("./MessageDescription");
const versionDescription = {
  displayName: "Microsoft Outlook",
  name: "microsoftOutlook",
  group: ["transform"],
  icon: "file:outlook.svg",
  version: 1,
  subtitle: '={{$parameter["operation"] + ": " + $parameter["resource"]}}',
  description: "Consume Microsoft Outlook API",
  defaults: {
    name: "Microsoft Outlook"
  },
  inputs: [import_n8n_workflow.NodeConnectionTypes.Main],
  outputs: [import_n8n_workflow.NodeConnectionTypes.Main],
  credentials: [
    {
      name: "microsoftOutlookOAuth2Api",
      required: true
    }
  ],
  properties: [
    import_descriptions.oldVersionNotice,
    {
      displayName: "Resource",
      name: "resource",
      type: "options",
      noDataExpression: true,
      default: "message",
      options: [
        {
          name: "Draft",
          value: "draft"
        },
        {
          name: "Folder",
          value: "folder"
        },
        {
          name: "Folder Message",
          value: "folderMessage"
        },
        {
          name: "Message",
          value: "message"
        },
        {
          name: "Message Attachment",
          value: "messageAttachment"
        }
      ]
    },
    // Draft
    ...import_DraftDescription.draftOperations,
    ...import_DraftDescription.draftFields,
    // Message
    ...import_MessageDescription.messageOperations,
    ...import_MessageDescription.messageFields,
    // Message Attachment
    ...import_MessageAttachmentDescription.messageAttachmentOperations,
    ...import_MessageAttachmentDescription.messageAttachmentFields,
    // Folder
    ...import_FolderDescription.folderOperations,
    ...import_FolderDescription.folderFields,
    // Folder Message
    ...import_FolderMessageDecription.folderMessageOperations,
    ...import_FolderMessageDecription.folderMessageFields,
    // Draft & Message
    ...import_DraftMessageSharedDescription.draftMessageSharedFields
  ]
};
class MicrosoftOutlookV1 {
  constructor(baseDescription) {
    this.methods = {
      loadOptions: {
        // Get all the categories to display them to user so that he can
        // select them easily
        async getCategories() {
          const returnData = [];
          const categories = await import_GenericFunctions.microsoftApiRequestAllItems.call(
            this,
            "value",
            "GET",
            "/outlook/masterCategories"
          );
          for (const category of categories) {
            returnData.push({
              name: category.displayName,
              value: category.id
            });
          }
          return returnData;
        }
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
    const length = items.length;
    const qs = {};
    let responseData;
    const resource = this.getNodeParameter("resource", 0);
    const operation = this.getNodeParameter("operation", 0);
    if (["draft", "message"].includes(resource)) {
      if (operation === "delete") {
        for (let i = 0; i < length; i++) {
          try {
            const messageId = this.getNodeParameter("messageId", i);
            responseData = await import_GenericFunctions.microsoftApiRequest.call(this, "DELETE", `/messages/${messageId}`);
            returnData.push({ success: true });
          } catch (error) {
            if (this.continueOnFail()) {
              returnData.push({ error: error.message });
              continue;
            }
            throw error;
          }
        }
      }
      if (operation === "get") {
        for (let i = 0; i < length; i++) {
          try {
            const messageId = this.getNodeParameter("messageId", i);
            const additionalFields = this.getNodeParameter("additionalFields", i);
            if (additionalFields.fields) {
              qs.$select = additionalFields.fields;
            }
            if (additionalFields.filter) {
              qs.$filter = additionalFields.filter;
            }
            responseData = await import_GenericFunctions.microsoftApiRequest.call(
              this,
              "GET",
              `/messages/${messageId}`,
              void 0,
              qs
            );
            if (additionalFields.dataPropertyAttachmentsPrefixName) {
              const prefix = additionalFields.dataPropertyAttachmentsPrefixName;
              const data = await import_GenericFunctions.downloadAttachments.call(
                this,
                responseData,
                prefix
              );
              returnData.push.apply(returnData, data);
            } else {
              returnData.push(responseData);
            }
            if (additionalFields.dataPropertyAttachmentsPrefixName) {
              return [returnData];
            }
          } catch (error) {
            if (this.continueOnFail()) {
              returnData.push({ error: error.message });
              continue;
            }
            throw error;
          }
        }
      }
      if (operation === "update") {
        for (let i = 0; i < length; i++) {
          try {
            const messageId = this.getNodeParameter("messageId", i);
            const updateFields = this.getNodeParameter("updateFields", i);
            const body = (0, import_GenericFunctions.createMessage)(updateFields);
            responseData = await import_GenericFunctions.microsoftApiRequest.call(
              this,
              "PATCH",
              `/messages/${messageId}`,
              body,
              {}
            );
            returnData.push(responseData);
          } catch (error) {
            if (this.continueOnFail()) {
              returnData.push({ error: error.message });
              continue;
            }
            throw error;
          }
        }
      }
    }
    if (resource === "draft") {
      if (operation === "create") {
        for (let i = 0; i < length; i++) {
          try {
            const additionalFields = this.getNodeParameter("additionalFields", i);
            const subject = this.getNodeParameter("subject", i);
            const bodyContent = this.getNodeParameter("bodyContent", i, "");
            additionalFields.subject = subject;
            additionalFields.bodyContent = bodyContent || " ";
            const body = (0, import_GenericFunctions.createMessage)(additionalFields);
            if (additionalFields.attachments) {
              const attachments = additionalFields.attachments.attachments;
              body.attachments = attachments.map((attachment) => {
                const binaryPropertyName = attachment.binaryPropertyName;
                if (items[i].binary === void 0) {
                  throw new import_n8n_workflow.NodeOperationError(this.getNode(), "No binary data exists on item!", {
                    itemIndex: i
                  });
                }
                if (items[i].binary[binaryPropertyName] === void 0) {
                  throw new import_n8n_workflow.NodeOperationError(
                    this.getNode(),
                    `No binary data property "${binaryPropertyName}" does not exists on item!`,
                    { itemIndex: i }
                  );
                }
                const binaryData = items[i].binary[binaryPropertyName];
                return {
                  "@odata.type": "#microsoft.graph.fileAttachment",
                  name: binaryData.fileName,
                  contentBytes: binaryData.data
                };
              });
            }
            responseData = await import_GenericFunctions.microsoftApiRequest.call(this, "POST", "/messages", body, {});
            returnData.push(responseData);
          } catch (error) {
            if (this.continueOnFail()) {
              returnData.push({ error: error.message });
              continue;
            }
            throw error;
          }
        }
      }
      if (operation === "send") {
        for (let i = 0; i < length; i++) {
          try {
            const messageId = this.getNodeParameter("messageId", i);
            const additionalFields = this.getNodeParameter("additionalFields", i, {});
            if (additionalFields?.recipients) {
              const recipients = additionalFields.recipients.split(",").filter((email) => !!email);
              if (recipients.length !== 0) {
                await import_GenericFunctions.microsoftApiRequest.call(this, "PATCH", `/messages/${messageId}`, {
                  toRecipients: recipients.map((recipient) => (0, import_GenericFunctions.makeRecipient)(recipient))
                });
              }
            }
            responseData = await import_GenericFunctions.microsoftApiRequest.call(
              this,
              "POST",
              `/messages/${messageId}/send`
            );
            returnData.push({ success: true });
          } catch (error) {
            if (this.continueOnFail()) {
              returnData.push({ error: error.message });
              continue;
            }
            throw error;
          }
        }
      }
    }
    if (resource === "message") {
      if (operation === "reply") {
        for (let i = 0; i < length; i++) {
          try {
            const messageId = this.getNodeParameter("messageId", i);
            const replyType = this.getNodeParameter("replyType", i);
            const comment = this.getNodeParameter("comment", i);
            const send = this.getNodeParameter("send", i, false);
            const additionalFields = this.getNodeParameter("additionalFields", i, {});
            const body = {};
            let action = "createReply";
            if (replyType === "replyAll") {
              body.comment = comment;
              action = "createReplyAll";
            } else {
              body.comment = comment;
              body.message = {};
              Object.assign(body.message, (0, import_GenericFunctions.createMessage)(additionalFields));
              delete body.message.attachments;
            }
            responseData = await import_GenericFunctions.microsoftApiRequest.call(
              this,
              "POST",
              `/messages/${messageId}/${action}`,
              body
            );
            if (additionalFields.attachments) {
              const attachments = additionalFields.attachments.attachments;
              const data = attachments.map((attachment) => {
                const binaryPropertyName = attachment.binaryPropertyName;
                if (items[i].binary === void 0) {
                  throw new import_n8n_workflow.NodeOperationError(this.getNode(), "No binary data exists on item!", {
                    itemIndex: i
                  });
                }
                if (items[i].binary[binaryPropertyName] === void 0) {
                  throw new import_n8n_workflow.NodeOperationError(
                    this.getNode(),
                    `No binary data property "${binaryPropertyName}" does not exists on item!`,
                    { itemIndex: i }
                  );
                }
                const binaryData = items[i].binary[binaryPropertyName];
                return {
                  "@odata.type": "#microsoft.graph.fileAttachment",
                  name: binaryData.fileName,
                  contentBytes: binaryData.data
                };
              });
              for (const attachment of data) {
                await import_GenericFunctions.microsoftApiRequest.call(
                  this,
                  "POST",
                  `/messages/${responseData.id}/attachments`,
                  attachment,
                  {}
                );
              }
            }
            if (send) {
              await import_GenericFunctions.microsoftApiRequest.call(this, "POST", `/messages/${responseData.id}/send`);
            }
            returnData.push(responseData);
          } catch (error) {
            if (this.continueOnFail()) {
              returnData.push({ error: error.message });
              continue;
            }
            throw error;
          }
        }
      }
      if (operation === "getMime") {
        for (let i = 0; i < length; i++) {
          try {
            const messageId = this.getNodeParameter("messageId", i);
            const dataPropertyNameDownload = this.getNodeParameter("binaryPropertyName", i);
            const response = await import_GenericFunctions.microsoftApiRequest.call(
              this,
              "GET",
              `/messages/${messageId}/$value`,
              void 0,
              {},
              void 0,
              {},
              { encoding: null, resolveWithFullResponse: true }
            );
            let mimeType;
            if (response.headers["content-type"]) {
              mimeType = response.headers["content-type"];
            }
            const newItem = {
              json: items[i].json,
              binary: {}
            };
            if (items[i].binary !== void 0) {
              Object.assign(newItem.binary, items[i].binary);
            }
            items[i] = newItem;
            const fileName = `${messageId}.eml`;
            const data = Buffer.from(response.body, "utf8");
            items[i].binary[dataPropertyNameDownload] = await this.helpers.prepareBinaryData(
              data,
              fileName,
              mimeType
            );
          } catch (error) {
            if (this.continueOnFail()) {
              items[i].json = { error: error.message };
              continue;
            }
            throw error;
          }
        }
      }
      if (operation === "getAll") {
        let additionalFields = {};
        for (let i = 0; i < length; i++) {
          try {
            const returnAll = this.getNodeParameter("returnAll", i);
            additionalFields = this.getNodeParameter("additionalFields", i);
            if (additionalFields.fields) {
              qs.$select = additionalFields.fields;
            }
            if (additionalFields.filter) {
              qs.$filter = additionalFields.filter;
            }
            const endpoint = "/messages";
            if (returnAll) {
              responseData = await import_GenericFunctions.microsoftApiRequestAllItems.call(
                this,
                "value",
                "GET",
                endpoint,
                void 0,
                qs
              );
            } else {
              qs.$top = this.getNodeParameter("limit", i);
              responseData = await import_GenericFunctions.microsoftApiRequest.call(this, "GET", endpoint, void 0, qs);
              responseData = responseData.value;
            }
            if (additionalFields.dataPropertyAttachmentsPrefixName) {
              const prefix = additionalFields.dataPropertyAttachmentsPrefixName;
              const data = await import_GenericFunctions.downloadAttachments.call(
                this,
                responseData,
                prefix
              );
              returnData.push.apply(returnData, data);
            } else {
              returnData.push.apply(returnData, responseData);
            }
          } catch (error) {
            if (this.continueOnFail()) {
              returnData.push({ error: error.message });
              continue;
            }
            throw error;
          }
        }
        if (additionalFields.dataPropertyAttachmentsPrefixName) {
          return [returnData];
        }
      }
      if (operation === "move") {
        for (let i = 0; i < length; i++) {
          try {
            const messageId = this.getNodeParameter("messageId", i);
            const destinationId = this.getNodeParameter("folderId", i);
            const body = {
              destinationId
            };
            responseData = await import_GenericFunctions.microsoftApiRequest.call(
              this,
              "POST",
              `/messages/${messageId}/move`,
              body
            );
            returnData.push({ success: true });
          } catch (error) {
            if (this.continueOnFail()) {
              returnData.push({ error: error.message });
              continue;
            }
            throw error;
          }
        }
      }
      if (operation === "send") {
        for (let i = 0; i < length; i++) {
          try {
            const additionalFields = this.getNodeParameter("additionalFields", i);
            const toRecipients = this.getNodeParameter("toRecipients", i);
            const subject = this.getNodeParameter("subject", i);
            const bodyContent = this.getNodeParameter("bodyContent", i, "");
            additionalFields.subject = subject;
            additionalFields.bodyContent = bodyContent || " ";
            additionalFields.toRecipients = toRecipients;
            const saveToSentItems = additionalFields.saveToSentItems === void 0 ? true : additionalFields.saveToSentItems;
            delete additionalFields.saveToSentItems;
            const message = (0, import_GenericFunctions.createMessage)(additionalFields);
            if (additionalFields.attachments) {
              const attachments = additionalFields.attachments.attachments;
              message.attachments = attachments.map((attachment) => {
                const binaryPropertyName = attachment.binaryPropertyName;
                if (items[i].binary === void 0) {
                  throw new import_n8n_workflow.NodeOperationError(this.getNode(), "No binary data exists on item!", {
                    itemIndex: i
                  });
                }
                if (items[i].binary[binaryPropertyName] === void 0) {
                  throw new import_n8n_workflow.NodeOperationError(
                    this.getNode(),
                    `No binary data property "${binaryPropertyName}" does not exists on item!`,
                    { itemIndex: i }
                  );
                }
                const binaryData = items[i].binary[binaryPropertyName];
                return {
                  "@odata.type": "#microsoft.graph.fileAttachment",
                  name: binaryData.fileName,
                  contentBytes: binaryData.data
                };
              });
            }
            const body = {
              message,
              saveToSentItems
            };
            responseData = await import_GenericFunctions.microsoftApiRequest.call(this, "POST", "/sendMail", body, {});
            returnData.push({ success: true });
          } catch (error) {
            if (this.continueOnFail()) {
              returnData.push({ error: error.message });
              continue;
            }
            throw error;
          }
        }
      }
    }
    if (resource === "messageAttachment") {
      if (operation === "add") {
        for (let i = 0; i < length; i++) {
          try {
            const messageId = this.getNodeParameter("messageId", i);
            const binaryPropertyName = this.getNodeParameter("binaryPropertyName", 0);
            const additionalFields = this.getNodeParameter("additionalFields", i);
            if (items[i].binary === void 0) {
              throw new import_n8n_workflow.NodeOperationError(this.getNode(), "No binary data exists on item!");
            }
            if (items[i].binary[binaryPropertyName] === void 0) {
              throw new import_n8n_workflow.NodeOperationError(
                this.getNode(),
                `No binary data property "${binaryPropertyName}" does not exists on item!`,
                { itemIndex: i }
              );
            }
            const binaryData = items[i].binary[binaryPropertyName];
            const dataBuffer = await this.helpers.getBinaryDataBuffer(i, binaryPropertyName);
            const fileName = additionalFields.fileName === void 0 ? binaryData.fileName : additionalFields.fileName;
            if (!fileName) {
              throw new import_n8n_workflow.NodeOperationError(
                this.getNode(),
                'File name is not set. It has either to be set via "Additional Fields" or has to be set on the binary property!',
                { itemIndex: i }
              );
            }
            if (dataBuffer.length > 3e6) {
              const chunkSize = 4e6;
              const body = {
                AttachmentItem: {
                  attachmentType: "file",
                  name: fileName,
                  size: dataBuffer.length
                }
              };
              responseData = await import_GenericFunctions.microsoftApiRequest.call(
                this,
                "POST",
                `/messages/${messageId}/attachments/createUploadSession`,
                body
              );
              const uploadUrl = responseData.uploadUrl;
              if (uploadUrl === void 0) {
                throw new import_n8n_workflow.NodeApiError(this.getNode(), responseData, {
                  message: "Failed to get upload session"
                });
              }
              for (let bytesUploaded = 0; bytesUploaded < dataBuffer.length; bytesUploaded += chunkSize) {
                const nextChunk = Math.min(bytesUploaded + chunkSize, dataBuffer.length);
                const contentRange = `bytes ${bytesUploaded}-${nextChunk - 1}/${dataBuffer.length}`;
                const data = dataBuffer.subarray(bytesUploaded, nextChunk);
                responseData = await this.helpers.request(uploadUrl, {
                  method: "PUT",
                  headers: {
                    "Content-Type": "application/octet-stream",
                    "Content-Length": data.length,
                    "Content-Range": contentRange
                  },
                  body: data
                });
              }
            } else {
              const body = {
                "@odata.type": "#microsoft.graph.fileAttachment",
                name: fileName,
                contentBytes: binaryData.data
              };
              responseData = await import_GenericFunctions.microsoftApiRequest.call(
                this,
                "POST",
                `/messages/${messageId}/attachments`,
                body,
                {}
              );
            }
            returnData.push({ success: true });
          } catch (error) {
            if (this.continueOnFail()) {
              returnData.push({ error: error.message });
              continue;
            }
            throw error;
          }
        }
      }
      if (operation === "download") {
        for (let i = 0; i < length; i++) {
          try {
            const messageId = this.getNodeParameter("messageId", i);
            const attachmentId = this.getNodeParameter("attachmentId", i);
            const dataPropertyNameDownload = this.getNodeParameter("binaryPropertyName", i);
            const attachmentDetails = await import_GenericFunctions.microsoftApiRequest.call(
              this,
              "GET",
              `/messages/${messageId}/attachments/${attachmentId}`,
              void 0,
              { $select: "id,name,contentType" }
            );
            let mimeType;
            if (attachmentDetails.contentType) {
              mimeType = attachmentDetails.contentType;
            }
            const fileName = attachmentDetails.name;
            const response = await import_GenericFunctions.microsoftApiRequest.call(
              this,
              "GET",
              `/messages/${messageId}/attachments/${attachmentId}/$value`,
              void 0,
              {},
              void 0,
              {},
              { encoding: null, resolveWithFullResponse: true }
            );
            const newItem = {
              json: items[i].json,
              binary: {}
            };
            if (items[i].binary !== void 0) {
              Object.assign(newItem.binary, items[i].binary);
            }
            items[i] = newItem;
            const data = Buffer.from(response.body, "utf8");
            items[i].binary[dataPropertyNameDownload] = await this.helpers.prepareBinaryData(
              data,
              fileName,
              mimeType
            );
          } catch (error) {
            if (this.continueOnFail()) {
              items[i].json = { error: error.message };
              continue;
            }
            throw error;
          }
        }
      }
      if (operation === "get") {
        for (let i = 0; i < length; i++) {
          try {
            const messageId = this.getNodeParameter("messageId", i);
            const attachmentId = this.getNodeParameter("attachmentId", i);
            const additionalFields = this.getNodeParameter("additionalFields", i);
            qs.$select = "id,lastModifiedDateTime,name,contentType,size,isInline";
            if (additionalFields.fields) {
              qs.$select = additionalFields.fields;
            }
            responseData = await import_GenericFunctions.microsoftApiRequest.call(
              this,
              "GET",
              `/messages/${messageId}/attachments/${attachmentId}`,
              void 0,
              qs
            );
            returnData.push(responseData);
          } catch (error) {
            if (this.continueOnFail()) {
              returnData.push({ error: error.message });
              continue;
            }
            throw error;
          }
        }
      }
      if (operation === "getAll") {
        for (let i = 0; i < length; i++) {
          try {
            const messageId = this.getNodeParameter("messageId", i);
            const returnAll = this.getNodeParameter("returnAll", i);
            const additionalFields = this.getNodeParameter("additionalFields", i);
            qs.$select = "id,lastModifiedDateTime,name,contentType,size,isInline";
            if (additionalFields.fields) {
              qs.$select = additionalFields.fields;
            }
            if (additionalFields.filter) {
              qs.$filter = additionalFields.filter;
            }
            const endpoint = `/messages/${messageId}/attachments`;
            if (returnAll) {
              responseData = await import_GenericFunctions.microsoftApiRequestAllItems.call(
                this,
                "value",
                "GET",
                endpoint,
                void 0,
                qs
              );
            } else {
              qs.$top = this.getNodeParameter("limit", i);
              responseData = await import_GenericFunctions.microsoftApiRequest.call(this, "GET", endpoint, void 0, qs);
              responseData = responseData.value;
            }
            returnData.push.apply(returnData, responseData);
          } catch (error) {
            if (this.continueOnFail()) {
              returnData.push({ error: error.message });
              continue;
            }
            throw error;
          }
        }
      }
    }
    if (resource === "folder") {
      if (operation === "create") {
        for (let i = 0; i < length; i++) {
          try {
            const displayName = this.getNodeParameter("displayName", i);
            const folderType = this.getNodeParameter("folderType", i);
            const body = {
              displayName
            };
            let endpoint = "/mailFolders";
            if (folderType === "searchFolder") {
              endpoint = "/mailFolders/searchfolders/childFolders";
              const includeNestedFolders = this.getNodeParameter("includeNestedFolders", i);
              const sourceFolderIds = this.getNodeParameter("sourceFolderIds", i);
              const filterQuery = this.getNodeParameter("filterQuery", i);
              Object.assign(body, {
                "@odata.type": "microsoft.graph.mailSearchFolder",
                includeNestedFolders,
                sourceFolderIds,
                filterQuery
              });
            }
            responseData = await import_GenericFunctions.microsoftApiRequest.call(this, "POST", endpoint, body);
            returnData.push(responseData);
          } catch (error) {
            if (this.continueOnFail()) {
              returnData.push({ error: error.message });
              continue;
            }
            throw error;
          }
        }
      }
      if (operation === "delete") {
        for (let i = 0; i < length; i++) {
          try {
            const folderId = this.getNodeParameter("folderId", i);
            responseData = await import_GenericFunctions.microsoftApiRequest.call(
              this,
              "DELETE",
              `/mailFolders/${folderId}`
            );
            returnData.push({ success: true });
          } catch (error) {
            if (this.continueOnFail()) {
              returnData.push({ error: error.message });
              continue;
            }
            throw error;
          }
        }
      }
      if (operation === "get") {
        for (let i = 0; i < length; i++) {
          try {
            const folderId = this.getNodeParameter("folderId", i);
            const additionalFields = this.getNodeParameter("additionalFields", i);
            if (additionalFields.fields) {
              qs.$select = additionalFields.fields;
            }
            if (additionalFields.filter) {
              qs.$filter = additionalFields.filter;
            }
            responseData = await import_GenericFunctions.microsoftApiRequest.call(
              this,
              "GET",
              `/mailFolders/${folderId}`,
              {},
              qs
            );
            returnData.push(responseData);
          } catch (error) {
            if (this.continueOnFail()) {
              returnData.push({ error: error.message });
              continue;
            }
            throw error;
          }
        }
      }
      if (operation === "getAll") {
        for (let i = 0; i < length; i++) {
          try {
            const returnAll = this.getNodeParameter("returnAll", i);
            const additionalFields = this.getNodeParameter("additionalFields", i);
            if (additionalFields.fields) {
              qs.$select = additionalFields.fields;
            }
            if (additionalFields.filter) {
              qs.$filter = additionalFields.filter;
            }
            if (returnAll) {
              responseData = await import_GenericFunctions.microsoftApiRequestAllItems.call(
                this,
                "value",
                "GET",
                "/mailFolders",
                {},
                qs
              );
            } else {
              qs.$top = this.getNodeParameter("limit", i);
              responseData = await import_GenericFunctions.microsoftApiRequest.call(this, "GET", "/mailFolders", {}, qs);
              responseData = responseData.value;
            }
            returnData.push.apply(returnData, responseData);
          } catch (error) {
            if (this.continueOnFail()) {
              returnData.push({ error: error.message });
              continue;
            }
            throw error;
          }
        }
      }
      if (operation === "getChildren") {
        for (let i = 0; i < length; i++) {
          try {
            const folderId = this.getNodeParameter("folderId", i);
            const returnAll = this.getNodeParameter("returnAll", i);
            const additionalFields = this.getNodeParameter("additionalFields", i);
            if (additionalFields.fields) {
              qs.$select = additionalFields.fields;
            }
            if (additionalFields.filter) {
              qs.$filter = additionalFields.filter;
            }
            if (returnAll) {
              responseData = await import_GenericFunctions.microsoftApiRequestAllItems.call(
                this,
                "value",
                "GET",
                `/mailFolders/${folderId}/childFolders`,
                qs
              );
            } else {
              qs.$top = this.getNodeParameter("limit", i);
              responseData = await import_GenericFunctions.microsoftApiRequest.call(
                this,
                "GET",
                `/mailFolders/${folderId}/childFolders`,
                void 0,
                qs
              );
              responseData = responseData.value;
            }
            returnData.push.apply(returnData, responseData);
          } catch (error) {
            if (this.continueOnFail()) {
              returnData.push({ error: error.message });
              continue;
            }
            throw error;
          }
        }
      }
      if (operation === "update") {
        for (let i = 0; i < length; i++) {
          try {
            const folderId = this.getNodeParameter("folderId", i);
            const updateFields = this.getNodeParameter("updateFields", i);
            const body = {
              ...updateFields
            };
            responseData = await import_GenericFunctions.microsoftApiRequest.call(
              this,
              "PATCH",
              `/mailFolders/${folderId}`,
              body
            );
            returnData.push(responseData);
          } catch (error) {
            if (this.continueOnFail()) {
              returnData.push({ error: error.message });
              continue;
            }
            throw error;
          }
        }
      }
    }
    if (resource === "folderMessage") {
      for (let i = 0; i < length; i++) {
        try {
          if (operation === "getAll") {
            const folderId = this.getNodeParameter("folderId", i);
            const returnAll = this.getNodeParameter("returnAll", i);
            const additionalFields = this.getNodeParameter("additionalFields", i);
            if (additionalFields.fields) {
              qs.$select = additionalFields.fields;
            }
            if (additionalFields.filter) {
              qs.$filter = additionalFields.filter;
            }
            const endpoint = `/mailFolders/${folderId}/messages`;
            if (returnAll) {
              responseData = await import_GenericFunctions.microsoftApiRequestAllItems.call(
                this,
                "value",
                "GET",
                endpoint,
                qs
              );
            } else {
              qs.$top = this.getNodeParameter("limit", i);
              responseData = await import_GenericFunctions.microsoftApiRequest.call(this, "GET", endpoint, void 0, qs);
              responseData = responseData.value;
            }
            returnData.push.apply(returnData, responseData);
          }
        } catch (error) {
          if (this.continueOnFail()) {
            returnData.push({ error: error.message });
            continue;
          }
          throw error;
        }
      }
    }
    if (resource === "message" && operation === "getMime" || resource === "messageAttachment" && operation === "download") {
      return [items];
    } else {
      return [this.helpers.returnJsonArray(returnData)];
    }
  }
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  MicrosoftOutlookV1
});
//# sourceMappingURL=MicrosoftOutlookV1.node.js.map