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
  egoiApiRequest: () => egoiApiRequest,
  egoiApiRequestAllItems: () => egoiApiRequestAllItems,
  getFields: () => getFields,
  simplify: () => simplify
});
module.exports = __toCommonJS(GenericFunctions_exports);
var import_n8n_workflow = require("n8n-workflow");
const fieldCache = {};
async function egoiApiRequest(method, endpoint, body = {}, qs = {}, _headers) {
  const credentials = await this.getCredentials("egoiApi");
  const options = {
    headers: {
      accept: "application/json",
      Apikey: `${credentials.apiKey}`
    },
    method,
    qs,
    body,
    url: `https://api.egoiapp.com${endpoint}`,
    json: true
  };
  if (Object.keys(body).length === 0) {
    delete options.body;
  }
  try {
    return await this.helpers.request(options);
  } catch (error) {
    throw new import_n8n_workflow.NodeApiError(this.getNode(), error);
  }
}
async function getFields(listId) {
  if (fieldCache[listId]) {
    return fieldCache[listId];
  }
  fieldCache[listId] = await egoiApiRequest.call(this, "GET", `/lists/${listId}/fields`);
  return fieldCache[listId];
}
async function egoiApiRequestAllItems(propertyName, method, endpoint, body = {}, query = {}) {
  const returnData = [];
  let responseData;
  query.offset = 0;
  query.count = 500;
  do {
    responseData = await egoiApiRequest.call(this, method, endpoint, body, query);
    returnData.push.apply(returnData, responseData[propertyName]);
    query.offset += query.count;
  } while (responseData[propertyName] && responseData[propertyName].length !== 0);
  return returnData;
}
async function simplify(contacts, listId) {
  let fields = await getFields.call(this, listId);
  fields = fields.filter((element) => element.type === "extra");
  const fieldsKeyValue = {};
  for (const field of fields) {
    fieldsKeyValue[field.field_id] = field.name;
  }
  const data = [];
  for (const contact of contacts) {
    const extras = contact.extra.reduce(
      (accumulator, currentValue) => {
        const key = fieldsKeyValue[currentValue.field_id];
        return { [key]: currentValue.value, ...accumulator };
      },
      {}
    );
    data.push({
      ...contact.base,
      ...extras,
      tags: contact.tags
    });
  }
  return data;
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  egoiApiRequest,
  egoiApiRequestAllItems,
  getFields,
  simplify
});
//# sourceMappingURL=GenericFunctions.js.map