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
  addGetAllFilterOptions: () => addGetAllFilterOptions,
  adjustAccountPayload: () => adjustAccountPayload,
  adjustContactPayload: () => adjustContactPayload,
  adjustDealPayload: () => adjustDealPayload,
  adjustInvoicePayload: () => adjustInvoicePayload,
  adjustInvoicePayloadOnUpdate: () => adjustInvoicePayloadOnUpdate,
  adjustLeadPayload: () => adjustLeadPayload,
  adjustProductDetails: () => adjustProductDetails,
  adjustProductDetailsOnUpdate: () => adjustProductDetailsOnUpdate,
  adjustProductPayload: () => adjustProductPayload,
  adjustPurchaseOrderPayload: () => adjustPurchaseOrderPayload,
  adjustQuotePayload: () => adjustQuotePayload,
  adjustSalesOrderPayload: () => adjustSalesOrderPayload,
  adjustVendorPayload: () => adjustVendorPayload,
  capitalizeInitial: () => capitalizeInitial,
  getFields: () => getFields,
  getModuleName: () => getModuleName,
  getPicklistOptions: () => getPicklistOptions,
  handleListing: () => handleListing,
  throwOnEmptyUpdate: () => throwOnEmptyUpdate,
  throwOnErrorStatus: () => throwOnErrorStatus,
  throwOnMissingProducts: () => throwOnMissingProducts,
  toLoadOptions: () => toLoadOptions,
  zohoApiRequest: () => zohoApiRequest,
  zohoApiRequestAllItems: () => zohoApiRequestAllItems
});
module.exports = __toCommonJS(GenericFunctions_exports);
var import_flow = __toESM(require("lodash/flow"));
var import_sortBy = __toESM(require("lodash/sortBy"));
var import_n8n_workflow = require("n8n-workflow");
function throwOnErrorStatus(responseData) {
  if (responseData?.data?.[0].status === "error") {
    throw new import_n8n_workflow.NodeOperationError(this.getNode(), responseData);
  }
}
async function zohoApiRequest(method, endpoint, body = {}, qs = {}, uri) {
  const { oauthTokenData } = await this.getCredentials("zohoOAuth2Api");
  const options = {
    body: {
      data: [body]
    },
    method,
    qs,
    uri: uri || `${oauthTokenData.api_domain}/crm/v2${endpoint}`,
    json: true
  };
  if (!Object.keys(body).length) {
    delete options.body;
  }
  if (!Object.keys(qs).length) {
    delete options.qs;
  }
  try {
    const responseData = await this.helpers.requestOAuth2?.call(this, "zohoOAuth2Api", options);
    if (responseData === void 0) return [];
    throwOnErrorStatus.call(this, responseData);
    return responseData;
  } catch (error) {
    const args = error.cause?.data ? {
      message: error.cause.data.message || "The Zoho API returned an error.",
      description: JSON.stringify(error.cause.data, null, 2)
    } : void 0;
    throw new import_n8n_workflow.NodeApiError(this.getNode(), error, args);
  }
}
async function zohoApiRequestAllItems(method, endpoint, body = {}, qs = {}) {
  const returnData = [];
  let responseData;
  qs.per_page = 200;
  qs.page = 1;
  do {
    responseData = await zohoApiRequest.call(this, method, endpoint, body, qs);
    if (Array.isArray(responseData) && !responseData.length) return returnData;
    returnData.push(...responseData.data);
    qs.page++;
  } while (responseData.info.more_records !== void 0 && responseData.info.more_records === true);
  return returnData;
}
async function handleListing(method, endpoint, body = {}, qs = {}) {
  const returnAll = this.getNodeParameter("returnAll", 0);
  if (returnAll) {
    return await zohoApiRequestAllItems.call(this, method, endpoint, body, qs);
  }
  const responseData = await zohoApiRequestAllItems.call(this, method, endpoint, body, qs);
  const limit = this.getNodeParameter("limit", 0);
  return responseData.slice(0, limit);
}
function throwOnEmptyUpdate(resource) {
  throw new import_n8n_workflow.NodeOperationError(
    this.getNode(),
    `Please enter at least one field to update for the ${resource}.`
  );
}
function throwOnMissingProducts(resource, productDetails) {
  if (!productDetails.length) {
    throw new import_n8n_workflow.NodeOperationError(
      this.getNode(),
      `Please enter at least one product for the ${resource}.`
    );
  }
}
const omit = (propertyToOmit, { [propertyToOmit]: _, ...remainingObject }) => remainingObject;
const adjustProductDetails = (productDetails, operation) => {
  return productDetails.map((p) => {
    const adjustedProduct = {
      product: { id: p.id },
      quantity: p.quantity || 1
    };
    if (operation === "upsert") {
      return { ...adjustedProduct, ...omit("id", p) };
    } else {
      return { ...adjustedProduct, ...omit("product", p) };
    }
  });
};
const adjustProductDetailsOnUpdate = (allFields) => {
  if (!allFields.Product_Details) return allFields;
  return allFields.Product_Details.map((p) => {
    return {
      ...omit("product", p),
      product: { id: p.id },
      quantity: p.quantity || 1
    };
  });
};
const adjustLocationFields = (locationType) => (allFields) => {
  const locationField = allFields[locationType];
  if (!locationField) return allFields;
  return {
    ...omit(locationType, allFields),
    ...locationField.address_fields
  };
};
const adjustAddressFields = adjustLocationFields("Address");
const adjustBillingAddressFields = adjustLocationFields("Billing_Address");
const adjustMailingAddressFields = adjustLocationFields("Mailing_Address");
const adjustShippingAddressFields = adjustLocationFields("Shipping_Address");
const adjustOtherAddressFields = adjustLocationFields("Other_Address");
const adjustDateField = (dateType) => (allFields) => {
  const dateField = allFields[dateType];
  if (!dateField) return allFields;
  allFields[dateType] = dateField.split("T")[0];
  return allFields;
};
const adjustDateOfBirthField = adjustDateField("Date_of_Birth");
const adjustClosingDateField = adjustDateField("Closing_Date");
const adjustInvoiceDateField = adjustDateField("Invoice_Date");
const adjustDueDateField = adjustDateField("Due_Date");
const adjustPurchaseOrderDateField = adjustDateField("PO_Date");
const adjustValidTillField = adjustDateField("Valid_Till");
const adjustIdField = (idType, nameProperty) => (allFields) => {
  const idValue = allFields[idType];
  if (!idValue) return allFields;
  return {
    ...omit(idType, allFields),
    [nameProperty]: { id: idValue }
  };
};
const adjustAccountIdField = adjustIdField("accountId", "Account_Name");
const adjustContactIdField = adjustIdField("contactId", "Full_Name");
const adjustDealIdField = adjustIdField("dealId", "Deal_Name");
const adjustCustomFields = (allFields) => {
  const { customFields, ...rest } = allFields;
  if (!customFields?.customFields.length) return allFields;
  return customFields.customFields.reduce((acc, cur) => {
    acc[cur.fieldId] = cur.value;
    return acc;
  }, rest);
};
const adjustAccountPayload = (0, import_flow.default)(
  adjustBillingAddressFields,
  adjustShippingAddressFields,
  adjustCustomFields
);
const adjustContactPayload = (0, import_flow.default)(
  adjustMailingAddressFields,
  adjustOtherAddressFields,
  adjustDateOfBirthField,
  adjustCustomFields
);
const adjustDealPayload = (0, import_flow.default)(adjustClosingDateField, adjustCustomFields);
const adjustInvoicePayload = (0, import_flow.default)(
  adjustBillingAddressFields,
  adjustShippingAddressFields,
  adjustInvoiceDateField,
  adjustDueDateField,
  adjustAccountIdField,
  adjustCustomFields
);
const adjustInvoicePayloadOnUpdate = (0, import_flow.default)(
  adjustInvoicePayload,
  adjustProductDetailsOnUpdate
);
const adjustLeadPayload = (0, import_flow.default)(adjustAddressFields, adjustCustomFields);
const adjustPurchaseOrderPayload = (0, import_flow.default)(
  adjustBillingAddressFields,
  adjustShippingAddressFields,
  adjustDueDateField,
  adjustPurchaseOrderDateField,
  adjustCustomFields
);
const adjustQuotePayload = (0, import_flow.default)(
  adjustBillingAddressFields,
  adjustShippingAddressFields,
  adjustValidTillField,
  adjustCustomFields
);
const adjustSalesOrderPayload = (0, import_flow.default)(
  adjustBillingAddressFields,
  adjustShippingAddressFields,
  adjustDueDateField,
  adjustAccountIdField,
  adjustContactIdField,
  adjustDealIdField,
  adjustCustomFields
);
const adjustVendorPayload = (0, import_flow.default)(adjustAddressFields, adjustCustomFields);
const adjustProductPayload = adjustCustomFields;
const toLoadOptions = (items, nameProperty) => items.map((item) => ({ name: item[nameProperty], value: item.id }));
function getModuleName(resource) {
  const map = {
    account: "Accounts",
    contact: "Contacts",
    deal: "Deals",
    invoice: "Invoices",
    lead: "Leads",
    product: "Products",
    purchaseOrder: "Purchase_Orders",
    salesOrder: "Sales_Orders",
    vendor: "Vendors",
    quote: "Quotes"
  };
  return map[resource];
}
async function getFields(resource, { onlyCustom } = { onlyCustom: false }) {
  const qs = { module: getModuleName(resource) };
  let { fields } = await zohoApiRequest.call(
    this,
    "GET",
    "/settings/fields",
    {},
    qs
  );
  if (onlyCustom) {
    fields = fields.filter(({ custom_field }) => custom_field);
  }
  const options = fields.map(({ field_label, api_name }) => ({
    name: field_label,
    value: api_name
  }));
  return (0, import_sortBy.default)(options, (o) => o.name);
}
const capitalizeInitial = (str) => str[0].toUpperCase() + str.slice(1);
function getSectionApiName(resource) {
  if (resource === "purchaseOrder") return "Purchase Order Information";
  if (resource === "salesOrder") return "Sales Order Information";
  return `${capitalizeInitial(resource)} Information`;
}
async function getPicklistOptions(resource, targetField) {
  const qs = { module: getModuleName(resource) };
  const responseData = await zohoApiRequest.call(
    this,
    "GET",
    "/settings/layouts",
    {},
    qs
  );
  const pickListOptions = responseData.layouts[0].sections.find((section) => section.api_name === getSectionApiName(resource))?.fields.find((f) => f.api_name === targetField)?.pick_list_values;
  if (!pickListOptions) return [];
  return pickListOptions.map((option) => ({
    name: option.display_value,
    value: option.actual_value
  }));
}
const addGetAllFilterOptions = (qs, options) => {
  if (Object.keys(options).length) {
    const { fields, ...rest } = options;
    Object.assign(qs, fields && { fields: fields.join(",") }, rest);
  }
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  addGetAllFilterOptions,
  adjustAccountPayload,
  adjustContactPayload,
  adjustDealPayload,
  adjustInvoicePayload,
  adjustInvoicePayloadOnUpdate,
  adjustLeadPayload,
  adjustProductDetails,
  adjustProductDetailsOnUpdate,
  adjustProductPayload,
  adjustPurchaseOrderPayload,
  adjustQuotePayload,
  adjustSalesOrderPayload,
  adjustVendorPayload,
  capitalizeInitial,
  getFields,
  getModuleName,
  getPicklistOptions,
  handleListing,
  throwOnEmptyUpdate,
  throwOnErrorStatus,
  throwOnMissingProducts,
  toLoadOptions,
  zohoApiRequest,
  zohoApiRequestAllItems
});
//# sourceMappingURL=GenericFunctions.js.map