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
  getWorksheetTables: () => getWorksheetTables,
  getWorksheetsList: () => getWorksheetsList,
  searchWorkbooks: () => searchWorkbooks
});
module.exports = __toCommonJS(listSearch_exports);
var import_transport = require("../transport");
async function searchWorkbooks(filter, paginationToken) {
  const fileExtensions = [".xlsx", ".xlsm", ".xlst"];
  const extensionFilter = fileExtensions.join(" OR ");
  const q = filter || extensionFilter;
  let response = {};
  if (paginationToken) {
    response = await import_transport.microsoftApiRequest.call(
      this,
      "GET",
      "",
      void 0,
      void 0,
      paginationToken
      // paginationToken contains the full URL
    );
  } else {
    response = await import_transport.microsoftApiRequest.call(
      this,
      "GET",
      `/drive/root/search(q='${q}')`,
      void 0,
      {
        select: "id,name,webUrl",
        $top: 100
      }
    );
  }
  if (response.value && filter) {
    response.value = response.value.filter((workbook) => {
      return fileExtensions.some((extension) => workbook.name.includes(extension));
    });
  }
  return {
    results: response.value.map((workbook) => {
      for (const extension of fileExtensions) {
        if (workbook.name.includes(extension)) {
          workbook.name = workbook.name.replace(extension, "");
          break;
        }
      }
      return {
        name: workbook.name,
        value: workbook.id,
        url: workbook.webUrl
      };
    }),
    paginationToken: response["@odata.nextLink"]
  };
}
async function getWorksheetsList() {
  const workbookRLC = this.getNodeParameter("workbook");
  const workbookId = workbookRLC.value;
  let workbookURL = workbookRLC.cachedResultUrl ?? "";
  if (workbookURL.includes("1drv.ms")) {
    workbookURL = `https://onedrive.live.com/edit.aspx?resid=${workbookId}`;
  }
  let response = {};
  response = await import_transport.microsoftApiRequest.call(
    this,
    "GET",
    `/drive/items/${workbookId}/workbook/worksheets`,
    void 0,
    {
      select: "id,name"
    }
  );
  return {
    results: response.value.map((worksheet) => ({
      name: worksheet.name,
      value: worksheet.id,
      url: workbookURL ? `${workbookURL}&activeCell=${encodeURIComponent(worksheet.name)}!A1` : void 0
    }))
  };
}
async function getWorksheetTables() {
  const workbookRLC = this.getNodeParameter("workbook");
  const workbookId = workbookRLC.value;
  let workbookURL = workbookRLC.cachedResultUrl ?? "";
  if (workbookURL.includes("1drv.ms")) {
    workbookURL = `https://onedrive.live.com/edit.aspx?resid=${workbookId}`;
  }
  const worksheetId = this.getNodeParameter("worksheet", void 0, {
    extractValue: true
  });
  let response = {};
  response = await import_transport.microsoftApiRequest.call(
    this,
    "GET",
    `/drive/items/${workbookId}/workbook/worksheets/${worksheetId}/tables`,
    void 0
  );
  const results = [];
  for (const table of response.value) {
    const name = table.name;
    const value = table.id;
    const { address } = await import_transport.microsoftApiRequest.call(
      this,
      "GET",
      `/drive/items/${workbookId}/workbook/worksheets/${worksheetId}/tables/${value}/range`,
      void 0,
      {
        select: "address"
      }
    );
    const [sheetName, sheetRange] = address.split("!");
    let url;
    if (workbookURL) {
      url = `${workbookURL}&activeCell=${encodeURIComponent(sheetName)}${sheetRange ? "!" + sheetRange : ""}`;
    }
    results.push({ name, value, url });
  }
  return { results };
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  getWorksheetTables,
  getWorksheetsList,
  searchWorkbooks
});
//# sourceMappingURL=listSearch.js.map