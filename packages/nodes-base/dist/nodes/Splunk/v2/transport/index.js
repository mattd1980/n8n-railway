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
  splunkApiJsonRequest: () => splunkApiJsonRequest,
  splunkApiRequest: () => splunkApiRequest
});
module.exports = __toCommonJS(transport_exports);
var import_n8n_workflow = require("n8n-workflow");
var import_utils = require("../helpers/utils");
async function splunkApiRequest(method, endpoint, body = {}, qs = {}) {
  const { baseUrl, allowUnauthorizedCerts } = await this.getCredentials("splunkApi");
  const options = {
    headers: {
      "Content-Type": "application/x-www-form-urlencoded"
    },
    method,
    form: body,
    qs,
    uri: `${baseUrl}${endpoint}`,
    json: true,
    rejectUnauthorized: !allowUnauthorizedCerts,
    useQuerystring: true
    // serialize roles array as `roles=A&roles=B`
  };
  if (!Object.keys(body).length) {
    delete options.body;
  }
  if (!Object.keys(qs).length) {
    delete options.qs;
  }
  let result;
  try {
    let attempts = 0;
    do {
      try {
        const response = await this.helpers.requestWithAuthentication.call(
          this,
          "splunkApi",
          options
        );
        result = await (0, import_utils.parseXml)(response);
        return result;
      } catch (error) {
        if (attempts >= 5) {
          throw error;
        }
        await (0, import_n8n_workflow.sleep)(1e3);
        attempts++;
      }
    } while (true);
  } catch (error) {
    if (error instanceof import_n8n_workflow.NodeApiError) throw error;
    if (result === void 0) {
      throw new import_n8n_workflow.NodeOperationError(this.getNode(), "No response from API call", {
        description: "Try to use 'Retry On Fail' option from node's settings"
      });
    }
    if (error?.cause?.code === "ECONNREFUSED") {
      throw new import_n8n_workflow.NodeApiError(this.getNode(), { ...error, code: 401 });
    }
    const rawError = await (0, import_utils.parseXml)(error.error);
    error = (0, import_utils.extractErrorDescription)(rawError);
    if ("fatal" in error) {
      error = { error: error.fatal };
    }
    throw new import_n8n_workflow.NodeApiError(this.getNode(), error);
  }
}
async function splunkApiJsonRequest(method, endpoint, body = {}, qs = {}) {
  const { baseUrl, allowUnauthorizedCerts } = await this.getCredentials("splunkApi");
  qs.output_mode = "json";
  const options = {
    method,
    body,
    qs: qs ?? {},
    url: `${baseUrl}${endpoint}`,
    json: true,
    skipSslCertificateValidation: allowUnauthorizedCerts
  };
  if (!Object.keys(body).length) delete options.body;
  let result;
  try {
    let attempts = 0;
    do {
      try {
        result = await this.helpers.httpRequestWithAuthentication.call(this, "splunkApi", options);
        if (result.entry) {
          const { entry } = result;
          return entry.map((e) => (0, import_utils.formatEntry)(e, true));
        }
        return result;
      } catch (error) {
        if (attempts >= 5) {
          throw error;
        }
        await (0, import_n8n_workflow.sleep)(1e3);
        attempts++;
      }
    } while (true);
  } catch (error) {
    if (error instanceof import_n8n_workflow.NodeApiError) throw error;
    if (result === void 0) {
      throw new import_n8n_workflow.NodeOperationError(this.getNode(), "No response from API call", {
        description: "Try to use 'Retry On Fail' option from node's settings"
      });
    }
    if (error?.cause?.code === "ECONNREFUSED") {
      throw new import_n8n_workflow.NodeApiError(this.getNode(), { ...error, code: 401 });
    }
    if ("fatal" in error) error = { error: error.fatal };
    throw new import_n8n_workflow.NodeApiError(this.getNode(), error);
  }
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  splunkApiJsonRequest,
  splunkApiRequest
});
//# sourceMappingURL=index.js.map