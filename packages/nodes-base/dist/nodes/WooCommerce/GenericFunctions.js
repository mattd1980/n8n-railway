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
  adjustMetadata: () => adjustMetadata,
  getAutomaticSecret: () => getAutomaticSecret,
  setFields: () => setFields,
  setMetadata: () => setMetadata,
  toSnakeCase: () => toSnakeCase,
  woocommerceApiRequest: () => woocommerceApiRequest,
  woocommerceApiRequestAllItems: () => woocommerceApiRequestAllItems
});
module.exports = __toCommonJS(GenericFunctions_exports);
var import_change_case = require("change-case");
var import_crypto = require("crypto");
var import_omit = __toESM(require("lodash/omit"));
async function woocommerceApiRequest(method, resource, body = {}, qs = {}, uri, option = {}) {
  const credentials = await this.getCredentials("wooCommerceApi");
  let options = {
    method,
    qs,
    body,
    uri: uri || `${credentials.url}/wp-json/wc/v3${resource}`,
    json: true
  };
  if (!Object.keys(body).length) {
    delete options.form;
  }
  options = Object.assign({}, options, option);
  return await this.helpers.requestWithAuthentication.call(this, "wooCommerceApi", options);
}
async function woocommerceApiRequestAllItems(method, endpoint, body = {}, query = {}) {
  const returnData = [];
  let responseData;
  let uri;
  query.per_page = 100;
  do {
    responseData = await woocommerceApiRequest.call(this, method, endpoint, body, query, uri, {
      resolveWithFullResponse: true
    });
    const links = responseData.headers.link.split(",");
    const nextLink = links.find((link) => link.indexOf('rel="next"') !== -1);
    if (nextLink) {
      uri = nextLink.split(";")[0].replace(/<(.*)>/, "$1");
    }
    returnData.push.apply(returnData, responseData.body);
  } while (responseData.headers.link?.includes('rel="next"'));
  return returnData;
}
function getAutomaticSecret(credentials) {
  const data = `${credentials.consumerKey},${credentials.consumerSecret}`;
  return (0, import_crypto.createHash)("md5").update(data).digest("hex");
}
function setMetadata(data) {
  for (let i = 0; i < data.length; i++) {
    if (data[i].metadataUi?.metadataValues) {
      data[i].meta_data = data[i].metadataUi.metadataValues;
      delete data[i].metadataUi;
    } else {
      delete data[i].metadataUi;
    }
  }
}
function toSnakeCase(data) {
  if (!Array.isArray(data)) {
    data = [data];
  }
  let remove = false;
  for (let i = 0; i < data.length; i++) {
    for (const key of Object.keys(data[i])) {
      if (data[i][(0, import_change_case.snakeCase)(key)] === void 0) {
        remove = true;
      }
      data[i][(0, import_change_case.snakeCase)(key)] = data[i][key];
      if (remove) {
        delete data[i][key];
        remove = false;
      }
    }
  }
}
function setFields(fieldsToSet, body) {
  for (const fields in fieldsToSet) {
    if (fields === "tags") {
      body.tags = fieldsToSet[fields].map((tag) => ({ id: parseInt(tag, 10) }));
    } else {
      body[(0, import_change_case.snakeCase)(fields.toString())] = fieldsToSet[fields];
    }
  }
}
function adjustMetadata(fields) {
  if (!fields.meta_data) return fields;
  return {
    ...(0, import_omit.default)(fields, ["meta_data"]),
    meta_data: fields.meta_data.meta_data_fields
  };
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  adjustMetadata,
  getAutomaticSecret,
  setFields,
  setMetadata,
  toSnakeCase,
  woocommerceApiRequest,
  woocommerceApiRequestAllItems
});
//# sourceMappingURL=GenericFunctions.js.map