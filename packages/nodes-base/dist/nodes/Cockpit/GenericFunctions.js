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
  cockpitApiRequest: () => cockpitApiRequest,
  createDataFromParameters: () => createDataFromParameters
});
module.exports = __toCommonJS(GenericFunctions_exports);
var import_n8n_workflow = require("n8n-workflow");
async function cockpitApiRequest(method, resource, body = {}, uri, option = {}) {
  const credentials = await this.getCredentials("cockpitApi");
  let options = {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json"
    },
    method,
    qs: {
      token: credentials.accessToken
    },
    body,
    uri: uri || `${credentials.url}/api${resource}`,
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
function createDataFromParameters(itemIndex) {
  const dataFieldsAreJson = this.getNodeParameter("jsonDataFields", itemIndex);
  if (dataFieldsAreJson) {
    return (0, import_n8n_workflow.jsonParse)(this.getNodeParameter("dataFieldsJson", itemIndex, "{}"));
  }
  const uiDataFields = this.getNodeParameter("dataFieldsUi", itemIndex, {});
  const unpacked = {};
  if (uiDataFields.field === void 0) {
    return unpacked;
  }
  for (const field of uiDataFields.field) {
    unpacked[field.name] = field.value;
  }
  return unpacked;
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  cockpitApiRequest,
  createDataFromParameters
});
//# sourceMappingURL=GenericFunctions.js.map