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
  getAll: () => getAll
});
module.exports = __toCommonJS(execute_exports);
var import_change_case = require("change-case");
var import_n8n_workflow = require("n8n-workflow");
var import_transport = require("../../../transport");
async function getAll(index) {
  const returnAll = this.getNodeParameter("returnAll", index);
  const additionalFields = this.getNodeParameter("additionalFields", index);
  const qs = {};
  const requestMethod = "GET";
  const endpoint = "/users";
  const body = {};
  if (additionalFields.inTeam) {
    qs.in_team = additionalFields.inTeam;
  }
  if (additionalFields.notInTeam) {
    qs.not_in_team = additionalFields.notInTeam;
  }
  if (additionalFields.inChannel) {
    qs.in_channel = additionalFields.inChannel;
  }
  if (additionalFields.notInChannel) {
    qs.not_in_channel = additionalFields.notInChannel;
  }
  if (additionalFields.sort) {
    qs.sort = (0, import_change_case.snakeCase)(additionalFields.sort);
  }
  const validRules = {
    inTeam: ["last_activity_at", "created_at", "username"],
    inChannel: ["status", "username"]
  };
  if (additionalFields.sort) {
    if (additionalFields.inTeam !== void 0 || additionalFields.inChannel !== void 0) {
      if (additionalFields.inTeam !== void 0 && !validRules.inTeam.includes((0, import_change_case.snakeCase)(additionalFields.sort))) {
        throw new import_n8n_workflow.NodeOperationError(
          this.getNode(),
          `When In Team is set the only valid values for sorting are ${validRules.inTeam.join(
            ","
          )}`,
          { itemIndex: index }
        );
      }
      if (additionalFields.inChannel !== void 0 && !validRules.inChannel.includes((0, import_change_case.snakeCase)(additionalFields.sort))) {
        throw new import_n8n_workflow.NodeOperationError(
          this.getNode(),
          `When In Channel is set the only valid values for sorting are ${validRules.inChannel.join(
            ","
          )}`,
          { itemIndex: index }
        );
      }
      if (additionalFields.inChannel === "" && additionalFields.sort !== "username") {
        throw new import_n8n_workflow.NodeOperationError(
          this.getNode(),
          "When sort is different than username In Channel must be set",
          { itemIndex: index }
        );
      }
      if (additionalFields.inTeam === "" && additionalFields.sort !== "username") {
        throw new import_n8n_workflow.NodeOperationError(
          this.getNode(),
          "When sort is different than username In Team must be set",
          { itemIndex: index }
        );
      }
    } else {
      throw new import_n8n_workflow.NodeOperationError(
        this.getNode(),
        "When sort is defined either 'in team' or 'in channel' must be defined",
        { itemIndex: index }
      );
    }
  }
  if (additionalFields.sort === "username") {
    qs.sort = "";
  }
  if (!returnAll) {
    qs.per_page = this.getNodeParameter("limit", index);
  }
  let responseData;
  if (returnAll) {
    responseData = await import_transport.apiRequestAllItems.call(this, requestMethod, endpoint, body, qs);
  } else {
    responseData = await import_transport.apiRequest.call(this, requestMethod, endpoint, body, qs);
  }
  return this.helpers.returnJsonArray(responseData);
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  getAll
});
//# sourceMappingURL=execute.js.map