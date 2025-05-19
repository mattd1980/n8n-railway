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
  searchDatasets: () => searchDatasets,
  searchProjects: () => searchProjects,
  searchTables: () => searchTables
});
module.exports = __toCommonJS(listSearch_exports);
var import_transport = require("../transport");
async function searchProjects(filter, paginationToken) {
  const qs = {
    pageToken: paginationToken || void 0
  };
  const response = await import_transport.googleBigQueryApiRequest.call(this, "GET", "/v2/projects", void 0, qs);
  let { projects } = response;
  if (filter) {
    projects = projects.filter(
      (project) => project.friendlyName.includes(filter) || project.id.includes(filter)
    );
  }
  return {
    results: projects.map((project) => ({
      name: project.friendlyName,
      value: project.id,
      url: `https://console.cloud.google.com/bigquery?project=${project.id}`
    })),
    paginationToken: response.nextPageToken
  };
}
async function searchDatasets(filter, paginationToken) {
  const projectId = this.getNodeParameter("projectId", void 0, {
    extractValue: true
  });
  const qs = {
    pageToken: paginationToken || void 0
  };
  const response = await import_transport.googleBigQueryApiRequest.call(
    this,
    "GET",
    `/v2/projects/${projectId}/datasets`,
    void 0,
    qs
  );
  let { datasets } = response;
  if (filter) {
    datasets = datasets.filter(
      (dataset) => dataset.datasetReference.datasetId.includes(filter)
    );
  }
  return {
    results: datasets.map((dataset) => ({
      name: dataset.datasetReference.datasetId,
      value: dataset.datasetReference.datasetId
    })),
    paginationToken: response.nextPageToken
  };
}
async function searchTables(filter, paginationToken) {
  const projectId = this.getNodeParameter("projectId", void 0, {
    extractValue: true
  });
  const datasetId = this.getNodeParameter("datasetId", void 0, {
    extractValue: true
  });
  const qs = {
    pageToken: paginationToken || void 0
  };
  const response = await import_transport.googleBigQueryApiRequest.call(
    this,
    "GET",
    `/v2/projects/${projectId}/datasets/${datasetId}/tables`,
    void 0,
    qs
  );
  let { tables } = response;
  if (filter) {
    tables = tables.filter(
      (table) => table.tableReference.tableId.includes(filter)
    );
  }
  const returnData = {
    results: tables.map((table) => ({
      name: table.tableReference.tableId,
      value: table.tableReference.tableId
    })),
    paginationToken: response.nextPageToken
  };
  return returnData;
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  searchDatasets,
  searchProjects,
  searchTables
});
//# sourceMappingURL=listSearch.js.map