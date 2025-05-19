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
  getFiles: () => getFiles,
  getFolders: () => getFolders,
  getItems: () => getItems,
  getLists: () => getLists,
  getSites: () => getSites
});
module.exports = __toCommonJS(listSearch_exports);
var import_transport = require("../transport");
async function getFiles(filter, paginationToken) {
  const site = this.getNodeParameter("site", void 0, { extractValue: true });
  const folder = this.getNodeParameter("folder", void 0, { extractValue: true });
  let response;
  if (paginationToken) {
    response = await import_transport.microsoftSharePointApiRequest.call(
      this,
      "GET",
      `/sites/${site}/drive/items/${folder}/children`,
      {},
      void 0,
      void 0,
      paginationToken
    );
  } else {
    const qs = {
      $select: "id,name,file"
    };
    if (filter) {
      qs.$filter = `name eq '${filter}'`;
    }
    response = await import_transport.microsoftSharePointApiRequest.call(
      this,
      "GET",
      `/sites/${site}/drive/items/${folder}/children`,
      {},
      qs
    );
  }
  const items = response.value;
  const results = items.filter((x) => x.file).map((g) => ({
    name: g.name,
    value: g.id
  })).sort(
    (a, b) => a.name.localeCompare(b.name, void 0, { numeric: true, sensitivity: "base" })
  );
  return { results, paginationToken: response["@odata.nextLink"] };
}
async function getFolders(filter, paginationToken) {
  const site = this.getNodeParameter("site", void 0, { extractValue: true });
  let response;
  if (paginationToken) {
    response = await import_transport.microsoftSharePointApiRequest.call(
      this,
      "GET",
      `/sites/${site}/drive/items`,
      {},
      void 0,
      void 0,
      paginationToken
    );
  } else {
    const qs = {
      $select: "id,name,folder",
      // Folder filter not supported, but filter is still required
      // https://learn.microsoft.com/en-us/onedrive/developer/rest-api/concepts/filtering-results?view=odsp-graph-online#filterable-properties
      $filter: "folder ne null"
    };
    if (filter) {
      qs.$filter = `name eq '${filter}'`;
    }
    response = await import_transport.microsoftSharePointApiRequest.call(
      this,
      "GET",
      `/sites/${site}/drive/items`,
      {},
      qs
    );
  }
  const items = response.value;
  const results = items.filter((x) => x.folder).map((g) => ({
    name: g.name,
    value: g.id
  })).sort(
    (a, b) => a.name.localeCompare(b.name, void 0, { numeric: true, sensitivity: "base" })
  );
  return { results, paginationToken: response["@odata.nextLink"] };
}
async function getItems(filter, paginationToken) {
  const site = this.getNodeParameter("site", void 0, { extractValue: true });
  const list = this.getNodeParameter("list", void 0, { extractValue: true });
  let response;
  if (paginationToken) {
    response = await import_transport.microsoftSharePointApiRequest.call(
      this,
      "GET",
      `/sites/${site}/lists/${list}/items`,
      {},
      void 0,
      void 0,
      paginationToken
    );
  } else {
    const qs = {
      $expand: "fields(select=Title)",
      $select: "id,fields"
    };
    if (filter) {
      qs.$filter = `fields/Title eq '${filter}'`;
    }
    response = await import_transport.microsoftSharePointApiRequest.call(
      this,
      "GET",
      `/sites/${site}/lists/${list}/items`,
      {},
      qs
    );
  }
  const items = response.value;
  const results = items.map((g) => ({
    name: g.fields.Title ?? g.id,
    value: g.id
  })).sort(
    (a, b) => a.name.localeCompare(b.name, void 0, { numeric: true, sensitivity: "base" })
  );
  return { results, paginationToken: response["@odata.nextLink"] };
}
async function getLists(filter, paginationToken) {
  const site = this.getNodeParameter("site", void 0, { extractValue: true });
  let response;
  if (paginationToken) {
    response = await import_transport.microsoftSharePointApiRequest.call(
      this,
      "GET",
      `/sites/${site}/lists`,
      {},
      void 0,
      void 0,
      paginationToken
    );
  } else {
    const qs = {
      $select: "id,displayName"
    };
    if (filter) {
      qs.$filter = `displayName eq '${filter}'`;
    }
    response = await import_transport.microsoftSharePointApiRequest.call(
      this,
      "GET",
      `/sites/${site}/lists`,
      {},
      qs
    );
  }
  const lists = response.value;
  const results = lists.map((g) => ({
    name: g.displayName,
    value: g.id
  })).sort(
    (a, b) => a.name.localeCompare(b.name, void 0, { numeric: true, sensitivity: "base" })
  );
  return { results, paginationToken: response["@odata.nextLink"] };
}
async function getSites(filter, paginationToken) {
  let response;
  if (paginationToken) {
    response = await import_transport.microsoftSharePointApiRequest.call(
      this,
      "GET",
      "/sites",
      {},
      void 0,
      void 0,
      paginationToken
    );
  } else {
    const qs = {
      $select: "id,title",
      $search: "*"
    };
    if (filter) {
      qs.$search = filter;
    }
    response = await import_transport.microsoftSharePointApiRequest.call(this, "GET", "/sites", {}, qs);
  }
  const sites = response.value;
  const results = sites.map((g) => ({
    name: g.title,
    value: g.id
  })).sort(
    (a, b) => a.name.localeCompare(b.name, void 0, { numeric: true, sensitivity: "base" })
  );
  return { results, paginationToken: response["@odata.nextLink"] };
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  getFiles,
  getFolders,
  getItems,
  getLists,
  getSites
});
//# sourceMappingURL=listSearch.js.map