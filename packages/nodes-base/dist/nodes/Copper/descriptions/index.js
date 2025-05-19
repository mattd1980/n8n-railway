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
__reExport(descriptions_exports, require("./CompanyDescription"), module.exports);
__reExport(descriptions_exports, require("./CustomerSourceDescription"), module.exports);
__reExport(descriptions_exports, require("./LeadDescription"), module.exports);
__reExport(descriptions_exports, require("./OpportunityDescription"), module.exports);
__reExport(descriptions_exports, require("./PersonDescription"), module.exports);
__reExport(descriptions_exports, require("./ProjectDescription"), module.exports);
__reExport(descriptions_exports, require("./TaskDescription"), module.exports);
__reExport(descriptions_exports, require("./UserDescription"), module.exports);
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  ...require("./CompanyDescription"),
  ...require("./CustomerSourceDescription"),
  ...require("./LeadDescription"),
  ...require("./OpportunityDescription"),
  ...require("./PersonDescription"),
  ...require("./ProjectDescription"),
  ...require("./TaskDescription"),
  ...require("./UserDescription")
});
//# sourceMappingURL=index.js.map