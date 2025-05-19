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
  searchJobs: () => searchJobs,
  searchReports: () => searchReports,
  searchUsers: () => searchUsers
});
module.exports = __toCommonJS(listSearch_exports);
var import_transport = require("../transport");
async function searchReports(filter) {
  const qs = {};
  if (filter) {
    qs.search = filter;
  }
  const endpoint = "/services/saved/searches";
  const response = await import_transport.splunkApiJsonRequest.call(this, "GET", endpoint, void 0, qs);
  return {
    results: response.map((entry) => {
      return {
        name: entry.name,
        value: entry.id,
        url: entry.entryUrl
      };
    })
  };
}
async function searchJobs(filter) {
  const qs = {};
  if (filter) {
    qs.search = filter;
  }
  const endpoint = "/services/search/jobs";
  const response = await import_transport.splunkApiJsonRequest.call(this, "GET", endpoint, void 0, qs);
  return {
    results: response.map((entry) => {
      return {
        name: entry.name.replace(/^\|\s*/, ""),
        value: entry.id,
        url: entry.entryUrl
      };
    })
  };
}
async function searchUsers(filter) {
  const qs = {};
  if (filter) {
    qs.search = filter;
  }
  const endpoint = "/services/authentication/users";
  const response = await import_transport.splunkApiJsonRequest.call(this, "GET", endpoint, void 0, qs);
  return {
    results: response.map((entry) => {
      return {
        name: entry.name,
        value: entry.id,
        url: entry.entryUrl
      };
    })
  };
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  searchJobs,
  searchReports,
  searchUsers
});
//# sourceMappingURL=listSearch.js.map