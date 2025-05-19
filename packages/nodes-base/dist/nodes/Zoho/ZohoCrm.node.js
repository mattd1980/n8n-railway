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
var ZohoCrm_node_exports = {};
__export(ZohoCrm_node_exports, {
  ZohoCrm: () => ZohoCrm
});
module.exports = __toCommonJS(ZohoCrm_node_exports);
var import_n8n_workflow = require("n8n-workflow");
var import_descriptions = require("./descriptions");
var import_GenericFunctions = require("./GenericFunctions");
class ZohoCrm {
  constructor() {
    this.description = {
      displayName: "Zoho CRM",
      name: "zohoCrm",
      icon: "file:zoho.svg",
      group: ["transform"],
      subtitle: '={{$parameter["operation"] + ": " + $parameter["resource"]}}',
      version: 1,
      description: "Consume Zoho CRM API",
      defaults: {
        name: "Zoho CRM"
      },
      usableAsTool: true,
      inputs: [import_n8n_workflow.NodeConnectionTypes.Main],
      outputs: [import_n8n_workflow.NodeConnectionTypes.Main],
      credentials: [
        {
          name: "zohoOAuth2Api",
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
              name: "Account",
              value: "account"
            },
            {
              name: "Contact",
              value: "contact"
            },
            {
              name: "Deal",
              value: "deal"
            },
            {
              name: "Invoice",
              value: "invoice"
            },
            {
              name: "Lead",
              value: "lead"
            },
            {
              name: "Product",
              value: "product"
            },
            {
              name: "Purchase Order",
              value: "purchaseOrder"
            },
            {
              name: "Quote",
              value: "quote"
            },
            {
              name: "Sales Order",
              value: "salesOrder"
            },
            {
              name: "Vendor",
              value: "vendor"
            }
          ],
          default: "account"
        },
        ...import_descriptions.accountOperations,
        ...import_descriptions.accountFields,
        ...import_descriptions.contactOperations,
        ...import_descriptions.contactFields,
        ...import_descriptions.dealOperations,
        ...import_descriptions.dealFields,
        ...import_descriptions.invoiceOperations,
        ...import_descriptions.invoiceFields,
        ...import_descriptions.leadOperations,
        ...import_descriptions.leadFields,
        ...import_descriptions.productOperations,
        ...import_descriptions.productFields,
        ...import_descriptions.purchaseOrderOperations,
        ...import_descriptions.purchaseOrderFields,
        ...import_descriptions.quoteOperations,
        ...import_descriptions.quoteFields,
        ...import_descriptions.salesOrderOperations,
        ...import_descriptions.salesOrderFields,
        ...import_descriptions.vendorOperations,
        ...import_descriptions.vendorFields
      ]
    };
    this.methods = {
      loadOptions: {
        // ----------------------------------------
        //               resources
        // ----------------------------------------
        async getAccounts() {
          const accounts = await import_GenericFunctions.zohoApiRequestAllItems.call(
            this,
            "GET",
            "/accounts"
          );
          return (0, import_GenericFunctions.toLoadOptions)(accounts, "Account_Name");
        },
        async getContacts() {
          const contacts = await import_GenericFunctions.zohoApiRequestAllItems.call(
            this,
            "GET",
            "/contacts"
          );
          return (0, import_GenericFunctions.toLoadOptions)(contacts, "Full_Name");
        },
        async getDeals() {
          const deals = await import_GenericFunctions.zohoApiRequestAllItems.call(this, "GET", "/deals");
          return (0, import_GenericFunctions.toLoadOptions)(deals, "Deal_Name");
        },
        async getProducts() {
          const products = await import_GenericFunctions.zohoApiRequestAllItems.call(
            this,
            "GET",
            "/products"
          );
          return (0, import_GenericFunctions.toLoadOptions)(products, "Product_Name");
        },
        async getVendors() {
          const vendors = await import_GenericFunctions.zohoApiRequestAllItems.call(
            this,
            "GET",
            "/vendors"
          );
          return (0, import_GenericFunctions.toLoadOptions)(vendors, "Vendor_Name");
        },
        // ----------------------------------------
        //             resource fields
        // ----------------------------------------
        // standard fields - called from `makeGetAllFields`
        async getAccountFields() {
          return await import_GenericFunctions.getFields.call(this, "account");
        },
        async getContactFields() {
          return await import_GenericFunctions.getFields.call(this, "contact");
        },
        async getDealFields() {
          return await import_GenericFunctions.getFields.call(this, "deal");
        },
        async getInvoiceFields() {
          return await import_GenericFunctions.getFields.call(this, "invoice");
        },
        async getLeadFields() {
          return await import_GenericFunctions.getFields.call(this, "lead");
        },
        async getProductFields() {
          return await import_GenericFunctions.getFields.call(this, "product");
        },
        async getPurchaseOrderFields() {
          return await import_GenericFunctions.getFields.call(this, "purchase_order");
        },
        async getVendorOrderFields() {
          return await import_GenericFunctions.getFields.call(this, "vendor");
        },
        async getQuoteFields() {
          return await import_GenericFunctions.getFields.call(this, "quote");
        },
        async getSalesOrderFields() {
          return await import_GenericFunctions.getFields.call(this, "sales_order");
        },
        async getVendorFields() {
          return await import_GenericFunctions.getFields.call(this, "vendor");
        },
        // custom fields
        async getCustomAccountFields() {
          return await import_GenericFunctions.getFields.call(this, "account", { onlyCustom: true });
        },
        async getCustomContactFields() {
          return await import_GenericFunctions.getFields.call(this, "contact", { onlyCustom: true });
        },
        async getCustomDealFields() {
          return await import_GenericFunctions.getFields.call(this, "deal", { onlyCustom: true });
        },
        async getCustomInvoiceFields() {
          return await import_GenericFunctions.getFields.call(this, "invoice", { onlyCustom: true });
        },
        async getCustomLeadFields() {
          return await import_GenericFunctions.getFields.call(this, "lead", { onlyCustom: true });
        },
        async getCustomProductFields() {
          return await import_GenericFunctions.getFields.call(this, "product", { onlyCustom: true });
        },
        async getCustomPurchaseOrderFields() {
          return await import_GenericFunctions.getFields.call(this, "purchase_order", { onlyCustom: true });
        },
        async getCustomVendorOrderFields() {
          return await import_GenericFunctions.getFields.call(this, "vendor", { onlyCustom: true });
        },
        async getCustomQuoteFields() {
          return await import_GenericFunctions.getFields.call(this, "quote", { onlyCustom: true });
        },
        async getCustomSalesOrderFields() {
          return await import_GenericFunctions.getFields.call(this, "sales_order", { onlyCustom: true });
        },
        async getCustomVendorFields() {
          return await import_GenericFunctions.getFields.call(this, "vendor", { onlyCustom: true });
        },
        // ----------------------------------------
        //        resource picklist options
        // ----------------------------------------
        async getAccountType() {
          return await import_GenericFunctions.getPicklistOptions.call(this, "account", "Account_Type");
        },
        async getDealStage() {
          return await import_GenericFunctions.getPicklistOptions.call(this, "deal", "Stage");
        },
        async getPurchaseOrderStatus() {
          return await import_GenericFunctions.getPicklistOptions.call(this, "purchaseOrder", "Status");
        },
        async getSalesOrderStatus() {
          return await import_GenericFunctions.getPicklistOptions.call(this, "salesOrder", "Status");
        },
        async getQuoteStage() {
          return await import_GenericFunctions.getPicklistOptions.call(this, "quote", "Quote_Stage");
        }
      }
    };
  }
  async execute() {
    const items = this.getInputData();
    const returnData = [];
    const resource = this.getNodeParameter("resource", 0);
    const operation = this.getNodeParameter("operation", 0);
    let responseData;
    for (let i = 0; i < items.length; i++) {
      try {
        if (resource === "account") {
          if (operation === "create") {
            const body = {
              Account_Name: this.getNodeParameter("accountName", i)
            };
            const additionalFields = this.getNodeParameter("additionalFields", i);
            if (Object.keys(additionalFields).length) {
              Object.assign(body, (0, import_GenericFunctions.adjustAccountPayload)(additionalFields));
            }
            responseData = await import_GenericFunctions.zohoApiRequest.call(this, "POST", "/accounts", body);
            responseData = responseData.data[0].details;
          } else if (operation === "delete") {
            const accountId = this.getNodeParameter("accountId", i);
            const endpoint = `/accounts/${accountId}`;
            responseData = await import_GenericFunctions.zohoApiRequest.call(this, "DELETE", endpoint);
            responseData = responseData.data[0].details;
          } else if (operation === "get") {
            const accountId = this.getNodeParameter("accountId", i);
            const endpoint = `/accounts/${accountId}`;
            responseData = await import_GenericFunctions.zohoApiRequest.call(this, "GET", endpoint);
            responseData = responseData.data;
          } else if (operation === "getAll") {
            const qs = {};
            const options = this.getNodeParameter("options", i);
            (0, import_GenericFunctions.addGetAllFilterOptions)(qs, options);
            responseData = await import_GenericFunctions.handleListing.call(this, "GET", "/accounts", {}, qs);
          } else if (operation === "update") {
            const body = {};
            const updateFields = this.getNodeParameter("updateFields", i);
            if (Object.keys(updateFields).length) {
              Object.assign(body, (0, import_GenericFunctions.adjustAccountPayload)(updateFields));
            } else {
              import_GenericFunctions.throwOnEmptyUpdate.call(this, resource);
            }
            const accountId = this.getNodeParameter("accountId", i);
            const endpoint = `/accounts/${accountId}`;
            responseData = await import_GenericFunctions.zohoApiRequest.call(this, "PUT", endpoint, body);
            responseData = responseData.data[0].details;
          } else if (operation === "upsert") {
            const body = {
              Account_Name: this.getNodeParameter("accountName", i)
            };
            const additionalFields = this.getNodeParameter("additionalFields", i);
            if (Object.keys(additionalFields).length) {
              Object.assign(body, (0, import_GenericFunctions.adjustAccountPayload)(additionalFields));
            }
            responseData = await import_GenericFunctions.zohoApiRequest.call(this, "POST", "/accounts/upsert", body);
            responseData = responseData.data[0].details;
          }
        } else if (resource === "contact") {
          if (operation === "create") {
            const body = {
              Last_Name: this.getNodeParameter("lastName", i)
            };
            const additionalFields = this.getNodeParameter("additionalFields", i);
            if (Object.keys(additionalFields).length) {
              Object.assign(body, (0, import_GenericFunctions.adjustContactPayload)(additionalFields));
            }
            responseData = await import_GenericFunctions.zohoApiRequest.call(this, "POST", "/contacts", body);
            responseData = responseData.data[0].details;
          } else if (operation === "delete") {
            const contactId = this.getNodeParameter("contactId", i);
            const endpoint = `/contacts/${contactId}`;
            responseData = await import_GenericFunctions.zohoApiRequest.call(this, "DELETE", endpoint);
            responseData = responseData.data[0].details;
          } else if (operation === "get") {
            const contactId = this.getNodeParameter("contactId", i);
            const endpoint = `/contacts/${contactId}`;
            responseData = await import_GenericFunctions.zohoApiRequest.call(this, "GET", endpoint);
            responseData = responseData.data;
          } else if (operation === "getAll") {
            const qs = {};
            const options = this.getNodeParameter("options", i);
            (0, import_GenericFunctions.addGetAllFilterOptions)(qs, options);
            responseData = await import_GenericFunctions.handleListing.call(this, "GET", "/contacts", {}, qs);
          } else if (operation === "update") {
            const body = {};
            const updateFields = this.getNodeParameter("updateFields", i);
            if (Object.keys(updateFields).length) {
              Object.assign(body, (0, import_GenericFunctions.adjustContactPayload)(updateFields));
            } else {
              import_GenericFunctions.throwOnEmptyUpdate.call(this, resource);
            }
            const contactId = this.getNodeParameter("contactId", i);
            const endpoint = `/contacts/${contactId}`;
            responseData = await import_GenericFunctions.zohoApiRequest.call(this, "PUT", endpoint, body);
            responseData = responseData.data[0].details;
          } else if (operation === "upsert") {
            const body = {
              Last_Name: this.getNodeParameter("lastName", i)
            };
            const additionalFields = this.getNodeParameter("additionalFields", i);
            if (Object.keys(additionalFields).length) {
              Object.assign(body, (0, import_GenericFunctions.adjustContactPayload)(additionalFields));
            }
            responseData = await import_GenericFunctions.zohoApiRequest.call(this, "POST", "/contacts/upsert", body);
            responseData = responseData.data[0].details;
          }
        } else if (resource === "deal") {
          if (operation === "create") {
            const body = {
              Deal_Name: this.getNodeParameter("dealName", i),
              Stage: this.getNodeParameter("stage", i)
            };
            const additionalFields = this.getNodeParameter("additionalFields", i);
            if (Object.keys(additionalFields).length) {
              Object.assign(body, (0, import_GenericFunctions.adjustDealPayload)(additionalFields));
            }
            responseData = await import_GenericFunctions.zohoApiRequest.call(this, "POST", "/deals", body);
            responseData = responseData.data[0].details;
          } else if (operation === "delete") {
            const dealId = this.getNodeParameter("dealId", i);
            responseData = await import_GenericFunctions.zohoApiRequest.call(this, "DELETE", `/deals/${dealId}`);
            responseData = responseData.data[0].details;
          } else if (operation === "get") {
            const dealId = this.getNodeParameter("dealId", i);
            responseData = await import_GenericFunctions.zohoApiRequest.call(this, "GET", `/deals/${dealId}`);
            responseData = responseData.data;
          } else if (operation === "getAll") {
            const qs = {};
            const options = this.getNodeParameter("options", i);
            (0, import_GenericFunctions.addGetAllFilterOptions)(qs, options);
            responseData = await import_GenericFunctions.handleListing.call(this, "GET", "/deals", {}, qs);
          } else if (operation === "update") {
            const body = {};
            const updateFields = this.getNodeParameter("updateFields", i);
            if (Object.keys(updateFields).length) {
              Object.assign(body, (0, import_GenericFunctions.adjustDealPayload)(updateFields));
            } else {
              import_GenericFunctions.throwOnEmptyUpdate.call(this, resource);
            }
            const dealId = this.getNodeParameter("dealId", i);
            responseData = await import_GenericFunctions.zohoApiRequest.call(this, "PUT", `/deals/${dealId}`, body);
            responseData = responseData.data[0].details;
          } else if (operation === "upsert") {
            const body = {
              Deal_Name: this.getNodeParameter("dealName", i),
              Stage: this.getNodeParameter("stage", i)
            };
            const additionalFields = this.getNodeParameter("additionalFields", i);
            if (Object.keys(additionalFields).length) {
              Object.assign(body, (0, import_GenericFunctions.adjustDealPayload)(additionalFields));
            }
            responseData = await import_GenericFunctions.zohoApiRequest.call(this, "POST", "/deals/upsert", body);
            responseData = responseData.data[0].details;
          }
        } else if (resource === "invoice") {
          if (operation === "create") {
            const productDetails = this.getNodeParameter("Product_Details", i);
            import_GenericFunctions.throwOnMissingProducts.call(this, resource, productDetails);
            const body = {
              Subject: this.getNodeParameter("subject", i),
              Product_Details: (0, import_GenericFunctions.adjustProductDetails)(productDetails)
            };
            const additionalFields = this.getNodeParameter("additionalFields", i);
            if (Object.keys(additionalFields).length) {
              Object.assign(body, (0, import_GenericFunctions.adjustInvoicePayload)(additionalFields));
            }
            responseData = await import_GenericFunctions.zohoApiRequest.call(this, "POST", "/invoices", body);
            responseData = responseData.data[0].details;
          } else if (operation === "delete") {
            const invoiceId = this.getNodeParameter("invoiceId", i);
            const endpoint = `/invoices/${invoiceId}`;
            responseData = await import_GenericFunctions.zohoApiRequest.call(this, "DELETE", endpoint);
            responseData = responseData.data[0].details;
          } else if (operation === "get") {
            const invoiceId = this.getNodeParameter("invoiceId", i);
            const endpoint = `/invoices/${invoiceId}`;
            responseData = await import_GenericFunctions.zohoApiRequest.call(this, "GET", endpoint);
            responseData = responseData.data;
          } else if (operation === "getAll") {
            const qs = {};
            const options = this.getNodeParameter("options", i);
            (0, import_GenericFunctions.addGetAllFilterOptions)(qs, options);
            responseData = await import_GenericFunctions.handleListing.call(this, "GET", "/invoices", {}, qs);
          } else if (operation === "update") {
            const body = {};
            const updateFields = this.getNodeParameter("updateFields", i);
            if (Object.keys(updateFields).length) {
              Object.assign(body, (0, import_GenericFunctions.adjustInvoicePayloadOnUpdate)(updateFields));
            } else {
              import_GenericFunctions.throwOnEmptyUpdate.call(this, resource);
            }
            const invoiceId = this.getNodeParameter("invoiceId", i);
            const endpoint = `/invoices/${invoiceId}`;
            responseData = await import_GenericFunctions.zohoApiRequest.call(this, "PUT", endpoint, body);
            responseData = responseData.data[0].details;
          } else if (operation === "upsert") {
            const productDetails = this.getNodeParameter("Product_Details", i);
            const body = {
              Subject: this.getNodeParameter("subject", i),
              Product_Details: (0, import_GenericFunctions.adjustProductDetails)(productDetails)
            };
            const additionalFields = this.getNodeParameter("additionalFields", i);
            if (Object.keys(additionalFields).length) {
              Object.assign(body, (0, import_GenericFunctions.adjustInvoicePayload)(additionalFields));
            }
            responseData = await import_GenericFunctions.zohoApiRequest.call(this, "POST", "/invoices/upsert", body);
            responseData = responseData.data[0].details;
          }
        } else if (resource === "lead") {
          if (operation === "create") {
            const body = {
              Company: this.getNodeParameter("Company", i),
              Last_Name: this.getNodeParameter("lastName", i)
            };
            const additionalFields = this.getNodeParameter("additionalFields", i);
            if (Object.keys(additionalFields).length) {
              Object.assign(body, (0, import_GenericFunctions.adjustLeadPayload)(additionalFields));
            }
            responseData = await import_GenericFunctions.zohoApiRequest.call(this, "POST", "/leads", body);
            responseData = responseData.data[0].details;
          } else if (operation === "delete") {
            const leadId = this.getNodeParameter("leadId", i);
            responseData = await import_GenericFunctions.zohoApiRequest.call(this, "DELETE", `/leads/${leadId}`);
            responseData = responseData.data[0].details;
          } else if (operation === "get") {
            const leadId = this.getNodeParameter("leadId", i);
            responseData = await import_GenericFunctions.zohoApiRequest.call(this, "GET", `/leads/${leadId}`);
          } else if (operation === "getAll") {
            const qs = {};
            const options = this.getNodeParameter("options", i);
            (0, import_GenericFunctions.addGetAllFilterOptions)(qs, options);
            responseData = await import_GenericFunctions.handleListing.call(this, "GET", "/leads", {}, qs);
          } else if (operation === "getFields") {
            responseData = await import_GenericFunctions.zohoApiRequest.call(
              this,
              "GET",
              "/settings/fields",
              {},
              { module: "leads" }
            );
            responseData = responseData.fields;
          } else if (operation === "update") {
            const body = {};
            const updateFields = this.getNodeParameter("updateFields", i);
            if (Object.keys(updateFields).length) {
              Object.assign(body, (0, import_GenericFunctions.adjustLeadPayload)(updateFields));
            } else {
              import_GenericFunctions.throwOnEmptyUpdate.call(this, resource);
            }
            const leadId = this.getNodeParameter("leadId", i);
            responseData = await import_GenericFunctions.zohoApiRequest.call(this, "PUT", `/leads/${leadId}`, body);
            responseData = responseData.data[0].details;
          } else if (operation === "upsert") {
            const body = {
              Company: this.getNodeParameter("Company", i),
              Last_Name: this.getNodeParameter("lastName", i)
            };
            const additionalFields = this.getNodeParameter("additionalFields", i);
            if (Object.keys(additionalFields).length) {
              Object.assign(body, (0, import_GenericFunctions.adjustLeadPayload)(additionalFields));
            }
            responseData = await import_GenericFunctions.zohoApiRequest.call(this, "POST", "/leads/upsert", body);
            responseData = responseData.data[0].details;
          }
        } else if (resource === "product") {
          if (operation === "create") {
            const body = {
              Product_Name: this.getNodeParameter("productName", i)
            };
            const additionalFields = this.getNodeParameter("additionalFields", i);
            if (Object.keys(additionalFields).length) {
              Object.assign(body, (0, import_GenericFunctions.adjustProductPayload)(additionalFields));
            }
            responseData = await import_GenericFunctions.zohoApiRequest.call(this, "POST", "/products", body);
            responseData = responseData.data[0].details;
          } else if (operation === "delete") {
            const productId = this.getNodeParameter("productId", i);
            const endpoint = `/products/${productId}`;
            responseData = await import_GenericFunctions.zohoApiRequest.call(this, "DELETE", endpoint);
            responseData = responseData.data[0].details;
          } else if (operation === "get") {
            const productId = this.getNodeParameter("productId", i);
            const endpoint = `/products/${productId}`;
            responseData = await import_GenericFunctions.zohoApiRequest.call(this, "GET", endpoint);
            responseData = responseData.data;
          } else if (operation === "getAll") {
            const qs = {};
            const options = this.getNodeParameter("options", i);
            (0, import_GenericFunctions.addGetAllFilterOptions)(qs, options);
            responseData = await import_GenericFunctions.handleListing.call(this, "GET", "/products", {}, qs);
          } else if (operation === "update") {
            const body = {};
            const updateFields = this.getNodeParameter("updateFields", i);
            if (Object.keys(updateFields).length) {
              Object.assign(body, (0, import_GenericFunctions.adjustProductPayload)(updateFields));
            } else {
              import_GenericFunctions.throwOnEmptyUpdate.call(this, resource);
            }
            const productId = this.getNodeParameter("productId", i);
            const endpoint = `/products/${productId}`;
            responseData = await import_GenericFunctions.zohoApiRequest.call(this, "PUT", endpoint, body);
            responseData = responseData.data[0].details;
          } else if (operation === "upsert") {
            const body = {
              Product_Name: this.getNodeParameter("productName", i)
            };
            const additionalFields = this.getNodeParameter("additionalFields", i);
            if (Object.keys(additionalFields).length) {
              Object.assign(body, (0, import_GenericFunctions.adjustProductPayload)(additionalFields));
            }
            responseData = await import_GenericFunctions.zohoApiRequest.call(this, "POST", "/products/upsert", body);
            responseData = responseData.data[0].details;
          }
        } else if (resource === "purchaseOrder") {
          if (operation === "create") {
            const productDetails = this.getNodeParameter("Product_Details", i);
            import_GenericFunctions.throwOnMissingProducts.call(this, resource, productDetails);
            const body = {
              Subject: this.getNodeParameter("subject", i),
              Vendor_Name: { id: this.getNodeParameter("vendorId", i) },
              Product_Details: (0, import_GenericFunctions.adjustProductDetails)(productDetails)
            };
            const additionalFields = this.getNodeParameter("additionalFields", i);
            if (Object.keys(additionalFields).length) {
              Object.assign(body, (0, import_GenericFunctions.adjustPurchaseOrderPayload)(additionalFields));
            }
            responseData = await import_GenericFunctions.zohoApiRequest.call(this, "POST", "/purchase_orders", body);
            responseData = responseData.data[0].details;
          } else if (operation === "delete") {
            const purchaseOrderId = this.getNodeParameter("purchaseOrderId", i);
            const endpoint = `/purchase_orders/${purchaseOrderId}`;
            responseData = await import_GenericFunctions.zohoApiRequest.call(this, "DELETE", endpoint);
            responseData = responseData.data[0].details;
          } else if (operation === "get") {
            const purchaseOrderId = this.getNodeParameter("purchaseOrderId", i);
            const endpoint = `/purchase_orders/${purchaseOrderId}`;
            responseData = await import_GenericFunctions.zohoApiRequest.call(this, "GET", endpoint);
            responseData = responseData.data;
          } else if (operation === "getAll") {
            const qs = {};
            const options = this.getNodeParameter("options", i);
            (0, import_GenericFunctions.addGetAllFilterOptions)(qs, options);
            responseData = await import_GenericFunctions.handleListing.call(this, "GET", "/purchase_orders", {}, qs);
          } else if (operation === "update") {
            const body = {};
            const updateFields = this.getNodeParameter("updateFields", i);
            if (Object.keys(updateFields).length) {
              Object.assign(body, (0, import_GenericFunctions.adjustPurchaseOrderPayload)(updateFields));
            } else {
              import_GenericFunctions.throwOnEmptyUpdate.call(this, resource);
            }
            const purchaseOrderId = this.getNodeParameter("purchaseOrderId", i);
            const endpoint = `/purchase_orders/${purchaseOrderId}`;
            responseData = await import_GenericFunctions.zohoApiRequest.call(this, "PUT", endpoint, body);
            responseData = responseData.data[0].details;
          } else if (operation === "upsert") {
            const productDetails = this.getNodeParameter("Product_Details", i);
            const body = {
              Subject: this.getNodeParameter("subject", i),
              Vendor_Name: { id: this.getNodeParameter("vendorId", i) },
              Product_Details: (0, import_GenericFunctions.adjustProductDetails)(productDetails)
            };
            const additionalFields = this.getNodeParameter("additionalFields", i);
            if (Object.keys(additionalFields).length) {
              Object.assign(body, (0, import_GenericFunctions.adjustPurchaseOrderPayload)(additionalFields));
            }
            responseData = await import_GenericFunctions.zohoApiRequest.call(this, "POST", "/purchase_orders/upsert", body);
            responseData = responseData.data[0].details;
          }
        } else if (resource === "quote") {
          if (operation === "create") {
            const productDetails = this.getNodeParameter("Product_Details", i);
            import_GenericFunctions.throwOnMissingProducts.call(this, resource, productDetails);
            const body = {
              Subject: this.getNodeParameter("subject", i),
              Product_Details: (0, import_GenericFunctions.adjustProductDetails)(productDetails)
            };
            const additionalFields = this.getNodeParameter("additionalFields", i);
            if (Object.keys(additionalFields).length) {
              Object.assign(body, (0, import_GenericFunctions.adjustQuotePayload)(additionalFields));
            }
            responseData = await import_GenericFunctions.zohoApiRequest.call(this, "POST", "/quotes", body);
            responseData = responseData.data[0].details;
          } else if (operation === "delete") {
            const quoteId = this.getNodeParameter("quoteId", i);
            responseData = await import_GenericFunctions.zohoApiRequest.call(this, "DELETE", `/quotes/${quoteId}`);
            responseData = responseData.data[0].details;
          } else if (operation === "get") {
            const quoteId = this.getNodeParameter("quoteId", i);
            responseData = await import_GenericFunctions.zohoApiRequest.call(this, "GET", `/quotes/${quoteId}`);
            responseData = responseData.data;
          } else if (operation === "getAll") {
            const qs = {};
            const options = this.getNodeParameter("options", i);
            (0, import_GenericFunctions.addGetAllFilterOptions)(qs, options);
            responseData = await import_GenericFunctions.handleListing.call(this, "GET", "/quotes", {}, qs);
          } else if (operation === "update") {
            const body = {};
            const updateFields = this.getNodeParameter("updateFields", i);
            if (Object.keys(updateFields).length) {
              Object.assign(body, (0, import_GenericFunctions.adjustQuotePayload)(updateFields));
            } else {
              import_GenericFunctions.throwOnEmptyUpdate.call(this, resource);
            }
            const quoteId = this.getNodeParameter("quoteId", i);
            responseData = await import_GenericFunctions.zohoApiRequest.call(this, "PUT", `/quotes/${quoteId}`, body);
            responseData = responseData.data[0].details;
          } else if (operation === "upsert") {
            const productDetails = this.getNodeParameter("Product_Details", i);
            const body = {
              Subject: this.getNodeParameter("subject", i),
              Product_Details: (0, import_GenericFunctions.adjustProductDetails)(productDetails)
            };
            const additionalFields = this.getNodeParameter("additionalFields", i);
            if (Object.keys(additionalFields).length) {
              Object.assign(body, (0, import_GenericFunctions.adjustQuotePayload)(additionalFields));
            }
            responseData = await import_GenericFunctions.zohoApiRequest.call(this, "POST", "/quotes/upsert", body);
            responseData = responseData.data[0].details;
          }
        } else if (resource === "salesOrder") {
          if (operation === "create") {
            const productDetails = this.getNodeParameter("Product_Details", i);
            const body = {
              Account_Name: { id: this.getNodeParameter("accountId", i) },
              Subject: this.getNodeParameter("subject", i),
              Product_Details: (0, import_GenericFunctions.adjustProductDetails)(productDetails)
            };
            const additionalFields = this.getNodeParameter("additionalFields", i);
            if (Object.keys(additionalFields).length) {
              Object.assign(body, (0, import_GenericFunctions.adjustSalesOrderPayload)(additionalFields));
            }
            responseData = await import_GenericFunctions.zohoApiRequest.call(this, "POST", "/sales_orders", body);
            responseData = responseData.data[0].details;
          } else if (operation === "delete") {
            const salesOrderId = this.getNodeParameter("salesOrderId", i);
            const endpoint = `/sales_orders/${salesOrderId}`;
            responseData = await import_GenericFunctions.zohoApiRequest.call(this, "DELETE", endpoint);
            responseData = responseData.data[0].details;
          } else if (operation === "get") {
            const salesOrderId = this.getNodeParameter("salesOrderId", i);
            const endpoint = `/sales_orders/${salesOrderId}`;
            responseData = await import_GenericFunctions.zohoApiRequest.call(this, "GET", endpoint);
            responseData = responseData.data;
          } else if (operation === "getAll") {
            const qs = {};
            const options = this.getNodeParameter("options", i);
            (0, import_GenericFunctions.addGetAllFilterOptions)(qs, options);
            responseData = await import_GenericFunctions.handleListing.call(this, "GET", "/sales_orders", {}, qs);
          } else if (operation === "update") {
            const body = {};
            const updateFields = this.getNodeParameter("updateFields", i);
            if (Object.keys(updateFields).length) {
              Object.assign(body, (0, import_GenericFunctions.adjustSalesOrderPayload)(updateFields));
            } else {
              import_GenericFunctions.throwOnEmptyUpdate.call(this, resource);
            }
            const salesOrderId = this.getNodeParameter("salesOrderId", i);
            const endpoint = `/sales_orders/${salesOrderId}`;
            responseData = await import_GenericFunctions.zohoApiRequest.call(this, "PUT", endpoint, body);
            responseData = responseData.data[0].details;
          } else if (operation === "upsert") {
            const productDetails = this.getNodeParameter("Product_Details", i);
            const body = {
              Account_Name: { id: this.getNodeParameter("accountId", i) },
              Subject: this.getNodeParameter("subject", i),
              Product_Details: (0, import_GenericFunctions.adjustProductDetails)(productDetails, "upsert")
            };
            const additionalFields = this.getNodeParameter("additionalFields", i);
            if (Object.keys(additionalFields).length) {
              Object.assign(body, (0, import_GenericFunctions.adjustSalesOrderPayload)(additionalFields));
            }
            responseData = await import_GenericFunctions.zohoApiRequest.call(this, "POST", "/sales_orders/upsert", body);
            responseData = responseData.data[0].details;
          }
        } else if (resource === "vendor") {
          if (operation === "create") {
            const body = {
              Vendor_Name: this.getNodeParameter("vendorName", i)
            };
            const additionalFields = this.getNodeParameter("additionalFields", i);
            if (Object.keys(additionalFields).length) {
              Object.assign(body, (0, import_GenericFunctions.adjustVendorPayload)(additionalFields));
            }
            responseData = await import_GenericFunctions.zohoApiRequest.call(this, "POST", "/vendors", body);
            responseData = responseData.data[0].details;
          } else if (operation === "delete") {
            const vendorId = this.getNodeParameter("vendorId", i);
            const endpoint = `/vendors/${vendorId}`;
            responseData = await import_GenericFunctions.zohoApiRequest.call(this, "DELETE", endpoint);
            responseData = responseData.data[0].details;
          } else if (operation === "get") {
            const vendorId = this.getNodeParameter("vendorId", i);
            const endpoint = `/vendors/${vendorId}`;
            responseData = await import_GenericFunctions.zohoApiRequest.call(this, "GET", endpoint);
            responseData = responseData.data;
          } else if (operation === "getAll") {
            const qs = {};
            const options = this.getNodeParameter("options", i);
            (0, import_GenericFunctions.addGetAllFilterOptions)(qs, options);
            responseData = await import_GenericFunctions.handleListing.call(this, "GET", "/vendors", {}, qs);
          } else if (operation === "update") {
            const body = {};
            const updateFields = this.getNodeParameter("updateFields", i);
            if (Object.keys(updateFields).length) {
              Object.assign(body, (0, import_GenericFunctions.adjustVendorPayload)(updateFields));
            } else {
              import_GenericFunctions.throwOnEmptyUpdate.call(this, resource);
            }
            const vendorId = this.getNodeParameter("vendorId", i);
            const endpoint = `/vendors/${vendorId}`;
            responseData = await import_GenericFunctions.zohoApiRequest.call(this, "PUT", endpoint, body);
            responseData = responseData.data[0].details;
          } else if (operation === "upsert") {
            const body = {
              Vendor_Name: this.getNodeParameter("vendorName", i)
            };
            const additionalFields = this.getNodeParameter("additionalFields", i);
            if (Object.keys(additionalFields).length) {
              Object.assign(body, (0, import_GenericFunctions.adjustVendorPayload)(additionalFields));
            }
            responseData = await import_GenericFunctions.zohoApiRequest.call(this, "POST", "/vendors/upsert", body);
            responseData = responseData.data[0].details;
          }
        }
      } catch (error) {
        if (this.continueOnFail()) {
          returnData.push({ error: error.message, json: {} });
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
    return [returnData];
  }
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  ZohoCrm
});
//# sourceMappingURL=ZohoCrm.node.js.map