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
var get_operation_exports = {};
__export(get_operation_exports, {
  description: () => description,
  execute: () => execute,
  properties: () => properties
});
module.exports = __toCommonJS(get_operation_exports);
var import_utilities = require("../../../../../../utils/utilities");
var import_descriptions = require("../../descriptions");
var import_transport = require("../../transport");
const properties = [import_descriptions.calendarRLC];
const displayOptions = {
  show: {
    resource: ["calendar"],
    operation: ["get"]
  }
};
const description = (0, import_utilities.updateDisplayOptions)(displayOptions, properties);
async function execute(index) {
  const qs = {};
  const calendarId = this.getNodeParameter("calendarId", index, void 0, {
    extractValue: true
  });
  const responseData = await import_transport.microsoftApiRequest.call(
    this,
    "GET",
    `/calendars/${calendarId}`,
    void 0,
    qs
  );
  const executionData = this.helpers.constructExecutionMetaData(
    this.helpers.returnJsonArray(responseData),
    { itemData: { item: index } }
  );
  return executionData;
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  description,
  execute,
  properties
});
//# sourceMappingURL=get.operation.js.map