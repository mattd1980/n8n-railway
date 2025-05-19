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
var SearchFunctions_exports = {};
__export(SearchFunctions_exports, {
  driveSearch: () => driveSearch,
  fileSearch: () => fileSearch,
  folderSearch: () => folderSearch
});
module.exports = __toCommonJS(SearchFunctions_exports);
var import_GenericFunctions = require("./GenericFunctions");
async function fileSearch(filter, paginationToken) {
  const query = [];
  if (filter) {
    query.push(`name contains '${filter.replace("'", "\\'")}'`);
  }
  query.push("mimeType != 'application/vnd.google-apps.folder'");
  const res = await import_GenericFunctions.googleApiRequest.call(this, "GET", "/drive/v3/files", void 0, {
    q: query.join(" and "),
    pageToken: paginationToken,
    fields: "nextPageToken,files(id,name,mimeType,webViewLink)",
    orderBy: "name_natural"
  });
  return {
    results: res.files.map((i) => ({
      name: i.name,
      value: i.id,
      url: i.webViewLink
    })),
    paginationToken: res.nextPageToken
  };
}
async function folderSearch(filter, paginationToken) {
  const query = [];
  if (filter) {
    query.push(`name contains '${filter.replace("'", "\\'")}'`);
  }
  query.push("mimeType = 'application/vnd.google-apps.folder'");
  const res = await import_GenericFunctions.googleApiRequest.call(this, "GET", "/drive/v3/files", void 0, {
    q: query.join(" and "),
    pageToken: paginationToken,
    fields: "nextPageToken,files(id,name,mimeType,webViewLink)",
    orderBy: "name_natural"
  });
  return {
    results: res.files.map((i) => ({
      name: i.name,
      value: i.id,
      url: i.webViewLink
    })),
    paginationToken: res.nextPageToken
  };
}
async function driveSearch(filter, paginationToken) {
  const res = await import_GenericFunctions.googleApiRequest.call(this, "GET", "/drive/v3/drives", void 0, {
    q: filter ? `name contains '${filter.replace("'", "\\'")}'` : void 0,
    pageToken: paginationToken
  });
  return {
    results: res.drives.map((i) => ({
      name: i.name,
      value: i.id
    })),
    paginationToken: res.nextPageToken
  };
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  driveSearch,
  fileSearch,
  folderSearch
});
//# sourceMappingURL=SearchFunctions.js.map