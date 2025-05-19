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
  scorecardApiRequest: () => scorecardApiRequest,
  simplify: () => simplify
});
module.exports = __toCommonJS(GenericFunctions_exports);
var import_n8n_workflow = require("n8n-workflow");
async function scorecardApiRequest(method, resource, body = {}, query = {}, uri, option = {}) {
  const credentials = await this.getCredentials("securityScorecardApi");
  const headerWithAuthentication = { Authorization: `Token ${credentials.apiKey}` };
  let options = {
    headers: headerWithAuthentication,
    method,
    qs: query,
    uri: uri || `https://api.securityscorecard.io/${resource}`,
    body,
    json: true
  };
  if (Object.keys(option).length !== 0) {
    options = Object.assign({}, options, option);
  }
  if (Object.keys(body).length === 0) {
    delete options.body;
  }
  if (Object.keys(query).length === 0) {
    delete options.qs;
  }
  try {
    return await this.helpers.request(options);
  } catch (error) {
    throw new import_n8n_workflow.NodeApiError(this.getNode(), error);
  }
}
function simplify(data) {
  const results = [];
  for (const record of data) {
    const newRecord = { date: record.date };
    for (const factor of record.factors) {
      newRecord[factor.name] = factor.score;
    }
    results.push(newRecord);
  }
  return results;
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  scorecardApiRequest,
  simplify
});
//# sourceMappingURL=GenericFunctions.js.map