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
__reExport(descriptions_exports, require("./BalanceDescription"), module.exports);
__reExport(descriptions_exports, require("./CustomerCardDescription"), module.exports);
__reExport(descriptions_exports, require("./ChargeDescription"), module.exports);
__reExport(descriptions_exports, require("./CouponDescription"), module.exports);
__reExport(descriptions_exports, require("./CustomerDescription"), module.exports);
__reExport(descriptions_exports, require("./SourceDescription"), module.exports);
__reExport(descriptions_exports, require("./TokenDescription"), module.exports);
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  ...require("./BalanceDescription"),
  ...require("./CustomerCardDescription"),
  ...require("./ChargeDescription"),
  ...require("./CouponDescription"),
  ...require("./CustomerDescription"),
  ...require("./SourceDescription"),
  ...require("./TokenDescription")
});
//# sourceMappingURL=index.js.map