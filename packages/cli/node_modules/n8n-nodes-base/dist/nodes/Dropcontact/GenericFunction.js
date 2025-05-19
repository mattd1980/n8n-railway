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
var GenericFunction_exports = {};
__export(GenericFunction_exports, {
  dropcontactApiRequest: () => dropcontactApiRequest,
  mapPairedItemsFrom: () => mapPairedItemsFrom
});
module.exports = __toCommonJS(GenericFunction_exports);
async function dropcontactApiRequest(method, endpoint, body, qs) {
  const options = {
    method,
    uri: `https://api.dropcontact.io${endpoint}`,
    qs,
    body,
    json: true
  };
  if (!Object.keys(body).length) {
    delete options.body;
  }
  if (!Object.keys(qs).length) {
    delete options.qs;
  }
  return await this.helpers.requestWithAuthentication.call(this, "dropcontactApi", options);
}
function mapPairedItemsFrom(iterable) {
  return Array.from(iterable, (_, i) => i).map((index) => {
    return {
      item: index
    };
  });
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  dropcontactApiRequest,
  mapPairedItemsFrom
});
//# sourceMappingURL=GenericFunction.js.map