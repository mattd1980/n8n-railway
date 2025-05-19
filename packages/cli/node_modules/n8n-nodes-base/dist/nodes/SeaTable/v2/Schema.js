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
var Schema_exports = {};
__export(Schema_exports, {
  schema: () => schema
});
module.exports = __toCommonJS(Schema_exports);
const schema = {
  rowFetchSegmentLimit: 1e3,
  dateTimeFormat: "YYYY-MM-DDTHH:mm:ss.SSSZ",
  internalNames: {
    _id: "text",
    _creator: "creator",
    _ctime: "ctime",
    _last_modifier: "last-modifier",
    _mtime: "mtime",
    _seq: "auto-number"
  },
  columnTypes: {
    text: "Text",
    "long-text": "Long Text",
    number: "Number",
    collaborator: "Collaborator",
    date: "Date",
    duration: "Duration",
    "single-select": "Single Select",
    "multiple-select": "Multiple Select",
    image: "Image",
    file: "File",
    email: "Email",
    url: "URL",
    checkbox: "Checkbox",
    rate: "Rating",
    formula: "Formula",
    "link-formula": "Link-Formula",
    geolocation: "Geolocation",
    link: "Link",
    creator: "Creator",
    ctime: "Created time",
    "last-modifier": "Last Modifier",
    mtime: "Last modified time",
    "auto-number": "Auto number",
    button: "Button",
    "digital-sign": "Digital Signature"
  },
  nonUpdateAbleColumnTypes: {
    creator: "creator",
    ctime: "ctime",
    "last-modifier": "last-modifier",
    mtime: "mtime",
    "auto-number": "auto-number",
    button: "button",
    formula: "formula",
    "link-formula": "link-formula",
    link: "link",
    "digital-sign": "digital-sign"
  }
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  schema
});
//# sourceMappingURL=Schema.js.map