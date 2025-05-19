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
  baseSearch: () => baseSearch,
  tableSearch: () => tableSearch,
  viewSearch: () => viewSearch
});
module.exports = __toCommonJS(listSearch_exports);
var import_n8n_workflow = require("n8n-workflow");
var import_transport = require("../transport");
async function baseSearch(filter, paginationToken) {
  let qs;
  if (paginationToken) {
    qs = {
      offset: paginationToken
    };
  }
  const response = await import_transport.apiRequest.call(this, "GET", "meta/bases", void 0, qs);
  if (filter) {
    const results = [];
    for (const base of response.bases || []) {
      if (base.name?.toLowerCase().includes(filter.toLowerCase())) {
        results.push({
          name: base.name,
          value: base.id,
          url: `https://airtable.com/${base.id}`
        });
      }
    }
    return {
      results,
      paginationToken: response.offset
    };
  } else {
    return {
      results: (response.bases || []).map((base) => ({
        name: base.name,
        value: base.id,
        url: `https://airtable.com/${base.id}`
      })),
      paginationToken: response.offset
    };
  }
}
async function tableSearch(filter, paginationToken) {
  const baseId = this.getNodeParameter("base", void 0, {
    extractValue: true
  });
  let qs;
  if (paginationToken) {
    qs = {
      offset: paginationToken
    };
  }
  const response = await import_transport.apiRequest.call(this, "GET", `meta/bases/${baseId}/tables`, void 0, qs);
  if (filter) {
    const results = [];
    for (const table of response.tables || []) {
      if (table.name?.toLowerCase().includes(filter.toLowerCase())) {
        results.push({
          name: table.name,
          value: table.id,
          url: `https://airtable.com/${baseId}/${table.id}`
        });
      }
    }
    return {
      results,
      paginationToken: response.offset
    };
  } else {
    return {
      results: (response.tables || []).map((table) => ({
        name: table.name,
        value: table.id,
        url: `https://airtable.com/${baseId}/${table.id}`
      })),
      paginationToken: response.offset
    };
  }
}
async function viewSearch(filter) {
  const baseId = this.getNodeParameter("base", void 0, {
    extractValue: true
  });
  const tableId = encodeURI(
    this.getNodeParameter("table", void 0, {
      extractValue: true
    })
  );
  const response = await import_transport.apiRequest.call(this, "GET", `meta/bases/${baseId}/tables`);
  const tableData = (response.tables || []).find((table) => {
    return table.id === tableId;
  });
  if (!tableData) {
    throw new import_n8n_workflow.NodeOperationError(this.getNode(), "Table information could not be found!", {
      level: "warning"
    });
  }
  if (filter) {
    const results = [];
    for (const view of tableData.views || []) {
      if (view.name?.toLowerCase().includes(filter.toLowerCase())) {
        results.push({
          name: view.name,
          value: view.id,
          url: `https://airtable.com/${baseId}/${tableId}/${view.id}`
        });
      }
    }
    return {
      results
    };
  } else {
    return {
      results: (tableData.views || []).map((view) => ({
        name: view.name,
        value: view.id,
        url: `https://airtable.com/${baseId}/${tableId}/${view.id}`
      }))
    };
  }
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  baseSearch,
  tableSearch,
  viewSearch
});
//# sourceMappingURL=listSearch.js.map