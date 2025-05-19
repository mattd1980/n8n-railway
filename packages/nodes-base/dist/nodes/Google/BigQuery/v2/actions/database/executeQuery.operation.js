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
var executeQuery_operation_exports = {};
__export(executeQuery_operation_exports, {
  description: () => description,
  execute: () => execute
});
module.exports = __toCommonJS(executeQuery_operation_exports);
var import_n8n_workflow = require("n8n-workflow");
var import_utilities = require("../../../../../../utils/utilities");
var import_utils = require("../../helpers/utils");
var import_transport = require("../../transport");
const properties = [
  {
    displayName: "SQL Query",
    name: "sqlQuery",
    type: "string",
    noDataExpression: true,
    typeOptions: {
      editor: "sqlEditor"
    },
    displayOptions: {
      hide: {
        "/options.useLegacySql": [true]
      }
    },
    default: "",
    placeholder: "SELECT * FROM dataset.table LIMIT 100",
    description: `SQL query to execute, you can find more information <a href="https://cloud.google.com/bigquery/docs/reference/standard-sql/query-syntax" target="_blank">here</a>. Standard SQL syntax used by default, but you can also use Legacy SQL syntax by using optinon 'Use Legacy SQL'.`
  },
  {
    displayName: "SQL Query",
    name: "sqlQuery",
    type: "string",
    noDataExpression: true,
    typeOptions: {
      editor: "sqlEditor"
    },
    displayOptions: {
      show: {
        "/options.useLegacySql": [true]
      }
    },
    default: "",
    placeholder: "SELECT * FROM [project:dataset.table] LIMIT 100;",
    hint: "Legacy SQL syntax",
    description: 'SQL query to execute, you can find more information about Legacy SQL syntax <a href="https://cloud.google.com/bigquery/docs/reference/standard-sql/query-syntax" target="_blank">here</a>'
  },
  {
    displayName: "Options",
    name: "options",
    type: "collection",
    placeholder: "Add option",
    default: {},
    options: [
      {
        displayName: "Default Dataset Name or ID",
        name: "defaultDataset",
        type: "options",
        typeOptions: {
          loadOptionsMethod: "getDatasets",
          loadOptionsDependsOn: ["projectId.value"]
        },
        default: "",
        description: `If not set, all table names in the query string must be qualified in the format 'datasetId.tableId'. Choose from the list, or specify an ID using an <a href="https://docs.n8n.io/code/expressions/">expression</a>.`
      },
      {
        displayName: "Dry Run",
        name: "dryRun",
        type: "boolean",
        default: false,
        description: "Whether set to true BigQuery doesn't run the job. Instead, if the query is valid, BigQuery returns statistics about the job such as how many bytes would be processed. If the query is invalid, an error returns."
      },
      {
        displayName: "Include Schema in Output",
        name: "includeSchema",
        type: "boolean",
        default: false,
        description: "Whether to include the schema in the output. If set to true, the output will contain key '_schema' with the schema of the table.",
        displayOptions: {
          hide: {
            rawOutput: [true]
          }
        }
      },
      {
        displayName: "Location (Region)",
        name: "location",
        type: "string",
        default: "",
        placeholder: "e.g. europe-west3",
        description: 'Location or the region where data would be stored and processed. Pricing for storage and analysis is also defined by location of data and reservations, more information <a href="https://cloud.google.com/bigquery/docs/locations" target="_blank">here</a>.'
      },
      {
        displayName: "Maximum Bytes Billed",
        name: "maximumBytesBilled",
        type: "string",
        default: "",
        description: 'Limits the bytes billed for this query. Queries with bytes billed above this limit will fail (without incurring a charge). String in <a href="https://developers.google.com/discovery/v1/type-format?utm_source=cloud.google.com&utm_medium=referral" target="_blank">Int64Value</a> format'
      },
      {
        displayName: "Max Results Per Page",
        name: "maxResults",
        type: "number",
        default: 1e3,
        description: "Maximum number of results to return per page of results. This is particularly useful when dealing with large datasets. It will not affect the total number of results returned, e.g. rows in a table. You can use LIMIT in your SQL query to limit the number of rows returned."
      },
      {
        displayName: "Timeout",
        name: "timeoutMs",
        type: "number",
        default: 1e4,
        hint: "How long to wait for the query to complete, in milliseconds",
        description: "Specifies the maximum amount of time, in milliseconds, that the client is willing to wait for the query to complete. Be aware that the call is not guaranteed to wait for the specified timeout; it typically returns after around 200 seconds (200,000 milliseconds), even if the query is not complete."
      },
      {
        displayName: "Raw Output",
        name: "rawOutput",
        type: "boolean",
        default: false,
        displayOptions: {
          hide: {
            dryRun: [true]
          }
        }
      },
      {
        displayName: "Use Legacy SQL",
        name: "useLegacySql",
        type: "boolean",
        default: false,
        description: "Whether to use BigQuery's legacy SQL dialect for this query. If set to false, the query will use BigQuery's standard SQL."
      },
      {
        displayName: "Return Integers as Numbers",
        name: "returnAsNumbers",
        type: "boolean",
        default: false,
        description: "Whether all integer values will be returned as numbers. If set to false, all integer values will be returned as strings."
      }
    ]
  }
];
const displayOptions = {
  show: {
    resource: ["database"],
    operation: ["executeQuery"]
  }
};
const description = (0, import_utilities.updateDisplayOptions)(displayOptions, properties);
async function execute() {
  const items = this.getInputData();
  const length = items.length;
  const returnData = [];
  let jobs = [];
  let maxResults = 1e3;
  let timeoutMs = 1e4;
  for (let i = 0; i < length; i++) {
    try {
      let sqlQuery = this.getNodeParameter("sqlQuery", i);
      const options = this.getNodeParameter("options", i);
      const projectId = this.getNodeParameter("projectId", i, void 0, {
        extractValue: true
      });
      for (const resolvable of (0, import_utilities.getResolvables)(sqlQuery)) {
        sqlQuery = sqlQuery.replace(resolvable, this.evaluateExpression(resolvable, i));
      }
      let rawOutput = false;
      let includeSchema = false;
      if (options.rawOutput !== void 0) {
        rawOutput = options.rawOutput;
        delete options.rawOutput;
      }
      if (options.includeSchema !== void 0) {
        includeSchema = options.includeSchema;
        delete options.includeSchema;
      }
      if (options.maxResults) {
        maxResults = options.maxResults;
        delete options.maxResults;
      }
      if (options.timeoutMs) {
        timeoutMs = options.timeoutMs;
        delete options.timeoutMs;
      }
      const body = { ...options };
      body.query = sqlQuery;
      if (body.defaultDataset) {
        body.defaultDataset = {
          datasetId: options.defaultDataset,
          projectId
        };
      }
      if (body.useLegacySql === void 0) {
        body.useLegacySql = false;
      }
      const response = await import_transport.googleBigQueryApiRequest.call(
        this,
        "POST",
        `/v2/projects/${projectId}/jobs`,
        {
          configuration: {
            query: body
          }
        }
      );
      if (!response?.jobReference?.jobId) {
        throw new import_n8n_workflow.NodeOperationError(this.getNode(), `No job ID returned, item ${i}`, {
          description: `sql: ${sqlQuery}`,
          itemIndex: i
        });
      }
      const jobId = response?.jobReference?.jobId;
      const raw = rawOutput || options.dryRun || false;
      const location = options.location || response.jobReference.location;
      if (response.status?.state === "DONE") {
        const qs = { location, maxResults, timeoutMs };
        const queryResponse = await import_transport.googleBigQueryApiRequestAllItems.call(
          this,
          "GET",
          `/v2/projects/${projectId}/queries/${jobId}`,
          void 0,
          qs
        );
        if (body.returnAsNumbers === true) {
          const numericDataTypes = ["INTEGER", "NUMERIC", "FLOAT", "BIGNUMERIC"];
          const schema = queryResponse?.schema;
          const schemaFields = schema.fields;
          const schemaDataTypes = schemaFields?.map(
            (field) => field.type
          );
          const rows = queryResponse.rows;
          for (const row of rows) {
            if (!row?.f || !Array.isArray(row.f)) continue;
            row.f.forEach((entry, index) => {
              if (entry && typeof entry === "object" && "v" in entry) {
                const value = entry.v;
                if (numericDataTypes.includes(schemaDataTypes[index])) {
                  entry.v = Number(value);
                }
              }
            });
          }
        }
        returnData.push(...import_utils.prepareOutput.call(this, queryResponse, i, raw, includeSchema));
      } else {
        jobs.push({ jobId, projectId, i, raw, includeSchema, location });
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
      if (error.message.includes("location") || error.httpCode === "404") {
        error.description = "Are you sure your table is in that region? You can specify the region using the 'Location' parameter from options.";
      }
      if (error.httpCode === "403" && error.message.includes("Drive")) {
        error.description = "If your table(s) pull from a document in Google Drive, make sure that document is shared with your user";
      }
      throw new import_n8n_workflow.NodeOperationError(this.getNode(), error, {
        itemIndex: i,
        description: error.description
      });
    }
  }
  let waitTime = 1e3;
  while (jobs.length > 0) {
    const completedJobs = [];
    for (const job of jobs) {
      try {
        const qs = job.location ? { location: job.location } : {};
        qs.maxResults = maxResults;
        qs.timeoutMs = timeoutMs;
        const response = await import_transport.googleBigQueryApiRequestAllItems.call(
          this,
          "GET",
          `/v2/projects/${job.projectId}/queries/${job.jobId}`,
          void 0,
          qs
        );
        if (response.jobComplete) {
          completedJobs.push(job.jobId);
          returnData.push(...import_utils.prepareOutput.call(this, response, job.i, job.raw, job.includeSchema));
        }
        if (response?.errors?.length) {
          const errorMessages = response.errors.map((error) => error.message);
          throw new import_n8n_workflow.ApplicationError(
            `Error(s) ocurring while executing query from item ${job.i.toString()}: ${errorMessages.join(
              ", "
            )}`,
            { level: "warning" }
          );
        }
      } catch (error) {
        if (this.continueOnFail()) {
          const executionErrorData = this.helpers.constructExecutionMetaData(
            this.helpers.returnJsonArray({ error: error.message }),
            { itemData: { item: job.i } }
          );
          returnData.push(...executionErrorData);
          continue;
        }
        throw new import_n8n_workflow.NodeOperationError(this.getNode(), error, {
          itemIndex: job.i,
          description: error.description
        });
      }
    }
    jobs = jobs.filter((job) => !completedJobs.includes(job.jobId));
    if (jobs.length > 0) {
      await (0, import_n8n_workflow.sleep)(waitTime);
      if (waitTime < 3e4) {
        waitTime = waitTime * 2;
      }
    }
  }
  return returnData;
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  description,
  execute
});
//# sourceMappingURL=executeQuery.operation.js.map