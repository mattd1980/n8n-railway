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
var listSearch_exports = {};
__export(listSearch_exports, {
  sheetsSearch: () => sheetsSearch,
  spreadSheetsSearch: () => spreadSheetsSearch
});
module.exports = __toCommonJS(listSearch_exports);
var import_n8n_workflow = require("n8n-workflow");
var import_GoogleSheets = require("../helpers/GoogleSheets.utils");
var import_transport = require("../transport");
async function spreadSheetsSearch(filter, paginationToken) {
  const query = [];
  if (filter) {
    query.push(`name contains '${filter.replace("'", "\\'")}'`);
  }
  query.push("mimeType = 'application/vnd.google-apps.spreadsheet'");
  const qs = {
    q: query.join(" and "),
    pageToken: paginationToken || void 0,
    fields: "nextPageToken, files(id, name, webViewLink)",
    orderBy: "modifiedByMeTime desc,name_natural",
    includeItemsFromAllDrives: true,
    supportsAllDrives: true
  };
  const res = await import_transport.apiRequest.call(
    this,
    "GET",
    "",
    {},
    qs,
    "https://www.googleapis.com/drive/v3/files"
  );
  return {
    results: res.files.map((sheet) => ({
      name: sheet.name,
      value: sheet.id,
      url: sheet.webViewLink
    })),
    paginationToken: res.nextPageToken
  };
}
async function sheetsSearch(_filter) {
  const documentId = this.getNodeParameter("documentId", 0);
  if (!documentId) return { results: [] };
  const { mode, value } = documentId;
  const spreadsheetId = (0, import_GoogleSheets.getSpreadsheetId)(this.getNode(), mode, value);
  const query = {
    fields: "sheets.properties"
  };
  const responseData = await import_transport.apiRequest.call(
    this,
    "GET",
    `/v4/spreadsheets/${spreadsheetId}`,
    {},
    query
  );
  if (responseData === void 0) {
    throw new import_n8n_workflow.NodeOperationError(this.getNode(), "No data got returned");
  }
  const returnData = [];
  for (const sheet of responseData.sheets) {
    if (sheet.properties.sheetType !== "GRID") {
      continue;
    }
    returnData.push({
      name: sheet.properties.title,
      value: sheet.properties.sheetId || "gid=0",
      url: `https://docs.google.com/spreadsheets/d/${spreadsheetId}/edit#gid=${sheet.properties.sheetId}`
    });
  }
  return { results: returnData };
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  sheetsSearch,
  spreadSheetsSearch
});
//# sourceMappingURL=listSearch.js.map