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
  getSheetHeaderRowWithGeneratedColumnNames: () => getSheetHeaderRowWithGeneratedColumnNames
});
module.exports = __toCommonJS(loadOptions_exports);
var import_loadOptions = require("../../Google/Sheet/v2/methods/loadOptions");
async function getSheetHeaderRowWithGeneratedColumnNames() {
  const returnData = await import_loadOptions.getSheetHeaderRow.call(this);
  return returnData.map((column, i) => {
    if (column.value !== "") return column;
    const indexBasedValue = `col_${i + 1}`;
    return {
      name: indexBasedValue,
      value: indexBasedValue
    };
  });
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  getSheetHeaderRowWithGeneratedColumnNames
});
//# sourceMappingURL=loadOptions.js.map