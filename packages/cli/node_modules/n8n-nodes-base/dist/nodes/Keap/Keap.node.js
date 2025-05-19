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
var Keap_node_exports = {};
__export(Keap_node_exports, {
  Keap: () => Keap
});
module.exports = __toCommonJS(Keap_node_exports);
var import_change_case = require("change-case");
var import_moment_timezone = __toESM(require("moment-timezone"));
var import_n8n_workflow = require("n8n-workflow");
var import_CompanyDescription = require("./CompanyDescription");
var import_ContactDescription = require("./ContactDescription");
var import_ContactNoteDescription = require("./ContactNoteDescription");
var import_ContactTagDescription = require("./ContactTagDescription");
var import_EcommerceOrderDescripion = require("./EcommerceOrderDescripion");
var import_EcommerceProductDescription = require("./EcommerceProductDescription");
var import_EmailDescription = require("./EmailDescription");
var import_FileDescription = require("./FileDescription");
var import_GenericFunctions = require("./GenericFunctions");
class Keap {
  constructor() {
    this.description = {
      displayName: "Keap",
      name: "keap",
      // eslint-disable-next-line n8n-nodes-base/node-class-description-icon-not-svg
      icon: "file:keap.png",
      group: ["input"],
      version: 1,
      subtitle: '={{$parameter["operation"] + ": " + $parameter["resource"]}}',
      description: "Consume Keap API",
      defaults: {
        name: "Keap"
      },
      usableAsTool: true,
      inputs: [import_n8n_workflow.NodeConnectionTypes.Main],
      outputs: [import_n8n_workflow.NodeConnectionTypes.Main],
      credentials: [
        {
          name: "keapOAuth2Api",
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
              name: "Company",
              value: "company"
            },
            {
              name: "Contact",
              value: "contact"
            },
            {
              name: "Contact Note",
              value: "contactNote"
            },
            {
              name: "Contact Tag",
              value: "contactTag"
            },
            {
              name: "Ecommerce Order",
              value: "ecommerceOrder"
            },
            {
              name: "Ecommerce Product",
              value: "ecommerceProduct"
            },
            {
              name: "Email",
              value: "email"
            },
            {
              name: "File",
              value: "file"
            }
          ],
          default: "company"
        },
        // COMPANY
        ...import_CompanyDescription.companyOperations,
        ...import_CompanyDescription.companyFields,
        // CONTACT
        ...import_ContactDescription.contactOperations,
        ...import_ContactDescription.contactFields,
        // CONTACT NOTE
        ...import_ContactNoteDescription.contactNoteOperations,
        ...import_ContactNoteDescription.contactNoteFields,
        // CONTACT TAG
        ...import_ContactTagDescription.contactTagOperations,
        ...import_ContactTagDescription.contactTagFields,
        // ECOMMERCE ORDER
        ...import_EcommerceOrderDescripion.ecommerceOrderOperations,
        ...import_EcommerceOrderDescripion.ecommerceOrderFields,
        // ECOMMERCE PRODUCT
        ...import_EcommerceProductDescription.ecommerceProductOperations,
        ...import_EcommerceProductDescription.ecommerceProductFields,
        // EMAIL
        ...import_EmailDescription.emailOperations,
        ...import_EmailDescription.emailFields,
        // FILE
        ...import_FileDescription.fileOperations,
        ...import_FileDescription.fileFields
      ]
    };
    this.methods = {
      loadOptions: {
        // Get all the tags to display them to user so that they can
        // select them easily
        async getTags() {
          const returnData = [];
          const tags = await import_GenericFunctions.keapApiRequestAllItems.call(this, "tags", "GET", "/tags");
          for (const tag of tags) {
            const tagName = tag.name;
            const tagId = tag.id;
            returnData.push({
              name: tagName,
              value: tagId
            });
          }
          return returnData;
        },
        // Get all the users to display them to user so that they can
        // select them easily
        async getUsers() {
          const returnData = [];
          const users = await import_GenericFunctions.keapApiRequestAllItems.call(this, "users", "GET", "/users");
          for (const user of users) {
            const userName = user.given_name;
            const userId = user.id;
            returnData.push({
              name: userName,
              value: userId
            });
          }
          return returnData;
        },
        // Get all the countries to display them to user so that they can
        // select them easily
        async getCountries() {
          const returnData = [];
          const { countries } = await import_GenericFunctions.keapApiRequest.call(this, "GET", "/locales/countries");
          for (const key of Object.keys(countries)) {
            const countryName = countries[key];
            const countryId = key;
            returnData.push({
              name: countryName,
              value: countryId
            });
          }
          return returnData;
        },
        // Get all the provinces to display them to user so that they can
        // select them easily
        async getProvinces() {
          const countryCode = this.getCurrentNodeParameter("countryCode");
          const returnData = [];
          const { provinces } = await import_GenericFunctions.keapApiRequest.call(
            this,
            "GET",
            `/locales/countries/${countryCode}/provinces`
          );
          for (const key of Object.keys(provinces)) {
            const provinceName = provinces[key];
            const provinceId = key;
            returnData.push({
              name: provinceName,
              value: provinceId
            });
          }
          return returnData;
        },
        // Get all the contact types to display them to user so that they can
        // select them easily
        async getContactTypes() {
          const returnData = [];
          const types = await import_GenericFunctions.keapApiRequest.call(this, "GET", "/setting/contact/optionTypes");
          for (const type of types.value.split(",")) {
            const typeName = type;
            const typeId = type;
            returnData.push({
              name: typeName,
              value: typeId
            });
          }
          return returnData;
        },
        // Get all the timezones to display them to user so that they can
        // select them easily
        async getTimezones() {
          const returnData = [];
          for (const timezone of import_moment_timezone.default.tz.names()) {
            const timezoneName = timezone;
            const timezoneId = timezone;
            returnData.push({
              name: timezoneName,
              value: timezoneId
            });
          }
          return returnData;
        }
      }
    };
  }
  async execute() {
    const items = this.getInputData();
    const returnData = [];
    const length = items.length;
    const qs = {};
    let responseData;
    const resource = this.getNodeParameter("resource", 0);
    const operation = this.getNodeParameter("operation", 0);
    for (let i = 0; i < length; i++) {
      if (resource === "company") {
        if (operation === "create") {
          const addresses = this.getNodeParameter("addressesUi", i).addressesValues;
          const faxes = this.getNodeParameter("faxesUi", i).faxesValues;
          const phones = this.getNodeParameter("phonesUi", i).phonesValues;
          const companyName = this.getNodeParameter("companyName", i);
          const additionalFields = this.getNodeParameter("additionalFields", i);
          const body = {
            company_name: companyName
          };
          (0, import_GenericFunctions.keysToSnakeCase)(additionalFields);
          Object.assign(body, additionalFields);
          if (addresses) {
            body.address = (0, import_GenericFunctions.keysToSnakeCase)(addresses)[0];
          }
          if (faxes) {
            body.fax_number = faxes[0];
          }
          if (phones) {
            body.phone_number = phones[0];
          }
          responseData = await import_GenericFunctions.keapApiRequest.call(this, "POST", "/companies", body);
        }
        if (operation === "getAll") {
          const returnAll = this.getNodeParameter("returnAll", i);
          const options = this.getNodeParameter("options", i);
          (0, import_GenericFunctions.keysToSnakeCase)(options);
          Object.assign(qs, options);
          if (qs.fields) {
            qs.optional_properties = qs.fields;
            delete qs.fields;
          }
          if (returnAll) {
            responseData = await import_GenericFunctions.keapApiRequestAllItems.call(
              this,
              "companies",
              "GET",
              "/companies",
              {},
              qs
            );
          } else {
            qs.limit = this.getNodeParameter("limit", i);
            responseData = await import_GenericFunctions.keapApiRequest.call(this, "GET", "/companies", {}, qs);
            responseData = responseData.companies;
          }
        }
      }
      if (resource === "contact") {
        if (operation === "upsert") {
          const duplicateOption = this.getNodeParameter("duplicateOption", i);
          const addresses = this.getNodeParameter("addressesUi", i).addressesValues;
          const emails = this.getNodeParameter("emailsUi", i).emailsValues;
          const faxes = this.getNodeParameter("faxesUi", i).faxesValues;
          const socialAccounts = this.getNodeParameter("socialAccountsUi", i).socialAccountsValues;
          const phones = this.getNodeParameter("phonesUi", i).phonesValues;
          const additionalFields = this.getNodeParameter("additionalFields", i);
          const body = {
            duplicate_option: (0, import_change_case.pascalCase)(duplicateOption)
          };
          if (additionalFields.anniversary) {
            body.anniversary = additionalFields.anniversary;
          }
          if (additionalFields.contactType) {
            body.contact_type = additionalFields.contactType;
          }
          if (additionalFields.familyName) {
            body.family_name = additionalFields.familyName;
          }
          if (additionalFields.givenName) {
            body.given_name = additionalFields.givenName;
          }
          if (additionalFields.jobTitle) {
            body.job_title = additionalFields.jobTitle;
          }
          if (additionalFields.leadSourceId) {
            body.lead_source_id = additionalFields.leadSourceId;
          }
          if (additionalFields.middleName) {
            body.middle_name = additionalFields.middleName;
          }
          if (additionalFields.middleName) {
            body.middle_name = additionalFields.middleName;
          }
          if (additionalFields.OptInReason) {
            body.opt_in_reason = additionalFields.OptInReason;
          }
          if (additionalFields.ownerId) {
            body.owner_id = additionalFields.ownerId;
          }
          if (additionalFields.preferredLocale) {
            body.preferred_locale = additionalFields.preferredLocale;
          }
          if (additionalFields.preferredName) {
            body.preferred_name = additionalFields.preferredName;
          }
          if (additionalFields.sourceType) {
            body.source_type = additionalFields.sourceType;
          }
          if (additionalFields.spouseName) {
            body.spouse_name = additionalFields.spouseName;
          }
          if (additionalFields.timezone) {
            body.time_zone = additionalFields.timezone;
          }
          if (additionalFields.website) {
            body.website = additionalFields.website;
          }
          if (additionalFields.ipAddress) {
            body.origin = { ip_address: additionalFields.ipAddress };
          }
          if (additionalFields.companyId) {
            body.company = { id: additionalFields.companyId };
          }
          if (additionalFields.optInReason) {
            body.opt_in_reason = additionalFields.optInReason;
          }
          if (addresses) {
            body.addresses = (0, import_GenericFunctions.keysToSnakeCase)(addresses);
          }
          if (emails) {
            body.email_addresses = emails;
          }
          if (faxes) {
            body.fax_numbers = faxes;
          }
          if (socialAccounts) {
            body.social_accounts = socialAccounts;
          }
          if (phones) {
            body.phone_numbers = phones;
          }
          responseData = await import_GenericFunctions.keapApiRequest.call(this, "PUT", "/contacts", body);
        }
        if (operation === "delete") {
          const contactId = parseInt(this.getNodeParameter("contactId", i), 10);
          responseData = await import_GenericFunctions.keapApiRequest.call(this, "DELETE", `/contacts/${contactId}`);
          responseData = { success: true };
        }
        if (operation === "get") {
          const contactId = parseInt(this.getNodeParameter("contactId", i), 10);
          const options = this.getNodeParameter("options", i);
          if (options.fields) {
            qs.optional_properties = options.fields;
          }
          responseData = await import_GenericFunctions.keapApiRequest.call(this, "GET", `/contacts/${contactId}`, {}, qs);
        }
        if (operation === "getAll") {
          const returnAll = this.getNodeParameter("returnAll", i);
          const options = this.getNodeParameter("options", i);
          if (options.email) {
            qs.email = options.email;
          }
          if (options.givenName) {
            qs.given_name = options.givenName;
          }
          if (options.familyName) {
            qs.family_name = options.familyName;
          }
          if (options.order) {
            qs.order = options.order;
          }
          if (options.orderDirection) {
            qs.order_direction = options.orderDirection;
          }
          if (options.since) {
            qs.since = options.since;
          }
          if (options.until) {
            qs.until = options.until;
          }
          if (returnAll) {
            responseData = await import_GenericFunctions.keapApiRequestAllItems.call(
              this,
              "contacts",
              "GET",
              "/contacts",
              {},
              qs
            );
          } else {
            qs.limit = this.getNodeParameter("limit", i);
            responseData = await import_GenericFunctions.keapApiRequest.call(this, "GET", "/contacts", {}, qs);
            responseData = responseData.contacts;
          }
        }
      }
      if (resource === "contactNote") {
        if (operation === "create") {
          const userId = this.getNodeParameter("userId", i);
          const contactId = parseInt(this.getNodeParameter("contactId", i), 10);
          const additionalFields = this.getNodeParameter("additionalFields", i);
          const body = {
            user_id: userId,
            contact_id: contactId
          };
          (0, import_GenericFunctions.keysToSnakeCase)(additionalFields);
          if (additionalFields.type) {
            additionalFields.type = (0, import_change_case.pascalCase)(additionalFields.type);
          }
          Object.assign(body, additionalFields);
          responseData = await import_GenericFunctions.keapApiRequest.call(this, "POST", "/notes", body);
        }
        if (operation === "delete") {
          const noteId = this.getNodeParameter("noteId", i);
          responseData = await import_GenericFunctions.keapApiRequest.call(this, "DELETE", `/notes/${noteId}`);
          responseData = { success: true };
        }
        if (operation === "get") {
          const noteId = this.getNodeParameter("noteId", i);
          responseData = await import_GenericFunctions.keapApiRequest.call(this, "GET", `/notes/${noteId}`);
        }
        if (operation === "getAll") {
          const returnAll = this.getNodeParameter("returnAll", i);
          const filters = this.getNodeParameter("filters", i);
          (0, import_GenericFunctions.keysToSnakeCase)(filters);
          Object.assign(qs, filters);
          if (returnAll) {
            responseData = await import_GenericFunctions.keapApiRequestAllItems.call(
              this,
              "notes",
              "GET",
              "/notes",
              {},
              qs
            );
          } else {
            qs.limit = this.getNodeParameter("limit", i);
            responseData = await import_GenericFunctions.keapApiRequest.call(this, "GET", "/notes", {}, qs);
            responseData = responseData.notes;
          }
        }
        if (operation === "update") {
          const noteId = this.getNodeParameter("noteId", i);
          const additionalFields = this.getNodeParameter("additionalFields", i);
          const body = {};
          (0, import_GenericFunctions.keysToSnakeCase)(additionalFields);
          if (additionalFields.type) {
            additionalFields.type = (0, import_change_case.pascalCase)(additionalFields.type);
          }
          Object.assign(body, additionalFields);
          responseData = await import_GenericFunctions.keapApiRequest.call(this, "PATCH", `/notes/${noteId}`, body);
        }
      }
      if (resource === "contactTag") {
        if (operation === "create") {
          const contactId = parseInt(this.getNodeParameter("contactId", i), 10);
          const tagIds = this.getNodeParameter("tagIds", i);
          const body = {
            tagIds
          };
          responseData = await import_GenericFunctions.keapApiRequest.call(
            this,
            "POST",
            `/contacts/${contactId}/tags`,
            body
          );
        }
        if (operation === "delete") {
          const contactId = parseInt(this.getNodeParameter("contactId", i), 10);
          const tagIds = this.getNodeParameter("tagIds", i);
          qs.ids = tagIds;
          responseData = await import_GenericFunctions.keapApiRequest.call(
            this,
            "DELETE",
            `/contacts/${contactId}/tags`,
            {},
            qs
          );
          responseData = { success: true };
        }
        if (operation === "getAll") {
          const returnAll = this.getNodeParameter("returnAll", i);
          const contactId = parseInt(this.getNodeParameter("contactId", i), 10);
          if (returnAll) {
            responseData = await import_GenericFunctions.keapApiRequestAllItems.call(
              this,
              "tags",
              "GET",
              `/contacts/${contactId}/tags`,
              {},
              qs
            );
          } else {
            qs.limit = this.getNodeParameter("limit", i);
            responseData = await import_GenericFunctions.keapApiRequest.call(
              this,
              "GET",
              `/contacts/${contactId}/tags`,
              {},
              qs
            );
            responseData = responseData.tags;
          }
        }
      }
      if (resource === "ecommerceOrder") {
        if (operation === "create") {
          const contactId = parseInt(this.getNodeParameter("contactId", i), 10);
          const orderDate = this.getNodeParameter("orderDate", i);
          const orderTitle = this.getNodeParameter("orderTitle", i);
          const orderType = this.getNodeParameter("orderType", i);
          const orderItems = this.getNodeParameter("orderItemsUi", i).orderItemsValues;
          const shippingAddress = this.getNodeParameter("addressUi", i).addressValues;
          const additionalFields = this.getNodeParameter("additionalFields", i);
          const body = {
            contact_id: contactId,
            order_date: orderDate,
            order_title: orderTitle,
            order_type: (0, import_change_case.pascalCase)(orderType)
          };
          if (additionalFields.promoCodes) {
            additionalFields.promoCodes = additionalFields.promoCodes.split(",");
          }
          (0, import_GenericFunctions.keysToSnakeCase)(additionalFields);
          Object.assign(body, additionalFields);
          body.order_items = (0, import_GenericFunctions.keysToSnakeCase)(orderItems);
          if (shippingAddress) {
            body.shipping_address = (0, import_GenericFunctions.keysToSnakeCase)(shippingAddress)[0];
          }
          responseData = await import_GenericFunctions.keapApiRequest.call(this, "POST", "/orders", body);
        }
        if (operation === "delete") {
          const orderId = parseInt(this.getNodeParameter("orderId", i), 10);
          responseData = await import_GenericFunctions.keapApiRequest.call(this, "DELETE", `/orders/${orderId}`);
          responseData = { success: true };
        }
        if (operation === "get") {
          const orderId = parseInt(this.getNodeParameter("orderId", i), 10);
          responseData = await import_GenericFunctions.keapApiRequest.call(this, "GET", `/orders/${orderId}`);
        }
        if (operation === "getAll") {
          const returnAll = this.getNodeParameter("returnAll", i);
          const options = this.getNodeParameter("options", i);
          (0, import_GenericFunctions.keysToSnakeCase)(options);
          Object.assign(qs, options);
          if (returnAll) {
            responseData = await import_GenericFunctions.keapApiRequestAllItems.call(
              this,
              "orders",
              "GET",
              "/orders",
              {},
              qs
            );
          } else {
            qs.limit = this.getNodeParameter("limit", i);
            responseData = await import_GenericFunctions.keapApiRequest.call(this, "GET", "/orders", {}, qs);
            responseData = responseData.orders;
          }
        }
      }
      if (resource === "ecommerceProduct") {
        if (operation === "create") {
          const productName = this.getNodeParameter("productName", i);
          const additionalFields = this.getNodeParameter("additionalFields", i);
          const body = {
            product_name: productName
          };
          (0, import_GenericFunctions.keysToSnakeCase)(additionalFields);
          Object.assign(body, additionalFields);
          responseData = await import_GenericFunctions.keapApiRequest.call(this, "POST", "/products", body);
        }
        if (operation === "delete") {
          const productId = this.getNodeParameter("productId", i);
          responseData = await import_GenericFunctions.keapApiRequest.call(this, "DELETE", `/products/${productId}`);
          responseData = { success: true };
        }
        if (operation === "get") {
          const productId = this.getNodeParameter("productId", i);
          responseData = await import_GenericFunctions.keapApiRequest.call(this, "GET", `/products/${productId}`);
        }
        if (operation === "getAll") {
          const returnAll = this.getNodeParameter("returnAll", i);
          const filters = this.getNodeParameter("filters", i);
          (0, import_GenericFunctions.keysToSnakeCase)(filters);
          Object.assign(qs, filters);
          if (returnAll) {
            responseData = await import_GenericFunctions.keapApiRequestAllItems.call(
              this,
              "products",
              "GET",
              "/products",
              {},
              qs
            );
          } else {
            qs.limit = this.getNodeParameter("limit", i);
            responseData = await import_GenericFunctions.keapApiRequest.call(this, "GET", "/products", {}, qs);
            responseData = responseData.products;
          }
        }
      }
      if (resource === "email") {
        if (operation === "createRecord") {
          const sentFromAddress = this.getNodeParameter("sentFromAddress", i);
          const sendToAddress = this.getNodeParameter("sentToAddress", i);
          const additionalFields = this.getNodeParameter("additionalFields", i);
          const body = {
            sent_to_address: sendToAddress,
            sent_from_address: sentFromAddress
          };
          Object.assign(body, additionalFields);
          (0, import_GenericFunctions.keysToSnakeCase)(body);
          responseData = await import_GenericFunctions.keapApiRequest.call(this, "POST", "/emails", body);
        }
        if (operation === "deleteRecord") {
          const emailRecordId = parseInt(this.getNodeParameter("emailRecordId", i), 10);
          responseData = await import_GenericFunctions.keapApiRequest.call(this, "DELETE", `/emails/${emailRecordId}`);
          responseData = { success: true };
        }
        if (operation === "getAll") {
          const returnAll = this.getNodeParameter("returnAll", i);
          const filters = this.getNodeParameter("filters", i);
          (0, import_GenericFunctions.keysToSnakeCase)(filters);
          Object.assign(qs, filters);
          if (returnAll) {
            responseData = await import_GenericFunctions.keapApiRequestAllItems.call(
              this,
              "emails",
              "GET",
              "/emails",
              {},
              qs
            );
          } else {
            qs.limit = this.getNodeParameter("limit", i);
            responseData = await import_GenericFunctions.keapApiRequest.call(this, "GET", "/emails", {}, qs);
            responseData = responseData.emails;
          }
        }
        if (operation === "send") {
          const userId = this.getNodeParameter("userId", i);
          const contactIds = this.getNodeParameter("contactIds", i).split(",").map((e) => parseInt(e, 10));
          const subject = this.getNodeParameter("subject", i);
          const additionalFields = this.getNodeParameter("additionalFields", i);
          const body = {
            user_id: userId,
            contacts: contactIds,
            subject
          };
          (0, import_GenericFunctions.keysToSnakeCase)(additionalFields);
          Object.assign(body, additionalFields);
          const attachmentsUi = this.getNodeParameter("attachmentsUi", i);
          let attachments = [];
          if (attachmentsUi) {
            if (attachmentsUi.attachmentsValues) {
              (0, import_GenericFunctions.keysToSnakeCase)(attachmentsUi.attachmentsValues);
              attachments = attachmentsUi.attachmentsValues;
            }
            const attachmentsBinary = attachmentsUi.attachmentsBinary;
            if (attachmentsBinary?.length) {
              for (const { property } of attachmentsBinary) {
                const binaryData = this.helpers.assertBinaryData(i, property);
                attachments.push({
                  file_data: binaryData.data,
                  file_name: binaryData.fileName
                });
              }
            }
            body.attachments = attachments;
          }
          responseData = await import_GenericFunctions.keapApiRequest.call(this, "POST", "/emails/queue", body);
          responseData = { success: true };
        }
      }
      if (resource === "file") {
        if (operation === "delete") {
          const fileId = parseInt(this.getNodeParameter("fileId", i), 10);
          responseData = await import_GenericFunctions.keapApiRequest.call(this, "DELETE", `/files/${fileId}`);
          responseData = { success: true };
        }
        if (operation === "getAll") {
          const returnAll = this.getNodeParameter("returnAll", i);
          const filters = this.getNodeParameter("filters", i);
          (0, import_GenericFunctions.keysToSnakeCase)(filters);
          Object.assign(qs, filters);
          if (qs.permission) {
            qs.permission = qs.permission.toUpperCase();
          }
          if (qs.type) {
            qs.type = (0, import_change_case.capitalCase)(qs.type);
          }
          if (qs.viewable) {
            qs.viewable = qs.viewable.toUpperCase();
          }
          if (returnAll) {
            responseData = await import_GenericFunctions.keapApiRequestAllItems.call(
              this,
              "files",
              "GET",
              "/files",
              {},
              qs
            );
          } else {
            qs.limit = this.getNodeParameter("limit", i);
            responseData = await import_GenericFunctions.keapApiRequest.call(this, "GET", "/files", {}, qs);
            responseData = responseData.files;
          }
        }
        if (operation === "upload") {
          const fileAssociation = this.getNodeParameter("fileAssociation", i);
          const isPublic = this.getNodeParameter("isPublic", i);
          const body = {
            is_public: isPublic,
            file_association: fileAssociation.toUpperCase()
          };
          if (fileAssociation === "contact") {
            const contactId = parseInt(this.getNodeParameter("contactId", i), 10);
            body.contact_id = contactId;
          }
          if (this.getNodeParameter("binaryData", i)) {
            const binaryPropertyName = this.getNodeParameter("binaryPropertyName", i);
            const binaryData = this.helpers.assertBinaryData(i, binaryPropertyName);
            body.file_data = binaryData.data;
            body.file_name = binaryData.fileName;
          } else {
            const fileName = this.getNodeParameter("fileName", i);
            const fileData = this.getNodeParameter("fileData", i);
            body.file_name = fileName;
            body.file_data = fileData;
          }
          responseData = await import_GenericFunctions.keapApiRequest.call(this, "POST", "/files", body);
        }
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
  Keap
});
//# sourceMappingURL=Keap.node.js.map