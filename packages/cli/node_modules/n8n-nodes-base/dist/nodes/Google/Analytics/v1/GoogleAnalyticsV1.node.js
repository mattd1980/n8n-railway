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
var GoogleAnalyticsV1_node_exports = {};
__export(GoogleAnalyticsV1_node_exports, {
  GoogleAnalyticsV1: () => GoogleAnalyticsV1
});
module.exports = __toCommonJS(GoogleAnalyticsV1_node_exports);
var import_moment_timezone = __toESM(require("moment-timezone"));
var import_n8n_workflow = require("n8n-workflow");
var import_descriptions = require("../../../../utils/descriptions");
var import_GenericFunctions = require("./GenericFunctions");
var import_ReportDescription = require("./ReportDescription");
var import_UserActivityDescription = require("./UserActivityDescription");
const versionDescription = {
  displayName: "Google Analytics",
  name: "googleAnalytics",
  icon: "file:analytics.svg",
  group: ["transform"],
  version: 1,
  subtitle: '={{$parameter["operation"] + ": " + $parameter["resource"]}}',
  description: "Use the Google Analytics API",
  defaults: {
    name: "Google Analytics"
  },
  inputs: [import_n8n_workflow.NodeConnectionTypes.Main],
  outputs: [import_n8n_workflow.NodeConnectionTypes.Main],
  credentials: [
    {
      name: "googleAnalyticsOAuth2",
      required: true
    }
  ],
  properties: [
    import_descriptions.oldVersionNotice,
    {
      displayName: "Resource",
      name: "resource",
      type: "options",
      noDataExpression: true,
      options: [
        {
          name: "Report",
          value: "report"
        },
        {
          name: "User Activity",
          value: "userActivity"
        }
      ],
      default: "report"
    },
    //-------------------------------
    // Reports Operations
    //-------------------------------
    ...import_ReportDescription.reportOperations,
    ...import_ReportDescription.reportFields,
    //-------------------------------
    // User Activity Operations
    //-------------------------------
    ...import_UserActivityDescription.userActivityOperations,
    ...import_UserActivityDescription.userActivityFields
  ]
};
class GoogleAnalyticsV1 {
  constructor(baseDescription) {
    this.methods = {
      loadOptions: {
        // Get all the dimensions to display them to user so that they can
        // select them easily
        async getDimensions() {
          const returnData = [];
          const { items: dimensions } = await import_GenericFunctions.googleApiRequest.call(
            this,
            "GET",
            "",
            {},
            {},
            "https://www.googleapis.com/analytics/v3/metadata/ga/columns"
          );
          for (const dimension of dimensions) {
            if (dimension.attributes.type === "DIMENSION" && dimension.attributes.status !== "DEPRECATED") {
              returnData.push({
                name: dimension.attributes.uiName,
                value: dimension.id,
                description: dimension.attributes.description
              });
            }
          }
          returnData.sort((a, b) => {
            const aName = a.name.toLowerCase();
            const bName = b.name.toLowerCase();
            if (aName < bName) {
              return -1;
            }
            if (aName > bName) {
              return 1;
            }
            return 0;
          });
          return returnData;
        },
        // Get all the views to display them to user so that they can
        // select them easily
        async getViews() {
          const returnData = [];
          const { items } = await import_GenericFunctions.googleApiRequest.call(
            this,
            "GET",
            "",
            {},
            {},
            "https://www.googleapis.com/analytics/v3/management/accounts/~all/webproperties/~all/profiles"
          );
          for (const item of items) {
            returnData.push({
              name: item.name,
              value: item.id,
              description: item.websiteUrl
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
    const resource = this.getNodeParameter("resource", 0);
    const operation = this.getNodeParameter("operation", 0);
    let method = "GET";
    const qs = {};
    let endpoint = "";
    let responseData;
    for (let i = 0; i < items.length; i++) {
      try {
        if (resource === "report") {
          if (operation === "get") {
            method = "POST";
            endpoint = "/v4/reports:batchGet";
            const viewId = this.getNodeParameter("viewId", i);
            const returnAll = this.getNodeParameter("returnAll", 0);
            const additionalFields = this.getNodeParameter("additionalFields", i);
            const simple = this.getNodeParameter("simple", i);
            const body = {
              viewId
            };
            if (additionalFields.useResourceQuotas) {
              qs.useResourceQuotas = additionalFields.useResourceQuotas;
            }
            if (additionalFields.dateRangesUi) {
              const dateValues = additionalFields.dateRangesUi.dateRanges;
              if (dateValues) {
                const start = dateValues.startDate;
                const end = dateValues.endDate;
                Object.assign(body, {
                  dateRanges: [
                    {
                      startDate: (0, import_moment_timezone.default)(start).utc().format("YYYY-MM-DD"),
                      endDate: (0, import_moment_timezone.default)(end).utc().format("YYYY-MM-DD")
                    }
                  ]
                });
              }
            }
            if (additionalFields.metricsUi) {
              const metrics = additionalFields.metricsUi.metricValues;
              body.metrics = metrics;
            }
            if (additionalFields.dimensionUi) {
              const dimensions = additionalFields.dimensionUi.dimensionValues;
              if (dimensions) {
                body.dimensions = dimensions;
              }
            }
            if (additionalFields.dimensionFiltersUi) {
              const dimensionFilters = additionalFields.dimensionFiltersUi.filterValues;
              if (dimensionFilters) {
                dimensionFilters.forEach((filter) => filter.expressions = [filter.expressions]);
                body.dimensionFilterClauses = { filters: dimensionFilters };
              }
            }
            if (additionalFields.includeEmptyRows) {
              Object.assign(body, { includeEmptyRows: additionalFields.includeEmptyRows });
            }
            if (additionalFields.hideTotals) {
              Object.assign(body, { hideTotals: additionalFields.hideTotals });
            }
            if (additionalFields.hideValueRanges) {
              Object.assign(body, { hideTotals: additionalFields.hideTotals });
            }
            if (returnAll) {
              responseData = await import_GenericFunctions.googleApiRequestAllItems.call(
                this,
                "reports",
                method,
                endpoint,
                { reportRequests: [body] },
                qs
              );
            } else {
              responseData = await import_GenericFunctions.googleApiRequest.call(
                this,
                method,
                endpoint,
                { reportRequests: [body] },
                qs
              );
              responseData = responseData.reports;
            }
            if (simple) {
              responseData = (0, import_GenericFunctions.simplify)(responseData);
            } else if (returnAll && responseData.length > 1) {
              responseData = (0, import_GenericFunctions.merge)(responseData);
            }
          }
        }
        if (resource === "userActivity") {
          if (operation === "search") {
            method = "POST";
            endpoint = "/v4/userActivity:search";
            const viewId = this.getNodeParameter("viewId", i);
            const userId = this.getNodeParameter("userId", i);
            const returnAll = this.getNodeParameter("returnAll", 0);
            const additionalFields = this.getNodeParameter("additionalFields", i);
            const body = {
              viewId,
              user: {
                userId
              }
            };
            if (additionalFields.activityTypes) {
              Object.assign(body, { activityTypes: additionalFields.activityTypes });
            }
            if (returnAll) {
              responseData = await import_GenericFunctions.googleApiRequestAllItems.call(
                this,
                "sessions",
                method,
                endpoint,
                body
              );
            } else {
              body.pageSize = this.getNodeParameter("limit", 0);
              responseData = await import_GenericFunctions.googleApiRequest.call(this, method, endpoint, body);
              responseData = responseData.sessions;
            }
          }
        }
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
        throw error;
      }
    }
    return [returnData];
  }
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  GoogleAnalyticsV1
});
//# sourceMappingURL=GoogleAnalyticsV1.node.js.map