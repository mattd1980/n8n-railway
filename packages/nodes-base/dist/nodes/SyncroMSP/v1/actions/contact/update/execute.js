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
  updateContact: () => updateContact
});
module.exports = __toCommonJS(execute_exports);
var import_transport = require("../../../transport");
async function updateContact(index) {
  const id = this.getNodeParameter("contactId", index);
  const { address, customerId, email, name, notes, phone } = this.getNodeParameter(
    "updateFields",
    index
  );
  const qs = {};
  const requestMethod = "PUT";
  const endpoint = `contacts/${id}`;
  let body = {};
  let addressData = address;
  if (addressData) {
    addressData = addressData.addressFields;
    addressData.address1 = addressData.address;
  }
  body = {
    ...addressData,
    contact_id: id,
    customer_id: customerId,
    email,
    name,
    notes,
    phone
  };
  const responseData = await import_transport.apiRequest.call(this, requestMethod, endpoint, body, qs);
  return this.helpers.returnJsonArray(responseData);
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  updateContact
});
//# sourceMappingURL=execute.js.map