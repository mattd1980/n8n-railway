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
var Strapi_node_exports = {};
__export(Strapi_node_exports, {
  Strapi: () => Strapi
});
module.exports = __toCommonJS(Strapi_node_exports);
var import_n8n_workflow = require("n8n-workflow");
var import_EntryDescription = require("./EntryDescription");
var import_GenericFunctions = require("./GenericFunctions");
class Strapi {
  constructor() {
    this.description = {
      displayName: "Strapi",
      name: "strapi",
      icon: "file:strapi.svg",
      group: ["input"],
      version: 1,
      subtitle: '={{$parameter["operation"] + ": " + $parameter["resource"]}}',
      description: "Consume Strapi API",
      defaults: {
        name: "Strapi"
      },
      usableAsTool: true,
      inputs: [import_n8n_workflow.NodeConnectionTypes.Main],
      outputs: [import_n8n_workflow.NodeConnectionTypes.Main],
      credentials: [
        {
          name: "strapiApi",
          required: true,
          testedBy: "strapiApiTest",
          displayOptions: {
            show: {
              authentication: ["password"]
            }
          }
        },
        {
          name: "strapiTokenApi",
          required: true,
          displayOptions: {
            show: {
              authentication: ["token"]
            }
          }
        }
      ],
      properties: [
        {
          displayName: "Authentication",
          name: "authentication",
          type: "options",
          options: [
            {
              name: "Username & Password",
              value: "password"
            },
            {
              name: "API Token",
              value: "token"
            }
          ],
          default: "password"
        },
        {
          displayName: "Resource",
          name: "resource",
          noDataExpression: true,
          type: "options",
          options: [
            {
              name: "Entry",
              value: "entry"
            }
          ],
          default: "entry"
        },
        ...import_EntryDescription.entryOperations,
        ...import_EntryDescription.entryFields
      ]
    };
    this.methods = {
      credentialTest: {
        async strapiApiTest(credential) {
          const credentials = credential.data;
          let options = {};
          const url = (0, import_GenericFunctions.removeTrailingSlash)(credentials.url);
          options = {
            headers: {
              "content-type": "application/json"
            },
            method: "POST",
            body: {
              identifier: credentials.email,
              password: credentials.password
            },
            uri: credentials.apiVersion === "v4" ? `${url}/api/auth/local` : `${url}/auth/local`,
            json: true
          };
          try {
            await this.helpers.request(options);
            return {
              status: "OK",
              message: "Authentication successful"
            };
          } catch (error) {
            return {
              status: "Error",
              message: `Auth settings are not valid: ${error}`
            };
          }
        }
      }
    };
  }
  async execute() {
    const items = this.getInputData();
    const returnData = [];
    const length = items.length;
    const qs = {};
    const headers = {};
    let responseData;
    const resource = this.getNodeParameter("resource", 0);
    const operation = this.getNodeParameter("operation", 0);
    const authenticationMethod = this.getNodeParameter("authentication", 0);
    let apiVersion;
    if (authenticationMethod === "password") {
      const { jwt } = await import_GenericFunctions.getToken.call(this);
      apiVersion = (await this.getCredentials("strapiApi")).apiVersion;
      headers.Authorization = `Bearer ${jwt}`;
    } else {
      apiVersion = (await this.getCredentials("strapiTokenApi")).apiVersion;
    }
    for (let i = 0; i < length; i++) {
      try {
        if (resource === "entry") {
          if (operation === "create") {
            const body = {};
            const contentType = this.getNodeParameter("contentType", i);
            const columns = this.getNodeParameter("columns", i);
            const columnList = columns.split(",").map((column) => column.trim());
            for (const key of Object.keys(items[i].json)) {
              if (columnList.includes(key)) {
                apiVersion === "v4" ? body.data = items[i].json : body[key] = items[i].json[key];
              }
            }
            responseData = await import_GenericFunctions.strapiApiRequest.call(
              this,
              "POST",
              `/${contentType}`,
              body,
              qs,
              void 0,
              headers
            );
            const executionData = this.helpers.constructExecutionMetaData(
              this.helpers.returnJsonArray(responseData),
              { itemData: { item: i } }
            );
            returnData.push(...executionData);
          }
          if (operation === "delete") {
            const contentType = this.getNodeParameter("contentType", i);
            const entryId = this.getNodeParameter("entryId", i);
            responseData = await import_GenericFunctions.strapiApiRequest.call(
              this,
              "DELETE",
              `/${contentType}/${entryId}`,
              {},
              qs,
              void 0,
              headers
            );
            const executionData = this.helpers.constructExecutionMetaData(
              this.helpers.returnJsonArray(responseData),
              { itemData: { item: i } }
            );
            returnData.push(...executionData);
          }
          if (operation === "getAll") {
            const returnAll = this.getNodeParameter("returnAll", i);
            const contentType = this.getNodeParameter("contentType", i);
            const options = this.getNodeParameter("options", i);
            if (apiVersion === "v4") {
              if (options.sort && options.sort.length !== 0) {
                const sortFields = options.sort;
                qs.sort = sortFields.join(",");
              }
              if (options.where) {
                const query = (0, import_GenericFunctions.validateJSON)(options.where);
                if (query !== void 0) {
                  qs.filters = query;
                } else {
                  throw new import_n8n_workflow.NodeOperationError(this.getNode(), "Query must be a valid JSON", {
                    itemIndex: i
                  });
                }
              }
              if (options.publicationState) {
                qs.publicationState = options.publicationState;
              }
              if (returnAll) {
                responseData = await import_GenericFunctions.strapiApiRequestAllItems.call(
                  this,
                  "GET",
                  `/${contentType}`,
                  {},
                  qs,
                  headers,
                  apiVersion
                );
              } else {
                qs["pagination[pageSize]"] = this.getNodeParameter("limit", i);
                ({ data: responseData } = await import_GenericFunctions.strapiApiRequest.call(
                  this,
                  "GET",
                  `/${contentType}`,
                  {},
                  qs,
                  void 0,
                  headers
                ));
              }
            } else {
              if (options.sort && options.sort.length !== 0) {
                const sortFields = options.sort;
                qs._sort = sortFields.join(",");
              }
              if (options.where) {
                const query = (0, import_GenericFunctions.validateJSON)(options.where);
                if (query !== void 0) {
                  qs._where = query;
                } else {
                  throw new import_n8n_workflow.NodeOperationError(this.getNode(), "Query must be a valid JSON", {
                    itemIndex: i
                  });
                }
              }
              if (options.publicationState) {
                qs._publicationState = options.publicationState;
              }
              if (returnAll) {
                responseData = await import_GenericFunctions.strapiApiRequestAllItems.call(
                  this,
                  "GET",
                  `/${contentType}`,
                  {},
                  qs,
                  headers,
                  apiVersion
                );
              } else {
                qs._limit = this.getNodeParameter("limit", i);
                responseData = await import_GenericFunctions.strapiApiRequest.call(
                  this,
                  "GET",
                  `/${contentType}`,
                  {},
                  qs,
                  void 0,
                  headers
                );
              }
            }
            const executionData = this.helpers.constructExecutionMetaData(
              this.helpers.returnJsonArray(responseData),
              { itemData: { item: i } }
            );
            returnData.push(...executionData);
          }
          if (operation === "get") {
            const contentType = this.getNodeParameter("contentType", i);
            const entryId = this.getNodeParameter("entryId", i);
            responseData = await import_GenericFunctions.strapiApiRequest.call(
              this,
              "GET",
              `/${contentType}/${entryId}`,
              {},
              qs,
              void 0,
              headers
            );
            if (apiVersion === "v4") {
              responseData = responseData.data;
            }
            const executionData = this.helpers.constructExecutionMetaData(
              this.helpers.returnJsonArray(responseData),
              { itemData: { item: i } }
            );
            returnData.push(...executionData);
          }
          if (operation === "update") {
            const body = {};
            const contentType = this.getNodeParameter("contentType", i);
            const columns = this.getNodeParameter("columns", i);
            const updateKey = this.getNodeParameter("updateKey", i);
            const columnList = columns.split(",").map((column) => column.trim());
            const entryId = items[i].json[updateKey];
            for (const key of Object.keys(items[i].json)) {
              if (columnList.includes(key)) {
                apiVersion === "v4" ? body.data = items[i].json : body[key] = items[i].json[key];
              }
            }
            responseData = await import_GenericFunctions.strapiApiRequest.call(
              this,
              "PUT",
              `/${contentType}/${entryId}`,
              body,
              qs,
              void 0,
              headers
            );
            if (apiVersion === "v4") {
              responseData = responseData.data;
            }
            const executionData = this.helpers.constructExecutionMetaData(
              this.helpers.returnJsonArray(responseData),
              { itemData: { item: i } }
            );
            returnData.push(...executionData);
          }
        }
      } catch (error) {
        if (this.continueOnFail()) {
          const executionErrorData = this.helpers.constructExecutionMetaData(
            this.helpers.returnJsonArray({ error: error.message }),
            { itemData: { item: i } }
          );
          returnData.push(...executionErrorData);
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
  Strapi
});
//# sourceMappingURL=Strapi.node.js.map