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
__reExport(descriptions_exports, require("./AccountDescription"), module.exports);
__reExport(descriptions_exports, require("./ContactDescription"), module.exports);
__reExport(descriptions_exports, require("./DealDescription"), module.exports);
__reExport(descriptions_exports, require("./InvoiceDescription"), module.exports);
__reExport(descriptions_exports, require("./LeadDescription"), module.exports);
__reExport(descriptions_exports, require("./ProductDescription"), module.exports);
__reExport(descriptions_exports, require("./PurchaseOrderDescription"), module.exports);
__reExport(descriptions_exports, require("./QuoteDescription"), module.exports);
__reExport(descriptions_exports, require("./SalesOrderDescription"), module.exports);
__reExport(descriptions_exports, require("./VendorDescription"), module.exports);
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  ...require("./AccountDescription"),
  ...require("./ContactDescription"),
  ...require("./DealDescription"),
  ...require("./InvoiceDescription"),
  ...require("./LeadDescription"),
  ...require("./ProductDescription"),
  ...require("./PurchaseOrderDescription"),
  ...require("./QuoteDescription"),
  ...require("./SalesOrderDescription"),
  ...require("./VendorDescription")
});
//# sourceMappingURL=index.js.map