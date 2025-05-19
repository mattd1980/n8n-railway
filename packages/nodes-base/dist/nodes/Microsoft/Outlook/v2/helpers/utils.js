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
  contactFields: () => contactFields,
  createMessage: () => createMessage,
  decodeOutlookId: () => decodeOutlookId,
  encodeOutlookId: () => encodeOutlookId,
  eventfields: () => eventfields,
  makeRecipient: () => makeRecipient,
  messageFields: () => messageFields,
  prepareApiError: () => prepareApiError,
  prepareContactFields: () => prepareContactFields,
  prepareFilterString: () => prepareFilterString,
  simplifyOutputMessages: () => simplifyOutputMessages
});
module.exports = __toCommonJS(utils_exports);
var import_n8n_workflow = require("n8n-workflow");
const messageFields = [
  "bccRecipients",
  "body",
  "bodyPreview",
  "categories",
  "ccRecipients",
  "changeKey",
  "conversationId",
  "createdDateTime",
  "flag",
  "from",
  "hasAttachments",
  "importance",
  "inferenceClassification",
  "internetMessageId",
  "isDeliveryReceiptRequested",
  "isDraft",
  "isRead",
  "isReadReceiptRequested",
  "lastModifiedDateTime",
  "parentFolderId",
  "receivedDateTime",
  "replyTo",
  "sender",
  "sentDateTime",
  "subject",
  "toRecipients",
  "webLink"
].map((field) => ({ name: field, value: field }));
const eventfields = [
  "allowNewTimeProposals",
  "attendees",
  "body",
  "bodyPreview",
  "categories",
  "changeKey",
  "createdDateTime",
  "end",
  "hasAttachments",
  "hideAttendees",
  "iCalUId",
  "importance",
  "isAllDay",
  "isCancelled",
  "isDraft",
  "isOnlineMeeting",
  "isOrganizer",
  "isReminderOn",
  "lastModifiedDateTime",
  "location",
  "locations",
  "onlineMeeting",
  "onlineMeetingProvider",
  "onlineMeetingUrl",
  "organizer",
  "originalEndTimeZone",
  "originalStartTimeZone",
  "recurrence",
  "reminderMinutesBeforeStart",
  "responseRequested",
  "responseStatus",
  "sensitivity",
  "seriesMasterId",
  "showAs",
  "start",
  "subject",
  "transactionId",
  "type",
  "webLink"
].map((field) => ({ name: field, value: field }));
const contactFields = [
  "createdDateTime",
  "lastModifiedDateTime",
  "changeKey",
  "categories",
  "parentFolderId",
  "birthday",
  "fileAs",
  "displayName",
  "givenName",
  "initials",
  "middleName",
  "nickName",
  "surname",
  "title",
  "yomiGivenName",
  "yomiSurname",
  "yomiCompanyName",
  "generation",
  "imAddresses",
  "jobTitle",
  "companyName",
  "department",
  "officeLocation",
  "profession",
  "businessHomePage",
  "assistantName",
  "manager",
  "homePhones",
  "mobilePhone",
  "businessPhones",
  "spouseName",
  "personalNotes",
  "children",
  "emailAddresses",
  "homeAddress",
  "businessAddress",
  "otherAddress"
].map((field) => ({ name: field, value: field }));
function makeRecipient(email) {
  return {
    emailAddress: {
      address: email
    }
  };
}
function createMessage(fields) {
  const message = {};
  if (fields.bodyContent || fields.bodyContentType) {
    const bodyObject = {
      content: fields.bodyContent,
      contentType: fields.bodyContentType
    };
    message.body = bodyObject;
    delete fields.bodyContent;
    delete fields.bodyContentType;
  }
  if ("internetMessageHeaders" in fields && "headers" in fields.internetMessageHeaders) {
    fields.internetMessageHeaders = fields.internetMessageHeaders.headers;
  }
  for (const [key, value] of Object.entries(fields)) {
    if (["bccRecipients", "ccRecipients", "replyTo", "sender", "toRecipients"].includes(key)) {
      if (Array.isArray(value)) {
        message[key] = value.map((email) => makeRecipient(email));
      } else if (typeof value === "string") {
        message[key] = value.split(",").map((recipient) => makeRecipient(recipient.trim()));
      } else {
        throw new import_n8n_workflow.ApplicationError(`The "${key}" field must be a string or an array of strings`, {
          level: "warning"
        });
      }
      continue;
    }
    if (["from", "sender"].includes(key)) {
      if (value) {
        message[key] = makeRecipient(value);
      }
      continue;
    }
    message[key] = value;
  }
  return message;
}
function simplifyOutputMessages(data) {
  return data.map((item) => {
    return {
      id: item.id,
      conversationId: item.conversationId,
      subject: item.subject,
      bodyPreview: item.bodyPreview,
      from: item.from?.emailAddress?.address,
      to: item.toRecipients.map(
        (recipient) => recipient.emailAddress?.address
      ),
      categories: item.categories,
      hasAttachments: item.hasAttachments
    };
  });
}
function prepareContactFields(fields) {
  const returnData = {};
  const typeStringCollection = [
    "businessPhones",
    "categories",
    "children",
    "homePhones",
    "imAddresses"
  ];
  const typeValuesToExtract = ["businessAddress", "emailAddresses", "homePhones", "otherAddress"];
  for (const [key, value] of Object.entries(fields)) {
    if (value === void 0 || value === "") {
      continue;
    }
    if (typeStringCollection.includes(key) && !Array.isArray(value)) {
      returnData[key] = value.split(",").map((item) => item.trim());
      continue;
    }
    if (typeValuesToExtract.includes(key)) {
      if (value.values === void 0) continue;
      returnData[key] = value.values;
      continue;
    }
    returnData[key] = value;
  }
  return returnData;
}
function prepareFilterString(filters) {
  const selectedFilters = filters.filters;
  const filterString = [];
  if (selectedFilters.foldersToInclude) {
    const folders = selectedFilters.foldersToInclude.filter((folder) => folder !== "").map((folder) => `parentFolderId eq '${folder}'`).join(" or ");
    filterString.push(folders);
  }
  if (selectedFilters.foldersToExclude) {
    for (const folder of selectedFilters.foldersToExclude) {
      filterString.push(`parentFolderId ne '${folder}'`);
    }
  }
  if (selectedFilters.sender) {
    const sender = selectedFilters.sender;
    const byMailAddress = `from/emailAddress/address eq '${sender}'`;
    const byName = `from/emailAddress/name eq '${sender}'`;
    filterString.push(`(${byMailAddress} or ${byName})`);
  }
  if (selectedFilters.hasAttachments) {
    filterString.push(`hasAttachments eq ${selectedFilters.hasAttachments}`);
  }
  if (selectedFilters.readStatus && selectedFilters.readStatus !== "both") {
    filterString.push(`isRead eq ${selectedFilters.readStatus === "read"}`);
  }
  if (selectedFilters.receivedAfter) {
    filterString.push(`receivedDateTime ge ${selectedFilters.receivedAfter}`);
  }
  if (selectedFilters.receivedBefore) {
    filterString.push(`receivedDateTime le ${selectedFilters.receivedBefore}`);
  }
  if (selectedFilters.custom) {
    filterString.push(selectedFilters.custom);
  }
  return filterString.length ? filterString.join(" and ") : void 0;
}
function prepareApiError(error, itemIndex = 0) {
  const [httpCode, err, message] = error.description.split(" - ");
  const json = (0, import_n8n_workflow.jsonParse)(err);
  return new import_n8n_workflow.NodeApiError(this.getNode(), json, {
    itemIndex,
    httpCode,
    //In UI we are replacing some of the field names to make them more user friendly, updating error message to reflect that
    message: message.replace(/toRecipients/g, "toRecipients (To)").replace(/bodyContent/g, "bodyContent (Message)").replace(/bodyContentType/g, "bodyContentType (Message Type)")
  });
}
const encodeOutlookId = (id) => {
  return id.replace(/-/g, "%2F").replace(/=/g, "%3D").replace(/\+/g, "%2B");
};
const decodeOutlookId = (id) => {
  return id.replace(/%2F/g, "-").replace(/%3D/g, "=").replace(/%2B/g, "+");
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  contactFields,
  createMessage,
  decodeOutlookId,
  encodeOutlookId,
  eventfields,
  makeRecipient,
  messageFields,
  prepareApiError,
  prepareContactFields,
  prepareFilterString,
  simplifyOutputMessages
});
//# sourceMappingURL=utils.js.map