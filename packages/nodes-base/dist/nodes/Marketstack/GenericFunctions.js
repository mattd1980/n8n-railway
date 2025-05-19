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
  format: () => format,
  marketstackApiRequest: () => marketstackApiRequest,
  marketstackApiRequestAllItems: () => marketstackApiRequestAllItems,
  validateTimeOptions: () => validateTimeOptions
});
module.exports = __toCommonJS(GenericFunctions_exports);
var import_n8n_workflow = require("n8n-workflow");
async function marketstackApiRequest(method, endpoint, body = {}, qs = {}) {
  const credentials = await this.getCredentials("marketstackApi");
  const protocol = credentials.useHttps ? "https" : "http";
  const options = {
    method,
    uri: `${protocol}://api.marketstack.com/v1${endpoint}`,
    qs: {
      access_key: credentials.apiKey,
      ...qs
    },
    json: true
  };
  if (!Object.keys(body).length) {
    delete options.body;
  }
  try {
    return await this.helpers.request(options);
  } catch (error) {
    throw new import_n8n_workflow.NodeApiError(this.getNode(), error);
  }
}
async function marketstackApiRequestAllItems(method, endpoint, body = {}, qs = {}) {
  const returnAll = this.getNodeParameter("returnAll", 0, false);
  const limit = this.getNodeParameter("limit", 0, 0);
  let responseData;
  const returnData = [];
  qs.offset = 0;
  do {
    responseData = await marketstackApiRequest.call(this, method, endpoint, body, qs);
    returnData.push(...responseData.data);
    if (!returnAll && returnData.length > limit) {
      return returnData.slice(0, limit);
    }
    qs.offset += responseData.count;
  } while (responseData.total > returnData.length);
  return returnData;
}
const format = (datetime) => datetime?.split("T")[0];
function validateTimeOptions(timeOptions) {
  if (timeOptions.every((o) => !o)) {
    throw new import_n8n_workflow.NodeOperationError(
      this.getNode(),
      "Please filter by latest, specific date or timeframe (start and end dates)."
    );
  }
  if (timeOptions.filter(Boolean).length > 1) {
    throw new import_n8n_workflow.NodeOperationError(
      this.getNode(),
      "Please filter by one of latest, specific date, or timeframe (start and end dates)."
    );
  }
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  format,
  marketstackApiRequest,
  marketstackApiRequestAllItems,
  validateTimeOptions
});
//# sourceMappingURL=GenericFunctions.js.map