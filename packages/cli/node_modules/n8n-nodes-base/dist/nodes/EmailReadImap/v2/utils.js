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
var utils_exports = {};
__export(utils_exports, {
  getNewEmails: () => getNewEmails
});
module.exports = __toCommonJS(utils_exports);
var import_imap = require("@n8n/imap");
var import_lodash = require("lodash");
var import_mailparser = require("mailparser");
var import_n8n_workflow = require("n8n-workflow");
async function parseRawEmail(messageEncoded, dataPropertyNameDownload) {
  const responseData = await (0, import_mailparser.simpleParser)(messageEncoded);
  const headers = {};
  const additionalData = {};
  for (const header of responseData.headerLines) {
    headers[header.key] = header.line;
  }
  additionalData.headers = headers;
  additionalData.headerLines = void 0;
  const binaryData = {};
  if (responseData.attachments) {
    for (let i = 0; i < responseData.attachments.length; i++) {
      const attachment = responseData.attachments[i];
      binaryData[`${dataPropertyNameDownload}${i}`] = await this.helpers.prepareBinaryData(
        attachment.content,
        attachment.filename,
        attachment.contentType
      );
    }
    additionalData.attachments = void 0;
  }
  return {
    json: { ...responseData, ...additionalData },
    binary: Object.keys(binaryData).length ? binaryData : void 0
  };
}
async function getNewEmails(imapConnection, searchCriteria, staticData, postProcessAction, getText, getAttachment) {
  const format = this.getNodeParameter("format", 0);
  let fetchOptions = {};
  if (format === "simple" || format === "raw") {
    fetchOptions = {
      bodies: ["TEXT", "HEADER"],
      markSeen: false,
      struct: true
    };
  } else if (format === "resolved") {
    fetchOptions = {
      bodies: [""],
      markSeen: false,
      struct: true
    };
  }
  const results = await imapConnection.search(searchCriteria, fetchOptions);
  const newEmails = [];
  let newEmail;
  let attachments;
  let propertyName;
  const topLevelProperties = ["cc", "date", "from", "subject", "to"];
  if (format === "resolved") {
    const dataPropertyAttachmentsPrefixName = this.getNodeParameter(
      "dataPropertyAttachmentsPrefixName"
    );
    for (const message of results) {
      if (staticData.lastMessageUid !== void 0 && message.attributes.uid <= staticData.lastMessageUid) {
        continue;
      }
      if (staticData.lastMessageUid === void 0 || staticData.lastMessageUid < message.attributes.uid) {
        staticData.lastMessageUid = message.attributes.uid;
      }
      const part = (0, import_lodash.find)(message.parts, { which: "" });
      if (part === void 0) {
        throw new import_n8n_workflow.NodeOperationError(this.getNode(), "Email part could not be parsed.");
      }
      const parsedEmail = await parseRawEmail.call(
        this,
        part.body,
        dataPropertyAttachmentsPrefixName
      );
      newEmails.push(parsedEmail);
    }
  } else if (format === "simple") {
    const downloadAttachments = this.getNodeParameter("downloadAttachments");
    let dataPropertyAttachmentsPrefixName = "";
    if (downloadAttachments) {
      dataPropertyAttachmentsPrefixName = this.getNodeParameter(
        "dataPropertyAttachmentsPrefixName"
      );
    }
    for (const message of results) {
      if (staticData.lastMessageUid !== void 0 && message.attributes.uid <= staticData.lastMessageUid) {
        continue;
      }
      if (staticData.lastMessageUid === void 0 || staticData.lastMessageUid < message.attributes.uid) {
        staticData.lastMessageUid = message.attributes.uid;
      }
      const parts = (0, import_imap.getParts)(message.attributes.struct);
      newEmail = {
        json: {
          textHtml: await getText(parts, message, "html"),
          textPlain: await getText(parts, message, "plain"),
          metadata: {},
          attributes: {
            uid: message.attributes.uid
          }
        }
      };
      const messageHeader = message.parts.filter((part) => part.which === "HEADER");
      const messageBody = messageHeader[0].body;
      for (propertyName of Object.keys(messageBody)) {
        if (messageBody[propertyName].length) {
          if (topLevelProperties.includes(propertyName)) {
            newEmail.json[propertyName] = messageBody[propertyName][0];
          } else {
            newEmail.json.metadata[propertyName] = messageBody[propertyName][0];
          }
        }
      }
      if (downloadAttachments) {
        attachments = await getAttachment(imapConnection, parts, message);
        if (attachments.length) {
          newEmail.binary = {};
          for (let i = 0; i < attachments.length; i++) {
            newEmail.binary[`${dataPropertyAttachmentsPrefixName}${i}`] = attachments[i];
          }
        }
      }
      newEmails.push(newEmail);
    }
  } else if (format === "raw") {
    for (const message of results) {
      if (staticData.lastMessageUid !== void 0 && message.attributes.uid <= staticData.lastMessageUid) {
        continue;
      }
      if (staticData.lastMessageUid === void 0 || staticData.lastMessageUid < message.attributes.uid) {
        staticData.lastMessageUid = message.attributes.uid;
      }
      const part = (0, import_lodash.find)(message.parts, { which: "TEXT" });
      if (part === void 0) {
        throw new import_n8n_workflow.NodeOperationError(this.getNode(), "Email part could not be parsed.");
      }
      newEmail = {
        json: {
          raw: part.body
        }
      };
      newEmails.push(newEmail);
    }
  }
  if (postProcessAction === "read") {
    const uidList = results.map((e) => e.attributes.uid);
    if (uidList.length > 0) {
      await imapConnection.addFlags(uidList, "\\SEEN");
    }
  }
  return newEmails;
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  getNewEmails
});
//# sourceMappingURL=utils.js.map