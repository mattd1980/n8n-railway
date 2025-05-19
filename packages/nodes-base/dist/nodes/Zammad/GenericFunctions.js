"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
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
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);
var GenericFunctions_exports = {};
__export(GenericFunctions_exports, {
  doesNotBelongToZammad: () => doesNotBelongToZammad,
  fieldToLoadOption: () => fieldToLoadOption,
  getAllFields: () => getAllFields,
  getGroupCustomFields: () => getGroupCustomFields,
  getGroupFields: () => getGroupFields,
  getOrganizationCustomFields: () => getOrganizationCustomFields,
  getOrganizationFields: () => getOrganizationFields,
  getTicketCustomFields: () => getTicketCustomFields,
  getTicketFields: () => getTicketFields,
  getUserCustomFields: () => getUserCustomFields,
  getUserFields: () => getUserFields,
  isCustomer: () => isCustomer,
  isNotZammadFoundation: () => isNotZammadFoundation,
  prettifyDisplayName: () => prettifyDisplayName,
  throwOnEmptyUpdate: () => throwOnEmptyUpdate,
  tolerateTrailingSlash: () => tolerateTrailingSlash,
  zammadApiRequest: () => zammadApiRequest,
  zammadApiRequestAllItems: () => zammadApiRequestAllItems
});
module.exports = __toCommonJS(GenericFunctions_exports);
var import_flow = __toESM(require("lodash/flow"));
var import_n8n_workflow = require("n8n-workflow");
function tolerateTrailingSlash(url) {
  return url.endsWith("/") ? url.substr(0, url.length - 1) : url;
}
async function zammadApiRequest(method, endpoint, body = {}, qs = {}) {
  const options = {
    method,
    body,
    qs,
    uri: "",
    json: true
  };
  const authentication = this.getNodeParameter("authentication", 0);
  if (authentication === "basicAuth") {
    const credentials = await this.getCredentials("zammadBasicAuthApi");
    const baseUrl = tolerateTrailingSlash(credentials.baseUrl);
    options.uri = `${baseUrl}/api/v1${endpoint}`;
    options.auth = {
      user: credentials.username,
      pass: credentials.password
    };
    options.rejectUnauthorized = !credentials.allowUnauthorizedCerts;
  } else {
    const credentials = await this.getCredentials("zammadTokenAuthApi");
    const baseUrl = tolerateTrailingSlash(credentials.baseUrl);
    options.uri = `${baseUrl}/api/v1${endpoint}`;
    options.headers = {
      Authorization: `Token token=${credentials.accessToken}`
    };
    options.rejectUnauthorized = !credentials.allowUnauthorizedCerts;
  }
  if (!Object.keys(body).length) {
    delete options.body;
  }
  if (!Object.keys(qs).length) {
    delete options.qs;
  }
  try {
    return await this.helpers.request(options);
  } catch (error) {
    if (error.error.error === "Object already exists!") {
      error.error.error = "An entity with this name already exists.";
    }
    throw new import_n8n_workflow.NodeApiError(this.getNode(), error);
  }
}
async function zammadApiRequestAllItems(method, endpoint, body = {}, qs = {}, limit = 0) {
  const returnData = [];
  let responseData;
  qs.per_page = 20;
  qs.page = 1;
  do {
    responseData = await zammadApiRequest.call(this, method, endpoint, body, qs);
    returnData.push(...responseData);
    if (limit && returnData.length > limit) {
      return returnData.slice(0, limit);
    }
    qs.page++;
  } while (responseData.length);
  return returnData;
}
function throwOnEmptyUpdate(resource) {
  throw new import_n8n_workflow.NodeOperationError(
    this.getNode(),
    `Please enter at least one field to update for the ${resource}`
  );
}
const prettifyDisplayName = (fieldName) => fieldName.replace("name", " Name");
const fieldToLoadOption = (i) => {
  return { name: i.display ? prettifyDisplayName(i.display) : i.name, value: i.name };
};
const isCustomer = (user) => user.role_ids.includes(3) && !user.email.endsWith("@zammad.org");
async function getAllFields() {
  return await zammadApiRequest.call(this, "GET", "/object_manager_attributes");
}
const isTypeField = (resource) => (arr) => arr.filter((i) => i.object === resource);
const getGroupFields = isTypeField("Group");
const getOrganizationFields = isTypeField("Organization");
const getUserFields = isTypeField("User");
const getTicketFields = isTypeField("Ticket");
const getCustomFields = (arr) => arr.filter((i) => i.created_by_id !== 1);
const getGroupCustomFields = (0, import_flow.default)(getGroupFields, getCustomFields);
const getOrganizationCustomFields = (0, import_flow.default)(getOrganizationFields, getCustomFields);
const getUserCustomFields = (0, import_flow.default)(getUserFields, getCustomFields);
const getTicketCustomFields = (0, import_flow.default)(getTicketFields, getCustomFields);
const isNotZammadFoundation = (i) => i.name !== "Zammad Foundation";
const doesNotBelongToZammad = (i) => !i.email.endsWith("@zammad.org") && i.login !== "-";
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  doesNotBelongToZammad,
  fieldToLoadOption,
  getAllFields,
  getGroupCustomFields,
  getGroupFields,
  getOrganizationCustomFields,
  getOrganizationFields,
  getTicketCustomFields,
  getTicketFields,
  getUserCustomFields,
  getUserFields,
  isCustomer,
  isNotZammadFoundation,
  prettifyDisplayName,
  throwOnEmptyUpdate,
  tolerateTrailingSlash,
  zammadApiRequest,
  zammadApiRequestAllItems
});
//# sourceMappingURL=GenericFunctions.js.map