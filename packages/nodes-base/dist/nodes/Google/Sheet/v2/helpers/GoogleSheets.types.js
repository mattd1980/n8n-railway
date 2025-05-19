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
var GoogleSheets_types_exports = {};
__export(GoogleSheets_types_exports, {
  ROW_NUMBER: () => ROW_NUMBER,
  ResourceLocatorUiNames: () => ResourceLocatorUiNames
});
module.exports = __toCommonJS(GoogleSheets_types_exports);
const ROW_NUMBER = "row_number";
const ResourceLocatorUiNames = {
  id: "By ID",
  url: "By URL",
  list: "From List",
  name: "By Name"
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  ROW_NUMBER,
  ResourceLocatorUiNames
});
//# sourceMappingURL=GoogleSheets.types.js.map