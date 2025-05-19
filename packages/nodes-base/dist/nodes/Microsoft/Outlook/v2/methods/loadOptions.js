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
var loadOptions_exports = {};
__export(loadOptions_exports, {
  getCalendarGroups: () => getCalendarGroups,
  getCategoriesNames: () => getCategoriesNames,
  getFolders: () => getFolders
});
module.exports = __toCommonJS(loadOptions_exports);
var import_transport = require("../transport");
async function getCategoriesNames() {
  const returnData = [];
  const categories = await import_transport.microsoftApiRequestAllItems.call(
    this,
    "value",
    "GET",
    "/outlook/masterCategories"
  );
  for (const category of categories) {
    returnData.push({
      name: category.displayName,
      value: category.displayName
    });
  }
  return returnData;
}
async function getFolders() {
  const returnData = [];
  const response = await import_transport.microsoftApiRequestAllItems.call(this, "value", "GET", "/mailFolders", {});
  const folders = await import_transport.getSubfolders.call(this, response);
  for (const folder of folders) {
    returnData.push({
      name: folder.displayName,
      value: folder.id
    });
  }
  return returnData;
}
async function getCalendarGroups() {
  const returnData = [];
  const calendars = await import_transport.microsoftApiRequestAllItems.call(
    this,
    "value",
    "GET",
    "/calendarGroups",
    {}
  );
  for (const calendar of calendars) {
    returnData.push({
      name: calendar.name,
      value: calendar.id
    });
  }
  return returnData;
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  getCalendarGroups,
  getCategoriesNames,
  getFolders
});
//# sourceMappingURL=loadOptions.js.map