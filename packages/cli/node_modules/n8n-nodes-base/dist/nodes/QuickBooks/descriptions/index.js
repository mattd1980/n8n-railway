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
__reExport(descriptions_exports, require("./Bill/BillDescription"), module.exports);
__reExport(descriptions_exports, require("./Customer/CustomerDescription"), module.exports);
__reExport(descriptions_exports, require("./Employee/EmployeeDescription"), module.exports);
__reExport(descriptions_exports, require("./Estimate/EstimateDescription"), module.exports);
__reExport(descriptions_exports, require("./Invoice/InvoiceDescription"), module.exports);
__reExport(descriptions_exports, require("./Item/ItemDescription"), module.exports);
__reExport(descriptions_exports, require("./Payment/PaymentDescription"), module.exports);
__reExport(descriptions_exports, require("./Vendor/VendorDescription"), module.exports);
__reExport(descriptions_exports, require("./Purchase/PurchaseDescription"), module.exports);
__reExport(descriptions_exports, require("./Transaction/TransactionDescription"), module.exports);
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  ...require("./Bill/BillDescription"),
  ...require("./Customer/CustomerDescription"),
  ...require("./Employee/EmployeeDescription"),
  ...require("./Estimate/EstimateDescription"),
  ...require("./Invoice/InvoiceDescription"),
  ...require("./Item/ItemDescription"),
  ...require("./Payment/PaymentDescription"),
  ...require("./Vendor/VendorDescription"),
  ...require("./Purchase/PurchaseDescription"),
  ...require("./Transaction/TransactionDescription")
});
//# sourceMappingURL=index.js.map