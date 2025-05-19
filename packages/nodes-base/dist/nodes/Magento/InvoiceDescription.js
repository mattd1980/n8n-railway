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
var InvoiceDescription_exports = {};
__export(InvoiceDescription_exports, {
  invoiceFields: () => invoiceFields,
  invoiceOperations: () => invoiceOperations
});
module.exports = __toCommonJS(InvoiceDescription_exports);
const invoiceOperations = [
  {
    displayName: "Operation",
    name: "operation",
    type: "options",
    noDataExpression: true,
    displayOptions: {
      show: {
        resource: ["invoice"]
      }
    },
    options: [
      {
        name: "Create",
        value: "create",
        description: "Create an invoice",
        action: "Create an invoice"
      }
    ],
    default: "create"
  }
];
const invoiceFields = [
  /* -------------------------------------------------------------------------- */
  /*                                   invoice:create                           */
  /* -------------------------------------------------------------------------- */
  {
    displayName: "Order ID",
    name: "orderId",
    type: "string",
    required: true,
    default: "",
    displayOptions: {
      show: {
        resource: ["invoice"],
        operation: ["create"]
      }
    }
  }
];
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  invoiceFields,
  invoiceOperations
});
//# sourceMappingURL=InvoiceDescription.js.map