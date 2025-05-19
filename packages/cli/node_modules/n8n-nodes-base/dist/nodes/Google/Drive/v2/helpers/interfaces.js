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
var interfaces_exports = {};
__export(interfaces_exports, {
  DRIVE: () => DRIVE,
  RLC_DRIVE_DEFAULT: () => RLC_DRIVE_DEFAULT,
  RLC_FOLDER_DEFAULT: () => RLC_FOLDER_DEFAULT,
  UPLOAD_CHUNK_SIZE: () => UPLOAD_CHUNK_SIZE
});
module.exports = __toCommonJS(interfaces_exports);
const UPLOAD_CHUNK_SIZE = 256 * 1024;
const RLC_DRIVE_DEFAULT = "My Drive";
const RLC_FOLDER_DEFAULT = "root";
const DRIVE = {
  FOLDER: "application/vnd.google-apps.folder",
  AUDIO: "application/vnd.google-apps.audio",
  DOCUMENT: "application/vnd.google-apps.document",
  SDK: "application/vnd.google-apps.drive-sdk",
  DRAWING: "application/vnd.google-apps.drawing",
  FILE: "application/vnd.google-apps.file",
  FORM: "application/vnd.google-apps.form",
  FUSIONTABLE: "application/vnd.google-apps.fusiontable",
  MAP: "application/vnd.google-apps.map",
  PHOTO: "application/vnd.google-apps.photo",
  PRESENTATION: "application/vnd.google-apps.presentation",
  APP_SCRIPTS: "application/vnd.google-apps.script",
  SITES: "application/vnd.google-apps.sites",
  SPREADSHEET: "application/vnd.google-apps.spreadsheet",
  UNKNOWN: "application/vnd.google-apps.unknown",
  VIDEO: "application/vnd.google-apps.video"
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  DRIVE,
  RLC_DRIVE_DEFAULT,
  RLC_FOLDER_DEFAULT,
  UPLOAD_CHUNK_SIZE
});
//# sourceMappingURL=interfaces.js.map