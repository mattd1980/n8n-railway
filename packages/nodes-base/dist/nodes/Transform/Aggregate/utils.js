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
  addBinariesToItem: () => addBinariesToItem
});
module.exports = __toCommonJS(utils_exports);
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
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  addBinariesToItem
});
//# sourceMappingURL=utils.js.map