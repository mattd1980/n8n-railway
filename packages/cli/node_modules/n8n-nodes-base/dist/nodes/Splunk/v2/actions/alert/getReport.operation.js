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
var getReport_operation_exports = {};
__export(getReport_operation_exports, {
  description: () => description,
  execute: () => execute
});
module.exports = __toCommonJS(getReport_operation_exports);
var import_utilities = require("../../../../../utils/utilities");
var import_transport = require("../../transport");
const properties = [];
const displayOptions = {
  show: {
    resource: ["alert"],
    operation: ["getReport"]
  }
};
const description = (0, import_utilities.updateDisplayOptions)(displayOptions, properties);
async function execute(_i) {
  const endpoint = "/services/alerts/fired_alerts";
  const returnData = await import_transport.splunkApiJsonRequest.call(this, "GET", endpoint);
  return returnData;
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  description,
  execute
});
//# sourceMappingURL=getReport.operation.js.map