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
var constants_exports = {};
__export(constants_exports, {
  GOOGLE_DRIVE_FILE_URL_REGEX: () => GOOGLE_DRIVE_FILE_URL_REGEX,
  GOOGLE_DRIVE_FOLDER_URL_REGEX: () => GOOGLE_DRIVE_FOLDER_URL_REGEX,
  GOOGLE_SHEETS_SHEET_URL_REGEX: () => GOOGLE_SHEETS_SHEET_URL_REGEX
});
module.exports = __toCommonJS(constants_exports);
const GOOGLE_DRIVE_FILE_URL_REGEX = "https:\\/\\/(?:drive|docs)\\.google\\.com(?:\\/.*|)\\/d\\/([0-9a-zA-Z\\-_]+)(?:\\/.*|)";
const GOOGLE_DRIVE_FOLDER_URL_REGEX = "https:\\/\\/drive\\.google\\.com(?:\\/.*|)\\/folders\\/([0-9a-zA-Z\\-_]+)(?:\\/.*|)";
const GOOGLE_SHEETS_SHEET_URL_REGEX = "https:\\/\\/docs\\.google\\.com\\/spreadsheets\\/d\\/[0-9a-zA-Z\\-_]+.*\\#gid=([0-9]+)";
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  GOOGLE_DRIVE_FILE_URL_REGEX,
  GOOGLE_DRIVE_FOLDER_URL_REGEX,
  GOOGLE_SHEETS_SHEET_URL_REGEX
});
//# sourceMappingURL=constants.js.map