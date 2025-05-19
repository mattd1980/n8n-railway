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
var RundeckApi_exports = {};
__export(RundeckApi_exports, {
  RundeckApi: () => RundeckApi
});
module.exports = __toCommonJS(RundeckApi_exports);
var import_n8n_workflow = require("n8n-workflow");
class RundeckApi {
  constructor(executeFunctions) {
    this.executeFunctions = executeFunctions;
  }
  async request(method, endpoint, body, query) {
    const credentialType = "rundeckApi";
    const options = {
      rejectUnauthorized: false,
      method,
      qs: query,
      uri: this.credentials?.url + endpoint,
      body,
      json: true
    };
    try {
      return await this.executeFunctions.helpers.requestWithAuthentication.call(
        this.executeFunctions,
        credentialType,
        options
      );
    } catch (error) {
      throw new import_n8n_workflow.NodeApiError(this.executeFunctions.getNode(), error);
    }
  }
  async init() {
    const credentials = await this.executeFunctions.getCredentials("rundeckApi");
    if (credentials === void 0) {
      throw new import_n8n_workflow.NodeOperationError(this.executeFunctions.getNode(), "No credentials got returned!");
    }
    this.credentials = credentials;
  }
  async executeJob(jobId, args, filter) {
    let params = "";
    if (args) {
      for (const arg of args) {
        params += "-" + arg.name + " " + arg.value + " ";
      }
    }
    const body = {
      argString: params
    };
    const query = {};
    if (filter) {
      query.filter = filter;
    }
    return await this.request("POST", `/api/14/job/${jobId}/run`, body, query);
  }
  async getJobMetadata(jobId) {
    return await this.request("GET", `/api/18/job/${jobId}/info`, {}, {});
  }
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  RundeckApi
});
//# sourceMappingURL=RundeckApi.js.map