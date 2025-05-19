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
  mispApiRequest: () => mispApiRequest,
  mispApiRequestAllItems: () => mispApiRequestAllItems,
  mispApiRestSearch: () => mispApiRestSearch,
  throwOnEmptyUpdate: () => throwOnEmptyUpdate,
  throwOnInvalidUrl: () => throwOnInvalidUrl,
  throwOnMissingSharingGroup: () => throwOnMissingSharingGroup
});
module.exports = __toCommonJS(GenericFunctions_exports);
var import_n8n_workflow = require("n8n-workflow");
var import_url = require("url");
async function mispApiRequest(method, endpoint, body = {}, qs = {}) {
  const { baseUrl, allowUnauthorizedCerts } = await this.getCredentials("mispApi");
  const options = {
    method,
    body,
    qs,
    uri: `${baseUrl}${endpoint}`,
    json: true,
    rejectUnauthorized: !allowUnauthorizedCerts
  };
  if (!Object.keys(body).length) {
    delete options.body;
  }
  if (!Object.keys(qs).length) {
    delete options.qs;
  }
  try {
    return await this.helpers.requestWithAuthentication.call(this, "mispApi", options);
  } catch (error) {
    if (error.statusCode === 403) {
      error.statusCode = 400;
    }
    const errors = error?.error?.errors;
    if (errors) {
      const key = Object.keys(errors)[0];
      if (key !== void 0) {
        let message = errors[key].join();
        if (message.includes(" nter")) {
          message = message.replace(" nter", " enter");
        }
        error.error.message = `${error.error.message}: ${message}`;
      }
    }
    throw new import_n8n_workflow.NodeApiError(this.getNode(), error);
  }
}
async function mispApiRequestAllItems(endpoint) {
  const responseData = await mispApiRequest.call(this, "GET", endpoint);
  const returnAll = this.getNodeParameter("returnAll", 0);
  if (!returnAll) {
    const limit = this.getNodeParameter("limit", 0);
    return responseData.slice(0, limit);
  }
  return responseData;
}
async function mispApiRestSearch(resource, itemIndex) {
  let body = {};
  const useJson = this.getNodeParameter("useJson", itemIndex);
  if (useJson) {
    const json = this.getNodeParameter("jsonOutput", itemIndex);
    if (typeof json === "string") {
      body = (0, import_n8n_workflow.jsonParse)(json);
    } else {
      body = json;
    }
  } else {
    const value = this.getNodeParameter("value", itemIndex);
    const additionalFields = this.getNodeParameter("additionalFields", itemIndex);
    body.value = value;
    if (Object.keys(additionalFields).length) {
      if (additionalFields.tags) {
        additionalFields.tags = additionalFields.tags.split(",").map((tag) => tag.trim());
      }
      Object.assign(body, additionalFields);
    }
  }
  const endpoint = `/${resource}/restSearch`;
  const { response } = await mispApiRequest.call(this, "POST", endpoint, body);
  if (response) {
    if (resource === "attributes") {
      return response.Attribute;
    }
    if (resource === "events") {
      return response.map((event) => event.Event);
    }
    if (resource === "objects") {
      return response.map((obj) => obj.Object);
    }
  } else {
    return [];
  }
}
function throwOnEmptyUpdate(resource, updateFields) {
  if (!Object.keys(updateFields).length) {
    throw new import_n8n_workflow.NodeOperationError(
      this.getNode(),
      `Please enter at least one field to update for the ${resource}.`
    );
  }
}
const SHARING_GROUP_OPTION_ID = 4;
function throwOnMissingSharingGroup(fields) {
  if (fields.distribution === SHARING_GROUP_OPTION_ID && !fields.sharing_group_id) {
    throw new import_n8n_workflow.NodeOperationError(this.getNode(), "Please specify a sharing group");
  }
}
const isValidUrl = (str) => {
  try {
    new import_url.URL(str);
    return true;
  } catch (error) {
    return false;
  }
};
function throwOnInvalidUrl(str) {
  if (!isValidUrl(str)) {
    throw new import_n8n_workflow.NodeOperationError(
      this.getNode(),
      "Please specify a valid URL, protocol included. Example: https://site.com"
    );
  }
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  mispApiRequest,
  mispApiRequestAllItems,
  mispApiRestSearch,
  throwOnEmptyUpdate,
  throwOnInvalidUrl,
  throwOnMissingSharingGroup
});
//# sourceMappingURL=GenericFunctions.js.map