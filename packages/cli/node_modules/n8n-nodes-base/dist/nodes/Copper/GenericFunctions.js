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
  adjustAddress: () => adjustAddress,
  adjustCompanyFields: () => adjustCompanyFields,
  adjustEmail: () => adjustEmail,
  adjustEmails: () => adjustEmails,
  adjustLeadFields: () => adjustLeadFields,
  adjustPersonFields: () => adjustPersonFields,
  adjustPhoneNumbers: () => adjustPhoneNumbers,
  adjustProjectIds: () => adjustProjectIds,
  adjustTaskFields: () => adjustTaskFields,
  copperApiRequest: () => copperApiRequest,
  copperApiRequestAllItems: () => copperApiRequestAllItems,
  getAutomaticSecret: () => getAutomaticSecret,
  handleListing: () => handleListing
});
module.exports = __toCommonJS(GenericFunctions_exports);
var import_crypto = require("crypto");
var import_flow = __toESM(require("lodash/flow"));
var import_omit = __toESM(require("lodash/omit"));
var import_n8n_workflow = require("n8n-workflow");
async function copperApiRequest(method, resource, body = {}, qs = {}, uri = "", option = {}) {
  let options = {
    headers: {
      "Content-Type": "application/json"
    },
    method,
    qs,
    body,
    url: uri || `https://api.copper.com/developer_api/v1${resource}`,
    json: true
  };
  options = Object.assign({}, options, option);
  if (!Object.keys(qs).length) {
    delete options.qs;
  }
  if (Object.keys(options.body).length === 0) {
    delete options.body;
  }
  try {
    return await this.helpers.requestWithAuthentication.call(this, "copperApi", options);
  } catch (error) {
    throw new import_n8n_workflow.NodeApiError(this.getNode(), error);
  }
}
function getAutomaticSecret(credentials) {
  const data = `${credentials.email},${credentials.apiKey}`;
  return (0, import_crypto.createHash)("md5").update(data).digest("hex");
}
function adjustAddress(fixedCollection) {
  if (!fixedCollection.address) return fixedCollection;
  const adjusted = (0, import_omit.default)(fixedCollection, ["address"]);
  if (fixedCollection.address) {
    adjusted.address = fixedCollection.address.addressFields;
  }
  return adjusted;
}
function adjustPhoneNumbers(fixedCollection) {
  if (!fixedCollection.phone_numbers) return fixedCollection;
  const adjusted = (0, import_omit.default)(fixedCollection, ["phone_numbers"]);
  if (fixedCollection.phone_numbers) {
    adjusted.phone_numbers = fixedCollection.phone_numbers.phoneFields;
  }
  return adjusted;
}
function adjustEmails(fixedCollection) {
  if (!fixedCollection.emails) return fixedCollection;
  const adjusted = (0, import_omit.default)(fixedCollection, ["emails"]);
  if (fixedCollection.emails) {
    adjusted.emails = fixedCollection.emails.emailFields;
  }
  return adjusted;
}
function adjustProjectIds(fields) {
  if (!fields.project_ids) return fields;
  const adjusted = (0, import_omit.default)(fields, ["project_ids"]);
  adjusted.project_ids = fields.project_ids.includes(",") ? fields.project_ids.split(",") : [fields.project_ids];
  return adjusted;
}
function adjustEmail(fixedCollection) {
  if (!fixedCollection.email) return fixedCollection;
  const adjusted = (0, import_omit.default)(fixedCollection, ["email"]);
  if (fixedCollection.email) {
    adjusted.email = fixedCollection.email.emailFields;
  }
  return adjusted;
}
const adjustCompanyFields = (0, import_flow.default)(adjustAddress, adjustPhoneNumbers);
const adjustLeadFields = (0, import_flow.default)(adjustCompanyFields, adjustEmail);
const adjustPersonFields = (0, import_flow.default)(adjustCompanyFields, adjustEmails);
const adjustTaskFields = (0, import_flow.default)(adjustLeadFields, adjustProjectIds);
async function copperApiRequestAllItems(method, resource, body = {}, qs = {}, uri = "", option = {}) {
  let responseData;
  qs.page_size = 200;
  let totalItems = 0;
  const returnData = [];
  do {
    responseData = await copperApiRequest.call(this, method, resource, body, qs, uri, option);
    totalItems = responseData.headers["x-pw-total"];
    returnData.push(...responseData.body);
  } while (totalItems > returnData.length);
  return returnData;
}
async function handleListing(method, endpoint, qs = {}, body = {}, uri = "") {
  const returnAll = this.getNodeParameter("returnAll", 0);
  const option = { resolveWithFullResponse: true };
  if (returnAll) {
    return await copperApiRequestAllItems.call(this, method, endpoint, body, qs, uri, option);
  }
  const limit = this.getNodeParameter("limit", 0);
  const responseData = await copperApiRequestAllItems.call(
    this,
    method,
    endpoint,
    body,
    qs,
    uri,
    option
  );
  return responseData.slice(0, limit);
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  adjustAddress,
  adjustCompanyFields,
  adjustEmail,
  adjustEmails,
  adjustLeadFields,
  adjustPersonFields,
  adjustPhoneNumbers,
  adjustProjectIds,
  adjustTaskFields,
  copperApiRequest,
  copperApiRequestAllItems,
  getAutomaticSecret,
  handleListing
});
//# sourceMappingURL=GenericFunctions.js.map