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
  uptimeRobotApiRequest: () => uptimeRobotApiRequest
});
module.exports = __toCommonJS(GenericFunctions_exports);
var import_n8n_workflow = require("n8n-workflow");
async function uptimeRobotApiRequest(method, resource, body = {}, qs = {}, uri, option = {}) {
  const credentials = await this.getCredentials("uptimeRobotApi");
  let options = {
    method,
    qs,
    form: {
      api_key: credentials.apiKey,
      ...body
    },
    uri: uri || `https://api.uptimerobot.com/v2${resource}`,
    json: true
  };
  options = Object.assign({}, options, option);
  try {
    const responseData = await this.helpers.request(options);
    if (responseData.stat !== "ok") {
      throw new import_n8n_workflow.NodeOperationError(this.getNode(), responseData);
    }
    return responseData;
  } catch (error) {
    throw new import_n8n_workflow.NodeApiError(this.getNode(), error);
  }
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  uptimeRobotApiRequest
});
//# sourceMappingURL=GenericFunctions.js.map