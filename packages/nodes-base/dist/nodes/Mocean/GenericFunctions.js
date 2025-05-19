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
  moceanApiRequest: () => moceanApiRequest
});
module.exports = __toCommonJS(GenericFunctions_exports);
var import_n8n_workflow = require("n8n-workflow");
async function moceanApiRequest(method, endpoint, body, query) {
  const credentials = await this.getCredentials("moceanApi");
  if (query === void 0) {
    query = {};
  }
  if (method === "POST") {
    body["mocean-api-key"] = credentials["mocean-api-key"];
    body["mocean-api-secret"] = credentials["mocean-api-secret"];
    body["mocean-resp-format"] = "JSON";
  } else if (method === "GET") {
    query["mocean-api-key"] = credentials["mocean-api-key"];
    query["mocean-api-secret"] = credentials["mocean-api-secret"];
    query["mocean-resp-format"] = "JSON";
  }
  const options = {
    method,
    form: body,
    qs: query,
    uri: `https://rest.moceanapi.com${endpoint}`,
    json: true
  };
  try {
    return await this.helpers.request(options);
  } catch (error) {
    throw new import_n8n_workflow.NodeApiError(this.getNode(), error);
  }
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  moceanApiRequest
});
//# sourceMappingURL=GenericFunctions.js.map