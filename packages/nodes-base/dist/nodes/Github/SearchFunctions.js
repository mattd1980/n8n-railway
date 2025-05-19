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
  getRefs: () => getRefs,
  getRepositories: () => getRepositories,
  getUsers: () => getUsers,
  getWorkflows: () => getWorkflows
});
module.exports = __toCommonJS(SearchFunctions_exports);
var import_GenericFunctions = require("./GenericFunctions");
async function getUsers(filter, paginationToken) {
  const page = paginationToken ? +paginationToken : 1;
  const per_page = 100;
  const responseData = await import_GenericFunctions.githubApiRequest.call(
    this,
    "GET",
    "/search/users",
    {},
    { q: filter, page, per_page }
  );
  const results = responseData.items.map((item) => ({
    name: item.login,
    value: item.login,
    url: item.html_url
  }));
  const nextPaginationToken = page * per_page < responseData.total_count ? page + 1 : void 0;
  return { results, paginationToken: nextPaginationToken };
}
async function getRepositories(filter, paginationToken) {
  const owner = this.getCurrentNodeParameter("owner", { extractValue: true });
  const page = paginationToken ? +paginationToken : 1;
  const per_page = 100;
  const q = `${filter ?? ""} user:${owner} fork:true`;
  let responseData = {
    items: [],
    total_count: 0
  };
  try {
    responseData = await import_GenericFunctions.githubApiRequest.call(
      this,
      "GET",
      "/search/repositories",
      {},
      { q, page, per_page }
    );
  } catch {
  }
  const results = responseData.items.map((item) => ({
    name: item.name,
    value: item.name,
    url: item.html_url
  }));
  const nextPaginationToken = page * per_page < responseData.total_count ? page + 1 : void 0;
  return { results, paginationToken: nextPaginationToken };
}
async function getWorkflows(paginationToken) {
  const owner = this.getCurrentNodeParameter("owner", { extractValue: true });
  const repository = this.getCurrentNodeParameter("repository", { extractValue: true });
  const page = paginationToken ? +paginationToken : 1;
  const per_page = 100;
  const endpoint = `/repos/${owner}/${repository}/actions/workflows`;
  let responseData = {
    workflows: [],
    total_count: 0
  };
  try {
    responseData = await import_GenericFunctions.githubApiRequest.call(this, "GET", endpoint, {}, { page, per_page });
  } catch {
  }
  const results = responseData.workflows.map((workflow) => ({
    name: workflow.name,
    value: workflow.id
  }));
  const nextPaginationToken = page * per_page < responseData.total_count ? page + 1 : void 0;
  return { results, paginationToken: nextPaginationToken };
}
async function getRefs(filter, paginationToken) {
  const owner = this.getCurrentNodeParameter("owner", { extractValue: true });
  const repository = this.getCurrentNodeParameter("repository", { extractValue: true });
  const page = paginationToken ? +paginationToken : 1;
  const per_page = 100;
  const responseData = await import_GenericFunctions.githubApiRequest.call(
    this,
    "GET",
    `/repos/${owner}/${repository}/git/refs`,
    {},
    { page, per_page }
  );
  const refs = [];
  for (const ref of responseData) {
    const refPath = ref.ref.split("/");
    const refType = refPath[1];
    const refName = refPath.slice(2).join("/");
    let description = "";
    if (refType === "heads") {
      description = `Branch: ${refName}`;
    } else if (refType === "tags") {
      description = `Tag: ${refName}`;
    } else {
      description = `${refType}: ${refName}`;
    }
    refs.push({
      name: refName,
      value: refName,
      description
    });
  }
  if (filter) {
    const filteredRefs = refs.filter(
      (ref) => ref.name.toLowerCase().includes(filter.toLowerCase())
    );
    return { results: filteredRefs };
  }
  const nextPaginationToken = responseData.length === per_page ? page + 1 : void 0;
  return { results: refs, paginationToken: nextPaginationToken };
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  getRefs,
  getRepositories,
  getUsers,
  getWorkflows
});
//# sourceMappingURL=SearchFunctions.js.map