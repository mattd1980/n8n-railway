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
  profitWellApiRequest: () => profitWellApiRequest,
  simplifyDailyMetrics: () => simplifyDailyMetrics,
  simplifyMontlyMetrics: () => simplifyMontlyMetrics
});
module.exports = __toCommonJS(GenericFunctions_exports);
var import_n8n_workflow = require("n8n-workflow");
async function profitWellApiRequest(method, resource, body = {}, qs = {}, uri, option = {}) {
  try {
    const credentials = await this.getCredentials("profitWellApi");
    let options = {
      headers: {
        Authorization: credentials.accessToken
      },
      method,
      qs,
      body,
      uri: uri || `https://api.profitwell.com/v2${resource}`,
      json: true
    };
    options = Object.assign({}, options, option);
    return await this.helpers.request(options);
  } catch (error) {
    throw new import_n8n_workflow.NodeApiError(this.getNode(), error);
  }
}
function simplifyDailyMetrics(responseData) {
  const data = [];
  const keys = Object.keys(responseData);
  const dates = responseData[keys[0]].map((e) => e.date);
  for (const [index, date] of dates.entries()) {
    const element = {
      date
    };
    for (const key of keys) {
      element[key] = responseData[key][index].value;
    }
    data.push(element);
  }
  return data;
}
function simplifyMontlyMetrics(responseData) {
  const data = {};
  for (const key of Object.keys(responseData)) {
    for (const [index] of responseData[key].entries()) {
      data[key] = responseData[key][index].value;
      data.date = responseData[key][index].date;
    }
  }
  return data;
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  profitWellApiRequest,
  simplifyDailyMetrics,
  simplifyMontlyMetrics
});
//# sourceMappingURL=GenericFunctions.js.map