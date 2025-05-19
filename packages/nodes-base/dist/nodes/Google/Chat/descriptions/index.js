"use strict";
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __reExport = (target, mod, secondTarget) => (__copyProps(target, mod, "default"), secondTarget && __copyProps(secondTarget, mod, "default"));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);
var descriptions_exports = {};
module.exports = __toCommonJS(descriptions_exports);
__reExport(descriptions_exports, require("./AttachmentDescription"), module.exports);
__reExport(descriptions_exports, require("./IncomingWebhookDescription"), module.exports);
__reExport(descriptions_exports, require("./MediaDescription"), module.exports);
__reExport(descriptions_exports, require("./MemberDescription"), module.exports);
__reExport(descriptions_exports, require("./MessageDescription"), module.exports);
__reExport(descriptions_exports, require("./SpaceDescription"), module.exports);
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  ...require("./AttachmentDescription"),
  ...require("./IncomingWebhookDescription"),
  ...require("./MediaDescription"),
  ...require("./MemberDescription"),
  ...require("./MessageDescription"),
  ...require("./SpaceDescription")
});
//# sourceMappingURL=index.js.map