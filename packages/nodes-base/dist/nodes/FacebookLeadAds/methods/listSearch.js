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
  formList: () => formList,
  pageList: () => pageList
});
module.exports = __toCommonJS(listSearch_exports);
var import_GenericFunctions = require("../GenericFunctions");
const filterMatches = (name, filter) => !filter || name?.toLowerCase().includes(filter.toLowerCase());
async function pageList(filter, paginationToken) {
  const { data: pages, paging } = await import_GenericFunctions.facebookPageList.call(this, paginationToken);
  return {
    results: pages.filter((page) => filterMatches(page.name, filter)).map((page) => ({
      name: page.name,
      value: page.id,
      url: `https://facebook.com/${page.id}`
    })),
    paginationToken: paging?.next ? paging?.cursors?.after : void 0
  };
}
async function formList(filter, paginationToken) {
  const pageId = this.getNodeParameter("page", "", { extractValue: true });
  const { data: forms, paging } = await import_GenericFunctions.facebookFormList.call(this, pageId, paginationToken);
  return {
    results: forms.filter((form) => filterMatches(form.name, filter)).map((form) => ({
      name: form.name,
      value: form.id
    })),
    paginationToken: paging?.next ? paging?.cursors?.after : void 0
  };
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  formList,
  pageList
});
//# sourceMappingURL=listSearch.js.map