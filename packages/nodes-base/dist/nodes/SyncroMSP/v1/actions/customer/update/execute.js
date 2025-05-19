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
var execute_exports = {};
__export(execute_exports, {
  updateCustomer: () => updateCustomer
});
module.exports = __toCommonJS(execute_exports);
var import_n8n_workflow = require("n8n-workflow");
var import_transport = require("../../../transport");
async function updateCustomer(index) {
  const id = this.getNodeParameter("customerId", index);
  const {
    address,
    businessName,
    email,
    firstName,
    getSms,
    invoiceCcEmails,
    lastName,
    noEmail,
    notes,
    notificationEmail,
    phone,
    referredBy
  } = this.getNodeParameter("updateFields", index);
  const qs = {};
  const requestMethod = "PUT";
  const endpoint = `customers/${id}`;
  let body = {};
  let addressData = address;
  if (addressData) {
    addressData = addressData.addressFields;
    addressData.address_2 = addressData.address2;
  }
  body = {
    ...addressData,
    business_name: businessName,
    email,
    firstname: firstName,
    get_sms: getSms,
    invoice_cc_emails: (invoiceCcEmails || []).join(","),
    lastname: lastName,
    no_email: noEmail,
    notes,
    notification_email: notificationEmail,
    phone,
    referred_by: referredBy
  };
  const responseData = await import_transport.apiRequest.call(this, requestMethod, endpoint, body, qs);
  if (!responseData.customer) {
    throw new import_n8n_workflow.NodeApiError(this.getNode(), responseData, {
      httpCode: "404",
      message: "Customer ID not found"
    });
  }
  return this.helpers.returnJsonArray(responseData.customer);
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  updateCustomer
});
//# sourceMappingURL=execute.js.map