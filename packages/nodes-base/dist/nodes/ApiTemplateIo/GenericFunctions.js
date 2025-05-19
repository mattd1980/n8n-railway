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
  apiTemplateIoApiRequest: () => apiTemplateIoApiRequest,
  downloadImage: () => downloadImage,
  loadResource: () => loadResource,
  validateJSON: () => validateJSON
});
module.exports = __toCommonJS(GenericFunctions_exports);
var import_n8n_workflow = require("n8n-workflow");
async function apiTemplateIoApiRequest(method, endpoint, qs = {}, body = {}) {
  const options = {
    headers: {
      "user-agent": "n8n",
      Accept: "application/json"
    },
    uri: `https://api.apitemplate.io/v1${endpoint}`,
    method,
    qs,
    body,
    followRedirect: true,
    followAllRedirects: true,
    json: true
  };
  if (!Object.keys(body).length) {
    delete options.body;
  }
  if (!Object.keys(qs).length) {
    delete options.qs;
  }
  try {
    const response = await this.helpers.requestWithAuthentication.call(
      this,
      "apiTemplateIoApi",
      options
    );
    if (response.status === "error") {
      throw new import_n8n_workflow.NodeApiError(this.getNode(), response.message);
    }
    return response;
  } catch (error) {
    throw new import_n8n_workflow.NodeApiError(this.getNode(), error);
  }
}
async function loadResource(resource) {
  const target = resource === "image" ? ["JPEG", "PNG"] : ["PDF"];
  const templates = await apiTemplateIoApiRequest.call(this, "GET", "/list-templates");
  const filtered = templates.filter(
    ({ format }) => target.includes(format)
  );
  return filtered.map(({ format, name, id }) => ({
    name: `${name} (${format})`,
    value: id
  }));
}
function validateJSON(json) {
  let result;
  if (typeof json === "object") {
    return json;
  }
  try {
    result = JSON.parse(json);
  } catch (exception) {
    result = void 0;
  }
  return result;
}
async function downloadImage(url) {
  return await this.helpers.request({
    uri: url,
    method: "GET",
    json: false,
    encoding: null
  });
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  apiTemplateIoApiRequest,
  downloadImage,
  loadResource,
  validateJSON
});
//# sourceMappingURL=GenericFunctions.js.map