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
  adjustAccounts: () => adjustAccounts,
  adjustAttendees: () => adjustAttendees,
  freshworksCrmApiRequest: () => freshworksCrmApiRequest,
  freshworksCrmApiRequestAllItems: () => freshworksCrmApiRequestAllItems,
  getAllItemsViewId: () => getAllItemsViewId,
  handleListing: () => handleListing,
  loadResource: () => loadResource,
  throwOnEmptyFilter: () => throwOnEmptyFilter,
  throwOnEmptyUpdate: () => throwOnEmptyUpdate
});
module.exports = __toCommonJS(GenericFunctions_exports);
var import_omit = __toESM(require("lodash/omit"));
var import_n8n_workflow = require("n8n-workflow");
async function freshworksCrmApiRequest(method, endpoint, body = {}, qs = {}) {
  const { domain } = await this.getCredentials("freshworksCrmApi");
  const options = {
    method,
    body,
    qs,
    uri: `https://${domain}.myfreshworks.com/crm/sales/api${endpoint}`,
    json: true
  };
  if (!Object.keys(body).length) {
    delete options.body;
  }
  if (!Object.keys(qs).length) {
    delete options.qs;
  }
  try {
    const credentialsType = "freshworksCrmApi";
    return await this.helpers.requestWithAuthentication.call(this, credentialsType, options);
  } catch (error) {
    throw new import_n8n_workflow.NodeApiError(this.getNode(), error);
  }
}
async function getAllItemsViewId({ fromLoadOptions } = { fromLoadOptions: false }) {
  let resource = this.getNodeParameter("resource", 0);
  let keyword = "All";
  if (resource === "account" || fromLoadOptions) {
    resource = "sales_account";
  }
  if (resource === "deal") {
    keyword = "My Deals";
  }
  const response = await freshworksCrmApiRequest.call(
    this,
    "GET",
    `/${resource}s/filters`
  );
  const view = response.filters.find((v) => v.name.includes(keyword));
  if (!view) {
    throw new import_n8n_workflow.NodeOperationError(this.getNode(), "Failed to get all items view");
  }
  return view.id.toString();
}
async function freshworksCrmApiRequestAllItems(method, endpoint, body = {}, qs = {}) {
  const returnData = [];
  let response;
  qs.page = 1;
  do {
    response = await freshworksCrmApiRequest.call(this, method, endpoint, body, qs);
    const key = Object.keys(response)[0];
    returnData.push(...response[key]);
    qs.page++;
  } while (response.meta.total_pages && qs.page <= response.meta.total_pages);
  return returnData;
}
async function handleListing(method, endpoint, body = {}, qs = {}) {
  const returnAll = this.getNodeParameter("returnAll", 0);
  if (returnAll) {
    return await freshworksCrmApiRequestAllItems.call(this, method, endpoint, body, qs);
  }
  const responseData = await freshworksCrmApiRequestAllItems.call(this, method, endpoint, body, qs);
  const limit = this.getNodeParameter("limit", 0);
  if (limit) return responseData.slice(0, limit);
  return responseData;
}
async function loadResource(resource) {
  const response = await freshworksCrmApiRequest.call(
    this,
    "GET",
    `/selector/${resource}`
  );
  const key = Object.keys(response)[0];
  return response[key].map(({ name, id }) => ({ name, value: id }));
}
function adjustAttendees(attendees) {
  return attendees.map((attendee) => {
    if (attendee.type === "contact") {
      return {
        attendee_type: "Contact",
        attendee_id: attendee.contactId.toString()
      };
    } else if (attendee.type === "user") {
      return {
        attendee_type: "FdMultitenant::User",
        attendee_id: attendee.userId.toString()
      };
    }
  });
}
function adjustAccounts(additionalFields) {
  if (!additionalFields?.sales_accounts) return additionalFields;
  const adjusted = additionalFields.sales_accounts.map((accountId) => {
    return { id: accountId, is_primary: false };
  });
  adjusted[0].is_primary = true;
  return {
    ...(0, import_omit.default)(additionalFields, ["sales_accounts"]),
    sales_accounts: adjusted
  };
}
function throwOnEmptyUpdate(resource) {
  throw new import_n8n_workflow.NodeOperationError(
    this.getNode(),
    `Please enter at least one field to update for the ${resource}.`
  );
}
function throwOnEmptyFilter() {
  throw new import_n8n_workflow.NodeOperationError(this.getNode(), "Please select at least one filter.");
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  adjustAccounts,
  adjustAttendees,
  freshworksCrmApiRequest,
  freshworksCrmApiRequestAllItems,
  getAllItemsViewId,
  handleListing,
  loadResource,
  throwOnEmptyFilter,
  throwOnEmptyUpdate
});
//# sourceMappingURL=GenericFunctions.js.map