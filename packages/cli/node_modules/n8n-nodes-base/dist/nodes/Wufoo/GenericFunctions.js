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
  wufooApiRequest: () => wufooApiRequest
});
module.exports = __toCommonJS(GenericFunctions_exports);
async function wufooApiRequest(method, resource, body = {}, qs = {}, option = {}) {
  const credentials = await this.getCredentials("wufooApi");
  let options = {
    method,
    form: body,
    body,
    qs,
    uri: `https://${credentials.subdomain}.wufoo.com/api/v3/${resource}`,
    json: true
  };
  options = Object.assign({}, options, option);
  if (Object.keys(options.body).length === 0 || method === "PUT") {
    delete options.body;
  }
  return await this.helpers.requestWithAuthentication.call(this, "wufooApi", options);
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  wufooApiRequest
});
//# sourceMappingURL=GenericFunctions.js.map