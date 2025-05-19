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
  validateJSON: () => validateJSON,
  veroApiRequest: () => veroApiRequest
});
module.exports = __toCommonJS(GenericFunctions_exports);
var import_n8n_workflow = require("n8n-workflow");
async function veroApiRequest(method, resource, body = {}, qs = {}, uri, option = {}) {
  const credentials = await this.getCredentials("veroApi");
  let options = {
    method,
    qs,
    body,
    form: {
      auth_token: credentials.authToken,
      ...body
    },
    uri: uri || `https://api.getvero.com/api/v2${resource}`,
    json: true
  };
  options = Object.assign({}, options, option);
  if (Object.keys(options.body).length === 0) {
    delete options.body;
  }
  try {
    return await this.helpers.request(options);
  } catch (error) {
    throw new import_n8n_workflow.NodeApiError(this.getNode(), error);
  }
}
function validateJSON(json) {
  let result;
  try {
    result = JSON.parse(json);
  } catch (exception) {
    result = void 0;
  }
  return result;
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  validateJSON,
  veroApiRequest
});
//# sourceMappingURL=GenericFunctions.js.map