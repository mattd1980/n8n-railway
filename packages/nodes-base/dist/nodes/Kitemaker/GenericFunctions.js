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
var GenericFunctions_exports = {};
__export(GenericFunctions_exports, {
  createLoadOptions: () => createLoadOptions,
  kitemakerRequest: () => kitemakerRequest,
  kitemakerRequestAllItems: () => kitemakerRequestAllItems
});
module.exports = __toCommonJS(GenericFunctions_exports);
var import_n8n_workflow = require("n8n-workflow");
async function kitemakerRequest(body = {}) {
  const { personalAccessToken } = await this.getCredentials("kitemakerApi");
  const options = {
    headers: {
      Authorization: `Bearer ${personalAccessToken}`
    },
    method: "POST",
    body,
    uri: "https://toil.kitemaker.co/developers/graphql",
    json: true
  };
  const responseData = await this.helpers.request.call(this, options);
  if (responseData.errors) {
    throw new import_n8n_workflow.NodeApiError(this.getNode(), responseData);
  }
  return responseData;
}
function getGroupAndItems(resource) {
  const map = {
    space: { group: "organization", items: "spaces" },
    user: { group: "organization", items: "users" },
    workItem: { group: "workItems", items: "workItems" }
  };
  return [map[resource].group, map[resource].items];
}
async function kitemakerRequestAllItems(body) {
  const resource = this.getNodeParameter("resource", 0);
  const [group, items] = getGroupAndItems(resource);
  const returnAll = this.getNodeParameter("returnAll", 0, false);
  const limit = this.getNodeParameter("limit", 0, 0);
  const returnData = [];
  let responseData;
  do {
    responseData = await kitemakerRequest.call(this, body);
    body.variables.cursor = responseData.data[group].cursor;
    returnData.push(...responseData.data[group][items]);
    if (!returnAll && returnData.length > limit) {
      return returnData.slice(0, limit);
    }
  } while (responseData.data[group].hasMore);
  return returnData;
}
function createLoadOptions(resources) {
  return resources.map((option) => {
    if (option.username) return { name: option.username, value: option.id };
    if (option.title) return { name: option.title, value: option.id };
    return { name: option.name ?? "Unnamed", value: option.id };
  });
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  createLoadOptions,
  kitemakerRequest,
  kitemakerRequestAllItems
});
//# sourceMappingURL=GenericFunctions.js.map