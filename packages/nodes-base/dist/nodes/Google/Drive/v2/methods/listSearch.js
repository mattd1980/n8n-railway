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
  driveSearch: () => driveSearch,
  driveSearchWithDefault: () => driveSearchWithDefault,
  fileSearch: () => fileSearch,
  folderSearch: () => folderSearch,
  folderSearchWithDefault: () => folderSearchWithDefault
});
module.exports = __toCommonJS(listSearch_exports);
var import_interfaces = require("../helpers/interfaces");
var import_utils = require("../helpers/utils");
var import_transport = require("../transport");
async function fileSearch(filter, paginationToken) {
  const query = ["trashed = false"];
  if (filter) {
    query.push(`name contains '${filter.replace("'", "\\'")}'`);
  }
  query.push(`mimeType != '${import_interfaces.DRIVE.FOLDER}'`);
  const res = await import_transport.googleApiRequest.call(this, "GET", "/drive/v3/files", void 0, {
    q: query.join(" and "),
    pageToken: paginationToken,
    fields: "nextPageToken,files(id,name,mimeType,webViewLink)",
    orderBy: "name_natural",
    includeItemsFromAllDrives: true,
    supportsAllDrives: true,
    spaces: "appDataFolder, drive",
    corpora: "allDrives"
  });
  return {
    results: res.files.map((file) => ({
      name: file.name,
      value: file.id,
      url: file.webViewLink
    })),
    paginationToken: res.nextPageToken
  };
}
async function driveSearch(filter, paginationToken) {
  let res = { drives: [], nextPageToken: void 0 };
  res = await import_transport.googleApiRequest.call(this, "GET", "/drive/v3/drives", void 0, {
    q: filter ? `name contains '${filter.replace("'", "\\'")}'` : void 0,
    pageToken: paginationToken
  });
  const results = [];
  res.drives.forEach((drive) => {
    results.push({
      name: drive.name,
      value: drive.id,
      url: `https://drive.google.com/drive/folders/${drive.id}`
    });
  });
  return {
    results,
    paginationToken: res.nextPageToken
  };
}
async function driveSearchWithDefault(filter, paginationToken) {
  const drives = await driveSearch.call(this, filter, paginationToken);
  let results = [];
  if (filter && !import_interfaces.RLC_DRIVE_DEFAULT.toLowerCase().includes(filter.toLowerCase())) {
    results = drives.results;
  } else {
    results = [
      {
        name: import_interfaces.RLC_DRIVE_DEFAULT,
        value: import_interfaces.RLC_DRIVE_DEFAULT,
        url: "https://drive.google.com/drive/my-drive"
      },
      ...drives.results
    ];
  }
  return {
    results,
    paginationToken: drives.paginationToken
  };
}
async function folderSearch(filter, paginationToken) {
  const query = [];
  if (filter) {
    query.push(`name contains '${filter.replace("'", "\\'")}'`);
  }
  query.push(`mimeType = '${import_interfaces.DRIVE.FOLDER}'`);
  const qs = {
    q: query.join(" and "),
    pageToken: paginationToken,
    fields: "nextPageToken,files(id,name,mimeType,webViewLink,parents,driveId)",
    orderBy: "name_natural",
    includeItemsFromAllDrives: true,
    supportsAllDrives: true,
    spaces: "appDataFolder, drive",
    corpora: "allDrives"
  };
  let driveId;
  driveId = this.getNodeParameter("driveId", "");
  if (!driveId) {
    const searchFilter = this.getNodeParameter("filter", {});
    if (searchFilter?.driveId?.mode === "url") {
      searchFilter.driveId.value = this.getNodeParameter("filter.folderId", void 0, {
        extractValue: true
      });
    }
    driveId = searchFilter.driveId;
  }
  (0, import_utils.updateDriveScopes)(qs, driveId?.value);
  const res = await import_transport.googleApiRequest.call(this, "GET", "/drive/v3/files", void 0, qs);
  const results = [];
  res.files.forEach((i) => {
    results.push({
      name: i.name,
      value: i.id,
      url: i.webViewLink
    });
  });
  return {
    results,
    paginationToken: res.nextPageToken
  };
}
async function folderSearchWithDefault(filter, paginationToken) {
  const folders = await folderSearch.call(this, filter, paginationToken);
  let results = [];
  const rootDefaultDisplayName = "/ (Root folder)";
  if (filter && !(import_interfaces.RLC_FOLDER_DEFAULT.toLowerCase().includes(filter.toLowerCase()) || rootDefaultDisplayName.toLowerCase().includes(filter.toLowerCase()))) {
    results = folders.results;
  } else {
    results = [
      {
        name: rootDefaultDisplayName,
        value: import_interfaces.RLC_FOLDER_DEFAULT,
        url: "https://drive.google.com/drive"
      },
      ...folders.results
    ];
  }
  return {
    results,
    paginationToken: folders.paginationToken
  };
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  driveSearch,
  driveSearchWithDefault,
  fileSearch,
  folderSearch,
  folderSearchWithDefault
});
//# sourceMappingURL=listSearch.js.map