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
var TheHive_node_exports = {};
__export(TheHive_node_exports, {
  TheHive: () => TheHive
});
module.exports = __toCommonJS(TheHive_node_exports);
var import_set = __toESM(require("lodash/set"));
var import_n8n_workflow = require("n8n-workflow");
var import_AlertDescription = require("./descriptions/AlertDescription");
var import_CaseDescription = require("./descriptions/CaseDescription");
var import_LogDescription = require("./descriptions/LogDescription");
var import_ObservableDescription = require("./descriptions/ObservableDescription");
var import_TaskDescription = require("./descriptions/TaskDescription");
var import_GenericFunctions = require("./GenericFunctions");
var import_QueryFunctions = require("./QueryFunctions");
class TheHive {
  constructor() {
    this.description = {
      displayName: "TheHive",
      name: "theHive",
      icon: "file:thehive.svg",
      group: ["transform"],
      subtitle: '={{$parameter["operation"]}} : {{$parameter["resource"]}}',
      version: 1,
      description: "Consume TheHive API",
      defaults: {
        name: "TheHive"
      },
      usableAsTool: true,
      inputs: [import_n8n_workflow.NodeConnectionTypes.Main],
      outputs: [import_n8n_workflow.NodeConnectionTypes.Main],
      credentials: [
        {
          name: "theHiveApi",
          required: true
        }
      ],
      properties: [
        {
          displayName: "Resource",
          name: "resource",
          type: "options",
          noDataExpression: true,
          required: true,
          options: [
            {
              name: "Alert",
              value: "alert"
            },
            {
              name: "Case",
              value: "case"
            },
            {
              name: "Log",
              value: "log"
            },
            {
              name: "Observable",
              value: "observable"
            },
            {
              name: "Task",
              value: "task"
            }
          ],
          default: "alert"
        },
        // Alert
        ...import_AlertDescription.alertOperations,
        ...import_AlertDescription.alertFields,
        // Observable
        ...import_ObservableDescription.observableOperations,
        ...import_ObservableDescription.observableFields,
        // Case
        ...import_CaseDescription.caseOperations,
        ...import_CaseDescription.caseFields,
        // Task
        ...import_TaskDescription.taskOperations,
        ...import_TaskDescription.taskFields,
        // Log
        ...import_LogDescription.logOperations,
        ...import_LogDescription.logFields
      ]
    };
    this.methods = {
      loadOptions: {
        async loadResponders() {
          const resource = (0, import_GenericFunctions.mapResource)(this.getNodeParameter("resource"));
          const resourceId = this.getNodeParameter("id");
          const endpoint = `/connector/cortex/responder/${resource}/${resourceId}`;
          const responders = await import_GenericFunctions.theHiveApiRequest.call(this, "GET", endpoint);
          const returnData = [];
          for (const responder of responders) {
            returnData.push({
              name: responder.name,
              value: responder.id,
              description: responder.description
            });
          }
          return returnData;
        },
        async loadAnalyzers() {
          const dataType = this.getNodeParameter("dataType");
          const endpoint = `/connector/cortex/analyzer/type/${dataType}`;
          const requestResult = await import_GenericFunctions.theHiveApiRequest.call(this, "GET", endpoint);
          const returnData = [];
          for (const analyzer of requestResult) {
            for (const cortexId of analyzer.cortexIds) {
              returnData.push({
                name: `[${cortexId}] ${analyzer.name}`,
                value: `${analyzer.id}::${cortexId}`,
                description: analyzer.description
              });
            }
          }
          return returnData;
        },
        async loadCustomFields() {
          const credentials = await this.getCredentials("theHiveApi");
          const version = credentials.apiVersion;
          const endpoint = version === "v1" ? "/customField" : "/list/custom_fields";
          const requestResult = await import_GenericFunctions.theHiveApiRequest.call(this, "GET", endpoint);
          const returnData = [];
          const customFields = version === "v1" ? requestResult : Object.keys(requestResult).map((key) => requestResult[key]);
          for (const field of customFields) {
            returnData.push({
              name: `${field.name}: ${field.reference}`,
              value: field.reference,
              description: `${field.type}: ${field.description}`
            });
          }
          return returnData;
        },
        async loadObservableOptions() {
          const version = (await this.getCredentials("theHiveApi")).apiVersion;
          const options = [
            ...version === "v1" ? [{ name: "Count", value: "count", description: "Count observables" }] : [],
            { name: "Create", value: "create", description: "Create observable" },
            {
              name: "Execute Analyzer",
              value: "executeAnalyzer",
              description: "Execute an responder on selected observable"
            },
            {
              name: "Execute Responder",
              value: "executeResponder",
              description: "Execute a responder on selected observable"
            },
            {
              name: "Get Many",
              value: "getAll",
              description: "Get all observables of a specific case"
            },
            { name: "Get", value: "get", description: "Get a single observable" },
            { name: "Search", value: "search", description: "Search observables" },
            { name: "Update", value: "update", description: "Update observable" }
          ];
          return options;
        },
        async loadObservableTypes() {
          const version = (await this.getCredentials("theHiveApi")).apiVersion;
          const endpoint = version === "v1" ? "/observable/type?range=all" : "/list/list_artifactDataType";
          const dataTypes = await import_GenericFunctions.theHiveApiRequest.call(this, "GET", endpoint);
          let returnData = [];
          if (version === "v1") {
            returnData = dataTypes.map((dataType) => {
              return {
                name: dataType.name,
                value: dataType.name
              };
            });
          } else {
            returnData = Object.keys(dataTypes).map((key) => {
              const dataType = dataTypes[key];
              return {
                name: dataType,
                value: dataType
              };
            });
          }
          returnData.sort((a, b) => {
            if (a.name < b.name) {
              return -1;
            }
            if (a.name > b.name) {
              return 1;
            }
            return 0;
          });
          return returnData;
        },
        async loadTaskOptions() {
          const credentials = await this.getCredentials("theHiveApi");
          const version = credentials.apiVersion;
          const options = [
            ...version === "v1" ? [{ name: "Count", value: "count", description: "Count tasks" }] : [],
            { name: "Create", value: "create", description: "Create a task" },
            {
              name: "Execute Responder",
              value: "executeResponder",
              description: "Execute a responder on the specified task"
            },
            { name: "Get Many", value: "getAll", description: "Get all asks of a specific case" },
            { name: "Get", value: "get", description: "Get a single task" },
            { name: "Search", value: "search", description: "Search tasks" },
            { name: "Update", value: "update", description: "Update a task" }
          ];
          return options;
        },
        async loadAlertOptions() {
          const credentials = await this.getCredentials("theHiveApi");
          const version = credentials.apiVersion;
          const options = [
            ...version === "v1" ? [{ name: "Count", value: "count", description: "Count alerts" }] : [],
            { name: "Create", value: "create", description: "Create alert" },
            {
              name: "Execute Responder",
              value: "executeResponder",
              description: "Execute a responder on the specified alert"
            },
            { name: "Get", value: "get", description: "Get an alert" },
            { name: "Get Many", value: "getAll", description: "Get all alerts" },
            { name: "Mark as Read", value: "markAsRead", description: "Mark the alert as read" },
            {
              name: "Mark as Unread",
              value: "markAsUnread",
              description: "Mark the alert as unread"
            },
            { name: "Merge", value: "merge", description: "Merge alert into an existing case" },
            { name: "Promote", value: "promote", description: "Promote an alert into a case" },
            { name: "Update", value: "update", description: "Update alert" }
          ];
          return options;
        },
        async loadCaseOptions() {
          const credentials = await this.getCredentials("theHiveApi");
          const version = credentials.apiVersion;
          const options = [
            ...version === "v1" ? [{ name: "Count", value: "count", description: "Count a case" }] : [],
            { name: "Create", value: "create", description: "Create a case" },
            {
              name: "Execute Responder",
              value: "executeResponder",
              description: "Execute a responder on the specified case"
            },
            { name: "Get Many", value: "getAll", description: "Get all cases" },
            { name: "Get", value: "get", description: "Get a single case" },
            { name: "Update", value: "update", description: "Update a case" }
          ];
          return options;
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
      try {
        if (resource === "alert") {
          if (operation === "count") {
            const filters = this.getNodeParameter("filters", i, {});
            const countQueryAttributs = (0, import_GenericFunctions.prepareOptional)(filters);
            const _countSearchQuery = (0, import_QueryFunctions.And)();
            if ("customFieldsUi" in filters) {
              const customFields = await import_GenericFunctions.prepareCustomFields.call(this, filters);
              const searchQueries = (0, import_GenericFunctions.buildCustomFieldSearch)(customFields);
              _countSearchQuery["_and"].push(...searchQueries);
            }
            for (const key of Object.keys(countQueryAttributs)) {
              if (key === "tags") {
                _countSearchQuery["_and"].push(
                  (0, import_QueryFunctions.In)(key, countQueryAttributs[key])
                );
              } else if (key === "description" || key === "title") {
                _countSearchQuery["_and"].push(
                  (0, import_QueryFunctions.ContainsString)(key, countQueryAttributs[key])
                );
              } else {
                _countSearchQuery["_and"].push(
                  (0, import_QueryFunctions.Eq)(key, countQueryAttributs[key])
                );
              }
            }
            const body = {
              query: [
                {
                  _name: "listAlert"
                },
                {
                  _name: "filter",
                  _and: _countSearchQuery["_and"]
                }
              ]
            };
            body["query"].push({
              _name: "count"
            });
            qs.name = "count-Alert";
            responseData = await import_GenericFunctions.theHiveApiRequest.call(this, "POST", "/v1/query", body, qs);
            responseData = { count: responseData };
          }
          if (operation === "create") {
            const additionalFields = this.getNodeParameter(
              "additionalFields",
              i
            );
            const jsonParameters = this.getNodeParameter("jsonParameters", i);
            const customFields = await import_GenericFunctions.prepareCustomFields.call(
              this,
              additionalFields,
              jsonParameters
            );
            const body = {
              title: this.getNodeParameter("title", i),
              description: this.getNodeParameter("description", i),
              severity: this.getNodeParameter("severity", i),
              date: Date.parse(this.getNodeParameter("date", i)),
              tags: (0, import_GenericFunctions.splitTags)(this.getNodeParameter("tags", i)),
              tlp: this.getNodeParameter("tlp", i),
              status: this.getNodeParameter("status", i),
              type: this.getNodeParameter("type", i),
              source: this.getNodeParameter("source", i),
              sourceRef: this.getNodeParameter("sourceRef", i),
              follow: this.getNodeParameter("follow", i, true),
              ...(0, import_GenericFunctions.prepareOptional)(additionalFields)
            };
            if (customFields) {
              Object.keys(customFields).forEach((key) => {
                (0, import_set.default)(body, key, customFields[key]);
              });
            }
            const artifactUi = this.getNodeParameter("artifactUi", i);
            if (artifactUi) {
              const artifactValues = artifactUi.artifactValues;
              if (artifactValues) {
                const artifactData = [];
                for (const artifactvalue of artifactValues) {
                  const element = {};
                  element.message = artifactvalue.message;
                  element.tags = artifactvalue.tags.split(",");
                  element.dataType = artifactvalue.dataType;
                  element.data = artifactvalue.data;
                  if (artifactvalue.dataType === "file") {
                    const binaryPropertyName = artifactvalue.binaryProperty;
                    const binaryData = this.helpers.assertBinaryData(i, binaryPropertyName);
                    element.data = `${binaryData.fileName};${binaryData.mimeType};${binaryData.data}`;
                  }
                  artifactData.push(element);
                }
                body.artifacts = artifactData;
              }
            }
            responseData = await import_GenericFunctions.theHiveApiRequest.call(this, "POST", "/alert", body);
          }
          if (operation === "executeResponder") {
            const alertId = this.getNodeParameter("id", i);
            const responderId = this.getNodeParameter("responder", i);
            let body;
            let response;
            responseData = [];
            body = {
              responderId,
              objectId: alertId,
              objectType: "alert"
            };
            response = await import_GenericFunctions.theHiveApiRequest.call(
              this,
              "POST",
              "/connector/cortex/action",
              body
            );
            body = {
              query: [
                {
                  _name: "listAction"
                },
                {
                  _name: "filter",
                  _and: [
                    {
                      _field: "cortexId",
                      _value: response.cortexId
                    },
                    {
                      _field: "objectId",
                      _value: response.objectId
                    },
                    {
                      _field: "startDate",
                      _value: response.startDate
                    }
                  ]
                }
              ]
            };
            qs.name = "log-actions";
            do {
              response = await import_GenericFunctions.theHiveApiRequest.call(this, "POST", "/v1/query", body, qs);
            } while (response.status === "Waiting" || response.status === "InProgress");
            responseData = response;
          }
          if (operation === "get") {
            const alertId = this.getNodeParameter("id", i);
            const includeSimilar = this.getNodeParameter(
              "options.includeSimilar",
              i,
              false
            );
            if (includeSimilar) {
              qs.similarity = true;
            }
            responseData = await import_GenericFunctions.theHiveApiRequest.call(this, "GET", `/alert/${alertId}`, {}, qs);
          }
          if (operation === "getAll") {
            const credentials = await this.getCredentials("theHiveApi");
            const returnAll = this.getNodeParameter("returnAll", i);
            const version = credentials.apiVersion;
            const filters = this.getNodeParameter("filters", i, {});
            const queryAttributs = (0, import_GenericFunctions.prepareOptional)(filters);
            const options = this.getNodeParameter("options", i);
            const _searchQuery = (0, import_QueryFunctions.And)();
            if ("customFieldsUi" in filters) {
              const customFields = await import_GenericFunctions.prepareCustomFields.call(this, filters);
              const searchQueries = (0, import_GenericFunctions.buildCustomFieldSearch)(customFields);
              _searchQuery["_and"].push(...searchQueries);
            }
            for (const key of Object.keys(queryAttributs)) {
              if (key === "tags") {
                _searchQuery["_and"].push(
                  (0, import_QueryFunctions.In)(key, queryAttributs[key])
                );
              } else if (key === "description" || key === "title") {
                _searchQuery["_and"].push(
                  (0, import_QueryFunctions.ContainsString)(key, queryAttributs[key])
                );
              } else {
                _searchQuery["_and"].push(
                  (0, import_QueryFunctions.Eq)(key, queryAttributs[key])
                );
              }
            }
            let endpoint;
            let method;
            let body = {};
            let limit = void 0;
            if (!returnAll) {
              limit = this.getNodeParameter("limit", i);
            }
            if (version === "v1") {
              endpoint = "/v1/query";
              method = "POST";
              body = {
                query: [
                  {
                    _name: "listAlert"
                  },
                  {
                    _name: "filter",
                    _and: _searchQuery["_and"]
                  }
                ]
              };
              (0, import_GenericFunctions.prepareSortQuery)(options.sort, body);
              if (limit !== void 0) {
                (0, import_GenericFunctions.prepareRangeQuery)(`0-${limit}`, body);
              }
              qs.name = "alerts";
            } else {
              method = "POST";
              endpoint = "/alert/_search";
              if (limit !== void 0) {
                qs.range = `0-${limit}`;
              }
              body.query = _searchQuery;
              Object.assign(qs, (0, import_GenericFunctions.prepareOptional)(options));
            }
            responseData = await import_GenericFunctions.theHiveApiRequest.call(this, method, endpoint, body, qs);
          }
          if (operation === "markAsRead") {
            const alertId = this.getNodeParameter("id", i);
            responseData = await import_GenericFunctions.theHiveApiRequest.call(
              this,
              "POST",
              `/alert/${alertId}/markAsRead`
            );
          }
          if (operation === "markAsUnread") {
            const alertId = this.getNodeParameter("id", i);
            responseData = await import_GenericFunctions.theHiveApiRequest.call(
              this,
              "POST",
              `/alert/${alertId}/markAsUnread`
            );
          }
          if (operation === "merge") {
            const alertId = this.getNodeParameter("id", i);
            const caseId = this.getNodeParameter("caseId", i);
            responseData = await import_GenericFunctions.theHiveApiRequest.call(
              this,
              "POST",
              `/alert/${alertId}/merge/${caseId}`,
              {}
            );
          }
          if (operation === "promote") {
            const alertId = this.getNodeParameter("id", i);
            const additionalFields = this.getNodeParameter("additionalFields", i);
            const body = {};
            Object.assign(body, additionalFields);
            responseData = await import_GenericFunctions.theHiveApiRequest.call(
              this,
              "POST",
              `/alert/${alertId}/createCase`,
              body
            );
          }
          if (operation === "update") {
            const alertId = this.getNodeParameter("id", i);
            const jsonParameters = this.getNodeParameter("jsonParameters", i);
            const updateFields = this.getNodeParameter("updateFields", i);
            const customFields = await import_GenericFunctions.prepareCustomFields.call(this, updateFields, jsonParameters);
            const artifactUi = updateFields.artifactUi;
            delete updateFields.artifactUi;
            const body = {
              ...customFields
            };
            Object.assign(body, updateFields);
            if (artifactUi) {
              const artifactValues = artifactUi.artifactValues;
              if (artifactValues) {
                const artifactData = [];
                for (const artifactvalue of artifactValues) {
                  const element = {};
                  element.message = artifactvalue.message;
                  element.tags = artifactvalue.tags.split(",");
                  element.dataType = artifactvalue.dataType;
                  element.data = artifactvalue.data;
                  if (artifactvalue.dataType === "file") {
                    const binaryPropertyName = artifactvalue.binaryProperty;
                    const binaryData = this.helpers.assertBinaryData(i, binaryPropertyName);
                    element.data = `${binaryData.fileName};${binaryData.mimeType};${binaryData.data}`;
                  }
                  artifactData.push(element);
                }
                body.artifacts = artifactData;
              }
            }
            responseData = await import_GenericFunctions.theHiveApiRequest.call(this, "PATCH", `/alert/${alertId}`, body);
          }
        }
        if (resource === "observable") {
          if (operation === "count") {
            const countQueryAttributs = (0, import_GenericFunctions.prepareOptional)(
              this.getNodeParameter("filters", i, {})
            );
            const _countSearchQuery = (0, import_QueryFunctions.And)();
            for (const key of Object.keys(countQueryAttributs)) {
              if (key === "dataType" || key === "tags") {
                _countSearchQuery["_and"].push(
                  (0, import_QueryFunctions.In)(key, countQueryAttributs[key])
                );
              } else if (key === "description" || key === "keywork" || key === "message") {
                _countSearchQuery["_and"].push(
                  (0, import_QueryFunctions.ContainsString)(key, countQueryAttributs[key])
                );
              } else if (key === "range") {
                _countSearchQuery["_and"].push(
                  (0, import_QueryFunctions.Between)(
                    "startDate",
                    countQueryAttributs["range"]["dateRange"]["fromDate"],
                    countQueryAttributs["range"]["dateRange"]["toDate"]
                  )
                );
              } else {
                _countSearchQuery["_and"].push(
                  (0, import_QueryFunctions.Eq)(key, countQueryAttributs[key])
                );
              }
            }
            const body = {
              query: [
                {
                  _name: "listObservable"
                },
                {
                  _name: "filter",
                  _and: _countSearchQuery["_and"]
                }
              ]
            };
            body["query"].push({
              _name: "count"
            });
            qs.name = "count-observables";
            responseData = await import_GenericFunctions.theHiveApiRequest.call(this, "POST", "/v1/query", body, qs);
            responseData = { count: responseData };
          }
          if (operation === "executeAnalyzer") {
            const observableId = this.getNodeParameter("id", i);
            const analyzers = this.getNodeParameter("analyzers", i).map(
              (analyzer) => {
                const parts = analyzer.split("::");
                return {
                  analyzerId: parts[0],
                  cortexId: parts[1]
                };
              }
            );
            let response;
            let body;
            responseData = [];
            for (const analyzer of analyzers) {
              body = {
                ...analyzer,
                artifactId: observableId
              };
              response = await import_GenericFunctions.theHiveApiRequest.call(
                this,
                "POST",
                "/connector/cortex/job",
                body,
                qs
              );
              const jobId = response.id;
              qs.name = "observable-jobs";
              do {
                responseData = await import_GenericFunctions.theHiveApiRequest.call(
                  this,
                  "GET",
                  `/connector/cortex/job/${jobId}`,
                  body,
                  qs
                );
              } while (responseData.status === "Waiting" || responseData.status === "InProgress");
            }
          }
          if (operation === "executeResponder") {
            const observableId = this.getNodeParameter("id", i);
            const responderId = this.getNodeParameter("responder", i);
            let body;
            let response;
            responseData = [];
            body = {
              responderId,
              objectId: observableId,
              objectType: "case_artifact"
            };
            response = await import_GenericFunctions.theHiveApiRequest.call(
              this,
              "POST",
              "/connector/cortex/action",
              body
            );
            body = {
              query: [
                {
                  _name: "listAction"
                },
                {
                  _name: "filter",
                  _and: [
                    {
                      _field: "cortexId",
                      _value: response.cortexId
                    },
                    {
                      _field: "objectId",
                      _value: response.objectId
                    },
                    {
                      _field: "startDate",
                      _value: response.startDate
                    }
                  ]
                }
              ]
            };
            qs.name = "log-actions";
            do {
              response = await import_GenericFunctions.theHiveApiRequest.call(this, "POST", "/v1/query", body, qs);
            } while (response.status === "Waiting" || response.status === "InProgress");
            responseData = response;
          }
          if (operation === "create") {
            const caseId = this.getNodeParameter("caseId", i);
            let body = {
              dataType: this.getNodeParameter("dataType", i),
              message: this.getNodeParameter("message", i),
              startDate: Date.parse(this.getNodeParameter("startDate", i)),
              tlp: this.getNodeParameter("tlp", i),
              ioc: this.getNodeParameter("ioc", i),
              sighted: this.getNodeParameter("sighted", i),
              status: this.getNodeParameter("status", i),
              ...(0, import_GenericFunctions.prepareOptional)(this.getNodeParameter("options", i, {}))
            };
            let options = {};
            if (body.dataType === "file") {
              const binaryPropertyName = this.getNodeParameter("binaryProperty", i);
              const binaryData = this.helpers.assertBinaryData(i, binaryPropertyName);
              const dataBuffer = await this.helpers.getBinaryDataBuffer(i, binaryPropertyName);
              options = {
                formData: {
                  attachment: {
                    value: dataBuffer,
                    options: {
                      contentType: binaryData.mimeType,
                      filename: binaryData.fileName
                    }
                  },
                  _json: JSON.stringify(body)
                }
              };
              body = {};
            } else {
              body.data = this.getNodeParameter("data", i);
            }
            responseData = await import_GenericFunctions.theHiveApiRequest.call(
              this,
              "POST",
              `/case/${caseId}/artifact`,
              body,
              qs,
              "",
              options
            );
          }
          if (operation === "get") {
            const observableId = this.getNodeParameter("id", i);
            const credentials = await this.getCredentials("theHiveApi");
            const version = credentials.apiVersion;
            let endpoint;
            let method;
            let body = {};
            if (version === "v1") {
              endpoint = "/v1/query";
              method = "POST";
              body = {
                query: [
                  {
                    _name: "getObservable",
                    idOrName: observableId
                  }
                ]
              };
              qs.name = `get-observable-${observableId}`;
            } else {
              method = "GET";
              endpoint = `/case/artifact/${observableId}`;
            }
            responseData = await import_GenericFunctions.theHiveApiRequest.call(this, method, endpoint, body, qs);
          }
          if (operation === "getAll") {
            const credentials = await this.getCredentials("theHiveApi");
            const returnAll = this.getNodeParameter("returnAll", i);
            const version = credentials.apiVersion;
            const options = this.getNodeParameter("options", i);
            const caseId = this.getNodeParameter("caseId", i);
            let endpoint;
            let method;
            let body = {};
            let limit = void 0;
            if (!returnAll) {
              limit = this.getNodeParameter("limit", i);
            }
            if (version === "v1") {
              endpoint = "/v1/query";
              method = "POST";
              body = {
                query: [
                  {
                    _name: "getCase",
                    idOrName: caseId
                  },
                  {
                    _name: "observables"
                  }
                ]
              };
              (0, import_GenericFunctions.prepareSortQuery)(options.sort, body);
              if (limit !== void 0) {
                (0, import_GenericFunctions.prepareRangeQuery)(`0-${limit}`, body);
              }
              qs.name = "observables";
            } else {
              method = "POST";
              endpoint = "/case/artifact/_search";
              if (limit !== void 0) {
                qs.range = `0-${limit}`;
              }
              body.query = (0, import_QueryFunctions.Parent)("case", (0, import_QueryFunctions.Id)(caseId));
              Object.assign(qs, (0, import_GenericFunctions.prepareOptional)(options));
            }
            responseData = await import_GenericFunctions.theHiveApiRequest.call(this, method, endpoint, body, qs);
          }
          if (operation === "search") {
            const credentials = await this.getCredentials("theHiveApi");
            const returnAll = this.getNodeParameter("returnAll", i);
            const version = credentials.apiVersion;
            const queryAttributs = (0, import_GenericFunctions.prepareOptional)(
              this.getNodeParameter("filters", i, {})
            );
            const _searchQuery = (0, import_QueryFunctions.And)();
            const options = this.getNodeParameter("options", i);
            for (const key of Object.keys(queryAttributs)) {
              if (key === "dataType" || key === "tags") {
                _searchQuery["_and"].push(
                  (0, import_QueryFunctions.In)(key, queryAttributs[key])
                );
              } else if (key === "description" || key === "keywork" || key === "message") {
                _searchQuery["_and"].push(
                  (0, import_QueryFunctions.ContainsString)(key, queryAttributs[key])
                );
              } else if (key === "range") {
                _searchQuery["_and"].push(
                  (0, import_QueryFunctions.Between)(
                    "startDate",
                    queryAttributs["range"]["dateRange"]["fromDate"],
                    queryAttributs["range"]["dateRange"]["toDate"]
                  )
                );
              } else {
                _searchQuery["_and"].push(
                  (0, import_QueryFunctions.Eq)(key, queryAttributs[key])
                );
              }
            }
            let endpoint;
            let method;
            let body = {};
            let limit = void 0;
            if (!returnAll) {
              limit = this.getNodeParameter("limit", i);
            }
            if (version === "v1") {
              endpoint = "/v1/query";
              method = "POST";
              body = {
                query: [
                  {
                    _name: "listObservable"
                  },
                  {
                    _name: "filter",
                    _and: _searchQuery["_and"]
                  }
                ]
              };
              (0, import_GenericFunctions.prepareSortQuery)(options.sort, body);
              if (limit !== void 0) {
                (0, import_GenericFunctions.prepareRangeQuery)(`0-${limit}`, body);
              }
              qs.name = "observables";
            } else {
              method = "POST";
              endpoint = "/case/artifact/_search";
              if (limit !== void 0) {
                qs.range = `0-${limit}`;
              }
              body.query = _searchQuery;
              Object.assign(qs, (0, import_GenericFunctions.prepareOptional)(options));
            }
            responseData = await import_GenericFunctions.theHiveApiRequest.call(this, method, endpoint, body, qs);
          }
          if (operation === "update") {
            const id = this.getNodeParameter("id", i);
            const body = {
              ...(0, import_GenericFunctions.prepareOptional)(this.getNodeParameter("updateFields", i, {}))
            };
            responseData = await import_GenericFunctions.theHiveApiRequest.call(
              this,
              "PATCH",
              `/case/artifact/${id}`,
              body,
              qs
            );
            responseData = { success: true };
          }
        }
        if (resource === "case") {
          if (operation === "count") {
            const filters = this.getNodeParameter("filters", i, {});
            const countQueryAttributs = (0, import_GenericFunctions.prepareOptional)(filters);
            const _countSearchQuery = (0, import_QueryFunctions.And)();
            if ("customFieldsUi" in filters) {
              const customFields = await import_GenericFunctions.prepareCustomFields.call(this, filters);
              const searchQueries = (0, import_GenericFunctions.buildCustomFieldSearch)(customFields);
              _countSearchQuery["_and"].push(...searchQueries);
            }
            for (const key of Object.keys(countQueryAttributs)) {
              if (key === "tags") {
                _countSearchQuery["_and"].push(
                  (0, import_QueryFunctions.In)(key, countQueryAttributs[key])
                );
              } else if (key === "description" || key === "summary" || key === "title") {
                _countSearchQuery["_and"].push(
                  (0, import_QueryFunctions.ContainsString)(key, countQueryAttributs[key])
                );
              } else {
                _countSearchQuery["_and"].push(
                  (0, import_QueryFunctions.Eq)(key, countQueryAttributs[key])
                );
              }
            }
            const body = {
              query: [
                {
                  _name: "listCase"
                },
                {
                  _name: "filter",
                  _and: _countSearchQuery["_and"]
                }
              ]
            };
            body["query"].push({
              _name: "count"
            });
            qs.name = "count-cases";
            responseData = await import_GenericFunctions.theHiveApiRequest.call(this, "POST", "/v1/query", body, qs);
            responseData = { count: responseData };
          }
          if (operation === "executeResponder") {
            const caseId = this.getNodeParameter("id", i);
            const responderId = this.getNodeParameter("responder", i);
            let body;
            let response;
            responseData = [];
            body = {
              responderId,
              objectId: caseId,
              objectType: "case"
            };
            response = await import_GenericFunctions.theHiveApiRequest.call(
              this,
              "POST",
              "/connector/cortex/action",
              body
            );
            body = {
              query: [
                {
                  _name: "listAction"
                },
                {
                  _name: "filter",
                  _and: [
                    {
                      _field: "cortexId",
                      _value: response.cortexId
                    },
                    {
                      _field: "objectId",
                      _value: response.objectId
                    },
                    {
                      _field: "startDate",
                      _value: response.startDate
                    }
                  ]
                }
              ]
            };
            qs.name = "log-actions";
            do {
              response = await import_GenericFunctions.theHiveApiRequest.call(this, "POST", "/v1/query", body, qs);
            } while (response.status === "Waiting" || response.status === "InProgress");
            responseData = response;
          }
          if (operation === "create") {
            const options = this.getNodeParameter("options", i, {});
            const jsonParameters = this.getNodeParameter("jsonParameters", i);
            const customFields = await import_GenericFunctions.prepareCustomFields.call(this, options, jsonParameters);
            const body = {
              title: this.getNodeParameter("title", i),
              description: this.getNodeParameter("description", i),
              severity: this.getNodeParameter("severity", i),
              startDate: Date.parse(this.getNodeParameter("startDate", i)),
              owner: this.getNodeParameter("owner", i),
              flag: this.getNodeParameter("flag", i),
              tlp: this.getNodeParameter("tlp", i),
              tags: (0, import_GenericFunctions.splitTags)(this.getNodeParameter("tags", i)),
              ...(0, import_GenericFunctions.prepareOptional)(options)
            };
            if (customFields) {
              Object.keys(customFields).forEach((key) => {
                (0, import_set.default)(body, key, customFields[key]);
              });
            }
            responseData = await import_GenericFunctions.theHiveApiRequest.call(this, "POST", "/case", body);
          }
          if (operation === "get") {
            const caseId = this.getNodeParameter("id", i);
            const credentials = await this.getCredentials("theHiveApi");
            const version = credentials.apiVersion;
            let endpoint;
            let method;
            let body = {};
            if (version === "v1") {
              endpoint = "/v1/query";
              method = "POST";
              body = {
                query: [
                  {
                    _name: "getCase",
                    idOrName: caseId
                  }
                ]
              };
              qs.name = `get-case-${caseId}`;
            } else {
              method = "GET";
              endpoint = `/case/${caseId}`;
            }
            responseData = await import_GenericFunctions.theHiveApiRequest.call(this, method, endpoint, body, qs);
          }
          if (operation === "getAll") {
            const credentials = await this.getCredentials("theHiveApi");
            const returnAll = this.getNodeParameter("returnAll", i);
            const version = credentials.apiVersion;
            const filters = this.getNodeParameter("filters", i, {});
            const queryAttributs = (0, import_GenericFunctions.prepareOptional)(filters);
            const _searchQuery = (0, import_QueryFunctions.And)();
            const options = this.getNodeParameter("options", i);
            if ("customFieldsUi" in filters) {
              const customFields = await import_GenericFunctions.prepareCustomFields.call(this, filters);
              const searchQueries = (0, import_GenericFunctions.buildCustomFieldSearch)(customFields);
              _searchQuery["_and"].push(...searchQueries);
            }
            for (const key of Object.keys(queryAttributs)) {
              if (key === "tags") {
                _searchQuery["_and"].push(
                  (0, import_QueryFunctions.In)(key, queryAttributs[key])
                );
              } else if (key === "description" || key === "summary" || key === "title") {
                _searchQuery["_and"].push(
                  (0, import_QueryFunctions.ContainsString)(key, queryAttributs[key])
                );
              } else {
                _searchQuery["_and"].push(
                  (0, import_QueryFunctions.Eq)(key, queryAttributs[key])
                );
              }
            }
            let endpoint;
            let method;
            let body = {};
            let limit = void 0;
            if (!returnAll) {
              limit = this.getNodeParameter("limit", i);
            }
            if (version === "v1") {
              endpoint = "/v1/query";
              method = "POST";
              body = {
                query: [
                  {
                    _name: "listCase"
                  },
                  {
                    _name: "filter",
                    _and: _searchQuery["_and"]
                  }
                ]
              };
              (0, import_GenericFunctions.prepareSortQuery)(options.sort, body);
              if (limit !== void 0) {
                (0, import_GenericFunctions.prepareRangeQuery)(`0-${limit}`, body);
              }
              qs.name = "cases";
            } else {
              method = "POST";
              endpoint = "/case/_search";
              if (limit !== void 0) {
                qs.range = `0-${limit}`;
              }
              body.query = _searchQuery;
              Object.assign(qs, (0, import_GenericFunctions.prepareOptional)(options));
            }
            responseData = await import_GenericFunctions.theHiveApiRequest.call(this, method, endpoint, body, qs);
          }
          if (operation === "update") {
            const id = this.getNodeParameter("id", i);
            const updateFields = this.getNodeParameter("updateFields", i, {});
            const jsonParameters = this.getNodeParameter("jsonParameters", i);
            const customFields = await import_GenericFunctions.prepareCustomFields.call(this, updateFields, jsonParameters);
            const body = {
              ...customFields,
              ...(0, import_GenericFunctions.prepareOptional)(updateFields)
            };
            responseData = await import_GenericFunctions.theHiveApiRequest.call(this, "PATCH", `/case/${id}`, body);
          }
        }
        if (resource === "task") {
          if (operation === "count") {
            const countQueryAttributs = (0, import_GenericFunctions.prepareOptional)(
              this.getNodeParameter("filters", i, {})
            );
            const _countSearchQuery = (0, import_QueryFunctions.And)();
            for (const key of Object.keys(countQueryAttributs)) {
              if (key === "title" || key === "description") {
                _countSearchQuery["_and"].push(
                  (0, import_QueryFunctions.ContainsString)(key, countQueryAttributs[key])
                );
              } else {
                _countSearchQuery["_and"].push(
                  (0, import_QueryFunctions.Eq)(key, countQueryAttributs[key])
                );
              }
            }
            const body = {
              query: [
                {
                  _name: "listTask"
                },
                {
                  _name: "filter",
                  _and: _countSearchQuery["_and"]
                }
              ]
            };
            body["query"].push({
              _name: "count"
            });
            qs.name = "count-tasks";
            responseData = await import_GenericFunctions.theHiveApiRequest.call(this, "POST", "/v1/query", body, qs);
            responseData = { count: responseData };
          }
          if (operation === "create") {
            const caseId = this.getNodeParameter("caseId", i);
            const body = {
              title: this.getNodeParameter("title", i),
              status: this.getNodeParameter("status", i),
              flag: this.getNodeParameter("flag", i),
              ...(0, import_GenericFunctions.prepareOptional)(this.getNodeParameter("options", i, {}))
            };
            responseData = await import_GenericFunctions.theHiveApiRequest.call(this, "POST", `/case/${caseId}/task`, body);
          }
          if (operation === "executeResponder") {
            const taskId = this.getNodeParameter("id", i);
            const responderId = this.getNodeParameter("responder", i);
            let body;
            let response;
            responseData = [];
            body = {
              responderId,
              objectId: taskId,
              objectType: "case_task"
            };
            response = await import_GenericFunctions.theHiveApiRequest.call(
              this,
              "POST",
              "/connector/cortex/action",
              body
            );
            body = {
              query: [
                {
                  _name: "listAction"
                },
                {
                  _name: "filter",
                  _and: [
                    {
                      _field: "cortexId",
                      _value: response.cortexId
                    },
                    {
                      _field: "objectId",
                      _value: response.objectId
                    },
                    {
                      _field: "startDate",
                      _value: response.startDate
                    }
                  ]
                }
              ]
            };
            qs.name = "task-actions";
            do {
              response = await import_GenericFunctions.theHiveApiRequest.call(this, "POST", "/v1/query", body, qs);
            } while (response.status === "Waiting" || response.status === "InProgress");
            responseData = response;
          }
          if (operation === "get") {
            const taskId = this.getNodeParameter("id", i);
            const credentials = await this.getCredentials("theHiveApi");
            const version = credentials.apiVersion;
            let endpoint;
            let method;
            let body = {};
            if (version === "v1") {
              endpoint = "/v1/query";
              method = "POST";
              body = {
                query: [
                  {
                    _name: "getTask",
                    idOrName: taskId
                  }
                ]
              };
              qs.name = `get-task-${taskId}`;
            } else {
              method = "GET";
              endpoint = `/case/task/${taskId}`;
            }
            responseData = await import_GenericFunctions.theHiveApiRequest.call(this, method, endpoint, body, qs);
          }
          if (operation === "getAll") {
            const credentials = await this.getCredentials("theHiveApi");
            const returnAll = this.getNodeParameter("returnAll", i);
            const version = credentials.apiVersion;
            const caseId = this.getNodeParameter("caseId", i);
            const options = this.getNodeParameter("options", i);
            let endpoint;
            let method;
            let body = {};
            let limit = void 0;
            if (!returnAll) {
              limit = this.getNodeParameter("limit", i);
            }
            if (version === "v1") {
              endpoint = "/v1/query";
              method = "POST";
              body = {
                query: [
                  {
                    _name: "getCase",
                    idOrName: caseId
                  },
                  {
                    _name: "tasks"
                  }
                ]
              };
              (0, import_GenericFunctions.prepareSortQuery)(options.sort, body);
              if (limit !== void 0) {
                (0, import_GenericFunctions.prepareRangeQuery)(`0-${limit}`, body);
              }
              qs.name = "case-tasks";
            } else {
              method = "POST";
              endpoint = "/case/task/_search";
              if (limit !== void 0) {
                qs.range = `0-${limit}`;
              }
              body.query = (0, import_QueryFunctions.And)((0, import_QueryFunctions.Parent)("case", (0, import_QueryFunctions.Id)(caseId)));
              Object.assign(qs, (0, import_GenericFunctions.prepareOptional)(options));
            }
            responseData = await import_GenericFunctions.theHiveApiRequest.call(this, method, endpoint, body, qs);
          }
          if (operation === "search") {
            const credentials = await this.getCredentials("theHiveApi");
            const returnAll = this.getNodeParameter("returnAll", i);
            const version = credentials.apiVersion;
            const queryAttributs = (0, import_GenericFunctions.prepareOptional)(
              this.getNodeParameter("filters", i, {})
            );
            const _searchQuery = (0, import_QueryFunctions.And)();
            const options = this.getNodeParameter("options", i);
            for (const key of Object.keys(queryAttributs)) {
              if (key === "title" || key === "description") {
                _searchQuery["_and"].push(
                  (0, import_QueryFunctions.ContainsString)(key, queryAttributs[key])
                );
              } else {
                _searchQuery["_and"].push(
                  (0, import_QueryFunctions.Eq)(key, queryAttributs[key])
                );
              }
            }
            let endpoint;
            let method;
            let body = {};
            let limit = void 0;
            if (!returnAll) {
              limit = this.getNodeParameter("limit", i);
            }
            if (version === "v1") {
              endpoint = "/v1/query";
              method = "POST";
              body = {
                query: [
                  {
                    _name: "listTask"
                  },
                  {
                    _name: "filter",
                    _and: _searchQuery["_and"]
                  }
                ]
              };
              (0, import_GenericFunctions.prepareSortQuery)(options.sort, body);
              if (limit !== void 0) {
                (0, import_GenericFunctions.prepareRangeQuery)(`0-${limit}`, body);
              }
              qs.name = "tasks";
            } else {
              method = "POST";
              endpoint = "/case/task/_search";
              if (limit !== void 0) {
                qs.range = `0-${limit}`;
              }
              body.query = _searchQuery;
              Object.assign(qs, (0, import_GenericFunctions.prepareOptional)(options));
            }
            responseData = await import_GenericFunctions.theHiveApiRequest.call(this, method, endpoint, body, qs);
          }
          if (operation === "update") {
            const id = this.getNodeParameter("id", i);
            const body = {
              ...(0, import_GenericFunctions.prepareOptional)(this.getNodeParameter("updateFields", i, {}))
            };
            responseData = await import_GenericFunctions.theHiveApiRequest.call(this, "PATCH", `/case/task/${id}`, body);
          }
        }
        if (resource === "log") {
          if (operation === "create") {
            const taskId = this.getNodeParameter("taskId", i);
            let body = {
              message: this.getNodeParameter("message", i),
              startDate: Date.parse(this.getNodeParameter("startDate", i)),
              status: this.getNodeParameter("status", i)
            };
            const optionals = this.getNodeParameter("options", i);
            let options = {};
            if (optionals.attachementUi) {
              const attachmentValues = optionals.attachementUi.attachmentValues;
              if (attachmentValues) {
                const binaryPropertyName = attachmentValues.binaryProperty;
                const binaryData = this.helpers.assertBinaryData(i, binaryPropertyName);
                const dataBuffer = await this.helpers.getBinaryDataBuffer(i, binaryPropertyName);
                options = {
                  formData: {
                    attachment: {
                      value: dataBuffer,
                      options: {
                        contentType: binaryData.mimeType,
                        filename: binaryData.fileName
                      }
                    },
                    _json: JSON.stringify(body)
                  }
                };
                body = {};
              }
            }
            responseData = await import_GenericFunctions.theHiveApiRequest.call(
              this,
              "POST",
              `/case/task/${taskId}/log`,
              body,
              qs,
              "",
              options
            );
          }
          if (operation === "executeResponder") {
            const logId = this.getNodeParameter("id", i);
            const responderId = this.getNodeParameter("responder", i);
            let body;
            let response;
            responseData = [];
            body = {
              responderId,
              objectId: logId,
              objectType: "case_task_log"
            };
            response = await import_GenericFunctions.theHiveApiRequest.call(
              this,
              "POST",
              "/connector/cortex/action",
              body
            );
            body = {
              query: [
                {
                  _name: "listAction"
                },
                {
                  _name: "filter",
                  _and: [
                    {
                      _field: "cortexId",
                      _value: response.cortexId
                    },
                    {
                      _field: "objectId",
                      _value: response.objectId
                    },
                    {
                      _field: "startDate",
                      _value: response.startDate
                    }
                  ]
                }
              ]
            };
            qs.name = "log-actions";
            do {
              response = await import_GenericFunctions.theHiveApiRequest.call(this, "POST", "/v1/query", body, qs);
            } while (response.status === "Waiting" || response.status === "InProgress");
            responseData = response;
          }
          if (operation === "get") {
            const logId = this.getNodeParameter("id", i);
            const credentials = await this.getCredentials("theHiveApi");
            const version = credentials.apiVersion;
            let endpoint;
            let method;
            let body = {};
            if (version === "v1") {
              endpoint = "/v1/query";
              method = "POST";
              body = {
                query: [
                  {
                    _name: "getLog",
                    idOrName: logId
                  }
                ]
              };
              qs.name = `get-log-${logId}`;
            } else {
              method = "POST";
              endpoint = "/case/task/log/_search";
              body.query = { _id: logId };
            }
            responseData = await import_GenericFunctions.theHiveApiRequest.call(this, method, endpoint, body, qs);
          }
          if (operation === "getAll") {
            const credentials = await this.getCredentials("theHiveApi");
            const returnAll = this.getNodeParameter("returnAll", i);
            const version = credentials.apiVersion;
            const taskId = this.getNodeParameter("taskId", i);
            let endpoint;
            let method;
            let body = {};
            let limit = void 0;
            if (!returnAll) {
              limit = this.getNodeParameter("limit", i);
            }
            if (version === "v1") {
              endpoint = "/v1/query";
              method = "POST";
              body = {
                query: [
                  {
                    _name: "getTask",
                    idOrName: taskId
                  },
                  {
                    _name: "logs"
                  }
                ]
              };
              if (limit !== void 0) {
                (0, import_GenericFunctions.prepareRangeQuery)(`0-${limit}`, body);
              }
              qs.name = "case-task-logs";
            } else {
              method = "POST";
              endpoint = "/case/task/log/_search";
              if (limit !== void 0) {
                qs.range = `0-${limit}`;
              }
              body.query = (0, import_QueryFunctions.And)((0, import_QueryFunctions.Parent)("task", (0, import_QueryFunctions.Id)(taskId)));
            }
            responseData = await import_GenericFunctions.theHiveApiRequest.call(this, method, endpoint, body, qs);
          }
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
    return [returnData];
  }
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  TheHive
});
//# sourceMappingURL=TheHive.node.js.map