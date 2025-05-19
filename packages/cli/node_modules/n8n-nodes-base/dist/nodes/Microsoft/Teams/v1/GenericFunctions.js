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
  microsoftApiRequest: () => microsoftApiRequest,
  microsoftApiRequestAllItems: () => microsoftApiRequestAllItems,
  microsoftApiRequestAllItemsSkip: () => microsoftApiRequestAllItemsSkip,
  prepareMessage: () => prepareMessage
});
module.exports = __toCommonJS(GenericFunctions_exports);
var import_n8n_workflow = require("n8n-workflow");
async function microsoftApiRequest(method, resource, body = {}, qs = {}, uri, headers = {}) {
  const options = {
    headers: {
      "Content-Type": "application/json"
    },
    method,
    body,
    qs,
    uri: uri || `https://graph.microsoft.com${resource}`,
    json: true
  };
  try {
    if (Object.keys(headers).length !== 0) {
      options.headers = Object.assign({}, options.headers, headers);
    }
    return await this.helpers.requestOAuth2.call(this, "microsoftTeamsOAuth2Api", options);
  } catch (error) {
    throw new import_n8n_workflow.NodeApiError(this.getNode(), error);
  }
}
async function microsoftApiRequestAllItems(propertyName, method, endpoint, body = {}, query = {}) {
  const returnData = [];
  let responseData;
  let uri;
  do {
    responseData = await microsoftApiRequest.call(this, method, endpoint, body, query, uri);
    uri = responseData["@odata.nextLink"];
    returnData.push.apply(returnData, responseData[propertyName]);
    const limit = query.limit;
    if (limit && limit <= returnData.length) {
      return returnData;
    }
  } while (responseData["@odata.nextLink"] !== void 0);
  return returnData;
}
async function microsoftApiRequestAllItemsSkip(propertyName, method, endpoint, body = {}, query = {}) {
  const returnData = [];
  let responseData;
  query.$top = 100;
  query.$skip = 0;
  do {
    responseData = await microsoftApiRequest.call(this, method, endpoint, body, query);
    query.$skip += query.$top;
    returnData.push.apply(returnData, responseData[propertyName]);
  } while (responseData.value.length !== 0);
  return returnData;
}
function prepareMessage(message, messageType, includeLinkToWorkflow, instanceId) {
  if (includeLinkToWorkflow) {
    const { id } = this.getWorkflow();
    const link = `${this.getInstanceBaseUrl()}workflow/${id}?utm_source=n8n-internal&utm_medium=powered_by&utm_campaign=${encodeURIComponent(
      "n8n-nodes-base.microsoftTeams"
    )}${instanceId ? "_" + instanceId : ""}`;
    messageType = "html";
    message = `${message}<br><br><em> Powered by <a href="${link}">this n8n workflow</a> </em>`;
  }
  return {
    body: {
      contentType: messageType,
      content: message
    }
  };
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  microsoftApiRequest,
  microsoftApiRequestAllItems,
  microsoftApiRequestAllItemsSkip,
  prepareMessage
});
//# sourceMappingURL=GenericFunctions.js.map