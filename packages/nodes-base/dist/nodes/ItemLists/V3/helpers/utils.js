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
var utils_exports = {};
__export(utils_exports, {
  addBinariesToItem: () => addBinariesToItem,
  prepareFieldsArray: () => prepareFieldsArray,
  sortByCode: () => sortByCode,
  typeToNumber: () => typeToNumber
});
module.exports = __toCommonJS(utils_exports);
var import_vm2 = require("@n8n/vm2");
var import_n8n_workflow = require("n8n-workflow");
const prepareFieldsArray = (fields, fieldName = "Fields") => {
  if (typeof fields === "string") {
    return fields.split(",").map((entry) => entry.trim()).filter((entry) => entry !== "");
  }
  if (Array.isArray(fields)) {
    return fields;
  }
  throw new import_n8n_workflow.ApplicationError(
    `The '${fieldName}' parameter must be a string of fields separated by commas or an array of strings.`,
    { level: "warning" }
  );
};
const returnRegExp = /\breturn\b/g;
function sortByCode(items) {
  const code = this.getNodeParameter("code", 0);
  if (!returnRegExp.test(code)) {
    throw new import_n8n_workflow.NodeOperationError(
      this.getNode(),
      "Sort code doesn't return. Please add a 'return' statement to your code"
    );
  }
  const mode = this.getMode();
  const vm = new import_vm2.NodeVM({
    console: mode === "manual" ? "redirect" : "inherit",
    sandbox: { items }
  });
  return vm.run(`module.exports = items.sort((a, b) => { ${code} })`);
}
const isBinaryUniqueSetup = () => {
  const binaries = [];
  return (binary) => {
    for (const existingBinary of binaries) {
      if (existingBinary.mimeType === binary.mimeType && existingBinary.fileType === binary.fileType && existingBinary.fileSize === binary.fileSize && existingBinary.fileExtension === binary.fileExtension) {
        return false;
      }
    }
    binaries.push({
      mimeType: binary.mimeType,
      fileType: binary.fileType,
      fileSize: binary.fileSize,
      fileExtension: binary.fileExtension
    });
    return true;
  };
};
function addBinariesToItem(newItem, items, uniqueOnly) {
  const isBinaryUnique = uniqueOnly ? isBinaryUniqueSetup() : void 0;
  for (const item of items) {
    if (item.binary === void 0) continue;
    for (const key of Object.keys(item.binary)) {
      if (!newItem.binary) newItem.binary = {};
      let binaryKey = key;
      const binary = item.binary[key];
      if (isBinaryUnique && !isBinaryUnique(binary)) {
        continue;
      }
      let i = 1;
      while (newItem.binary[binaryKey] !== void 0) {
        binaryKey = `${key}_${i}`;
        i++;
      }
      newItem.binary[binaryKey] = binary;
    }
  }
  return newItem;
}
function typeToNumber(value) {
  if (typeof value === "object") {
    if (Array.isArray(value)) return 9;
    if (value === null) return 10;
    if (value instanceof Date) return 11;
  }
  const types = {
    _string: 1,
    _number: 2,
    _bigint: 3,
    _boolean: 4,
    _symbol: 5,
    _undefined: 6,
    _object: 7,
    _function: 8
  };
  return types[`_${typeof value}`];
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  addBinariesToItem,
  prepareFieldsArray,
  sortByCode,
  typeToNumber
});
//# sourceMappingURL=utils.js.map