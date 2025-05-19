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
var transport_exports = {};
__export(transport_exports, {
  microsoftSharePointApiRequest: () => microsoftSharePointApiRequest
});
module.exports = __toCommonJS(transport_exports);
async function microsoftSharePointApiRequest(method, endpoint, body = {}, qs, headers, url) {
  const credentials = await this.getCredentials(
    "microsoftSharePointOAuth2Api"
  );
  const options = {
    method,
    url: url ?? `https://${credentials.subdomain}.sharepoint.com/_api/v2.0${endpoint}`,
    json: true,
    headers,
    body,
    qs
  };
  return await this.helpers.httpRequestWithAuthentication.call(
    this,
    "microsoftSharePointOAuth2Api",
    options
  );
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  microsoftSharePointApiRequest
});
//# sourceMappingURL=index.js.map