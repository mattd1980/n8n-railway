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
  nextCloudApiRequest: () => nextCloudApiRequest
});
module.exports = __toCommonJS(GenericFunctions_exports);
var import_n8n_workflow = require("n8n-workflow");
async function nextCloudApiRequest(method, endpoint, body, headers, encoding, query) {
  const resource = this.getNodeParameter("resource", 0);
  const operation = this.getNodeParameter("operation", 0);
  const authenticationMethod = this.getNodeParameter("authentication", 0);
  let credentials;
  if (authenticationMethod === "accessToken") {
    credentials = await this.getCredentials("nextCloudApi");
  } else {
    credentials = await this.getCredentials("nextCloudOAuth2Api");
  }
  const options = {
    headers,
    method,
    body,
    qs: query ?? {},
    uri: "",
    json: false
  };
  if (encoding === null) {
    options.encoding = null;
  }
  options.uri = `${credentials.webDavUrl}/${encodeURI(endpoint)}`;
  if (resource === "user" && operation === "create") {
    options.uri = options.uri.replace("/remote.php/webdav", "");
  }
  if (resource === "file" && operation === "share") {
    options.uri = options.uri.replace("/remote.php/webdav", "");
  }
  const credentialType = authenticationMethod === "accessToken" ? "nextCloudApi" : "nextCloudOAuth2Api";
  const response = await this.helpers.requestWithAuthentication.call(this, credentialType, options);
  if (typeof response === "string" && response.includes("<b>Fatal error</b>")) {
    throw new import_n8n_workflow.NodeOperationError(
      this.getNode(),
      "NextCloud responded with a 'Fatal error', check description for more details",
      {
        description: `Server response:
${response}`
      }
    );
  }
  return response;
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  nextCloudApiRequest
});
//# sourceMappingURL=GenericFunctions.js.map