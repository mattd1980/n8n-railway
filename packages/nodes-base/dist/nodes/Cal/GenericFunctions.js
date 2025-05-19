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
  calApiRequest: () => calApiRequest,
  sortOptionParameters: () => sortOptionParameters
});
module.exports = __toCommonJS(GenericFunctions_exports);
var import_n8n_workflow = require("n8n-workflow");
async function calApiRequest(method, resource, body = {}, query = {}, option = {}) {
  const credentials = await this.getCredentials("calApi");
  let options = {
    baseURL: credentials.host,
    method,
    body,
    qs: query,
    url: resource
  };
  if (!Object.keys(query).length) {
    delete options.qs;
  }
  options = Object.assign({}, options, option);
  try {
    return await this.helpers.httpRequestWithAuthentication.call(this, "calApi", options);
  } catch (error) {
    throw new import_n8n_workflow.NodeApiError(this.getNode(), error);
  }
}
function sortOptionParameters(optionParameters) {
  optionParameters.sort((a, b) => {
    const aName = a.name.toLowerCase();
    const bName = b.name.toLowerCase();
    if (aName < bName) {
      return -1;
    }
    if (aName > bName) {
      return 1;
    }
    return 0;
  });
  return optionParameters;
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  calApiRequest,
  sortOptionParameters
});
//# sourceMappingURL=GenericFunctions.js.map