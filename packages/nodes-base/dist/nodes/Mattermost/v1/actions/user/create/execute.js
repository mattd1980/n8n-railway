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
  create: () => create
});
module.exports = __toCommonJS(execute_exports);
var import_transport = require("../../../transport");
async function create(index) {
  const username = this.getNodeParameter("username", index);
  const authService = this.getNodeParameter("authService", index);
  const additionalFields = this.getNodeParameter("additionalFields", index);
  const qs = {};
  const requestMethod = "POST";
  const endpoint = "users";
  const body = {};
  body.auth_service = authService;
  body.username = username;
  Object.assign(body, additionalFields);
  if (body.notificationUi) {
    body.notify_props = body.notificationUi.notificationValues;
  }
  if (authService === "email") {
    body.email = this.getNodeParameter("email", index);
    body.password = this.getNodeParameter("password", index);
  } else {
    body.auth_data = this.getNodeParameter("authData", index);
  }
  const responseData = await import_transport.apiRequest.call(this, requestMethod, endpoint, body, qs);
  return this.helpers.returnJsonArray(responseData);
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  create
});
//# sourceMappingURL=execute.js.map