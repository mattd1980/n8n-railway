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
var Beeminder_node_functions_exports = {};
__export(Beeminder_node_functions_exports, {
  createDatapoint: () => createDatapoint,
  deleteDatapoint: () => deleteDatapoint,
  getAllDatapoints: () => getAllDatapoints,
  updateDatapoint: () => updateDatapoint
});
module.exports = __toCommonJS(Beeminder_node_functions_exports);
var import_GenericFunctions = require("./GenericFunctions");
async function createDatapoint(data) {
  const credentials = await this.getCredentials("beeminderApi");
  const endpoint = `/users/${credentials.user}/goals/${data.goalName}/datapoints.json`;
  return await import_GenericFunctions.beeminderApiRequest.call(this, "POST", endpoint, data);
}
async function getAllDatapoints(data) {
  const credentials = await this.getCredentials("beeminderApi");
  const endpoint = `/users/${credentials.user}/goals/${data.goalName}/datapoints.json`;
  if (data.count !== void 0) {
    return await import_GenericFunctions.beeminderApiRequest.call(this, "GET", endpoint, {}, data);
  }
  return await import_GenericFunctions.beeminderApiRequestAllItems.call(this, "GET", endpoint, {}, data);
}
async function updateDatapoint(data) {
  const credentials = await this.getCredentials("beeminderApi");
  const endpoint = `/users/${credentials.user}/goals/${data.goalName}/datapoints/${data.datapointId}.json`;
  return await import_GenericFunctions.beeminderApiRequest.call(this, "PUT", endpoint, data);
}
async function deleteDatapoint(data) {
  const credentials = await this.getCredentials("beeminderApi");
  const endpoint = `/users/${credentials.user}/goals/${data.goalName}/datapoints/${data.datapointId}.json`;
  return await import_GenericFunctions.beeminderApiRequest.call(this, "DELETE", endpoint);
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  createDatapoint,
  deleteDatapoint,
  getAllDatapoints,
  updateDatapoint
});
//# sourceMappingURL=Beeminder.node.functions.js.map