"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
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
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);
var QuickBooks_node_exports = {};
__export(QuickBooks_node_exports, {
  QuickBooks: () => QuickBooks
});
module.exports = __toCommonJS(QuickBooks_node_exports);
var import_change_case = require("change-case");
var import_isEmpty = __toESM(require("lodash/isEmpty"));
var import_n8n_workflow = require("n8n-workflow");
var import_descriptions = require("./descriptions");
var import_GenericFunctions = require("./GenericFunctions");
class QuickBooks {
  constructor() {
    this.description = {
      displayName: "QuickBooks Online",
      name: "quickbooks",
      icon: "file:quickbooks.svg",
      group: ["transform"],
      version: 1,
      subtitle: '={{$parameter["operation"] + ": " + $parameter["resource"]}}',
      description: "Consume the QuickBooks Online API",
      defaults: {
        name: "QuickBooks Online"
      },
      usableAsTool: true,
      inputs: [import_n8n_workflow.NodeConnectionTypes.Main],
      outputs: [import_n8n_workflow.NodeConnectionTypes.Main],
      credentials: [
        {
          name: "quickBooksOAuth2Api",
          required: true
        }
      ],
      properties: [
        {
          displayName: "Resource",
          name: "resource",
          type: "options",
          noDataExpression: true,
          options: [
            {
              name: "Bill",
              value: "bill"
            },
            {
              name: "Customer",
              value: "customer"
            },
            {
              name: "Employee",
              value: "employee"
            },
            {
              name: "Estimate",
              value: "estimate"
            },
            {
              name: "Invoice",
              value: "invoice"
            },
            {
              name: "Item",
              value: "item"
            },
            {
              name: "Payment",
              value: "payment"
            },
            {
              name: "Purchase",
              value: "purchase"
            },
            {
              name: "Transaction",
              value: "transaction"
            },
            {
              name: "Vendor",
              value: "vendor"
            }
          ],
          default: "customer"
        },
        ...import_descriptions.billOperations,
        ...import_descriptions.billFields,
        ...import_descriptions.customerOperations,
        ...import_descriptions.customerFields,
        ...import_descriptions.employeeOperations,
        ...import_descriptions.employeeFields,
        ...import_descriptions.estimateOperations,
        ...import_descriptions.estimateFields,
        ...import_descriptions.invoiceOperations,
        ...import_descriptions.invoiceFields,
        ...import_descriptions.itemOperations,
        ...import_descriptions.itemFields,
        ...import_descriptions.paymentOperations,
        ...import_descriptions.paymentFields,
        ...import_descriptions.purchaseOperations,
        ...import_descriptions.purchaseFields,
        ...import_descriptions.transactionOperations,
        ...import_descriptions.transactionFields,
        ...import_descriptions.vendorOperations,
        ...import_descriptions.vendorFields
      ]
    };
    this.methods = {
      loadOptions: {
        async getCustomers() {
          return await import_GenericFunctions.loadResource.call(this, "customer");
        },
        async getCustomFields() {
          return await import_GenericFunctions.loadResource.call(this, "preferences");
        },
        async getDepartments() {
          return await import_GenericFunctions.loadResource.call(this, "department");
        },
        async getItems() {
          return await import_GenericFunctions.loadResource.call(this, "item");
        },
        async getMemos() {
          return await import_GenericFunctions.loadResource.call(this, "CreditMemo");
        },
        async getPurchases() {
          return await import_GenericFunctions.loadResource.call(this, "purchase");
        },
        async getTaxCodeRefs() {
          return await import_GenericFunctions.loadResource.call(this, "TaxCode");
        },
        async getTerms() {
          return await import_GenericFunctions.loadResource.call(this, "Term");
        },
        async getVendors() {
          return await import_GenericFunctions.loadResource.call(this, "vendor");
        }
      }
    };
  }
  async execute() {
    const items = this.getInputData();
    const resource = this.getNodeParameter("resource", 0);
    const operation = this.getNodeParameter("operation", 0);
    let responseData;
    const returnData = [];
    const { oauthTokenData } = await this.getCredentials("quickBooksOAuth2Api");
    const companyId = oauthTokenData.callbackQueryString.realmId;
    for (let i = 0; i < items.length; i++) {
      try {
        if (resource === "bill") {
          if (operation === "create") {
            const lines = this.getNodeParameter("Line", i);
            if (!lines.length) {
              throw new import_n8n_workflow.NodeOperationError(
                this.getNode(),
                `Please enter at least one line for the ${resource}.`,
                { itemIndex: i }
              );
            }
            if (lines.some(
              (line) => line.DetailType === void 0 || line.Amount === void 0 || line.Description === void 0
            )) {
              throw new import_n8n_workflow.NodeOperationError(
                this.getNode(),
                "Please enter detail type, amount and description for every line.",
                { itemIndex: i }
              );
            }
            lines.forEach((line) => {
              if (line.DetailType === "AccountBasedExpenseLineDetail" && line.accountId === void 0) {
                throw new import_n8n_workflow.NodeOperationError(
                  this.getNode(),
                  "Please enter an account ID for the associated line.",
                  { itemIndex: i }
                );
              } else if (line.DetailType === "ItemBasedExpenseLineDetail" && line.itemId === void 0) {
                throw new import_n8n_workflow.NodeOperationError(
                  this.getNode(),
                  "Please enter an item ID for the associated line.",
                  { itemIndex: i }
                );
              }
            });
            let body = {
              VendorRef: {
                value: this.getNodeParameter("VendorRef", i)
              }
            };
            body.Line = import_GenericFunctions.processLines.call(this, lines, resource);
            const additionalFields = this.getNodeParameter("additionalFields", i);
            body = import_GenericFunctions.populateFields.call(this, body, additionalFields, resource);
            const endpoint = `/v3/company/${companyId}/${resource}`;
            responseData = await import_GenericFunctions.quickBooksApiRequest.call(this, "POST", endpoint, {}, body);
            responseData = responseData[(0, import_change_case.capitalCase)(resource)];
          } else if (operation === "delete") {
            const qs = {
              operation: "delete"
            };
            const body = {
              Id: this.getNodeParameter("billId", i),
              SyncToken: await import_GenericFunctions.getSyncToken.call(this, i, companyId, resource)
            };
            const endpoint = `/v3/company/${companyId}/${resource}`;
            responseData = await import_GenericFunctions.quickBooksApiRequest.call(this, "POST", endpoint, qs, body);
            responseData = responseData[(0, import_change_case.capitalCase)(resource)];
          } else if (operation === "get") {
            const billId = this.getNodeParameter("billId", i);
            const endpoint = `/v3/company/${companyId}/${resource}/${billId}`;
            responseData = await import_GenericFunctions.quickBooksApiRequest.call(this, "GET", endpoint, {}, {});
            responseData = responseData[(0, import_change_case.capitalCase)(resource)];
          } else if (operation === "getAll") {
            const endpoint = `/v3/company/${companyId}/query`;
            responseData = await import_GenericFunctions.handleListing.call(this, i, endpoint, resource);
          } else if (operation === "update") {
            const { ref, syncToken } = await import_GenericFunctions.getRefAndSyncToken.call(
              this,
              i,
              companyId,
              resource,
              "VendorRef"
            );
            let body = {
              Id: this.getNodeParameter("billId", i),
              SyncToken: syncToken,
              sparse: true,
              VendorRef: {
                name: ref.name,
                value: ref.value
              }
            };
            const updateFields = this.getNodeParameter("updateFields", i);
            if ((0, import_isEmpty.default)(updateFields)) {
              throw new import_n8n_workflow.NodeOperationError(
                this.getNode(),
                `Please enter at least one field to update for the ${resource}.`,
                { itemIndex: i }
              );
            }
            body = import_GenericFunctions.populateFields.call(this, body, updateFields, resource);
            const endpoint = `/v3/company/${companyId}/${resource}`;
            responseData = await import_GenericFunctions.quickBooksApiRequest.call(this, "POST", endpoint, {}, body);
            responseData = responseData[(0, import_change_case.capitalCase)(resource)];
          }
        } else if (resource === "customer") {
          if (operation === "create") {
            let body = {
              DisplayName: this.getNodeParameter("displayName", i)
            };
            const additionalFields = this.getNodeParameter("additionalFields", i);
            body = import_GenericFunctions.populateFields.call(this, body, additionalFields, resource);
            const endpoint = `/v3/company/${companyId}/${resource}`;
            responseData = await import_GenericFunctions.quickBooksApiRequest.call(this, "POST", endpoint, {}, body);
            responseData = responseData[(0, import_change_case.capitalCase)(resource)];
          } else if (operation === "get") {
            const customerId = this.getNodeParameter("customerId", i);
            const endpoint = `/v3/company/${companyId}/${resource}/${customerId}`;
            responseData = await import_GenericFunctions.quickBooksApiRequest.call(this, "GET", endpoint, {}, {});
            responseData = responseData[(0, import_change_case.capitalCase)(resource)];
          } else if (operation === "getAll") {
            const endpoint = `/v3/company/${companyId}/query`;
            responseData = await import_GenericFunctions.handleListing.call(this, i, endpoint, resource);
          } else if (operation === "update") {
            let body = {
              Id: this.getNodeParameter("customerId", i),
              SyncToken: await import_GenericFunctions.getSyncToken.call(this, i, companyId, resource),
              sparse: true
            };
            const updateFields = this.getNodeParameter("updateFields", i);
            if ((0, import_isEmpty.default)(updateFields)) {
              throw new import_n8n_workflow.NodeOperationError(
                this.getNode(),
                `Please enter at least one field to update for the ${resource}.`,
                { itemIndex: i }
              );
            }
            body = import_GenericFunctions.populateFields.call(this, body, updateFields, resource);
            const endpoint = `/v3/company/${companyId}/${resource}`;
            responseData = await import_GenericFunctions.quickBooksApiRequest.call(this, "POST", endpoint, {}, body);
            responseData = responseData[(0, import_change_case.capitalCase)(resource)];
          }
        } else if (resource === "employee") {
          if (operation === "create") {
            let body = {
              FamilyName: this.getNodeParameter("FamilyName", i),
              GivenName: this.getNodeParameter("GivenName", i)
            };
            const additionalFields = this.getNodeParameter("additionalFields", i);
            body = import_GenericFunctions.populateFields.call(this, body, additionalFields, resource);
            const endpoint = `/v3/company/${companyId}/${resource}`;
            responseData = await import_GenericFunctions.quickBooksApiRequest.call(this, "POST", endpoint, {}, body);
            responseData = responseData[(0, import_change_case.capitalCase)(resource)];
          } else if (operation === "get") {
            const employeeId = this.getNodeParameter("employeeId", i);
            const endpoint = `/v3/company/${companyId}/${resource}/${employeeId}`;
            responseData = await import_GenericFunctions.quickBooksApiRequest.call(this, "GET", endpoint, {}, {});
            responseData = responseData[(0, import_change_case.capitalCase)(resource)];
          } else if (operation === "getAll") {
            const endpoint = `/v3/company/${companyId}/query`;
            responseData = await import_GenericFunctions.handleListing.call(this, i, endpoint, resource);
          } else if (operation === "update") {
            let body = {
              Id: this.getNodeParameter("employeeId", i),
              SyncToken: await import_GenericFunctions.getSyncToken.call(this, i, companyId, resource),
              sparse: true
            };
            const updateFields = this.getNodeParameter("updateFields", i);
            if ((0, import_isEmpty.default)(updateFields)) {
              throw new import_n8n_workflow.NodeOperationError(
                this.getNode(),
                `Please enter at least one field to update for the ${resource}.`,
                { itemIndex: i }
              );
            }
            body = import_GenericFunctions.populateFields.call(this, body, updateFields, resource);
            const endpoint = `/v3/company/${companyId}/${resource}`;
            responseData = await import_GenericFunctions.quickBooksApiRequest.call(this, "POST", endpoint, {}, body);
            responseData = responseData[(0, import_change_case.capitalCase)(resource)];
          }
        } else if (resource === "estimate") {
          if (operation === "create") {
            const lines = this.getNodeParameter("Line", i);
            if (!lines.length) {
              throw new import_n8n_workflow.NodeOperationError(
                this.getNode(),
                `Please enter at least one line for the ${resource}.`,
                { itemIndex: i }
              );
            }
            if (lines.some(
              (line) => line.DetailType === void 0 || line.Amount === void 0 || line.Description === void 0
            )) {
              throw new import_n8n_workflow.NodeOperationError(
                this.getNode(),
                "Please enter detail type, amount and description for every line.",
                { itemIndex: i }
              );
            }
            lines.forEach((line) => {
              if (line.DetailType === "SalesItemLineDetail" && line.itemId === void 0) {
                throw new import_n8n_workflow.NodeOperationError(
                  this.getNode(),
                  "Please enter an item ID for the associated line.",
                  { itemIndex: i }
                );
              }
            });
            let body = {
              CustomerRef: {
                value: this.getNodeParameter("CustomerRef", i)
              }
            };
            body.Line = import_GenericFunctions.processLines.call(this, lines, resource);
            const additionalFields = this.getNodeParameter("additionalFields", i);
            body = import_GenericFunctions.populateFields.call(this, body, additionalFields, resource);
            const endpoint = `/v3/company/${companyId}/${resource}`;
            responseData = await import_GenericFunctions.quickBooksApiRequest.call(this, "POST", endpoint, {}, body);
            responseData = responseData[(0, import_change_case.capitalCase)(resource)];
          } else if (operation === "delete") {
            const qs = {
              operation: "delete"
            };
            const body = {
              Id: this.getNodeParameter("estimateId", i),
              SyncToken: await import_GenericFunctions.getSyncToken.call(this, i, companyId, resource)
            };
            const endpoint = `/v3/company/${companyId}/${resource}`;
            responseData = await import_GenericFunctions.quickBooksApiRequest.call(this, "POST", endpoint, qs, body);
            responseData = responseData[(0, import_change_case.capitalCase)(resource)];
          } else if (operation === "get") {
            const estimateId = this.getNodeParameter("estimateId", i);
            const download2 = this.getNodeParameter("download", i);
            if (download2) {
              responseData = await import_GenericFunctions.handleBinaryData.call(
                this,
                items,
                i,
                companyId,
                resource,
                estimateId
              );
            } else {
              const endpoint = `/v3/company/${companyId}/${resource}/${estimateId}`;
              responseData = await import_GenericFunctions.quickBooksApiRequest.call(this, "GET", endpoint, {}, {});
              responseData = responseData[(0, import_change_case.capitalCase)(resource)];
            }
          } else if (operation === "getAll") {
            const endpoint = `/v3/company/${companyId}/query`;
            responseData = await import_GenericFunctions.handleListing.call(this, i, endpoint, resource);
          } else if (operation === "send") {
            const estimateId = this.getNodeParameter("estimateId", i);
            const qs = {
              sendTo: this.getNodeParameter("email", i)
            };
            const endpoint = `/v3/company/${companyId}/${resource}/${estimateId}/send`;
            responseData = await import_GenericFunctions.quickBooksApiRequest.call(this, "POST", endpoint, qs, {});
            responseData = responseData[(0, import_change_case.capitalCase)(resource)];
          } else if (operation === "update") {
            const { ref, syncToken } = await import_GenericFunctions.getRefAndSyncToken.call(
              this,
              i,
              companyId,
              resource,
              "CustomerRef"
            );
            let body = {
              Id: this.getNodeParameter("estimateId", i),
              SyncToken: syncToken,
              sparse: true,
              CustomerRef: {
                name: ref.name,
                value: ref.value
              }
            };
            const updateFields = this.getNodeParameter("updateFields", i);
            if ((0, import_isEmpty.default)(updateFields)) {
              throw new import_n8n_workflow.NodeOperationError(
                this.getNode(),
                `Please enter at least one field to update for the ${resource}.`,
                { itemIndex: i }
              );
            }
            body = import_GenericFunctions.populateFields.call(this, body, updateFields, resource);
            const endpoint = `/v3/company/${companyId}/${resource}`;
            responseData = await import_GenericFunctions.quickBooksApiRequest.call(this, "POST", endpoint, {}, body);
            responseData = responseData[(0, import_change_case.capitalCase)(resource)];
          }
        } else if (resource === "invoice") {
          if (operation === "create") {
            const lines = this.getNodeParameter("Line", i);
            if (!lines.length) {
              throw new import_n8n_workflow.NodeOperationError(
                this.getNode(),
                `Please enter at least one line for the ${resource}.`,
                { itemIndex: i }
              );
            }
            if (lines.some(
              (line) => line.DetailType === void 0 || line.Amount === void 0 || line.Description === void 0
            )) {
              throw new import_n8n_workflow.NodeOperationError(
                this.getNode(),
                "Please enter detail type, amount and description for every line.",
                { itemIndex: i }
              );
            }
            lines.forEach((line) => {
              if (line.DetailType === "SalesItemLineDetail" && line.itemId === void 0) {
                throw new import_n8n_workflow.NodeOperationError(
                  this.getNode(),
                  "Please enter an item ID for the associated line.",
                  { itemIndex: i }
                );
              }
            });
            let body = {
              CustomerRef: {
                value: this.getNodeParameter("CustomerRef", i)
              }
            };
            body.Line = import_GenericFunctions.processLines.call(this, lines, resource);
            const additionalFields = this.getNodeParameter("additionalFields", i);
            body = import_GenericFunctions.populateFields.call(this, body, additionalFields, resource);
            const endpoint = `/v3/company/${companyId}/${resource}`;
            responseData = await import_GenericFunctions.quickBooksApiRequest.call(this, "POST", endpoint, {}, body);
            responseData = responseData[(0, import_change_case.capitalCase)(resource)];
          } else if (operation === "delete") {
            const qs = {
              operation: "delete"
            };
            const body = {
              Id: this.getNodeParameter("invoiceId", i),
              SyncToken: await import_GenericFunctions.getSyncToken.call(this, i, companyId, resource)
            };
            const endpoint = `/v3/company/${companyId}/${resource}`;
            responseData = await import_GenericFunctions.quickBooksApiRequest.call(this, "POST", endpoint, qs, body);
            responseData = responseData[(0, import_change_case.capitalCase)(resource)];
          } else if (operation === "get") {
            const invoiceId = this.getNodeParameter("invoiceId", i);
            const download2 = this.getNodeParameter("download", i);
            if (download2) {
              responseData = await import_GenericFunctions.handleBinaryData.call(
                this,
                items,
                i,
                companyId,
                resource,
                invoiceId
              );
            } else {
              const endpoint = `/v3/company/${companyId}/${resource}/${invoiceId}`;
              responseData = await import_GenericFunctions.quickBooksApiRequest.call(this, "GET", endpoint, {}, {});
              responseData = responseData[(0, import_change_case.capitalCase)(resource)];
            }
          } else if (operation === "getAll") {
            const endpoint = `/v3/company/${companyId}/query`;
            responseData = await import_GenericFunctions.handleListing.call(this, i, endpoint, resource);
          } else if (operation === "send") {
            const invoiceId = this.getNodeParameter("invoiceId", i);
            const qs = {
              sendTo: this.getNodeParameter("email", i)
            };
            const endpoint = `/v3/company/${companyId}/${resource}/${invoiceId}/send`;
            responseData = await import_GenericFunctions.quickBooksApiRequest.call(this, "POST", endpoint, qs, {});
            responseData = responseData[(0, import_change_case.capitalCase)(resource)];
          } else if (operation === "update") {
            const { ref, syncToken } = await import_GenericFunctions.getRefAndSyncToken.call(
              this,
              i,
              companyId,
              resource,
              "CustomerRef"
            );
            let body = {
              Id: this.getNodeParameter("invoiceId", i),
              SyncToken: syncToken,
              sparse: true,
              CustomerRef: {
                name: ref.name,
                value: ref.value
              }
            };
            const updateFields = this.getNodeParameter("updateFields", i);
            if ((0, import_isEmpty.default)(updateFields)) {
              throw new import_n8n_workflow.NodeOperationError(
                this.getNode(),
                `Please enter at least one field to update for the ${resource}.`,
                { itemIndex: i }
              );
            }
            body = import_GenericFunctions.populateFields.call(this, body, updateFields, resource);
            const endpoint = `/v3/company/${companyId}/${resource}`;
            responseData = await import_GenericFunctions.quickBooksApiRequest.call(this, "POST", endpoint, {}, body);
            responseData = responseData[(0, import_change_case.capitalCase)(resource)];
          } else if (operation === "void") {
            const qs = {
              Id: this.getNodeParameter("invoiceId", i),
              SyncToken: await import_GenericFunctions.getSyncToken.call(this, i, companyId, resource),
              operation: "void"
            };
            const endpoint = `/v3/company/${companyId}/${resource}`;
            responseData = await import_GenericFunctions.quickBooksApiRequest.call(this, "POST", endpoint, qs, {});
            responseData = responseData[(0, import_change_case.capitalCase)(resource)];
          }
        } else if (resource === "item") {
          if (operation === "get") {
            const item = this.getNodeParameter("itemId", i);
            const endpoint = `/v3/company/${companyId}/${resource}/${item}`;
            responseData = await import_GenericFunctions.quickBooksApiRequest.call(this, "GET", endpoint, {}, {});
            responseData = responseData[(0, import_change_case.capitalCase)(resource)];
          } else if (operation === "getAll") {
            const endpoint = `/v3/company/${companyId}/query`;
            responseData = await import_GenericFunctions.handleListing.call(this, i, endpoint, resource);
          }
        } else if (resource === "payment") {
          if (operation === "create") {
            let body = {
              CustomerRef: {
                value: this.getNodeParameter("CustomerRef", i)
              },
              TotalAmt: this.getNodeParameter("TotalAmt", i)
            };
            const additionalFields = this.getNodeParameter("additionalFields", i);
            body = import_GenericFunctions.populateFields.call(this, body, additionalFields, resource);
            const endpoint = `/v3/company/${companyId}/${resource}`;
            responseData = await import_GenericFunctions.quickBooksApiRequest.call(this, "POST", endpoint, {}, body);
            responseData = responseData[(0, import_change_case.capitalCase)(resource)];
          } else if (operation === "delete") {
            const qs = {
              operation: "delete"
            };
            const body = {
              Id: this.getNodeParameter("paymentId", i),
              SyncToken: await import_GenericFunctions.getSyncToken.call(this, i, companyId, resource)
            };
            const endpoint = `/v3/company/${companyId}/${resource}`;
            responseData = await import_GenericFunctions.quickBooksApiRequest.call(this, "POST", endpoint, qs, body);
            responseData = responseData[(0, import_change_case.capitalCase)(resource)];
          } else if (operation === "get") {
            const paymentId = this.getNodeParameter("paymentId", i);
            const download2 = this.getNodeParameter("download", i);
            if (download2) {
              responseData = await import_GenericFunctions.handleBinaryData.call(
                this,
                items,
                i,
                companyId,
                resource,
                paymentId
              );
            } else {
              const endpoint = `/v3/company/${companyId}/${resource}/${paymentId}`;
              responseData = await import_GenericFunctions.quickBooksApiRequest.call(this, "GET", endpoint, {}, {});
              responseData = responseData[(0, import_change_case.capitalCase)(resource)];
            }
          } else if (operation === "getAll") {
            const endpoint = `/v3/company/${companyId}/query`;
            responseData = await import_GenericFunctions.handleListing.call(this, i, endpoint, resource);
          } else if (operation === "send") {
            const paymentId = this.getNodeParameter("paymentId", i);
            const qs = {
              sendTo: this.getNodeParameter("email", i)
            };
            const endpoint = `/v3/company/${companyId}/${resource}/${paymentId}/send`;
            responseData = await import_GenericFunctions.quickBooksApiRequest.call(this, "POST", endpoint, qs, {});
            responseData = responseData[(0, import_change_case.capitalCase)(resource)];
          } else if (operation === "update") {
            const { ref, syncToken } = await import_GenericFunctions.getRefAndSyncToken.call(
              this,
              i,
              companyId,
              resource,
              "CustomerRef"
            );
            let body = {
              Id: this.getNodeParameter("paymentId", i),
              SyncToken: syncToken,
              sparse: true,
              CustomerRef: {
                name: ref.name,
                value: ref.value
              }
            };
            const updateFields = this.getNodeParameter("updateFields", i);
            if ((0, import_isEmpty.default)(updateFields)) {
              throw new import_n8n_workflow.NodeOperationError(
                this.getNode(),
                `Please enter at least one field to update for the ${resource}.`,
                { itemIndex: i }
              );
            }
            body = import_GenericFunctions.populateFields.call(this, body, updateFields, resource);
            const endpoint = `/v3/company/${companyId}/${resource}`;
            responseData = await import_GenericFunctions.quickBooksApiRequest.call(this, "POST", endpoint, {}, body);
            responseData = responseData[(0, import_change_case.capitalCase)(resource)];
          } else if (operation === "void") {
            const qs = {
              Id: this.getNodeParameter("paymentId", i),
              SyncToken: await import_GenericFunctions.getSyncToken.call(this, i, companyId, resource),
              operation: "void"
            };
            const endpoint = `/v3/company/${companyId}/${resource}`;
            responseData = await import_GenericFunctions.quickBooksApiRequest.call(this, "POST", endpoint, qs, {});
            responseData = responseData[(0, import_change_case.capitalCase)(resource)];
          }
        } else if (resource === "purchase") {
          if (operation === "get") {
            const purchaseId = this.getNodeParameter("purchaseId", i);
            const endpoint = `/v3/company/${companyId}/${resource}/${purchaseId}`;
            responseData = await import_GenericFunctions.quickBooksApiRequest.call(this, "GET", endpoint, {}, {});
            responseData = responseData[(0, import_change_case.capitalCase)(resource)];
          } else if (operation === "getAll") {
            const endpoint = `/v3/company/${companyId}/query`;
            responseData = await import_GenericFunctions.handleListing.call(this, i, endpoint, resource);
          }
        } else if (resource === "transaction") {
          if (operation === "getReport") {
            const { columns, memo, term, customer, vendor, ...rest } = this.getNodeParameter(
              "filters",
              i
            );
            let qs = { ...rest };
            if (columns?.length) {
              qs.columns = columns.join(",");
            }
            if (memo?.length) {
              qs.memo = memo.join(",");
            }
            if (term?.length) {
              qs.term = term.join(",");
            }
            if (customer?.length) {
              qs.customer = customer.join(",");
            }
            if (vendor?.length) {
              qs.vendor = vendor.join(",");
            }
            qs = (0, import_GenericFunctions.adjustTransactionDates)(qs);
            const endpoint = `/v3/company/${companyId}/reports/TransactionList`;
            responseData = await import_GenericFunctions.quickBooksApiRequest.call(this, "GET", endpoint, qs, {});
            const simplifyResponse = this.getNodeParameter("simple", i, true);
            if (!Object.keys(responseData?.Rows).length) {
              responseData = [];
            }
            if (simplifyResponse && !Array.isArray(responseData)) {
              responseData = (0, import_GenericFunctions.simplifyTransactionReport)(responseData);
            }
          }
        } else if (resource === "vendor") {
          if (operation === "create") {
            let body = {
              DisplayName: this.getNodeParameter("displayName", i)
            };
            const additionalFields = this.getNodeParameter("additionalFields", i);
            body = import_GenericFunctions.populateFields.call(this, body, additionalFields, resource);
            const endpoint = `/v3/company/${companyId}/${resource}`;
            responseData = await import_GenericFunctions.quickBooksApiRequest.call(this, "POST", endpoint, {}, body);
            responseData = responseData[(0, import_change_case.capitalCase)(resource)];
          } else if (operation === "get") {
            const vendorId = this.getNodeParameter("vendorId", i);
            const endpoint = `/v3/company/${companyId}/${resource}/${vendorId}`;
            responseData = await import_GenericFunctions.quickBooksApiRequest.call(this, "GET", endpoint, {}, {});
            responseData = responseData[(0, import_change_case.capitalCase)(resource)];
          } else if (operation === "getAll") {
            const endpoint = `/v3/company/${companyId}/query`;
            responseData = await import_GenericFunctions.handleListing.call(this, i, endpoint, resource);
          } else if (operation === "update") {
            let body = {
              Id: this.getNodeParameter("vendorId", i),
              SyncToken: await import_GenericFunctions.getSyncToken.call(this, i, companyId, resource),
              sparse: true
            };
            const updateFields = this.getNodeParameter("updateFields", i);
            if ((0, import_isEmpty.default)(updateFields)) {
              throw new import_n8n_workflow.NodeOperationError(
                this.getNode(),
                `Please enter at least one field to update for the ${resource}.`,
                { itemIndex: i }
              );
            }
            body = import_GenericFunctions.populateFields.call(this, body, updateFields, resource);
            const endpoint = `/v3/company/${companyId}/${resource}`;
            responseData = await import_GenericFunctions.quickBooksApiRequest.call(this, "POST", endpoint, {}, body);
            responseData = responseData[(0, import_change_case.capitalCase)(resource)];
          }
        }
      } catch (error) {
        if (this.continueOnFail()) {
          const download2 = this.getNodeParameter("download", 0, false);
          if (["invoice", "estimate", "payment"].includes(resource) && ["get"].includes(operation) && download2) {
            if (!responseData) {
              items[i].json = { error: error.message };
              responseData = items;
            } else {
              responseData[i].json = { error: error.message };
            }
          } else {
            const executionErrorData = this.helpers.constructExecutionMetaData(
              this.helpers.returnJsonArray({ error: error.message }),
              { itemData: { item: i } }
            );
            returnData.push(...executionErrorData);
          }
          continue;
        }
        throw error;
      }
      const executionData = this.helpers.constructExecutionMetaData(
        this.helpers.returnJsonArray(responseData),
        { itemData: { item: i } }
      );
      returnData.push(...executionData);
    }
    const download = this.getNodeParameter("download", 0, false);
    if (["invoice", "estimate", "payment"].includes(resource) && ["get"].includes(operation) && download) {
      return [responseData];
    } else {
      return [returnData];
    }
  }
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  QuickBooks
});
//# sourceMappingURL=QuickBooks.node.js.map