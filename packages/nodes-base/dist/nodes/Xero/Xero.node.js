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
var Xero_node_exports = {};
__export(Xero_node_exports, {
  Xero: () => Xero
});
module.exports = __toCommonJS(Xero_node_exports);
var import_n8n_workflow = require("n8n-workflow");
var import_ContactDescription = require("./ContactDescription");
var import_GenericFunctions = require("./GenericFunctions");
var import_InvoiceDescription = require("./InvoiceDescription");
class Xero {
  constructor() {
    this.description = {
      displayName: "Xero",
      name: "xero",
      icon: "file:xero.svg",
      group: ["output"],
      version: 1,
      subtitle: '={{$parameter["operation"] + ": " + $parameter["resource"]}}',
      description: "Consume Xero API",
      defaults: {
        name: "Xero"
      },
      usableAsTool: true,
      inputs: [import_n8n_workflow.NodeConnectionTypes.Main],
      outputs: [import_n8n_workflow.NodeConnectionTypes.Main],
      credentials: [
        {
          name: "xeroOAuth2Api",
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
              name: "Contact",
              value: "contact"
            },
            {
              name: "Invoice",
              value: "invoice"
            }
          ],
          default: "invoice"
        },
        // CONTACT
        ...import_ContactDescription.contactOperations,
        ...import_ContactDescription.contactFields,
        // INVOICE
        ...import_InvoiceDescription.invoiceOperations,
        ...import_InvoiceDescription.invoiceFields
      ]
    };
    this.methods = {
      loadOptions: {
        // Get all the item codes to display them to user so that they can
        // select them easily
        async getItemCodes() {
          const organizationId = this.getCurrentNodeParameter("organizationId");
          const returnData = [];
          const { Items: items } = await import_GenericFunctions.xeroApiRequest.call(this, "GET", "/items", {
            organizationId
          });
          for (const item of items) {
            const itemName = item.Description;
            const itemId = item.Code;
            returnData.push({
              name: itemName,
              value: itemId
            });
          }
          return returnData;
        },
        // Get all the account codes to display them to user so that they can
        // select them easily
        async getAccountCodes() {
          const organizationId = this.getCurrentNodeParameter("organizationId");
          const returnData = [];
          const { Accounts: accounts } = await import_GenericFunctions.xeroApiRequest.call(this, "GET", "/Accounts", {
            organizationId
          });
          for (const account of accounts) {
            const accountName = account.Name;
            const accountId = account.Code;
            returnData.push({
              name: accountName,
              value: accountId
            });
          }
          return returnData;
        },
        // Get all the tenants to display them to user so that they can
        // select them easily
        async getTenants() {
          const returnData = [];
          const tenants = await import_GenericFunctions.xeroApiRequest.call(
            this,
            "GET",
            "",
            {},
            {},
            "https://api.xero.com/connections"
          );
          for (const tenant of tenants) {
            const tenantName = tenant.tenantName;
            const tenantId = tenant.tenantId;
            returnData.push({
              name: tenantName,
              value: tenantId
            });
          }
          return returnData;
        },
        // Get all the brading themes to display them to user so that they can
        // select them easily
        async getBrandingThemes() {
          const organizationId = this.getCurrentNodeParameter("organizationId");
          const returnData = [];
          const { BrandingThemes: themes } = await import_GenericFunctions.xeroApiRequest.call(
            this,
            "GET",
            "/BrandingThemes",
            { organizationId }
          );
          for (const theme of themes) {
            const themeName = theme.Name;
            const themeId = theme.BrandingThemeID;
            returnData.push({
              name: themeName,
              value: themeId
            });
          }
          return returnData;
        },
        // Get all the brading themes to display them to user so that they can
        // select them easily
        async getCurrencies() {
          const organizationId = this.getCurrentNodeParameter("organizationId");
          const returnData = [];
          const { Currencies: currencies } = await import_GenericFunctions.xeroApiRequest.call(this, "GET", "/Currencies", {
            organizationId
          });
          for (const currency of currencies) {
            const currencyName = currency.Code;
            const currencyId = currency.Description;
            returnData.push({
              name: currencyName,
              value: currencyId
            });
          }
          return returnData;
        },
        // Get all the tracking categories to display them to user so that they can
        // select them easily
        async getTrakingCategories() {
          const organizationId = this.getCurrentNodeParameter("organizationId");
          const returnData = [];
          const { TrackingCategories: categories } = await import_GenericFunctions.xeroApiRequest.call(
            this,
            "GET",
            "/TrackingCategories",
            { organizationId }
          );
          for (const category of categories) {
            const categoryName = category.Name;
            const categoryId = category.TrackingCategoryID;
            returnData.push({
              name: categoryName,
              value: categoryId
            });
          }
          return returnData;
        }
        // // Get all the tracking categories to display them to user so that they can
        // // select them easily
        // async getTrakingOptions(this: ILoadOptionsFunctions): Promise<INodePropertyOptions[]> {
        // 	const organizationId = this.getCurrentNodeParameter('organizationId');
        // 	const name = this.getCurrentNodeParameter('name');
        // 	const returnData: INodePropertyOptions[] = [];
        // 	const { TrackingCategories: categories } = await xeroApiRequest.call(this, 'GET', '/TrackingCategories', { organizationId });
        // 	const { Options: options } = categories.filter((category: IDataObject) => category.Name === name)[0];
        // 	for (const option of options) {
        // 		const optionName = option.Name;
        // 		const optionId = option.TrackingOptionID;
        // 		returnData.push({
        // 			name: optionName,
        // 			value: optionId,
        // 		});
        // 	}
        // 	return returnData;
        // },
      }
    };
  }
  async execute() {
    const items = this.getInputData();
    const returnData = [];
    const length = items.length;
    const qs = {};
    let responseData;
    for (let i = 0; i < length; i++) {
      try {
        const resource = this.getNodeParameter("resource", 0);
        const operation = this.getNodeParameter("operation", 0);
        if (resource === "invoice") {
          if (operation === "create") {
            const organizationId = this.getNodeParameter("organizationId", i);
            const type = this.getNodeParameter("type", i);
            const additionalFields = this.getNodeParameter("additionalFields", i);
            const contactId = this.getNodeParameter("contactId", i);
            const lineItemsValues = this.getNodeParameter("lineItemsUi", i).lineItemsValues;
            const body = {
              organizationId,
              Type: type,
              Contact: { ContactID: contactId }
            };
            if (lineItemsValues) {
              const lineItems = [];
              for (const lineItemValue of lineItemsValues) {
                const lineItem = {
                  Tracking: []
                };
                lineItem.AccountCode = lineItemValue.accountCode;
                lineItem.Description = lineItemValue.description;
                lineItem.DiscountRate = lineItemValue.discountRate;
                lineItem.ItemCode = lineItemValue.itemCode;
                lineItem.LineAmount = lineItemValue.lineAmount;
                lineItem.Quantity = lineItemValue.quantity.toString();
                lineItem.TaxAmount = lineItemValue.taxAmount;
                lineItem.TaxType = lineItemValue.taxType;
                lineItem.UnitAmount = lineItemValue.unitAmount;
                lineItems.push(lineItem);
              }
              body.LineItems = lineItems;
            }
            if (additionalFields.brandingThemeId) {
              body.BrandingThemeID = additionalFields.brandingThemeId;
            }
            if (additionalFields.currency) {
              body.CurrencyCode = additionalFields.currency;
            }
            if (additionalFields.currencyRate) {
              body.CurrencyRate = additionalFields.currencyRate;
            }
            if (additionalFields.date) {
              body.Date = additionalFields.date;
            }
            if (additionalFields.dueDate) {
              body.DueDate = additionalFields.dueDate;
            }
            if (additionalFields.dueDate) {
              body.DueDate = additionalFields.dueDate;
            }
            if (additionalFields.expectedPaymentDate) {
              body.ExpectedPaymentDate = additionalFields.expectedPaymentDate;
            }
            if (additionalFields.invoiceNumber) {
              body.InvoiceNumber = additionalFields.invoiceNumber;
            }
            if (additionalFields.lineAmountType) {
              body.LineAmountTypes = additionalFields.lineAmountType;
            }
            if (additionalFields.plannedPaymentDate) {
              body.PlannedPaymentDate = additionalFields.plannedPaymentDate;
            }
            if (additionalFields.reference) {
              body.Reference = additionalFields.reference;
            }
            if (additionalFields.sendToContact) {
              body.SentToContact = additionalFields.sendToContact;
            }
            if (additionalFields.status) {
              body.Status = additionalFields.status;
            }
            if (additionalFields.url) {
              body.Url = additionalFields.url;
            }
            responseData = await import_GenericFunctions.xeroApiRequest.call(this, "POST", "/Invoices", body);
            responseData = responseData.Invoices;
          }
          if (operation === "update") {
            const invoiceId = this.getNodeParameter("invoiceId", i);
            const organizationId = this.getNodeParameter("organizationId", i);
            const updateFields = this.getNodeParameter("updateFields", i);
            const body = {
              organizationId
            };
            if (updateFields.lineItemsUi) {
              const lineItemsValues = updateFields.lineItemsUi.lineItemsValues;
              if (lineItemsValues) {
                const lineItems = [];
                for (const lineItemValue of lineItemsValues) {
                  const lineItem = {
                    Tracking: []
                  };
                  lineItem.AccountCode = lineItemValue.accountCode;
                  lineItem.Description = lineItemValue.description;
                  lineItem.DiscountRate = lineItemValue.discountRate;
                  lineItem.ItemCode = lineItemValue.itemCode;
                  lineItem.LineAmount = lineItemValue.lineAmount;
                  lineItem.Quantity = lineItemValue.quantity.toString();
                  lineItem.TaxAmount = lineItemValue.taxAmount;
                  lineItem.TaxType = lineItemValue.taxType;
                  lineItem.UnitAmount = lineItemValue.unitAmount;
                  lineItems.push(lineItem);
                }
                body.LineItems = lineItems;
              }
            }
            if (updateFields.type) {
              body.Type = updateFields.type;
            }
            if (updateFields.Contact) {
              body.Contact = { ContactID: updateFields.contactId };
            }
            if (updateFields.brandingThemeId) {
              body.BrandingThemeID = updateFields.brandingThemeId;
            }
            if (updateFields.currency) {
              body.CurrencyCode = updateFields.currency;
            }
            if (updateFields.currencyRate) {
              body.CurrencyRate = updateFields.currencyRate;
            }
            if (updateFields.date) {
              body.Date = updateFields.date;
            }
            if (updateFields.dueDate) {
              body.DueDate = updateFields.dueDate;
            }
            if (updateFields.dueDate) {
              body.DueDate = updateFields.dueDate;
            }
            if (updateFields.expectedPaymentDate) {
              body.ExpectedPaymentDate = updateFields.expectedPaymentDate;
            }
            if (updateFields.invoiceNumber) {
              body.InvoiceNumber = updateFields.invoiceNumber;
            }
            if (updateFields.lineAmountType) {
              body.LineAmountTypes = updateFields.lineAmountType;
            }
            if (updateFields.plannedPaymentDate) {
              body.PlannedPaymentDate = updateFields.plannedPaymentDate;
            }
            if (updateFields.reference) {
              body.Reference = updateFields.reference;
            }
            if (updateFields.sendToContact) {
              body.SentToContact = updateFields.sendToContact;
            }
            if (updateFields.status) {
              body.Status = updateFields.status;
            }
            if (updateFields.url) {
              body.Url = updateFields.url;
            }
            responseData = await import_GenericFunctions.xeroApiRequest.call(this, "POST", `/Invoices/${invoiceId}`, body);
            responseData = responseData.Invoices;
          }
          if (operation === "get") {
            const organizationId = this.getNodeParameter("organizationId", i);
            const invoiceId = this.getNodeParameter("invoiceId", i);
            responseData = await import_GenericFunctions.xeroApiRequest.call(this, "GET", `/Invoices/${invoiceId}`, {
              organizationId
            });
            responseData = responseData.Invoices;
          }
          if (operation === "getAll") {
            const organizationId = this.getNodeParameter("organizationId", i);
            const returnAll = this.getNodeParameter("returnAll", i);
            const options = this.getNodeParameter("options", i);
            if (options.statuses) {
              qs.statuses = options.statuses.join(",");
            }
            if (options.orderBy) {
              qs.order = `${options.orderBy} ${options.sortOrder === void 0 ? "DESC" : options.sortOrder}`;
            }
            if (options.where) {
              qs.where = options.where;
            }
            if (options.createdByMyApp) {
              qs.createdByMyApp = options.createdByMyApp;
            }
            if (returnAll) {
              responseData = await import_GenericFunctions.xeroApiRequestAllItems.call(
                this,
                "Invoices",
                "GET",
                "/Invoices",
                { organizationId },
                qs
              );
            } else {
              const limit = this.getNodeParameter("limit", i);
              responseData = await import_GenericFunctions.xeroApiRequest.call(
                this,
                "GET",
                "/Invoices",
                { organizationId },
                qs
              );
              responseData = responseData.Invoices;
              responseData = responseData.splice(0, limit);
            }
          }
        }
        if (resource === "contact") {
          if (operation === "create") {
            const organizationId = this.getNodeParameter("organizationId", i);
            const name = this.getNodeParameter("name", i);
            const additionalFields = this.getNodeParameter("additionalFields", i);
            const addressesUi = additionalFields.addressesUi;
            const phonesUi = additionalFields.phonesUi;
            const body = {
              Name: name
            };
            if (additionalFields.accountNumber) {
              body.AccountNumber = additionalFields.accountNumber;
            }
            if (additionalFields.bankAccountDetails) {
              body.BankAccountDetails = additionalFields.bankAccountDetails;
            }
            if (additionalFields.contactNumber) {
              body.ContactNumber = additionalFields.contactNumber;
            }
            if (additionalFields.contactStatus) {
              body.ContactStatus = additionalFields.contactStatus;
            }
            if (additionalFields.defaultCurrency) {
              body.DefaultCurrency = additionalFields.defaultCurrency;
            }
            if (additionalFields.emailAddress) {
              body.EmailAddress = additionalFields.emailAddress;
            }
            if (additionalFields.firstName) {
              body.FirstName = additionalFields.firstName;
            }
            if (additionalFields.lastName) {
              body.LastName = additionalFields.lastName;
            }
            if (additionalFields.purchasesDefaultAccountCode) {
              body.PurchasesDefaultAccountCode = additionalFields.purchasesDefaultAccountCode;
            }
            if (additionalFields.salesDefaultAccountCode) {
              body.SalesDefaultAccountCode = additionalFields.salesDefaultAccountCode;
            }
            if (additionalFields.skypeUserName) {
              body.SkypeUserName = additionalFields.skypeUserName;
            }
            if (additionalFields.taxNumber) {
              body.taxNumber = additionalFields.taxNumber;
            }
            if (additionalFields.xeroNetworkKey) {
              body.xeroNetworkKey = additionalFields.xeroNetworkKey;
            }
            if (phonesUi) {
              const phoneValues = phonesUi?.phonesValues;
              if (phoneValues) {
                const phones = [];
                for (const phoneValue of phoneValues) {
                  const phone = {};
                  phone.PhoneType = phoneValue.phoneType;
                  phone.PhoneNumber = phoneValue.phoneNumber;
                  phone.PhoneAreaCode = phoneValue.phoneAreaCode;
                  phone.PhoneCountryCode = phoneValue.phoneCountryCode;
                  phones.push(phone);
                }
                body.Phones = phones;
              }
            }
            if (addressesUi) {
              const addressValues = addressesUi?.addressesValues;
              if (addressValues) {
                const addresses = [];
                for (const addressValue of addressValues) {
                  const address = {};
                  address.AddressType = addressValue.type;
                  address.AddressLine1 = addressValue.line1;
                  address.AddressLine2 = addressValue.line2;
                  address.City = addressValue.city;
                  address.Region = addressValue.region;
                  address.PostalCode = addressValue.postalCode;
                  address.Country = addressValue.country;
                  address.AttentionTo = addressValue.attentionTo;
                  addresses.push(address);
                }
                body.Addresses = addresses;
              }
            }
            responseData = await import_GenericFunctions.xeroApiRequest.call(this, "POST", "/Contacts", {
              organizationId,
              Contacts: [body]
            });
            responseData = responseData.Contacts;
          }
          if (operation === "get") {
            const organizationId = this.getNodeParameter("organizationId", i);
            const contactId = this.getNodeParameter("contactId", i);
            responseData = await import_GenericFunctions.xeroApiRequest.call(this, "GET", `/Contacts/${contactId}`, {
              organizationId
            });
            responseData = responseData.Contacts;
          }
          if (operation === "getAll") {
            const organizationId = this.getNodeParameter("organizationId", i);
            const returnAll = this.getNodeParameter("returnAll", i);
            const options = this.getNodeParameter("options", i);
            if (options.includeArchived) {
              qs.includeArchived = options.includeArchived;
            }
            if (options.orderBy) {
              qs.order = `${options.orderBy} ${options.sortOrder === void 0 ? "DESC" : options.sortOrder}`;
            }
            if (options.where) {
              qs.where = options.where;
            }
            if (returnAll) {
              responseData = await import_GenericFunctions.xeroApiRequestAllItems.call(
                this,
                "Contacts",
                "GET",
                "/Contacts",
                { organizationId },
                qs
              );
            } else {
              const limit = this.getNodeParameter("limit", i);
              responseData = await import_GenericFunctions.xeroApiRequest.call(
                this,
                "GET",
                "/Contacts",
                { organizationId },
                qs
              );
              responseData = responseData.Contacts;
              responseData = responseData.splice(0, limit);
            }
          }
          if (operation === "update") {
            const organizationId = this.getNodeParameter("organizationId", i);
            const contactId = this.getNodeParameter("contactId", i);
            const updateFields = this.getNodeParameter("updateFields", i);
            const addressesUi = updateFields.addressesUi;
            const phonesUi = updateFields.phonesUi;
            const body = {};
            if (updateFields.accountNumber) {
              body.AccountNumber = updateFields.accountNumber;
            }
            if (updateFields.name) {
              body.Name = updateFields.name;
            }
            if (updateFields.bankAccountDetails) {
              body.BankAccountDetails = updateFields.bankAccountDetails;
            }
            if (updateFields.contactNumber) {
              body.ContactNumber = updateFields.contactNumber;
            }
            if (updateFields.contactStatus) {
              body.ContactStatus = updateFields.contactStatus;
            }
            if (updateFields.defaultCurrency) {
              body.DefaultCurrency = updateFields.defaultCurrency;
            }
            if (updateFields.emailAddress) {
              body.EmailAddress = updateFields.emailAddress;
            }
            if (updateFields.firstName) {
              body.FirstName = updateFields.firstName;
            }
            if (updateFields.lastName) {
              body.LastName = updateFields.lastName;
            }
            if (updateFields.purchasesDefaultAccountCode) {
              body.PurchasesDefaultAccountCode = updateFields.purchasesDefaultAccountCode;
            }
            if (updateFields.salesDefaultAccountCode) {
              body.SalesDefaultAccountCode = updateFields.salesDefaultAccountCode;
            }
            if (updateFields.skypeUserName) {
              body.SkypeUserName = updateFields.skypeUserName;
            }
            if (updateFields.taxNumber) {
              body.taxNumber = updateFields.taxNumber;
            }
            if (updateFields.xeroNetworkKey) {
              body.xeroNetworkKey = updateFields.xeroNetworkKey;
            }
            if (phonesUi) {
              const phoneValues = phonesUi?.phonesValues;
              if (phoneValues) {
                const phones = [];
                for (const phoneValue of phoneValues) {
                  const phone = {};
                  phone.PhoneType = phoneValue.phoneType;
                  phone.PhoneNumber = phoneValue.phoneNumber;
                  phone.PhoneAreaCode = phoneValue.phoneAreaCode;
                  phone.PhoneCountryCode = phoneValue.phoneCountryCode;
                  phones.push(phone);
                }
                body.Phones = phones;
              }
            }
            if (addressesUi) {
              const addressValues = addressesUi?.addressesValues;
              if (addressValues) {
                const addresses = [];
                for (const addressValue of addressValues) {
                  const address = {};
                  address.AddressType = addressValue.type;
                  address.AddressLine1 = addressValue.line1;
                  address.AddressLine2 = addressValue.line2;
                  address.City = addressValue.city;
                  address.Region = addressValue.region;
                  address.PostalCode = addressValue.postalCode;
                  address.Country = addressValue.country;
                  address.AttentionTo = addressValue.attentionTo;
                  addresses.push(address);
                }
                body.Addresses = addresses;
              }
            }
            responseData = await import_GenericFunctions.xeroApiRequest.call(this, "POST", `/Contacts/${contactId}`, {
              organizationId,
              Contacts: [body]
            });
            responseData = responseData.Contacts;
          }
        }
        const executionData = this.helpers.constructExecutionMetaData(
          this.helpers.returnJsonArray(responseData),
          { itemData: { item: i } }
        );
        returnData.push(...executionData);
      } catch (error) {
        if (this.continueOnFail()) {
          returnData.push({ json: { error: error.message } });
          continue;
        }
        throw error;
      }
    }
    return [returnData];
  }
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  Xero
});
//# sourceMappingURL=Xero.node.js.map