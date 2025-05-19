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
  getAccessTokens: () => getAccessTokens,
  haloPSAApiRequest: () => haloPSAApiRequest,
  haloPSAApiRequestAllItems: () => haloPSAApiRequestAllItems,
  qsSetStatus: () => qsSetStatus,
  simplifyHaloPSAGetOutput: () => simplifyHaloPSAGetOutput,
  validateCredentials: () => validateCredentials
});
module.exports = __toCommonJS(GenericFunctions_exports);
var import_n8n_workflow = require("n8n-workflow");
function getAuthUrl(credentials) {
  return credentials.hostingType === "on-premise" ? `${credentials.appUrl}/auth/token` : `${credentials.authUrl}/token?tenant=${credentials.tenant}`;
}
async function getAccessTokens() {
  const credentials = await this.getCredentials("haloPSAApi");
  const options = {
    headers: {
      "Content-Type": "application/x-www-form-urlencoded"
    },
    method: "POST",
    form: {
      client_id: credentials.client_id,
      client_secret: credentials.client_secret,
      grant_type: "client_credentials",
      scope: credentials.scope
    },
    uri: getAuthUrl(credentials),
    json: true
  };
  try {
    const tokens = await this.helpers.request(options);
    return tokens;
  } catch (error) {
    throw new import_n8n_workflow.NodeApiError(this.getNode(), error);
  }
}
async function haloPSAApiRequest(method, resource, accessToken, body = {}, qs = {}, option = {}) {
  const resourceApiUrl = (await this.getCredentials("haloPSAApi")).resourceApiUrl;
  try {
    let options = {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "User-Agent": "https://n8n.io",
        Connection: "keep-alive",
        Accept: "*/*",
        "Accept-Encoding": "gzip, deflate, br",
        "Content-Type": "application/json"
      },
      method,
      qs,
      body,
      uri: `${resourceApiUrl}${resource}`,
      json: true
    };
    options = Object.assign({}, options, option);
    if (Object.keys(body).length === 0) {
      delete options.body;
    }
    const result = await this.helpers.request(options);
    if (method === "DELETE" && result.id) {
      return { success: true };
    }
    return result;
  } catch (error) {
    const message = error.message;
    if (method === "DELETE" || method === "GET" || method === "POST" && message) {
      let newErrorMessage;
      if (message.includes("400")) {
        this.logger.debug(message);
        newErrorMessage = JSON.parse(message.split(" - ")[1]);
        error.message = `For field ID, ${newErrorMessage.id || newErrorMessage["[0].id"]}`;
      }
      if (message.includes("403")) {
        error.message = `You don't have permissions to ${method.toLowerCase()} ${resource.split("/")[1].toLowerCase()}.`;
      }
    }
    throw new import_n8n_workflow.NodeApiError(this.getNode(), error);
  }
}
async function haloPSAApiRequestAllItems(propertyName, method, endpoint, accessToken, body = {}, query = {}) {
  const returnData = [];
  let responseData;
  query.page_size = 100;
  query.page_no = 1;
  query.pageinate = true;
  do {
    responseData = await haloPSAApiRequest.call(
      this,
      method,
      endpoint,
      accessToken,
      body,
      query
    );
    returnData.push.apply(returnData, responseData[propertyName]);
    query.page_no++;
  } while (returnData.length < responseData.record_count);
  return returnData;
}
function simplifyHaloPSAGetOutput(response, fieldsList) {
  const output = [];
  for (const item of response) {
    const simplifiedItem = {};
    Object.keys(item).forEach((key) => {
      if (fieldsList.includes(key)) {
        simplifiedItem[key] = item[key];
      }
    });
    output.push(simplifiedItem);
  }
  return output;
}
function qsSetStatus(status) {
  if (!status) return {};
  const qs = {};
  if (status === "all") {
    qs.includeinactive = true;
    qs.includeactive = true;
  } else if (status === "active") {
    qs.includeinactive = false;
    qs.includeactive = true;
  } else {
    qs.includeinactive = true;
    qs.includeactive = false;
  }
  return qs;
}
async function validateCredentials(decryptedCredentials) {
  const credentials = decryptedCredentials;
  const options = {
    headers: {
      "Content-Type": "application/x-www-form-urlencoded"
    },
    method: "POST",
    form: {
      client_id: credentials.client_id,
      client_secret: credentials.client_secret,
      grant_type: "client_credentials",
      scope: credentials.scope
    },
    uri: getAuthUrl(credentials),
    json: true
  };
  return await this.helpers.request(options);
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  getAccessTokens,
  haloPSAApiRequest,
  haloPSAApiRequestAllItems,
  qsSetStatus,
  simplifyHaloPSAGetOutput,
  validateCredentials
});
//# sourceMappingURL=GenericFunctions.js.map