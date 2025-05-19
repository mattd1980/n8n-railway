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
  getUser: () => getUser,
  philipsHueApiRequest: () => philipsHueApiRequest
});
module.exports = __toCommonJS(GenericFunctions_exports);
var import_n8n_workflow = require("n8n-workflow");
async function philipsHueApiRequest(method, resource, body = {}, qs = {}, uri, headers = {}) {
  const options = {
    headers: {
      "Content-Type": "application/json"
    },
    method,
    body,
    qs,
    uri: uri || `https://api.meethue.com/route${resource}`,
    json: true
  };
  try {
    if (Object.keys(headers).length !== 0) {
      options.headers = Object.assign({}, options.headers, headers);
    }
    if (Object.keys(body).length === 0) {
      delete options.body;
    }
    if (Object.keys(qs).length === 0) {
      delete options.qs;
    }
    const response = await this.helpers.requestOAuth2.call(this, "philipsHueOAuth2Api", options, {
      tokenType: "Bearer"
    });
    return response;
  } catch (error) {
    throw new import_n8n_workflow.NodeApiError(this.getNode(), error);
  }
}
async function getUser() {
  const { whitelist } = await philipsHueApiRequest.call(this, "GET", "/api/0/config", {}, {});
  for (const user of Object.keys(whitelist)) {
    if (whitelist[user].name === "n8n") {
      return user;
    }
  }
  await philipsHueApiRequest.call(this, "PUT", "/api/0/config", { linkbutton: true });
  const { success } = await philipsHueApiRequest.call(this, "POST", "/api", { devicetype: "n8n" });
  return success.username;
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  getUser,
  philipsHueApiRequest
});
//# sourceMappingURL=GenericFunctions.js.map