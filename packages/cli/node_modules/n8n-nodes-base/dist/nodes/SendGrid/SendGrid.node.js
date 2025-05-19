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
var SendGrid_node_exports = {};
__export(SendGrid_node_exports, {
  SendGrid: () => SendGrid
});
module.exports = __toCommonJS(SendGrid_node_exports);
var import_moment_timezone = __toESM(require("moment-timezone"));
var import_n8n_workflow = require("n8n-workflow");
var import_ContactDescription = require("./ContactDescription");
var import_GenericFunctions = require("./GenericFunctions");
var import_ListDescription = require("./ListDescription");
var import_MailDescription = require("./MailDescription");
class SendGrid {
  constructor() {
    this.description = {
      displayName: "SendGrid",
      name: "sendGrid",
      icon: "file:sendGrid.svg",
      group: ["transform"],
      version: 1,
      subtitle: '={{$parameter["operation"] + ":" + $parameter["resource"]}}',
      description: "Consume SendGrid API",
      defaults: {
        name: "SendGrid"
      },
      usableAsTool: true,
      inputs: [import_n8n_workflow.NodeConnectionTypes.Main],
      outputs: [import_n8n_workflow.NodeConnectionTypes.Main],
      credentials: [
        {
          name: "sendGridApi",
          required: true
        }
      ],
      properties: [
        // Node properties which the user gets displayed and
        // can change on the node.
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
              name: "List",
              value: "list"
            },
            {
              name: "Mail",
              value: "mail"
            }
          ],
          default: "list",
          required: true
        },
        ...import_ListDescription.listOperations,
        ...import_ListDescription.listFields,
        ...import_ContactDescription.contactOperations,
        ...import_ContactDescription.contactFields,
        ...import_MailDescription.mailOperations,
        ...import_MailDescription.mailFields
      ]
    };
    this.methods = {
      loadOptions: {
        // Get custom fields to display to user so that they can select them easily
        async getCustomFields() {
          const returnData = [];
          const { custom_fields } = await import_GenericFunctions.sendGridApiRequest.call(
            this,
            "/marketing/field_definitions",
            "GET",
            {},
            {}
          );
          if (custom_fields !== void 0) {
            for (const customField of custom_fields) {
              returnData.push({
                name: customField.name,
                value: customField.id
              });
            }
          }
          return returnData;
        },
        // Get lists to display to user so that they can select them easily
        async getListIds() {
          const returnData = [];
          const lists = await import_GenericFunctions.sendGridApiRequestAllItems.call(
            this,
            "/marketing/lists",
            "GET",
            "result",
            {},
            {}
          );
          for (const list of lists) {
            returnData.push({
              name: list.name,
              value: list.id
            });
          }
          return returnData;
        },
        async getTemplateIds() {
          const responseData = await import_GenericFunctions.sendGridApiRequest.call(
            this,
            "/templates",
            "GET",
            {},
            { generations: "dynamic" }
          );
          return responseData.templates.map(({ id, name }) => ({
            name,
            value: id
          }));
        }
      }
    };
  }
  async execute() {
    const items = this.getInputData();
    const length = items.length;
    const qs = {};
    let responseData;
    const timezone = this.getTimezone();
    const returnData = [];
    const resource = this.getNodeParameter("resource", 0);
    const operation = this.getNodeParameter("operation", 0);
    if (resource === "contact") {
      if (operation === "getAll") {
        for (let i = 0; i < length; i++) {
          try {
            const returnAll = this.getNodeParameter("returnAll", i);
            const filters = this.getNodeParameter("filters", i);
            let endpoint = "/marketing/contacts";
            let method = "GET";
            const body = {};
            if (filters.query && filters.query !== "") {
              endpoint = "/marketing/contacts/search";
              method = "POST";
              Object.assign(body, { query: filters.query });
            }
            responseData = await import_GenericFunctions.sendGridApiRequestAllItems.call(
              this,
              endpoint,
              method,
              "result",
              body,
              qs
            );
            if (!returnAll) {
              const limit = this.getNodeParameter("limit", i);
              responseData = responseData.splice(0, limit);
            }
            const executionData = this.helpers.constructExecutionMetaData(
              this.helpers.returnJsonArray(responseData),
              { itemData: { item: i } }
            );
            returnData.push(...executionData);
          } catch (error) {
            if (this.continueOnFail()) {
              const executionData = this.helpers.constructExecutionMetaData(
                this.helpers.returnJsonArray({ error: error.message }),
                { itemData: { item: i } }
              );
              returnData.push(...executionData);
              continue;
            }
            throw error;
          }
        }
      }
      if (operation === "get") {
        const by = this.getNodeParameter("by", 0);
        let endpoint;
        let method;
        const body = {};
        for (let i = 0; i < length; i++) {
          try {
            if (by === "id") {
              method = "GET";
              const contactId = this.getNodeParameter("contactId", i);
              endpoint = `/marketing/contacts/${contactId}`;
            } else {
              const email = this.getNodeParameter("email", i);
              endpoint = "/marketing/contacts/search";
              method = "POST";
              Object.assign(body, { query: `email LIKE '${email}' ` });
            }
            responseData = await import_GenericFunctions.sendGridApiRequest.call(this, endpoint, method, body, qs);
            responseData = responseData.result || responseData;
            if (Array.isArray(responseData)) {
              responseData = responseData[0];
            }
            const executionData = this.helpers.constructExecutionMetaData(
              this.helpers.returnJsonArray(responseData),
              { itemData: { item: i } }
            );
            returnData.push(...executionData);
          } catch (error) {
            if (this.continueOnFail()) {
              const executionData = this.helpers.constructExecutionMetaData(
                this.helpers.returnJsonArray({ error: error.message }),
                { itemData: { item: i } }
              );
              returnData.push(...executionData);
              continue;
            }
            throw error;
          }
        }
      }
      if (operation === "upsert") {
        try {
          const contacts = [];
          let lists;
          for (let i = 0; i < length; i++) {
            const email = this.getNodeParameter("email", i);
            const additionalFields = this.getNodeParameter("additionalFields", i);
            const contact = {
              email
            };
            if (additionalFields.addressUi) {
              const addressValues = additionalFields.addressUi.addressValues;
              const addressLine1 = addressValues.address1;
              const addressLine2 = addressValues.address2;
              if (addressLine2) {
                Object.assign(contact, { address_line_2: addressLine2 });
              }
              Object.assign(contact, { address_line_1: addressLine1 });
            }
            if (additionalFields.city) {
              const city = additionalFields.city;
              Object.assign(contact, { city });
            }
            if (additionalFields.country) {
              const country = additionalFields.country;
              Object.assign(contact, { country });
            }
            if (additionalFields.firstName) {
              const firstName = additionalFields.firstName;
              Object.assign(contact, { first_name: firstName });
            }
            if (additionalFields.lastName) {
              const lastName = additionalFields.lastName;
              Object.assign(contact, { last_name: lastName });
            }
            if (additionalFields.postalCode) {
              const postalCode = additionalFields.postalCode;
              Object.assign(contact, { postal_code: postalCode });
            }
            if (additionalFields.stateProvinceRegion) {
              const stateProvinceRegion = additionalFields.stateProvinceRegion;
              Object.assign(contact, { state_province_region: stateProvinceRegion });
            }
            if (additionalFields.alternateEmails) {
              const alternateEmails = additionalFields.alternateEmails.split(",").filter((mail) => !!mail);
              if (alternateEmails.length !== 0) {
                Object.assign(contact, { alternate_emails: alternateEmails });
              }
            }
            if (additionalFields.listIdsUi) {
              const listIdValues = additionalFields.listIdsUi.listIdValues;
              const listIds = listIdValues.listIds;
              lists = listIds;
            }
            if (additionalFields.customFieldsUi) {
              const customFields = additionalFields.customFieldsUi.customFieldValues;
              if (customFields) {
                const data = customFields.reduce(
                  (obj, value) => Object.assign(obj, { [`${value.fieldId}`]: value.fieldValue }),
                  {}
                );
                Object.assign(contact, { custom_fields: data });
              }
            }
            contacts.push(contact);
          }
          responseData = await import_GenericFunctions.sendGridApiRequest.call(
            this,
            "/marketing/contacts",
            "PUT",
            { list_ids: lists, contacts },
            qs
          );
          returnData.push(responseData);
        } catch (error) {
          if (this.continueOnFail()) {
            returnData.push({ json: { error: error.message } });
          } else {
            throw error;
          }
        }
      }
      if (operation === "delete") {
        for (let i = 0; i < length; i++) {
          try {
            const deleteAll = this.getNodeParameter("deleteAll", i);
            if (deleteAll) {
              qs.delete_all_contacts = "true";
            }
            qs.ids = this.getNodeParameter("ids", i).replace(/\s/g, "");
            responseData = await import_GenericFunctions.sendGridApiRequest.call(
              this,
              "/marketing/contacts",
              "DELETE",
              {},
              qs
            );
            const executionData = this.helpers.constructExecutionMetaData(
              this.helpers.returnJsonArray(responseData),
              { itemData: { item: i } }
            );
            returnData.push(...executionData);
          } catch (error) {
            if (this.continueOnFail()) {
              const executionData = this.helpers.constructExecutionMetaData(
                this.helpers.returnJsonArray({ error: error.message }),
                { itemData: { item: i } }
              );
              returnData.push(...executionData);
              continue;
            }
            throw error;
          }
        }
      }
    }
    if (resource === "list") {
      if (operation === "getAll") {
        for (let i = 0; i < length; i++) {
          try {
            const returnAll = this.getNodeParameter("returnAll", i);
            responseData = await import_GenericFunctions.sendGridApiRequestAllItems.call(
              this,
              "/marketing/lists",
              "GET",
              "result",
              {},
              qs
            );
            if (!returnAll) {
              const limit = this.getNodeParameter("limit", i);
              responseData = responseData.splice(0, limit);
            }
            const executionData = this.helpers.constructExecutionMetaData(
              this.helpers.returnJsonArray(responseData),
              { itemData: { item: i } }
            );
            returnData.push(...executionData);
          } catch (error) {
            if (this.continueOnFail()) {
              const executionData = this.helpers.constructExecutionMetaData(
                this.helpers.returnJsonArray({ error: error.message }),
                { itemData: { item: i } }
              );
              returnData.push(...executionData);
              continue;
            }
            throw error;
          }
        }
      }
      if (operation === "get") {
        for (let i = 0; i < length; i++) {
          try {
            const listId = this.getNodeParameter("listId", i);
            qs.contact_sample = this.getNodeParameter("contactSample", i);
            responseData = await import_GenericFunctions.sendGridApiRequest.call(
              this,
              `/marketing/lists/${listId}`,
              "GET",
              {},
              qs
            );
            const executionData = this.helpers.constructExecutionMetaData(
              this.helpers.returnJsonArray(responseData),
              { itemData: { item: i } }
            );
            returnData.push(...executionData);
          } catch (error) {
            if (this.continueOnFail()) {
              const executionData = this.helpers.constructExecutionMetaData(
                this.helpers.returnJsonArray({ error: error.message }),
                { itemData: { item: i } }
              );
              returnData.push(...executionData);
              continue;
            }
            throw error;
          }
        }
      }
      if (operation === "create") {
        for (let i = 0; i < length; i++) {
          try {
            const name = this.getNodeParameter("name", i);
            responseData = await import_GenericFunctions.sendGridApiRequest.call(
              this,
              "/marketing/lists",
              "POST",
              { name },
              qs
            );
            const executionData = this.helpers.constructExecutionMetaData(
              this.helpers.returnJsonArray(responseData),
              { itemData: { item: i } }
            );
            returnData.push(...executionData);
          } catch (error) {
            if (this.continueOnFail()) {
              const executionData = this.helpers.constructExecutionMetaData(
                this.helpers.returnJsonArray({ error: error.message }),
                { itemData: { item: i } }
              );
              returnData.push(...executionData);
              continue;
            }
            throw error;
          }
        }
      }
      if (operation === "delete") {
        for (let i = 0; i < length; i++) {
          try {
            const listId = this.getNodeParameter("listId", i);
            qs.delete_contacts = this.getNodeParameter("deleteContacts", i);
            responseData = await import_GenericFunctions.sendGridApiRequest.call(
              this,
              `/marketing/lists/${listId}`,
              "DELETE",
              {},
              qs
            );
            responseData = { success: true };
            const executionData = this.helpers.constructExecutionMetaData(
              this.helpers.returnJsonArray(responseData),
              { itemData: { item: i } }
            );
            returnData.push(...executionData);
          } catch (error) {
            if (this.continueOnFail()) {
              const executionData = this.helpers.constructExecutionMetaData(
                this.helpers.returnJsonArray({ error: error.message }),
                { itemData: { item: i } }
              );
              returnData.push(...executionData);
              continue;
            }
            throw error;
          }
        }
      }
      if (operation === "update") {
        for (let i = 0; i < length; i++) {
          try {
            const name = this.getNodeParameter("name", i);
            const listId = this.getNodeParameter("listId", i);
            responseData = await import_GenericFunctions.sendGridApiRequest.call(
              this,
              `/marketing/lists/${listId}`,
              "PATCH",
              { name },
              qs
            );
            const executionData = this.helpers.constructExecutionMetaData(
              this.helpers.returnJsonArray(responseData),
              { itemData: { item: i } }
            );
            returnData.push(...executionData);
          } catch (error) {
            if (this.continueOnFail()) {
              const executionData = this.helpers.constructExecutionMetaData(
                this.helpers.returnJsonArray({ error: error.message }),
                { itemData: { item: i } }
              );
              returnData.push(...executionData);
              continue;
            }
            throw error;
          }
        }
      }
    }
    if (resource === "mail") {
      if (operation === "send") {
        for (let i = 0; i < length; i++) {
          try {
            const toEmail = this.getNodeParameter("toEmail", i);
            const parsedToEmail = toEmail.includes(",") ? toEmail.split(",").map((entry) => ({ email: entry.trim() })) : [{ email: toEmail.trim() }];
            const {
              bccEmail,
              ccEmail,
              enableSandbox,
              sendAt,
              headers,
              attachments,
              categories,
              ipPoolName,
              replyToEmail
            } = this.getNodeParameter("additionalFields", i);
            const body = {
              personalizations: [
                {
                  to: parsedToEmail
                }
              ],
              from: {
                email: this.getNodeParameter("fromEmail", i).trim(),
                name: this.getNodeParameter("fromName", i)
              },
              mail_settings: {
                sandbox_mode: {
                  enable: enableSandbox || false
                }
              }
            };
            const dynamicTemplateEnabled = this.getNodeParameter("dynamicTemplate", i);
            if (dynamicTemplateEnabled) {
              body.template_id = this.getNodeParameter("templateId", i);
              const { fields } = this.getNodeParameter("dynamicTemplateFields", i);
              if (fields) {
                body.personalizations[0].dynamic_template_data = {};
                fields.forEach((field) => {
                  body.personalizations[0].dynamic_template_data[field.key] = field.value;
                });
              }
            } else {
              body.personalizations[0].subject = this.getNodeParameter("subject", i);
              body.content = [
                {
                  type: this.getNodeParameter("contentType", i),
                  value: this.getNodeParameter("contentValue", i)
                }
              ];
            }
            if (attachments) {
              const attachmentsToSend = [];
              const binaryProperties = attachments.split(",").map((p) => p.trim());
              for (const property of binaryProperties) {
                const binaryData = this.helpers.assertBinaryData(i, property);
                const dataBuffer = await this.helpers.getBinaryDataBuffer(i, property);
                attachmentsToSend.push({
                  content: dataBuffer.toString("base64"),
                  filename: binaryData.fileName || "unknown",
                  type: binaryData.mimeType
                });
              }
              if (attachmentsToSend.length) {
                body.attachments = attachmentsToSend;
              }
            }
            if (bccEmail) {
              body.personalizations[0].bcc = bccEmail.split(",").map((entry) => ({ email: entry.trim() }));
            }
            if (ccEmail) {
              body.personalizations[0].cc = ccEmail.split(",").map((entry) => ({ email: entry.trim() }));
            }
            if (headers?.details.length) {
              const parsedHeaders = {};
              headers.details.forEach((obj) => parsedHeaders[obj.key] = obj.value);
              body.headers = parsedHeaders;
            }
            if (categories) {
              body.categories = categories.split(",");
            }
            if (ipPoolName) {
              body.ip_pool_name = ipPoolName;
            }
            if (sendAt) {
              body.personalizations[0].send_at = import_moment_timezone.default.tz(sendAt, timezone).unix();
            }
            if (replyToEmail) {
              body.reply_to_list = replyToEmail.split(",").map((entry) => ({ email: entry.trim() }));
            }
            const data = await import_GenericFunctions.sendGridApiRequest.call(this, "/mail/send", "POST", body, qs, {
              resolveWithFullResponse: true
            });
            const executionData = this.helpers.constructExecutionMetaData(
              this.helpers.returnJsonArray({ messageId: data.headers["x-message-id"] }),
              { itemData: { item: i } }
            );
            returnData.push(...executionData);
          } catch (error) {
            if (this.continueOnFail()) {
              const executionData = this.helpers.constructExecutionMetaData(
                this.helpers.returnJsonArray({ error: error.message }),
                { itemData: { item: i } }
              );
              returnData.push(...executionData);
              continue;
            }
            throw error;
          }
        }
      }
    }
    return [returnData];
  }
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  SendGrid
});
//# sourceMappingURL=SendGrid.node.js.map