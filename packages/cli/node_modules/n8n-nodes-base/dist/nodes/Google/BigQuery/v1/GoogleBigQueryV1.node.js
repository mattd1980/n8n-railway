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
var GoogleBigQueryV1_node_exports = {};
__export(GoogleBigQueryV1_node_exports, {
  GoogleBigQueryV1: () => GoogleBigQueryV1
});
module.exports = __toCommonJS(GoogleBigQueryV1_node_exports);
var import_n8n_workflow = require("n8n-workflow");
var import_uuid = require("uuid");
var import_descriptions = require("../../../../utils/descriptions");
var import_GenericFunctions = require("./GenericFunctions");
var import_RecordDescription = require("./RecordDescription");
var import_utilities = require("../../../../utils/utilities");
const versionDescription = {
  displayName: "Google BigQuery",
  name: "googleBigQuery",
  icon: "file:googleBigQuery.svg",
  group: ["input"],
  version: 1,
  subtitle: '={{$parameter["operation"] + ": " + $parameter["resource"]}}',
  description: "Consume Google BigQuery API",
  defaults: {
    name: "Google BigQuery"
  },
  inputs: [import_n8n_workflow.NodeConnectionTypes.Main],
  outputs: [import_n8n_workflow.NodeConnectionTypes.Main],
  credentials: [
    {
      name: "googleApi",
      required: true,
      displayOptions: {
        show: {
          authentication: ["serviceAccount"]
        }
      }
    },
    {
      name: "googleBigQueryOAuth2Api",
      required: true,
      displayOptions: {
        show: {
          authentication: ["oAuth2"]
        }
      }
    }
  ],
  properties: [
    import_descriptions.oldVersionNotice,
    {
      displayName: "Authentication",
      name: "authentication",
      type: "options",
      noDataExpression: true,
      options: [
        {
          // eslint-disable-next-line n8n-nodes-base/node-param-display-name-miscased
          name: "OAuth2 (recommended)",
          value: "oAuth2"
        },
        {
          name: "Service Account",
          value: "serviceAccount"
        }
      ],
      default: "oAuth2"
    },
    {
      displayName: "Resource",
      name: "resource",
      type: "options",
      noDataExpression: true,
      options: [
        {
          name: "Record",
          value: "record"
        }
      ],
      default: "record"
    },
    ...import_RecordDescription.recordOperations,
    ...import_RecordDescription.recordFields
  ]
};
class GoogleBigQueryV1 {
  constructor(baseDescription) {
    this.methods = {
      loadOptions: {
        async getProjects() {
          const returnData = [];
          const { projects } = await import_GenericFunctions.googleApiRequest.call(this, "GET", "/v2/projects");
          for (const project of projects) {
            returnData.push({
              name: project.friendlyName,
              value: project.id
            });
          }
          return returnData;
        },
        async getDatasets() {
          const projectId = this.getCurrentNodeParameter("projectId");
          const returnData = [];
          const { datasets } = await import_GenericFunctions.googleApiRequest.call(
            this,
            "GET",
            `/v2/projects/${projectId}/datasets`
          );
          for (const dataset of datasets) {
            returnData.push({
              name: dataset.datasetReference.datasetId,
              value: dataset.datasetReference.datasetId
            });
          }
          return returnData;
        },
        async getTables() {
          const projectId = this.getCurrentNodeParameter("projectId");
          const datasetId = this.getCurrentNodeParameter("datasetId");
          const returnData = [];
          const { tables } = await import_GenericFunctions.googleApiRequest.call(
            this,
            "GET",
            `/v2/projects/${projectId}/datasets/${datasetId}/tables`
          );
          for (const table of tables) {
            returnData.push({
              name: table.tableReference.tableId,
              value: table.tableReference.tableId
            });
          }
          return returnData;
        }
      }
    };
    this.description = {
      ...baseDescription,
      ...versionDescription
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
    if (resource === "record") {
      if (operation === "create") {
        const projectId = this.getNodeParameter("projectId", 0);
        const datasetId = this.getNodeParameter("datasetId", 0);
        const tableId = this.getNodeParameter("tableId", 0);
        const rows = [];
        const body = {};
        for (let i = 0; i < length; i++) {
          const options = this.getNodeParameter("options", i);
          Object.assign(body, options);
          if (body.traceId === void 0) {
            body.traceId = (0, import_uuid.v4)();
          }
          const columns = this.getNodeParameter("columns", i);
          const columnList = columns.split(",").map((column) => column.trim());
          const record = {};
          for (const key of Object.keys(items[i].json)) {
            if (columnList.includes(key)) {
              record[`${key}`] = items[i].json[key];
            }
          }
          rows.push({ json: record });
        }
        body.rows = rows;
        const itemData = (0, import_utilities.generatePairedItemData)(items.length);
        try {
          responseData = await import_GenericFunctions.googleApiRequest.call(
            this,
            "POST",
            `/v2/projects/${projectId}/datasets/${datasetId}/tables/${tableId}/insertAll`,
            body
          );
          const executionData = this.helpers.constructExecutionMetaData(
            this.helpers.returnJsonArray(responseData),
            { itemData }
          );
          returnData.push(...executionData);
        } catch (error) {
          if (this.continueOnFail()) {
            const executionErrorData = this.helpers.constructExecutionMetaData(
              this.helpers.returnJsonArray({ error: error.message }),
              { itemData }
            );
            returnData.push(...executionErrorData);
          }
          throw new import_n8n_workflow.NodeApiError(this.getNode(), error, { itemIndex: 0 });
        }
      } else if (operation === "getAll") {
        const returnAll = this.getNodeParameter("returnAll", 0);
        const projectId = this.getNodeParameter("projectId", 0);
        const datasetId = this.getNodeParameter("datasetId", 0);
        const tableId = this.getNodeParameter("tableId", 0);
        const simple = this.getNodeParameter("simple", 0);
        let fields;
        if (simple) {
          const { schema } = await import_GenericFunctions.googleApiRequest.call(
            this,
            "GET",
            `/v2/projects/${projectId}/datasets/${datasetId}/tables/${tableId}`,
            {}
          );
          fields = (schema.fields || []).map((field) => field.name);
        }
        for (let i = 0; i < length; i++) {
          try {
            const options = this.getNodeParameter("options", i);
            Object.assign(qs, options);
            if (qs.selectedFields) {
              fields = qs.selectedFields.split(",");
            }
            if (returnAll) {
              responseData = await import_GenericFunctions.googleApiRequestAllItems.call(
                this,
                "rows",
                "GET",
                `/v2/projects/${projectId}/datasets/${datasetId}/tables/${tableId}/data`,
                {},
                qs
              );
            } else {
              qs.maxResults = this.getNodeParameter("limit", i);
              responseData = await import_GenericFunctions.googleApiRequest.call(
                this,
                "GET",
                `/v2/projects/${projectId}/datasets/${datasetId}/tables/${tableId}/data`,
                {},
                qs
              );
            }
            if (!returnAll) {
              responseData = responseData.rows;
            }
            responseData = simple ? (0, import_GenericFunctions.simplify)(responseData, fields) : responseData;
            const executionData = this.helpers.constructExecutionMetaData(
              this.helpers.returnJsonArray(responseData),
              { itemData: { item: i } }
            );
            returnData.push(...executionData);
          } catch (error) {
            if (this.continueOnFail()) {
              const executionErrorData = this.helpers.constructExecutionMetaData(
                this.helpers.returnJsonArray({ error: error.message }),
                { itemData: { item: i } }
              );
              returnData.push(...executionErrorData);
              continue;
            }
            throw new import_n8n_workflow.NodeApiError(this.getNode(), error, { itemIndex: i });
          }
        }
      }
    }
    return [returnData];
  }
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  GoogleBigQueryV1
});
//# sourceMappingURL=GoogleBigQueryV1.node.js.map