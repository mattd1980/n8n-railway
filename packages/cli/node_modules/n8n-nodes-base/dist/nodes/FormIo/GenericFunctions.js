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
  formIoApiRequest: () => formIoApiRequest
});
module.exports = __toCommonJS(GenericFunctions_exports);
var import_n8n_workflow = require("n8n-workflow");
async function getToken(credentials) {
  const base = credentials.domain || "https://formio.form.io";
  const options = {
    headers: {
      "Content-Type": "application/json"
    },
    method: "POST",
    body: {
      data: {
        email: credentials.email,
        password: credentials.password
      }
    },
    uri: `${base}/user/login`,
    json: true,
    resolveWithFullResponse: true
  };
  try {
    const responseObject = await this.helpers.request(options);
    return responseObject.headers["x-jwt-token"];
  } catch (error) {
    throw new import_n8n_workflow.ApplicationError(
      "Authentication Failed for Form.io. Please provide valid credentails/ endpoint details",
      { level: "warning" }
    );
  }
}
async function formIoApiRequest(method, endpoint, body = {}, qs = {}) {
  const credentials = await this.getCredentials("formIoApi");
  const token = await getToken.call(this, credentials);
  const base = credentials.domain || "https://api.form.io";
  const options = {
    headers: {
      "Content-Type": "application/json",
      "x-jwt-token": token
    },
    method,
    body,
    qs,
    uri: `${base}${endpoint}`,
    json: true
  };
  try {
    return await this.helpers.request.call(this, options);
  } catch (error) {
    throw new import_n8n_workflow.NodeApiError(this.getNode(), error);
  }
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  formIoApiRequest
});
//# sourceMappingURL=GenericFunctions.js.map