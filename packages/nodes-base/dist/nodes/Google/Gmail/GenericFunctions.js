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
var GenericFunctions_exports = {};
__export(GenericFunctions_exports, {
  encodeEmail: () => encodeEmail,
  extractEmail: () => extractEmail,
  getLabels: () => getLabels,
  googleApiRequest: () => googleApiRequest,
  googleApiRequestAllItems: () => googleApiRequestAllItems,
  parseRawEmail: () => parseRawEmail,
  prepareEmailAttachments: () => prepareEmailAttachments,
  prepareEmailBody: () => prepareEmailBody,
  prepareEmailsInput: () => prepareEmailsInput,
  prepareQuery: () => prepareQuery,
  prepareTimestamp: () => prepareTimestamp,
  replyToEmail: () => replyToEmail,
  simplifyOutput: () => simplifyOutput,
  unescapeSnippets: () => unescapeSnippets
});
module.exports = __toCommonJS(GenericFunctions_exports);
var import_isEmpty = __toESM(require("lodash/isEmpty"));
var import_luxon = require("luxon");
var import_mailparser = require("mailparser");
var import_n8n_workflow = require("n8n-workflow");
var import_mail_composer = __toESM(require("nodemailer/lib/mail-composer"));
var import_utilities = require("../../../utils/utilities");
var import_GenericFunctions = require("../GenericFunctions");
async function googleApiRequest(method, endpoint, body = {}, qs = {}, uri, option = {}) {
  let options = {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json"
    },
    method,
    body,
    qs,
    uri: uri || `https://www.googleapis.com${endpoint}`,
    qsStringifyOptions: {
      arrayFormat: "repeat"
    },
    json: true
  };
  options = Object.assign({}, options, option);
  try {
    if (Object.keys(body).length === 0) {
      delete options.body;
    }
    let credentialType = "gmailOAuth2";
    const authentication = this.getNodeParameter("authentication", 0);
    if (authentication === "serviceAccount") {
      const credentials = await this.getCredentials("googleApi");
      credentialType = "googleApi";
      const { access_token } = await import_GenericFunctions.getGoogleAccessToken.call(this, credentials, "gmail");
      options.headers.Authorization = `Bearer ${access_token}`;
    }
    const response = await this.helpers.requestWithAuthentication.call(
      this,
      credentialType,
      options
    );
    return response;
  } catch (error) {
    if (error.code === "ERR_OSSL_PEM_NO_START_LINE") {
      error.statusCode = "401";
    }
    if (error.httpCode === "400") {
      if (error.cause && (error.cause.message || "").includes("Invalid id value")) {
        const resource = this.getNodeParameter("resource", 0);
        const errorOptions = {
          message: `Invalid ${resource} ID`,
          description: `${resource.charAt(0).toUpperCase() + resource.slice(1)} IDs should look something like this: 182b676d244938bd`
        };
        throw new import_n8n_workflow.NodeApiError(this.getNode(), error, errorOptions);
      }
    }
    if (error.httpCode === "404") {
      let resource = this.getNodeParameter("resource", 0);
      if (resource === "label") {
        resource = "label ID";
      }
      const errorOptions = {
        message: `${resource.charAt(0).toUpperCase() + resource.slice(1)} not found`,
        description: ""
      };
      throw new import_n8n_workflow.NodeApiError(this.getNode(), error, errorOptions);
    }
    if (error.httpCode === "409") {
      const resource = this.getNodeParameter("resource", 0);
      if (resource === "label") {
        const errorOptions = {
          message: "Label name exists already",
          description: ""
        };
        throw new import_n8n_workflow.NodeApiError(this.getNode(), error, errorOptions);
      }
    }
    if (error.code === "EAUTH") {
      const errorOptions = {
        message: error?.body?.error_description || "Authorization error",
        description: error.message
      };
      throw new import_n8n_workflow.NodeApiError(this.getNode(), error, errorOptions);
    }
    if ((error.message || "").includes("Bad request - please check your parameters") && error.description) {
      const errorOptions = {
        message: error.description,
        description: ""
      };
      throw new import_n8n_workflow.NodeApiError(this.getNode(), error, errorOptions);
    }
    throw new import_n8n_workflow.NodeApiError(this.getNode(), error, {
      message: error.message,
      description: error.description
    });
  }
}
async function parseRawEmail(messageData, dataPropertyNameDownload) {
  const messageEncoded = Buffer.from(messageData.raw, "base64").toString("utf8");
  const responseData = await (0, import_mailparser.simpleParser)(messageEncoded);
  const headers = {};
  for (const header of responseData.headerLines) {
    headers[header.key] = header.line;
  }
  const binaryData = {};
  if (responseData.attachments) {
    const downloadAttachments = this.getNodeParameter(
      "options.downloadAttachments",
      0,
      false
    );
    if (downloadAttachments) {
      for (let i = 0; i < responseData.attachments.length; i++) {
        const attachment = responseData.attachments[i];
        binaryData[`${dataPropertyNameDownload}${i}`] = await this.helpers.prepareBinaryData(
          attachment.content,
          attachment.filename,
          attachment.contentType
        );
      }
    }
  }
  const mailBaseData = {};
  const resolvedModeAddProperties = ["id", "threadId", "labelIds", "sizeEstimate"];
  for (const key of resolvedModeAddProperties) {
    mailBaseData[key] = messageData[key];
  }
  const json = Object.assign({}, mailBaseData, responseData, {
    headers,
    headerLines: void 0,
    attachments: void 0,
    // Having data in IDataObjects that is not representable in JSON leads to
    // inconsistencies between test executions and production executions.
    // During a manual execution this would be stringified and during a
    // production execution the next node would receive a date instance.
    date: responseData.date ? responseData.date.toISOString() : responseData.date
  });
  return {
    json,
    binary: Object.keys(binaryData).length ? binaryData : void 0
  };
}
async function encodeEmail(email) {
  const mailOptions = {
    from: email.from,
    to: email.to,
    cc: email.cc,
    bcc: email.bcc,
    replyTo: email.replyTo,
    inReplyTo: email.inReplyTo,
    references: email.reference,
    subject: email.subject,
    text: email.body,
    keepBcc: true
  };
  if (email.htmlBody) {
    mailOptions.html = email.htmlBody;
  }
  if (email.attachments !== void 0 && Array.isArray(email.attachments) && email.attachments.length > 0) {
    const attachments = email.attachments.map((attachment) => ({
      filename: attachment.name,
      content: attachment.content,
      contentType: attachment.type,
      encoding: "base64"
    }));
    mailOptions.attachments = attachments;
  }
  const mail = new import_mail_composer.default(mailOptions).compile();
  mail.keepBcc = true;
  const mailBody = await mail.build();
  return mailBody.toString("base64").replace(/\+/g, "-").replace(/\//g, "_");
}
async function googleApiRequestAllItems(propertyName, method, endpoint, body = {}, query = {}) {
  const returnData = [];
  let responseData;
  query.maxResults = 100;
  do {
    responseData = await googleApiRequest.call(this, method, endpoint, body, query);
    query.pageToken = responseData.nextPageToken;
    returnData.push.apply(returnData, responseData[propertyName]);
  } while (responseData.nextPageToken !== void 0 && responseData.nextPageToken !== "");
  return returnData;
}
function extractEmail(s) {
  if (s.includes("<")) {
    const data = s.split("<")[1];
    return data.substring(0, data.length - 1);
  }
  return s;
}
const prepareTimestamp = (node, itemIndex, query, dateValue, label) => {
  if (dateValue instanceof import_luxon.DateTime) {
    dateValue = dateValue.toISO();
  }
  let timestamp = import_luxon.DateTime.fromISO(dateValue).toSeconds();
  const timestampLengthInMilliseconds1990 = 12;
  if (typeof timestamp === "number") {
    timestamp = Math.round(timestamp);
  }
  if (!timestamp && typeof dateValue === "number" && dateValue.toString().length < timestampLengthInMilliseconds1990) {
    timestamp = dateValue;
  }
  if (!timestamp && dateValue.length < timestampLengthInMilliseconds1990) {
    timestamp = parseInt(dateValue, 10);
  }
  if (!timestamp) {
    timestamp = Math.floor(import_luxon.DateTime.fromMillis(parseInt(dateValue, 10)).toSeconds());
  }
  if (!timestamp) {
    const description = `'${dateValue}' isn't a valid date and time. If you're using an expression, be sure to set an ISO date string or a timestamp.`;
    throw new import_n8n_workflow.NodeOperationError(
      node,
      `Invalid date/time in 'Received ${label[0].toUpperCase() + label.slice(1)}' field`,
      {
        description,
        itemIndex
      }
    );
  }
  if (query) {
    query += ` ${label}:${timestamp}`;
  } else {
    query = `${label}:${timestamp}`;
  }
  return query;
};
function prepareQuery(fields, itemIndex) {
  const qs = { ...fields };
  if (qs.labelIds) {
    if (qs.labelIds === "") {
      delete qs.labelIds;
    } else {
      qs.labelIds = qs.labelIds;
    }
  }
  if (qs.sender) {
    if (qs.q) {
      qs.q += ` from:${qs.sender}`;
    } else {
      qs.q = `from:${qs.sender}`;
    }
    delete qs.sender;
  }
  if (qs.readStatus && qs.readStatus !== "both") {
    if (qs.q) {
      qs.q += ` is:${qs.readStatus}`;
    } else {
      qs.q = `is:${qs.readStatus}`;
    }
    delete qs.readStatus;
  }
  if (qs.receivedAfter) {
    qs.q = prepareTimestamp(
      this.getNode(),
      itemIndex,
      qs.q,
      qs.receivedAfter,
      "after"
    );
    delete qs.receivedAfter;
  }
  if (qs.receivedBefore) {
    qs.q = prepareTimestamp(
      this.getNode(),
      itemIndex,
      qs.q,
      qs.receivedBefore,
      "before"
    );
    delete qs.receivedBefore;
  }
  return qs;
}
function prepareEmailsInput(input, fieldName, itemIndex) {
  let emails = "";
  input.split(",").forEach((entry) => {
    const email = entry.trim();
    if (email.indexOf("@") === -1) {
      const description = `The email address '${email}' in the '${fieldName}' field isn't valid`;
      throw new import_n8n_workflow.NodeOperationError(this.getNode(), "Invalid email address", {
        description,
        itemIndex
      });
    }
    if (email.includes("<") && email.includes(">")) {
      emails += `${email},`;
    } else {
      emails += `<${email}>, `;
    }
  });
  return emails;
}
function prepareEmailBody(itemIndex, appendAttribution = false, instanceId) {
  const emailType = this.getNodeParameter("emailType", itemIndex);
  let message = this.getNodeParameter("message", itemIndex, "").trim();
  if (appendAttribution) {
    const attributionText = "This email was sent automatically with ";
    const link = (0, import_utilities.createUtmCampaignLink)("n8n-nodes-base.gmail", instanceId);
    if (emailType === "html") {
      message = `
			${message}
			<br>
			<br>
			---
			<br>
			<em>${attributionText}<a href="${link}" target="_blank">n8n</a></em>
			`;
    } else {
      message = `${message}

---
${attributionText}n8n
${"https://n8n.io"}`;
    }
  }
  const body = {
    body: "",
    htmlBody: ""
  };
  if (emailType === "html") {
    body.htmlBody = message;
  } else {
    body.body = message;
  }
  return body;
}
async function prepareEmailAttachments(options, itemIndex) {
  const attachmentsList = [];
  const attachments = options.attachmentsBinary;
  if (attachments && !(0, import_isEmpty.default)(attachments)) {
    for (const { property } of attachments) {
      for (const name of property.split(",")) {
        const binaryData = this.helpers.assertBinaryData(itemIndex, name);
        const binaryDataBuffer = await this.helpers.getBinaryDataBuffer(itemIndex, name);
        if (!Buffer.isBuffer(binaryDataBuffer)) {
          const description = `The input field '${name}' doesn't contain an attachment. Please make sure you specify a field containing binary data`;
          throw new import_n8n_workflow.NodeOperationError(this.getNode(), "Attachment not found", {
            description,
            itemIndex
          });
        }
        attachmentsList.push({
          name: binaryData.fileName || "unknown",
          content: binaryDataBuffer,
          type: binaryData.mimeType
        });
      }
    }
  }
  return attachmentsList;
}
function unescapeSnippets(items) {
  const result = items.map((item) => {
    const snippet = item.json.snippet;
    if (snippet) {
      item.json.snippet = (0, import_utilities.escapeHtml)(snippet);
    }
    return item;
  });
  return result;
}
async function replyToEmail(gmailId, options, itemIndex) {
  let qs = {};
  let cc = "";
  let bcc = "";
  if (options.ccList) {
    cc = prepareEmailsInput.call(this, options.ccList, "CC", itemIndex);
  }
  if (options.bccList) {
    bcc = prepareEmailsInput.call(this, options.bccList, "BCC", itemIndex);
  }
  let attachments = [];
  if (options.attachmentsUi) {
    attachments = await prepareEmailAttachments.call(
      this,
      options.attachmentsUi,
      itemIndex
    );
    if (attachments.length) {
      qs = {
        userId: "me",
        uploadType: "media"
      };
    }
  }
  const endpoint = `/gmail/v1/users/me/messages/${gmailId}`;
  qs.format = "metadata";
  const { payload, threadId } = await googleApiRequest.call(this, "GET", endpoint, {}, qs);
  const subject = payload.headers.filter(
    (data) => data.name.toLowerCase() === "subject"
  )[0]?.value || "";
  const messageIdGlobal = payload.headers.filter(
    (data) => data.name.toLowerCase() === "message-id"
  )[0]?.value || "";
  const { emailAddress } = await googleApiRequest.call(this, "GET", "/gmail/v1/users/me/profile");
  let to = "";
  const replyToSenderOnly = options.replyToSenderOnly === void 0 ? false : options.replyToSenderOnly;
  const prepareEmailString = (email2) => {
    if (email2.includes(emailAddress)) return;
    if (email2.includes("<") && email2.includes(">")) {
      to += `${email2}, `;
    } else {
      to += `<${email2}>, `;
    }
  };
  for (const header of payload.headers) {
    if ((header.name || "").toLowerCase() === "from") {
      const from2 = header.value;
      if (from2.includes("<") && from2.includes(">")) {
        to += `${from2}, `;
      } else {
        to += `<${from2}>, `;
      }
    }
    if ((header.name || "").toLowerCase() === "to" && !replyToSenderOnly) {
      const toEmails = header.value;
      toEmails.split(",").forEach(prepareEmailString);
    }
  }
  let from = "";
  if (options.senderName) {
    from = `${options.senderName} <${emailAddress}>`;
  }
  const email = {
    from,
    to,
    cc,
    bcc,
    subject,
    attachments,
    inReplyTo: messageIdGlobal,
    reference: messageIdGlobal,
    ...prepareEmailBody.call(this, itemIndex)
  };
  const body = {
    raw: await encodeEmail(email),
    threadId
  };
  return await googleApiRequest.call(this, "POST", "/gmail/v1/users/me/messages/send", body, qs);
}
async function simplifyOutput(data) {
  const labelsData = await googleApiRequest.call(this, "GET", "/gmail/v1/users/me/labels");
  const labels = (labelsData.labels || []).map(({ id, name }) => ({
    id,
    name
  }));
  return (data || []).map((item) => {
    if (item.labelIds) {
      item.labels = labels.filter(
        (label) => item.labelIds.includes(label.id)
      );
      delete item.labelIds;
    }
    if (item.payload && item.payload.headers) {
      const { headers } = item.payload;
      (headers || []).forEach((header) => {
        item[header.name] = header.value;
      });
      delete item.payload.headers;
    }
    return item;
  });
}
async function getLabels() {
  const returnData = [];
  const labels = await googleApiRequestAllItems.call(
    this,
    "labels",
    "GET",
    "/gmail/v1/users/me/labels"
  );
  for (const label of labels) {
    returnData.push({
      name: label.name,
      value: label.id
    });
  }
  return returnData.sort((a, b) => {
    if (a.name < b.name) {
      return -1;
    }
    if (a.name > b.name) {
      return 1;
    }
    return 0;
  });
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  encodeEmail,
  extractEmail,
  getLabels,
  googleApiRequest,
  googleApiRequestAllItems,
  parseRawEmail,
  prepareEmailAttachments,
  prepareEmailBody,
  prepareEmailsInput,
  prepareQuery,
  prepareTimestamp,
  replyToEmail,
  simplifyOutput,
  unescapeSnippets
});
//# sourceMappingURL=GenericFunctions.js.map