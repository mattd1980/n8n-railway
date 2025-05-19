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
  buildBinAPIURL: () => buildBinAPIURL,
  buildBinTestURL: () => buildBinTestURL,
  buildRequestURL: () => buildRequestURL,
  transformBinResponse: () => transformBinResponse
});
module.exports = __toCommonJS(GenericFunctions_exports);
var import_n8n_workflow = require("n8n-workflow");
const BIN_ID_REGEX = /\b\d{13}-\d{13}\b/g;
function parseBinId(context) {
  const binId = context.getNodeParameter("binId");
  BIN_ID_REGEX.lastIndex = 0;
  const idMatch = BIN_ID_REGEX.exec(binId);
  if (idMatch) {
    return idMatch[0];
  }
  throw new import_n8n_workflow.NodeApiError(
    context.getNode(),
    {},
    {
      message: "Bin ID format is not valid",
      description: "Please check the provided Bin ID and try again.",
      parseXml: false
    }
  );
}
async function buildBinAPIURL(requestOptions) {
  const binId = parseBinId(this);
  requestOptions.url = `/api/bin/${binId}`;
  return requestOptions;
}
async function buildBinTestURL(requestOptions) {
  const binId = parseBinId(this);
  requestOptions.url = `/${binId}`;
  return requestOptions;
}
async function buildRequestURL(requestOptions) {
  const reqId = this.getNodeParameter("requestId", "shift");
  const binId = parseBinId(this);
  requestOptions.url = `/api/bin/${binId}/req/${reqId}`;
  return requestOptions;
}
async function transformBinResponse(items, _response) {
  items.forEach(
    (item) => item.json = {
      binId: item.json.binId,
      nowTimestamp: item.json.now,
      nowIso: new Date(item.json.now).toISOString(),
      expiresTimestamp: item.json.expires,
      expiresIso: new Date(item.json.expires).toISOString(),
      requestUrl: "https://www.postb.in/" + item.json.binId,
      viewUrl: "https://www.postb.in/b/" + item.json.binId
    }
  );
  return items;
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  buildBinAPIURL,
  buildBinTestURL,
  buildRequestURL,
  transformBinResponse
});
//# sourceMappingURL=GenericFunctions.js.map