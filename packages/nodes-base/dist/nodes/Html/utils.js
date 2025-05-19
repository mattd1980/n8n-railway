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
  getValue: () => getValue
});
module.exports = __toCommonJS(utils_exports);
var import_html_to_text = require("html-to-text");
const extractFunctions = {
  attribute: ($, valueData) => $.attr(valueData.attribute),
  html: ($, _valueData) => $.html() || void 0,
  text: ($, _valueData, nodeVersion) => {
    if (nodeVersion <= 1.1) return $.text() || void 0;
    const html = $.html() || "";
    let options;
    if (_valueData.skipSelectors) {
      options = {
        selectors: _valueData.skipSelectors.split(",").map((s) => ({
          selector: s.trim(),
          format: "skip"
        }))
      };
    }
    return (0, import_html_to_text.convert)(html, options);
  },
  value: ($, _valueData) => $.val()
};
function getValue($, valueData, options, nodeVersion) {
  let value = extractFunctions[valueData.returnValue]($, valueData, nodeVersion);
  if (value === void 0) {
    return value;
  }
  if (options.trimValues) {
    value = value.trim();
  }
  if (options.cleanUpText) {
    value = value.replace(/^\s+|\s+$/g, "").replace(/(\r\n|\n|\r)/gm, "").replace(/\s+/g, " ");
  }
  return value;
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  getValue
});
//# sourceMappingURL=utils.js.map