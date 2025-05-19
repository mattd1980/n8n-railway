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
var GenericFunctions_exports = {};
__export(GenericFunctions_exports, {
  createMessage: () => createMessage,
  downloadAttachments: () => downloadAttachments,
  makeRecipient: () => makeRecipient,
  microsoftApiRequest: () => microsoftApiRequest,
  microsoftApiRequestAllItems: () => microsoftApiRequestAllItems,
  microsoftApiRequestAllItemsSkip: () => microsoftApiRequestAllItemsSkip
});
module.exports = __toCommonJS(GenericFunctions_exports);
var import_n8n_workflow = require("n8n-workflow");
async function microsoftApiRequest(method, resource, body = {}, qs = {}, uri, headers = {}, option = { json: true }) {
  const credentials = await this.getCredentials("microsoftOutlookOAuth2Api");
  let apiUrl = `https://graph.microsoft.com/v1.0/me${resource}`;
  if (credentials.useShared && credentials.userPrincipalName) {
    apiUrl = `https://graph.microsoft.com/v1.0/users/${credentials.userPrincipalName}${resource}`;
  }
  const options = {
    headers: {
      "Content-Type": "application/json"
    },
    method,
    body,
    qs,
    uri: uri || apiUrl
  };
  try {
    Object.assign(options, option);
    if (Object.keys(headers).length !== 0) {
      options.headers = Object.assign({}, options.headers, headers);
    }
    if (Object.keys(body).length === 0) {
      delete options.body;
    }
    return await this.helpers.requestOAuth2.call(this, "microsoftOutlookOAuth2Api", options);
  } catch (error) {
    throw new import_n8n_workflow.NodeApiError(this.getNode(), error);
  }
}
async function microsoftApiRequestAllItems(propertyName, method, endpoint, body = {}, query = {}, headers = {}) {
  const returnData = [];
  let responseData;
  let uri;
  query.$top = 100;
  do {
    responseData = await microsoftApiRequest.call(
      this,
      method,
      endpoint,
      body,
      query,
      uri,
      headers
    );
    uri = responseData["@odata.nextLink"];
    returnData.push.apply(returnData, responseData[propertyName]);
  } while (responseData["@odata.nextLink"] !== void 0);
  return returnData;
}
async function microsoftApiRequestAllItemsSkip(propertyName, method, endpoint, body = {}, query = {}, headers = {}) {
  const returnData = [];
  let responseData;
  query.$top = 100;
  query.$skip = 0;
  do {
    responseData = await microsoftApiRequest.call(
      this,
      method,
      endpoint,
      body,
      query,
      void 0,
      headers
    );
    query.$skip += query.$top;
    returnData.push.apply(returnData, responseData[propertyName]);
  } while (responseData.value.length !== 0);
  return returnData;
}
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
  ["bccRecipients", "ccRecipients", "replyTo", "sender", "toRecipients"].forEach((key) => {
    if (Array.isArray(fields[key])) {
      fields[key] = fields[key].map((email) => makeRecipient(email));
    } else if (fields[key] !== void 0) {
      fields[key] = fields[key].split(",").map((recipient) => makeRecipient(recipient));
    }
  });
  ["from", "sender"].forEach((key) => {
    if (fields[key] !== void 0) {
      fields[key] = makeRecipient(fields[key]);
    }
  });
  Object.assign(message, fields);
  return message;
}
async function downloadAttachments(messages, prefix) {
  const elements = [];
  if (!Array.isArray(messages)) {
    messages = [messages];
  }
  for (const message of messages) {
    const element = {
      json: message,
      binary: {}
    };
    if (message.hasAttachments === true) {
      const attachments = await microsoftApiRequestAllItems.call(
        this,
        "value",
        "GET",
        `/messages/${message.id}/attachments`,
        {}
      );
      for (const [index, attachment] of attachments.entries()) {
        const response = await microsoftApiRequest.call(
          this,
          "GET",
          `/messages/${message.id}/attachments/${attachment.id}/$value`,
          void 0,
          {},
          void 0,
          {},
          { encoding: null, resolveWithFullResponse: true }
        );
        const data = Buffer.from(response.body, "utf8");
        element.binary[`${prefix}${index}`] = await this.helpers.prepareBinaryData(
          data,
          attachment.name,
          attachment.contentType
        );
      }
    }
    if (Object.keys(element.binary).length === 0) {
      delete element.binary;
    }
    elements.push(element);
  }
  return elements;
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  createMessage,
  downloadAttachments,
  makeRecipient,
  microsoftApiRequest,
  microsoftApiRequestAllItems,
  microsoftApiRequestAllItemsSkip
});
//# sourceMappingURL=GenericFunctions.js.map