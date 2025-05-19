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
  yourlsApiRequest: () => yourlsApiRequest
});
module.exports = __toCommonJS(GenericFunctions_exports);
var import_n8n_workflow = require("n8n-workflow");
async function yourlsApiRequest(method, body = {}, qs = {}) {
  const credentials = await this.getCredentials("yourlsApi");
  qs.signature = credentials.signature;
  qs.format = "json";
  const options = {
    method,
    body,
    qs,
    uri: `${credentials.url}/yourls-api.php`,
    json: true
  };
  try {
    const response = await this.helpers.request.call(this, options);
    if (response.status === "fail") {
      throw new import_n8n_workflow.NodeOperationError(
        this.getNode(),
        `Yourls error response [400]: ${response.message}`
      );
    }
    if (typeof response === "string" && response.includes("<b>Fatal error</b>")) {
      throw new import_n8n_workflow.NodeOperationError(
        this.getNode(),
        "Yourls responded with a 'Fatal error', check description for more details",
        {
          description: `Server response:
${response}`
        }
      );
    }
    return response;
  } catch (error) {
    throw new import_n8n_workflow.NodeApiError(this.getNode(), error);
  }
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  yourlsApiRequest
});
//# sourceMappingURL=GenericFunctions.js.map