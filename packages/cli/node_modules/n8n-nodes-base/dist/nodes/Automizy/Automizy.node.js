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
var Automizy_node_exports = {};
__export(Automizy_node_exports, {
  Automizy: () => Automizy
});
module.exports = __toCommonJS(Automizy_node_exports);
var import_n8n_workflow = require("n8n-workflow");
var import_ContactDescription = require("./ContactDescription");
var import_GenericFunctions = require("./GenericFunctions");
var import_ListDescription = require("./ListDescription");
class Automizy {
  constructor() {
    this.description = {
      displayName: "Automizy",
      name: "automizy",
      // eslint-disable-next-line n8n-nodes-base/node-class-description-icon-not-svg
      icon: "file:automizy.png",
      group: ["input"],
      version: 1,
      subtitle: '={{$parameter["operation"] + ": " + $parameter["resource"]}}',
      description: "Consume Automizy API",
      defaults: {
        name: "Automizy"
      },
      inputs: [import_n8n_workflow.NodeConnectionTypes.Main],
      outputs: [import_n8n_workflow.NodeConnectionTypes.Main],
      hidden: true,
      credentials: [
        {
          name: "automizyApi",
          required: true
        }
      ],
      properties: [
        {
          displayName: "This service may no longer exist and will be removed from n8n in a future release.",
          name: "deprecated",
          type: "notice",
          default: ""
        },
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
            }
          ],
          default: "contact"
        },
        ...import_ContactDescription.contactOperations,
        ...import_ContactDescription.contactFields,
        ...import_ListDescription.listOperations,
        ...import_ListDescription.listFields
      ]
    };
    this.methods = {
      loadOptions: {
        // Get all the tags to display them to user so that they can
        // select them easily
        async getLists() {
          const returnData = [];
          const lists = await import_GenericFunctions.automizyApiRequestAllItems.call(
            this,
            "smartLists",
            "GET",
            "/smart-lists"
          );
          for (const list of lists) {
            returnData.push({
              name: list.name,
              value: list.id
            });
          }
          return returnData;
        },
        async getTags() {
          const returnData = [];
          const tags = await import_GenericFunctions.automizyApiRequestAllItems.call(
            this,
            "contactTags",
            "GET",
            "/contacts/tag-manager"
          );
          for (const tag of tags) {
            returnData.push({
              name: tag.name,
              value: tag.name
            });
          }
          return returnData;
        },
        async getCustomFields() {
          const returnData = [];
          const customFields = await import_GenericFunctions.automizyApiRequestAllItems.call(
            this,
            "customFields",
            "GET",
            "/custom-fields"
          );
          for (const customField of customFields) {
            returnData.push({
              name: customField.name,
              value: customField.id
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
      if (resource === "contact") {
        if (operation === "create") {
          const listId = this.getNodeParameter("listId", i);
          const email = this.getNodeParameter("email", i);
          const additionalFields = this.getNodeParameter("additionalFields", i);
          const body = {
            email
          };
          Object.assign(body, additionalFields);
          if (body.customFieldsUi) {
            const customFieldsValues = body.customFieldsUi.customFieldsValues;
            body.customFields = {};
            for (const customField of customFieldsValues) {
              body.customFields[customField.key] = customField.value;
            }
            delete body.customFieldsUi;
          }
          responseData = await import_GenericFunctions.automizyApiRequest.call(
            this,
            "POST",
            `/smart-lists/${listId}/contacts`,
            body
          );
          responseData = responseData.contacts;
          responseData = this.helpers.constructExecutionMetaData(
            this.helpers.returnJsonArray(responseData),
            { itemData: { item: i } }
          );
        }
        if (operation === "delete") {
          const contactId = this.getNodeParameter("contactId", i);
          responseData = await import_GenericFunctions.automizyApiRequest.call(this, "DELETE", `/contacts/${contactId}`);
          responseData = { success: true };
          responseData = this.helpers.constructExecutionMetaData(
            this.helpers.returnJsonArray(responseData),
            { itemData: { item: i } }
          );
        }
        if (operation === "get") {
          const contactId = this.getNodeParameter("contactId", i);
          responseData = await import_GenericFunctions.automizyApiRequest.call(this, "GET", `/contacts/${contactId}`);
          responseData = this.helpers.constructExecutionMetaData(
            this.helpers.returnJsonArray(responseData),
            { itemData: { item: i } }
          );
        }
        if (operation === "getAll") {
          const returnAll = this.getNodeParameter("returnAll", i);
          const listId = this.getNodeParameter("listId", i);
          const additionalFields = this.getNodeParameter("additionalFields", i);
          if (additionalFields.direction && additionalFields.sortBy) {
            qs.order = `${additionalFields.sortBy}:${additionalFields.direction}`;
          }
          if (additionalFields.fields) {
            qs.fields = additionalFields.fields;
          }
          if (returnAll) {
            responseData = await import_GenericFunctions.automizyApiRequestAllItems.call(
              this,
              "contacts",
              "GET",
              `/smart-lists/${listId}/contacts`,
              {},
              qs
            );
          } else {
            qs.limit = this.getNodeParameter("limit", i);
            responseData = await import_GenericFunctions.automizyApiRequest.call(
              this,
              "GET",
              `/smart-lists/${listId}/contacts`,
              {},
              qs
            );
          }
          responseData = this.helpers.constructExecutionMetaData(
            this.helpers.returnJsonArray(responseData),
            { itemData: { item: i } }
          );
        }
        if (operation === "update") {
          const email = this.getNodeParameter("email", i);
          const updateFields = this.getNodeParameter("updateFields", i);
          const body = {};
          Object.assign(body, updateFields);
          if (body.customFieldsUi) {
            const customFieldsValues = body.customFieldsUi.customFieldsValues;
            body.customFields = {};
            for (const customField of customFieldsValues) {
              body.customFields[customField.key] = customField.value;
            }
            delete body.customFieldsUi;
          }
          responseData = await import_GenericFunctions.automizyApiRequest.call(this, "PATCH", `/contacts/${email}`, body);
          responseData = this.helpers.constructExecutionMetaData(
            this.helpers.returnJsonArray(responseData),
            { itemData: { item: i } }
          );
        }
      }
      if (resource === "list") {
        if (operation === "create") {
          const name = this.getNodeParameter("name", i);
          const body = {
            name
          };
          responseData = await import_GenericFunctions.automizyApiRequest.call(this, "POST", "/smart-lists", body);
          responseData = this.helpers.constructExecutionMetaData(
            this.helpers.returnJsonArray(responseData),
            { itemData: { item: i } }
          );
        }
        if (operation === "delete") {
          const listId = this.getNodeParameter("listId", i);
          responseData = await import_GenericFunctions.automizyApiRequest.call(this, "DELETE", `/smart-lists/${listId}`);
          responseData = { success: true };
          responseData = this.helpers.constructExecutionMetaData(
            this.helpers.returnJsonArray(responseData),
            { itemData: { item: i } }
          );
        }
        if (operation === "get") {
          const listId = this.getNodeParameter("listId", i);
          responseData = await import_GenericFunctions.automizyApiRequest.call(this, "GET", `/smart-lists/${listId}`);
          responseData = this.helpers.constructExecutionMetaData(
            this.helpers.returnJsonArray(responseData),
            { itemData: { item: i } }
          );
        }
        if (operation === "getAll") {
          const returnAll = this.getNodeParameter("returnAll", i);
          const additionalFields = this.getNodeParameter("additionalFields", i);
          if (additionalFields.direction && additionalFields.sortBy) {
            qs.order = `${additionalFields.sortBy}:${additionalFields.direction}`;
          }
          if (additionalFields.fields) {
            qs.fields = additionalFields.fields;
          }
          if (returnAll) {
            responseData = await import_GenericFunctions.automizyApiRequestAllItems.call(
              this,
              "smartLists",
              "GET",
              "/smart-lists",
              {},
              qs
            );
          } else {
            qs.limit = this.getNodeParameter("limit", i);
            responseData = await import_GenericFunctions.automizyApiRequest.call(this, "GET", "/smart-lists", {}, qs);
            responseData = responseData.smartLists;
          }
          responseData = this.helpers.constructExecutionMetaData(
            this.helpers.returnJsonArray(responseData),
            { itemData: { item: i } }
          );
        }
        if (operation === "update") {
          const listId = this.getNodeParameter("listId", i);
          const name = this.getNodeParameter("name", i);
          const body = {
            name
          };
          responseData = await import_GenericFunctions.automizyApiRequest.call(
            this,
            "PATCH",
            `/smart-lists/${listId}`,
            body
          );
          responseData = this.helpers.constructExecutionMetaData(
            this.helpers.returnJsonArray(responseData),
            { itemData: { item: i } }
          );
        }
      }
    }
    returnData.push(...responseData);
    return [returnData];
  }
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  Automizy
});
//# sourceMappingURL=Automizy.node.js.map