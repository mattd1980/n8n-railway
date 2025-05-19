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
var utils_exports = {};
__export(utils_exports, {
  filterSortSearchListItems: () => filterSortSearchListItems,
  prepareMessage: () => prepareMessage
});
module.exports = __toCommonJS(utils_exports);
function prepareMessage(message, contentType, includeLinkToWorkflow, instanceId) {
  if (includeLinkToWorkflow) {
    const { id } = this.getWorkflow();
    const link = `${this.getInstanceBaseUrl()}workflow/${id}?utm_source=n8n-internal&utm_medium=powered_by&utm_campaign=${encodeURIComponent(
      "n8n-nodes-base.microsoftTeams"
    )}${instanceId ? "_" + instanceId : ""}`;
    contentType = "html";
    message = `${message}<br><br><em> Powered by <a href="${link}">this n8n workflow</a> </em>`;
  }
  return {
    body: {
      contentType,
      content: message
    }
  };
}
function filterSortSearchListItems(items, filter) {
  return items.filter(
    (item) => !filter || item.name.toLowerCase().includes(filter.toLowerCase()) || item.value.toString().toLowerCase().includes(filter.toLowerCase())
  ).sort((a, b) => {
    if (a.name.toLocaleLowerCase() < b.name.toLocaleLowerCase()) {
      return -1;
    }
    if (a.name.toLocaleLowerCase() > b.name.toLocaleLowerCase()) {
      return 1;
    }
    return 0;
  });
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  filterSortSearchListItems,
  prepareMessage
});
//# sourceMappingURL=utils.js.map