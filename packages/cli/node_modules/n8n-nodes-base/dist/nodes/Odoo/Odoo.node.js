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
var Odoo_node_exports = {};
__export(Odoo_node_exports, {
  Odoo: () => Odoo
});
module.exports = __toCommonJS(Odoo_node_exports);
var import_change_case = require("change-case");
var import_n8n_workflow = require("n8n-workflow");
var import_descriptions = require("./descriptions");
var import_GenericFunctions = require("./GenericFunctions");
class Odoo {
  constructor() {
    this.description = {
      displayName: "Odoo",
      name: "odoo",
      icon: "file:odoo.svg",
      group: ["transform"],
      version: 1,
      description: "Consume Odoo API",
      subtitle: '={{$parameter["operation"] + ": " + $parameter["resource"]}}',
      defaults: {
        name: "Odoo"
      },
      usableAsTool: true,
      inputs: [import_n8n_workflow.NodeConnectionTypes.Main],
      outputs: [import_n8n_workflow.NodeConnectionTypes.Main],
      credentials: [
        {
          name: "odooApi",
          required: true,
          testedBy: "odooApiTest"
        }
      ],
      properties: [
        {
          displayName: "Resource",
          name: "resource",
          type: "options",
          default: "contact",
          noDataExpression: true,
          options: [
            {
              name: "Contact",
              value: "contact"
            },
            {
              name: "Custom Resource",
              value: "custom"
            },
            {
              name: "Note",
              value: "note"
            },
            {
              name: "Opportunity",
              value: "opportunity"
            }
          ]
        },
        ...import_descriptions.customResourceOperations,
        ...import_descriptions.customResourceDescription,
        ...import_descriptions.opportunityOperations,
        ...import_descriptions.opportunityDescription,
        ...import_descriptions.contactOperations,
        ...import_descriptions.contactDescription,
        ...import_descriptions.noteOperations,
        ...import_descriptions.noteDescription
      ]
    };
    this.methods = {
      loadOptions: {
        async getModelFields() {
          let resource;
          resource = this.getCurrentNodeParameter("resource");
          if (resource === "custom") {
            resource = this.getCurrentNodeParameter("customResource");
            if (!resource) return [];
          }
          const credentials = await this.getCredentials("odooApi");
          const url = credentials.url;
          const username = credentials.username;
          const password = credentials.password;
          const db = (0, import_GenericFunctions.odooGetDBName)(credentials.db, url);
          const userID = await import_GenericFunctions.odooGetUserID.call(this, db, username, password, url);
          const response = await import_GenericFunctions.odooGetModelFields.call(this, db, userID, password, resource, url);
          const options = Object.entries(response).map(([key, field]) => {
            const optionField = field;
            try {
              optionField.name = (0, import_change_case.capitalCase)(optionField.name);
            } catch (error) {
              optionField.name = optionField.string;
            }
            return {
              name: optionField.name,
              value: key,
              // nodelinter-ignore-next-line
              description: `name: ${key}, type: ${optionField?.type} required: ${optionField?.required}`
            };
          });
          return options.sort((a, b) => a.name?.localeCompare(b.name) || 0);
        },
        async getModels() {
          const credentials = await this.getCredentials("odooApi");
          const url = credentials.url;
          const username = credentials.username;
          const password = credentials.password;
          const db = (0, import_GenericFunctions.odooGetDBName)(credentials.db, url);
          const userID = await import_GenericFunctions.odooGetUserID.call(this, db, username, password, url);
          const body = {
            jsonrpc: "2.0",
            method: "call",
            params: {
              service: "object",
              method: "execute",
              args: [db, userID, password, "ir.model", "search_read", [], ["name", "model"]]
            },
            id: (0, import_n8n_workflow.randomInt)(100)
          };
          const response = await import_GenericFunctions.odooJSONRPCRequest.call(this, body, url);
          const options = response.map((model) => {
            return {
              name: model.name,
              value: model.model,
              description: `model: ${model.model}`
            };
          });
          return options;
        },
        async getStates() {
          const credentials = await this.getCredentials("odooApi");
          const url = credentials.url;
          const username = credentials.username;
          const password = credentials.password;
          const db = (0, import_GenericFunctions.odooGetDBName)(credentials.db, url);
          const userID = await import_GenericFunctions.odooGetUserID.call(this, db, username, password, url);
          const body = {
            jsonrpc: "2.0",
            method: "call",
            params: {
              service: "object",
              method: "execute",
              args: [db, userID, password, "res.country.state", "search_read", [], ["id", "name"]]
            },
            id: (0, import_n8n_workflow.randomInt)(100)
          };
          const response = await import_GenericFunctions.odooJSONRPCRequest.call(this, body, url);
          const options = response.map((state) => {
            return {
              name: state.name,
              value: state.id
            };
          });
          return options.sort((a, b) => a.name?.localeCompare(b.name) || 0);
        },
        async getCountries() {
          const credentials = await this.getCredentials("odooApi");
          const url = credentials.url;
          const username = credentials.username;
          const password = credentials.password;
          const db = (0, import_GenericFunctions.odooGetDBName)(credentials.db, url);
          const userID = await import_GenericFunctions.odooGetUserID.call(this, db, username, password, url);
          const body = {
            jsonrpc: "2.0",
            method: "call",
            params: {
              service: "object",
              method: "execute",
              args: [db, userID, password, "res.country", "search_read", [], ["id", "name"]]
            },
            id: (0, import_n8n_workflow.randomInt)(100)
          };
          const response = await import_GenericFunctions.odooJSONRPCRequest.call(this, body, url);
          const options = response.map((country) => {
            return {
              name: country.name,
              value: country.id
            };
          });
          return options.sort((a, b) => a.name?.localeCompare(b.name) || 0);
        }
      },
      credentialTest: {
        async odooApiTest(credential) {
          const credentials = credential.data;
          try {
            const body = {
              jsonrpc: "2.0",
              method: "call",
              params: {
                service: "common",
                method: "login",
                args: [
                  (0, import_GenericFunctions.odooGetDBName)(credentials?.db, credentials?.url),
                  credentials?.username,
                  credentials?.password
                ]
              },
              id: (0, import_n8n_workflow.randomInt)(100)
            };
            const options = {
              headers: {
                "User-Agent": "n8n",
                Connection: "keep-alive",
                Accept: "*/*",
                "Content-Type": "application/json"
              },
              method: "POST",
              body,
              uri: `${(credentials?.url).replace(/\/$/, "")}/jsonrpc`,
              json: true
            };
            const result = await this.helpers.request(options);
            if (result.error || !result.result) {
              return {
                status: "Error",
                message: "Credentials are not valid"
              };
            } else if (result.error) {
              return {
                status: "Error",
                message: `Credentials are not valid: ${result.error.data.message}`
              };
            }
          } catch (error) {
            return {
              status: "Error",
              message: `Settings are not valid: ${error}`
            };
          }
          return {
            status: "OK",
            message: "Authentication successful!"
          };
        }
      }
    };
  }
  async execute() {
    let items = this.getInputData();
    items = (0, import_n8n_workflow.deepCopy)(items);
    const returnData = [];
    let responseData;
    const resource = this.getNodeParameter("resource", 0);
    const operation = this.getNodeParameter("operation", 0);
    const credentials = await this.getCredentials("odooApi");
    const url = credentials.url.replace(/\/$/, "");
    const username = credentials.username;
    const password = credentials.password;
    const db = (0, import_GenericFunctions.odooGetDBName)(credentials.db, url);
    const userID = await import_GenericFunctions.odooGetUserID.call(this, db, username, password, url);
    for (let i = 0; i < items.length; i++) {
      try {
        if (resource === "contact") {
          if (operation === "create") {
            let additionalFields = this.getNodeParameter("additionalFields", i);
            if (additionalFields.address) {
              const addressFields = additionalFields.address.value;
              if (addressFields) {
                additionalFields = {
                  ...additionalFields,
                  ...addressFields
                };
              }
              delete additionalFields.address;
            }
            const name = this.getNodeParameter("contactName", i);
            const fields = {
              name,
              ...additionalFields
            };
            responseData = await import_GenericFunctions.odooCreate.call(
              this,
              db,
              userID,
              password,
              resource,
              operation,
              url,
              fields
            );
          }
          if (operation === "delete") {
            const contactId = this.getNodeParameter("contactId", i);
            responseData = await import_GenericFunctions.odooDelete.call(
              this,
              db,
              userID,
              password,
              resource,
              operation,
              url,
              contactId
            );
          }
          if (operation === "get") {
            const contactId = this.getNodeParameter("contactId", i);
            const options = this.getNodeParameter("options", i);
            const fields = options.fieldsList || [];
            responseData = await import_GenericFunctions.odooGet.call(
              this,
              db,
              userID,
              password,
              resource,
              operation,
              url,
              contactId,
              fields
            );
          }
          if (operation === "getAll") {
            const returnAll = this.getNodeParameter("returnAll", i);
            const options = this.getNodeParameter("options", i);
            const fields = options.fieldsList || [];
            if (returnAll) {
              responseData = await import_GenericFunctions.odooGetAll.call(
                this,
                db,
                userID,
                password,
                resource,
                operation,
                url,
                void 0,
                fields
              );
            } else {
              const limit = this.getNodeParameter("limit", i);
              responseData = await import_GenericFunctions.odooGetAll.call(
                this,
                db,
                userID,
                password,
                resource,
                operation,
                url,
                void 0,
                // filters, only for custom resource
                fields,
                limit
              );
            }
          }
          if (operation === "update") {
            const contactId = this.getNodeParameter("contactId", i);
            let updateFields = this.getNodeParameter("updateFields", i);
            if (updateFields.address) {
              const addressFields = updateFields.address.value;
              if (addressFields) {
                updateFields = {
                  ...updateFields,
                  ...addressFields
                };
              }
              delete updateFields.address;
            }
            responseData = await import_GenericFunctions.odooUpdate.call(
              this,
              db,
              userID,
              password,
              resource,
              operation,
              url,
              contactId,
              updateFields
            );
          }
        }
        if (resource === "custom") {
          const customResource = this.getNodeParameter("customResource", i);
          if (operation === "create") {
            const fields = this.getNodeParameter("fieldsToCreateOrUpdate", i);
            responseData = await import_GenericFunctions.odooCreate.call(
              this,
              db,
              userID,
              password,
              customResource,
              operation,
              url,
              (0, import_GenericFunctions.processNameValueFields)(fields)
            );
          }
          if (operation === "delete") {
            const customResourceId = this.getNodeParameter("customResourceId", i);
            responseData = await import_GenericFunctions.odooDelete.call(
              this,
              db,
              userID,
              password,
              customResource,
              operation,
              url,
              customResourceId
            );
          }
          if (operation === "get") {
            const customResourceId = this.getNodeParameter("customResourceId", i);
            const options = this.getNodeParameter("options", i);
            const fields = options.fieldsList || [];
            responseData = await import_GenericFunctions.odooGet.call(
              this,
              db,
              userID,
              password,
              customResource,
              operation,
              url,
              customResourceId,
              fields
            );
          }
          if (operation === "getAll") {
            const returnAll = this.getNodeParameter("returnAll", i);
            const options = this.getNodeParameter("options", i);
            const fields = options.fieldsList || [];
            const filter = this.getNodeParameter("filterRequest", i);
            if (returnAll) {
              responseData = await import_GenericFunctions.odooGetAll.call(
                this,
                db,
                userID,
                password,
                customResource,
                operation,
                url,
                filter,
                fields
              );
            } else {
              const limit = this.getNodeParameter("limit", i);
              responseData = await import_GenericFunctions.odooGetAll.call(
                this,
                db,
                userID,
                password,
                customResource,
                operation,
                url,
                filter,
                fields,
                limit
              );
            }
          }
          if (operation === "update") {
            const customResourceId = this.getNodeParameter("customResourceId", i);
            const fields = this.getNodeParameter("fieldsToCreateOrUpdate", i);
            responseData = await import_GenericFunctions.odooUpdate.call(
              this,
              db,
              userID,
              password,
              customResource,
              operation,
              url,
              customResourceId,
              (0, import_GenericFunctions.processNameValueFields)(fields)
            );
          }
        }
        if (resource === "note") {
          if (operation === "create") {
            const memo = this.getNodeParameter("memo", i);
            const fields = {
              memo
              // ...additionalFields,
            };
            responseData = await import_GenericFunctions.odooCreate.call(
              this,
              db,
              userID,
              password,
              resource,
              operation,
              url,
              fields
            );
          }
          if (operation === "delete") {
            const noteId = this.getNodeParameter("noteId", i);
            responseData = await import_GenericFunctions.odooDelete.call(
              this,
              db,
              userID,
              password,
              resource,
              operation,
              url,
              noteId
            );
          }
          if (operation === "get") {
            const noteId = this.getNodeParameter("noteId", i);
            const options = this.getNodeParameter("options", i);
            const fields = options.fieldsList || [];
            responseData = await import_GenericFunctions.odooGet.call(
              this,
              db,
              userID,
              password,
              resource,
              operation,
              url,
              noteId,
              fields
            );
          }
          if (operation === "getAll") {
            const returnAll = this.getNodeParameter("returnAll", i);
            const options = this.getNodeParameter("options", i);
            const fields = options.fieldsList || [];
            if (returnAll) {
              responseData = await import_GenericFunctions.odooGetAll.call(
                this,
                db,
                userID,
                password,
                resource,
                operation,
                url,
                void 0,
                fields
              );
            } else {
              const limit = this.getNodeParameter("limit", i);
              responseData = await import_GenericFunctions.odooGetAll.call(
                this,
                db,
                userID,
                password,
                resource,
                operation,
                url,
                void 0,
                // filters, only for custom resource
                fields,
                limit
              );
            }
          }
          if (operation === "update") {
            const noteId = this.getNodeParameter("noteId", i);
            const memo = this.getNodeParameter("memo", i);
            const fields = {
              memo
            };
            responseData = await import_GenericFunctions.odooUpdate.call(
              this,
              db,
              userID,
              password,
              resource,
              operation,
              url,
              noteId,
              fields
            );
          }
        }
        if (resource === "opportunity") {
          if (operation === "create") {
            const additionalFields = this.getNodeParameter("additionalFields", i);
            const name = this.getNodeParameter("opportunityName", i);
            const fields = {
              name,
              ...additionalFields
            };
            responseData = await import_GenericFunctions.odooCreate.call(
              this,
              db,
              userID,
              password,
              resource,
              operation,
              url,
              fields
            );
          }
          if (operation === "delete") {
            const opportunityId = this.getNodeParameter("opportunityId", i);
            responseData = await import_GenericFunctions.odooDelete.call(
              this,
              db,
              userID,
              password,
              resource,
              operation,
              url,
              opportunityId
            );
          }
          if (operation === "get") {
            const opportunityId = this.getNodeParameter("opportunityId", i);
            const options = this.getNodeParameter("options", i);
            const fields = options.fieldsList || [];
            responseData = await import_GenericFunctions.odooGet.call(
              this,
              db,
              userID,
              password,
              resource,
              operation,
              url,
              opportunityId,
              fields
            );
          }
          if (operation === "getAll") {
            const returnAll = this.getNodeParameter("returnAll", i);
            const options = this.getNodeParameter("options", i);
            const fields = options.fieldsList || [];
            if (returnAll) {
              responseData = await import_GenericFunctions.odooGetAll.call(
                this,
                db,
                userID,
                password,
                resource,
                operation,
                url,
                void 0,
                fields
              );
            } else {
              const limit = this.getNodeParameter("limit", i);
              responseData = await import_GenericFunctions.odooGetAll.call(
                this,
                db,
                userID,
                password,
                resource,
                operation,
                url,
                void 0,
                // filters, only for custom resource
                fields,
                limit
              );
            }
          }
          if (operation === "update") {
            const opportunityId = this.getNodeParameter("opportunityId", i);
            const updateFields = this.getNodeParameter("updateFields", i);
            responseData = await import_GenericFunctions.odooUpdate.call(
              this,
              db,
              userID,
              password,
              resource,
              operation,
              url,
              opportunityId,
              updateFields
            );
          }
        }
        if (responseData !== void 0) {
          const executionData = this.helpers.constructExecutionMetaData(
            this.helpers.returnJsonArray(responseData),
            { itemData: { item: i } }
          );
          returnData.push(...executionData);
        }
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
    return [returnData];
  }
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  Odoo
});
//# sourceMappingURL=Odoo.node.js.map