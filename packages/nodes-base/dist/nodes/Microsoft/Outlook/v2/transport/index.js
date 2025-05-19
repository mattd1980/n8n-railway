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
var transport_exports = {};
__export(transport_exports, {
  downloadAttachments: () => downloadAttachments,
  getMimeContent: () => getMimeContent,
  getSubfolders: () => getSubfolders,
  microsoftApiRequest: () => microsoftApiRequest,
  microsoftApiRequestAllItems: () => microsoftApiRequestAllItems
});
module.exports = __toCommonJS(transport_exports);
var import_utils = require("../helpers/utils");
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
    return await this.helpers.requestWithAuthentication.call(
      this,
      "microsoftOutlookOAuth2Api",
      options
    );
  } catch (error) {
    if (((error.message || "").toLowerCase().includes("bad request") || (error.message || "").toLowerCase().includes("unknown error")) && error.description) {
      let updatedError;
      try {
        updatedError = import_utils.prepareApiError.call(this, error);
      } catch (e) {
      }
      if (updatedError) throw updatedError;
      error.message = error.description;
      error.description = "";
    }
    throw error;
  }
}
async function microsoftApiRequestAllItems(propertyName, method, endpoint, body = {}, query = {}, headers = {}) {
  const returnData = [];
  let responseData;
  let nextLink;
  query.$top = 100;
  do {
    responseData = await microsoftApiRequest.call(
      this,
      method,
      endpoint,
      body,
      nextLink ? void 0 : query,
      // Do not add query parameters as nextLink already contains them
      nextLink,
      headers
    );
    nextLink = responseData["@odata.nextLink"];
    returnData.push.apply(returnData, responseData[propertyName]);
  } while (responseData["@odata.nextLink"] !== void 0);
  return returnData;
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
async function getMimeContent(messageId, binaryPropertyName, outputFileName) {
  const response = await microsoftApiRequest.call(
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
  const fileName = `${outputFileName || messageId}.eml`;
  const data = Buffer.from(response.body, "utf8");
  const binary = {};
  binary[binaryPropertyName] = await this.helpers.prepareBinaryData(
    data,
    fileName,
    mimeType
  );
  return binary;
}
async function getSubfolders(folders, addPathToDisplayName = false) {
  const returnData = [...folders];
  for (const folder of folders) {
    if (folder.childFolderCount > 0) {
      let subfolders = await microsoftApiRequest.call(
        this,
        "GET",
        `/mailFolders/${folder.id}/childFolders`
      );
      if (addPathToDisplayName) {
        subfolders = subfolders.value.map((subfolder) => {
          return {
            ...subfolder,
            displayName: `${folder.displayName}/${subfolder.displayName}`
          };
        });
      } else {
        subfolders = subfolders.value;
      }
      returnData.push(
        ...await getSubfolders.call(this, subfolders, addPathToDisplayName)
      );
    }
  }
  return returnData;
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  downloadAttachments,
  getMimeContent,
  getSubfolders,
  microsoftApiRequest,
  microsoftApiRequestAllItems
});
//# sourceMappingURL=index.js.map