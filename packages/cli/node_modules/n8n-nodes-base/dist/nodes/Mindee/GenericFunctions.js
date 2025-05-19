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
  cleanData: () => cleanData,
  cleanDataPreviousApiVersions: () => cleanDataPreviousApiVersions,
  mindeeApiRequest: () => mindeeApiRequest
});
module.exports = __toCommonJS(GenericFunctions_exports);
var import_n8n_workflow = require("n8n-workflow");
async function mindeeApiRequest(method, path, body = {}, qs = {}, option = {}) {
  const resource = this.getNodeParameter("resource", 0);
  let service;
  if (resource === "receipt") {
    service = "mindeeReceiptApi";
  } else {
    service = "mindeeInvoiceApi";
  }
  const version = this.getNodeParameter("apiVersion", 0);
  const url = version === 1 ? `https://api.mindee.net/products${path}` : `https://api.mindee.net/v1/products/mindee${path}`;
  const options = {
    headers: {},
    method,
    body,
    qs,
    uri: url,
    json: true
  };
  try {
    if (Object.keys(body).length === 0) {
      delete options.body;
    }
    if (Object.keys(qs).length === 0) {
      delete options.qs;
    }
    if (Object.keys(option).length !== 0) {
      Object.assign(options, option);
    }
    return await this.helpers.requestWithAuthentication.call(this, service, options);
  } catch (error) {
    throw new import_n8n_workflow.NodeApiError(this.getNode(), error);
  }
}
function cleanDataPreviousApiVersions(predictions) {
  const newData = {};
  for (const key of Object.keys(predictions[0])) {
    const data = predictions[0][key];
    if (key === "taxes" && data.length) {
      newData[key] = {
        amount: data[0].amount,
        rate: data[0].rate
      };
    } else if (key === "locale") {
      newData.currency = data.currency;
      newData.locale = data.value;
    } else {
      newData[key] = //@ts-ignore
      data.value || data.name || data.raw || data.degrees || data.amount || data.iban;
    }
  }
  return newData;
}
function cleanData(document) {
  const prediction = document.inference.prediction;
  const newData = {};
  newData.id = document.id;
  newData.name = document.name;
  newData.number_of_pages = document.n_pages;
  for (const key of Object.keys(prediction)) {
    const data = prediction[key];
    if (key === "taxes" && data.length) {
      newData[key] = {
        amount: data[0].amount,
        rate: data[0].rate
      };
    } else if (key === "locale") {
      newData.currency = data.currency;
      newData.locale = data.value;
    } else if (key === "line_items") {
      const lineItems = [];
      for (const lineItem of data) {
        lineItems.push({
          description: lineItem.description,
          product_code: lineItem.product_code,
          quantity: lineItem.quantity,
          tax_amount: lineItem.tax_amount,
          tax_rate: lineItem.tax_rate,
          total_amount: lineItem.total_amount,
          unit_price: lineItem.unit_price
        });
      }
      newData[key] = lineItems;
    } else {
      newData[key] = //@ts-ignore
      data.value || data.name || data.raw || data.degrees || data.amount || data.iban;
    }
  }
  return newData;
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  cleanData,
  cleanDataPreviousApiVersions,
  mindeeApiRequest
});
//# sourceMappingURL=GenericFunctions.js.map