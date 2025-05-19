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
  openThesaurusApiRequest: () => openThesaurusApiRequest
});
module.exports = __toCommonJS(GenericFunctions_exports);
var import_n8n_workflow = require("n8n-workflow");
async function openThesaurusApiRequest(method, resource, body = {}, qs = {}, uri, option = {}) {
  try {
    let options = {
      headers: {
        "User-Agent": "https://n8n.io"
      },
      method,
      qs,
      body,
      uri: uri || `https://www.openthesaurus.de${resource}`,
      json: true
    };
    options = Object.assign({}, options, option);
    options.qs.format = "application/json";
    return await this.helpers.request(options);
  } catch (error) {
    throw new import_n8n_workflow.NodeApiError(this.getNode(), error);
  }
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  openThesaurusApiRequest
});
//# sourceMappingURL=GenericFunctions.js.map