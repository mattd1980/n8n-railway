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
  blockUrlExtractionRegexp: () => blockUrlExtractionRegexp,
  blockUrlValidationRegexp: () => blockUrlValidationRegexp,
  databasePageUrlExtractionRegexp: () => databasePageUrlExtractionRegexp,
  databasePageUrlValidationRegexp: () => databasePageUrlValidationRegexp,
  databaseUrlExtractionRegexp: () => databaseUrlExtractionRegexp,
  databaseUrlValidationRegexp: () => databaseUrlValidationRegexp,
  idExtractionRegexp: () => idExtractionRegexp,
  idValidationRegexp: () => idValidationRegexp
});
module.exports = __toCommonJS(constants_exports);
const notionIdRegexp = "[0-9a-f]{8}-?[0-9a-f]{4}-?[0-9a-f]{4}-?[0-9a-f]{4}-?[0-9a-f]{12}";
const idExtractionRegexp = `^(${notionIdRegexp})`;
const idValidationRegexp = `${idExtractionRegexp}.*`;
const baseUrlRegexp = "(?:https|http)://www\\.notion\\.so/(?:[a-z0-9-]{2,}/)?";
const databaseUrlExtractionRegexp = `${baseUrlRegexp}(${notionIdRegexp})`;
const databaseUrlValidationRegexp = `${databaseUrlExtractionRegexp}.*`;
const databasePageUrlExtractionRegexp = `${baseUrlRegexp}(?:[a-zA-Z0-9-]{1,}-)?(${notionIdRegexp})`;
const databasePageUrlValidationRegexp = `${databasePageUrlExtractionRegexp}.*`;
const blockUrlExtractionRegexp = `${baseUrlRegexp}(?:[a-zA-Z0-9-]{2,}-)?(${notionIdRegexp})`;
const blockUrlValidationRegexp = `${blockUrlExtractionRegexp}.*`;
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  blockUrlExtractionRegexp,
  blockUrlValidationRegexp,
  databasePageUrlExtractionRegexp,
  databasePageUrlValidationRegexp,
  databaseUrlExtractionRegexp,
  databaseUrlValidationRegexp,
  idExtractionRegexp,
  idValidationRegexp
});
//# sourceMappingURL=constants.js.map