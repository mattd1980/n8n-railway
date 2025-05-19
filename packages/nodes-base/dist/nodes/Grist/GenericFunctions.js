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
  gristApiRequest: () => gristApiRequest,
  parseAutoMappedInputs: () => parseAutoMappedInputs,
  parseDefinedFields: () => parseDefinedFields,
  parseFilterProperties: () => parseFilterProperties,
  parseSortProperties: () => parseSortProperties,
  throwOnZeroDefinedFields: () => throwOnZeroDefinedFields
});
module.exports = __toCommonJS(GenericFunctions_exports);
var import_n8n_workflow = require("n8n-workflow");
async function gristApiRequest(method, endpoint, body = {}, qs = {}) {
  const { apiKey, planType, customSubdomain, selfHostedUrl } = await this.getCredentials("gristApi");
  const gristapiurl = planType === "free" ? `https://docs.getgrist.com/api${endpoint}` : planType === "paid" ? `https://${customSubdomain}.getgrist.com/api${endpoint}` : `${selfHostedUrl}/api${endpoint}`;
  const options = {
    headers: {
      Authorization: `Bearer ${apiKey}`
    },
    method,
    uri: gristapiurl,
    qs,
    body,
    json: true
  };
  if (!Object.keys(body).length) {
    delete options.body;
  }
  if (!Object.keys(qs).length) {
    delete options.qs;
  }
  try {
    return await this.helpers.request(options);
  } catch (error) {
    throw new import_n8n_workflow.NodeApiError(this.getNode(), error);
  }
}
function parseSortProperties(sortProperties) {
  return sortProperties.reduce((acc, cur, curIdx) => {
    if (cur.direction === "desc") acc += "-";
    acc += cur.field;
    if (curIdx !== sortProperties.length - 1) acc += ",";
    return acc;
  }, "");
}
function parseFilterProperties(filterProperties) {
  return filterProperties.reduce((acc, cur) => {
    acc[cur.field] = acc[cur.field] ?? [];
    const values = isNaN(Number(cur.values)) ? cur.values : Number(cur.values);
    acc[cur.field].push(values);
    return acc;
  }, {});
}
function parseDefinedFields(fieldsToSendProperties) {
  return fieldsToSendProperties.reduce((acc, cur) => {
    acc[cur.fieldId] = cur.fieldValue;
    return acc;
  }, {});
}
function parseAutoMappedInputs(incomingKeys, inputsToIgnore, item) {
  return incomingKeys.reduce((acc, curKey) => {
    if (inputsToIgnore.includes(curKey)) return acc;
    acc = { ...acc, [curKey]: item[curKey] };
    return acc;
  }, {});
}
function throwOnZeroDefinedFields(fields) {
  if (!fields?.length) {
    throw new import_n8n_workflow.NodeOperationError(
      this.getNode(),
      "No defined data found. Please specify the data to send in 'Fields to Send'."
    );
  }
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  gristApiRequest,
  parseAutoMappedInputs,
  parseDefinedFields,
  parseFilterProperties,
  parseSortProperties,
  throwOnZeroDefinedFields
});
//# sourceMappingURL=GenericFunctions.js.map