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
var Elasticsearch_node_exports = {};
__export(Elasticsearch_node_exports, {
  Elasticsearch: () => Elasticsearch
});
module.exports = __toCommonJS(Elasticsearch_node_exports);
var import_omit = __toESM(require("lodash/omit"));
var import_n8n_workflow = require("n8n-workflow");
var import_descriptions = require("./descriptions");
var import_GenericFunctions = require("./GenericFunctions");
class Elasticsearch {
  constructor() {
    this.description = {
      displayName: "Elasticsearch",
      name: "elasticsearch",
      icon: "file:elasticsearch.svg",
      group: ["transform"],
      version: 1,
      subtitle: '={{$parameter["operation"] + ": " + $parameter["resource"]}}',
      description: "Consume the Elasticsearch API",
      defaults: {
        name: "Elasticsearch"
      },
      usableAsTool: true,
      inputs: [import_n8n_workflow.NodeConnectionTypes.Main],
      outputs: [import_n8n_workflow.NodeConnectionTypes.Main],
      credentials: [
        {
          name: "elasticsearchApi",
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
              name: "Document",
              value: "document"
            },
            {
              name: "Index",
              value: "index"
            }
          ],
          default: "document"
        },
        ...import_descriptions.documentOperations,
        ...import_descriptions.documentFields,
        ...import_descriptions.indexOperations,
        ...import_descriptions.indexFields
      ]
    };
  }
  async execute() {
    const items = this.getInputData();
    const returnData = [];
    const resource = this.getNodeParameter("resource", 0);
    const operation = this.getNodeParameter("operation", 0);
    let responseData;
    let bulkBody = {};
    for (let i = 0; i < items.length; i++) {
      const bulkOperation = this.getNodeParameter("options.bulkOperation", i, false);
      if (resource === "document") {
        if (operation === "delete") {
          const indexId = this.getNodeParameter("indexId", i);
          const documentId = this.getNodeParameter("documentId", i);
          if (bulkOperation) {
            bulkBody[i] = JSON.stringify({
              delete: {
                _index: indexId,
                _id: documentId
              }
            });
          } else {
            const endpoint = `/${indexId}/_doc/${documentId}`;
            responseData = await import_GenericFunctions.elasticsearchApiRequest.call(this, "DELETE", endpoint);
          }
        } else if (operation === "get") {
          const indexId = this.getNodeParameter("indexId", i);
          const documentId = this.getNodeParameter("documentId", i);
          const qs = {};
          const options = this.getNodeParameter("options", i);
          if (Object.keys(options).length) {
            Object.assign(qs, options);
            qs._source = true;
          }
          const endpoint = `/${indexId}/_doc/${documentId}`;
          responseData = await import_GenericFunctions.elasticsearchApiRequest.call(this, "GET", endpoint, {}, qs);
          const simple = this.getNodeParameter("simple", i);
          if (simple) {
            responseData = {
              _id: responseData._id,
              ...responseData._source
            };
          }
        } else if (operation === "getAll") {
          const indexId = this.getNodeParameter("indexId", i);
          const body = {};
          const qs = {};
          const options = this.getNodeParameter("options", i);
          if (Object.keys(options).length) {
            const { query, ...rest } = options;
            if (query) {
              Object.assign(
                body,
                (0, import_n8n_workflow.jsonParse)(query, { errorMessage: "Invalid JSON in 'Query' option" })
              );
            }
            Object.assign(qs, rest);
            qs._source = true;
          }
          const returnAll = this.getNodeParameter("returnAll", 0);
          if (returnAll) {
            qs.size = 1e4;
            if (qs.sort) {
              responseData = await import_GenericFunctions.elasticsearchApiRequestAllItems.call(
                this,
                indexId,
                body,
                qs
              );
            } else {
              responseData = await import_GenericFunctions.elasticsearchApiRequest.call(
                this,
                "POST",
                `/${indexId}/_search`,
                body,
                qs
              );
              responseData = responseData.hits.hits;
            }
          } else {
            qs.size = this.getNodeParameter("limit", 0);
            responseData = await import_GenericFunctions.elasticsearchApiRequest.call(
              this,
              "POST",
              `/${indexId}/_search`,
              body,
              qs
            );
            responseData = responseData.hits.hits;
          }
          const simple = this.getNodeParameter("simple", 0);
          if (simple) {
            responseData = responseData.map((item) => {
              return {
                _id: item._id,
                ...item._source
              };
            });
          }
        } else if (operation === "create") {
          const body = {};
          const dataToSend = this.getNodeParameter("dataToSend", 0);
          if (dataToSend === "defineBelow") {
            const fields = this.getNodeParameter("fieldsUi.fieldValues", i, []);
            fields.forEach(({ fieldId, fieldValue }) => body[fieldId] = fieldValue);
          } else {
            const inputData = items[i].json;
            const rawInputsToIgnore = this.getNodeParameter("inputsToIgnore", i);
            const inputsToIgnore = rawInputsToIgnore.split(",").map((c) => c.trim());
            for (const key of Object.keys(inputData)) {
              if (inputsToIgnore.includes(key)) continue;
              body[key] = inputData[key];
            }
          }
          const qs = {};
          const additionalFields = this.getNodeParameter("additionalFields", i);
          if (Object.keys(additionalFields).length) {
            Object.assign(qs, (0, import_omit.default)(additionalFields, ["documentId"]));
          }
          const indexId = this.getNodeParameter("indexId", i);
          const { documentId } = additionalFields;
          if (bulkOperation) {
            bulkBody[i] = JSON.stringify({
              index: {
                _index: indexId,
                _id: documentId
              }
            });
            bulkBody[i] += `
${JSON.stringify(body)}`;
          } else {
            if (documentId) {
              const endpoint = `/${indexId}/_doc/${documentId}`;
              responseData = await import_GenericFunctions.elasticsearchApiRequest.call(this, "PUT", endpoint, body);
            } else {
              const endpoint = `/${indexId}/_doc`;
              responseData = await import_GenericFunctions.elasticsearchApiRequest.call(this, "POST", endpoint, body);
            }
          }
        } else if (operation === "update") {
          const body = { doc: {} };
          const dataToSend = this.getNodeParameter("dataToSend", 0);
          if (dataToSend === "defineBelow") {
            const fields = this.getNodeParameter("fieldsUi.fieldValues", i, []);
            fields.forEach(({ fieldId, fieldValue }) => body.doc[fieldId] = fieldValue);
          } else {
            const inputData = items[i].json;
            const rawInputsToIgnore = this.getNodeParameter("inputsToIgnore", i);
            const inputsToIgnore = rawInputsToIgnore.split(",").map((c) => c.trim());
            for (const key of Object.keys(inputData)) {
              if (inputsToIgnore.includes(key)) continue;
              body.doc[key] = inputData[key];
            }
          }
          const indexId = this.getNodeParameter("indexId", i);
          const documentId = this.getNodeParameter("documentId", i);
          const endpoint = `/${indexId}/_update/${documentId}`;
          if (bulkOperation) {
            bulkBody[i] = JSON.stringify({
              update: {
                _index: indexId,
                _id: documentId
              }
            });
            bulkBody[i] += `
${JSON.stringify(body)}`;
          } else {
            responseData = await import_GenericFunctions.elasticsearchApiRequest.call(this, "POST", endpoint, body);
          }
        }
      } else if (resource === "index") {
        if (operation === "create") {
          const indexId = this.getNodeParameter("indexId", i);
          const body = {};
          const qs = {};
          const additionalFields = this.getNodeParameter("additionalFields", i);
          if (Object.keys(additionalFields).length) {
            const { aliases, mappings, settings, ...rest } = additionalFields;
            Object.assign(body, aliases, mappings, settings);
            Object.assign(qs, rest);
          }
          responseData = await import_GenericFunctions.elasticsearchApiRequest.call(this, "PUT", `/${indexId}`);
          responseData = { id: indexId, ...responseData };
          delete responseData.index;
        } else if (operation === "delete") {
          const indexId = this.getNodeParameter("indexId", i);
          responseData = await import_GenericFunctions.elasticsearchApiRequest.call(this, "DELETE", `/${indexId}`);
          responseData = { success: true };
        } else if (operation === "get") {
          const indexId = this.getNodeParameter("indexId", i);
          const qs = {};
          const additionalFields = this.getNodeParameter("additionalFields", i);
          if (Object.keys(additionalFields).length) {
            Object.assign(qs, additionalFields);
          }
          responseData = await import_GenericFunctions.elasticsearchApiRequest.call(this, "GET", `/${indexId}`, {}, qs);
          responseData = { id: indexId, ...responseData[indexId] };
        } else if (operation === "getAll") {
          responseData = await import_GenericFunctions.elasticsearchApiRequest.call(this, "GET", "/_aliases");
          responseData = Object.keys(responseData).map((index) => ({
            indexId: index
          }));
          const returnAll = this.getNodeParameter("returnAll", i);
          if (!returnAll) {
            const limit = this.getNodeParameter("limit", i);
            responseData = responseData.slice(0, limit);
          }
        }
      }
      if (!bulkOperation) {
        const executionData = this.helpers.constructExecutionMetaData(
          this.helpers.returnJsonArray(responseData),
          { itemData: { item: i } }
        );
        returnData.push(...executionData);
      }
      if (Object.keys(bulkBody).length >= 50) {
        responseData = await import_GenericFunctions.elasticsearchBulkApiRequest.call(this, bulkBody);
        for (let j = 0; j < responseData.length; j++) {
          const itemData = responseData[j];
          if (itemData.error) {
            const errorData = itemData.error;
            const message = errorData.type;
            const description = errorData.reason;
            const itemIndex = parseInt(Object.keys(bulkBody)[j]);
            if (this.continueOnFail()) {
              returnData.push(
                ...this.helpers.constructExecutionMetaData(
                  this.helpers.returnJsonArray({ error: message, message: itemData.error }),
                  { itemData: { item: itemIndex } }
                )
              );
              continue;
            } else {
              throw new import_n8n_workflow.NodeApiError(this.getNode(), {
                message,
                description,
                itemIndex
              });
            }
          }
          const executionData = this.helpers.constructExecutionMetaData(
            this.helpers.returnJsonArray(itemData),
            { itemData: { item: parseInt(Object.keys(bulkBody)[j]) } }
          );
          returnData.push(...executionData);
        }
        bulkBody = {};
      }
    }
    if (Object.keys(bulkBody).length) {
      responseData = await import_GenericFunctions.elasticsearchBulkApiRequest.call(this, bulkBody);
      for (let j = 0; j < responseData.length; j++) {
        const itemData = responseData[j];
        if (itemData.error) {
          const errorData = itemData.error;
          const message = errorData.type;
          const description = errorData.reason;
          const itemIndex = parseInt(Object.keys(bulkBody)[j]);
          if (this.continueOnFail()) {
            returnData.push(
              ...this.helpers.constructExecutionMetaData(
                this.helpers.returnJsonArray({ error: message, message: itemData.error }),
                { itemData: { item: itemIndex } }
              )
            );
            continue;
          } else {
            throw new import_n8n_workflow.NodeApiError(this.getNode(), {
              message,
              description,
              itemIndex
            });
          }
        }
        const executionData = this.helpers.constructExecutionMetaData(
          this.helpers.returnJsonArray(itemData),
          { itemData: { item: parseInt(Object.keys(bulkBody)[j]) } }
        );
        returnData.push(...executionData);
      }
    }
    return [returnData];
  }
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  Elasticsearch
});
//# sourceMappingURL=Elasticsearch.node.js.map