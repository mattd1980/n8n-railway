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
  LANGUAGES: () => LANGUAGES
});
module.exports = __toCommonJS(constants_exports);
const RAW_LANGUAGES = {
  en: "English",
  ar: "Arabic",
  ca: "Catalan",
  cs: "Czech",
  "cy-GB": "Welsh",
  da: "Danish",
  de: "German",
  es: "Spanish",
  "es-LA": "Spanish (Latin America)",
  et: "Estonian",
  fi: "Finnish",
  fr: "French",
  he: "Hebrew",
  hu: "Hungarian",
  id: "Indonesian",
  it: "Italian",
  "ja-JP": "Japanese",
  ko: "Korean",
  LV: "Latvian",
  "nb-NO": "Norwegian",
  nl: "Dutch",
  pl: "Polish",
  pt: "Portuguese",
  "pt-BR": "Portuguese (Brazil)",
  "pt-PT": "Portuguese (Portugal)",
  "ru-RU": "Russian",
  sk: "Slovak",
  "sk-SK": "Slovak",
  sl: "Slovenian",
  "sv-SE": "Swedish",
  th: "Thai",
  tr: "Turkish",
  UK: "Ukrainian",
  vi: "Vietnamese",
  "zh-CN": "Chinese (Simplified)",
  "zh-TW": "Chinese (Traditional)"
};
const LANGUAGES = Object.keys(RAW_LANGUAGES).map((key) => {
  return { value: key, name: RAW_LANGUAGES[key] };
});
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  LANGUAGES
});
//# sourceMappingURL=constants.js.map