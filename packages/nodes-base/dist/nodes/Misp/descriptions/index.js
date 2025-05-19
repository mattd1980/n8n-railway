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
__reExport(descriptions_exports, require("./AttributeDescription"), module.exports);
__reExport(descriptions_exports, require("./EventDescription"), module.exports);
__reExport(descriptions_exports, require("./EventTagDescription"), module.exports);
__reExport(descriptions_exports, require("./FeedDescription"), module.exports);
__reExport(descriptions_exports, require("./GalaxyDescription"), module.exports);
__reExport(descriptions_exports, require("./NoticelistDescription"), module.exports);
__reExport(descriptions_exports, require("./ObjectDescription"), module.exports);
__reExport(descriptions_exports, require("./OrganisationDescription"), module.exports);
__reExport(descriptions_exports, require("./TagDescription"), module.exports);
__reExport(descriptions_exports, require("./UserDescription"), module.exports);
__reExport(descriptions_exports, require("./WarninglistDescription"), module.exports);
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  ...require("./AttributeDescription"),
  ...require("./EventDescription"),
  ...require("./EventTagDescription"),
  ...require("./FeedDescription"),
  ...require("./GalaxyDescription"),
  ...require("./NoticelistDescription"),
  ...require("./ObjectDescription"),
  ...require("./OrganisationDescription"),
  ...require("./TagDescription"),
  ...require("./UserDescription"),
  ...require("./WarninglistDescription")
});
//# sourceMappingURL=index.js.map