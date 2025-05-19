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
var ProfitWell_node_exports = {};
__export(ProfitWell_node_exports, {
  ProfitWell: () => ProfitWell
});
module.exports = __toCommonJS(ProfitWell_node_exports);
var import_n8n_workflow = require("n8n-workflow");
var import_CompanyDescription = require("./CompanyDescription");
var import_GenericFunctions = require("./GenericFunctions");
var import_MetricDescription = require("./MetricDescription");
class ProfitWell {
  constructor() {
    this.description = {
      displayName: "ProfitWell",
      name: "profitWell",
      icon: { light: "file:profitwell.svg", dark: "file:profitwell.dark.svg" },
      group: ["output"],
      version: 1,
      subtitle: '={{$parameter["operation"] + ": " + $parameter["resource"]}}',
      description: "Consume ProfitWell API",
      defaults: {
        name: "ProfitWell"
      },
      usableAsTool: true,
      inputs: [import_n8n_workflow.NodeConnectionTypes.Main],
      outputs: [import_n8n_workflow.NodeConnectionTypes.Main],
      credentials: [
        {
          name: "profitWellApi",
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
              name: "Metric",
              value: "metric"
            }
          ],
          default: "metric"
        },
        // COMPANY
        ...import_CompanyDescription.companyOperations,
        // METRICS
        ...import_MetricDescription.metricOperations,
        ...import_MetricDescription.metricFields
      ]
    };
    this.methods = {
      loadOptions: {
        async getPlanIds() {
          const returnData = [];
          const planIds = await import_GenericFunctions.profitWellApiRequest.call(this, "GET", "/metrics/plans");
          for (const planId of planIds.plan_ids) {
            returnData.push({
              name: planId,
              value: planId
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
      try {
        if (resource === "company") {
          if (operation === "getSetting") {
            responseData = await import_GenericFunctions.profitWellApiRequest.call(this, "GET", "/company/settings/");
          }
        }
        if (resource === "metric") {
          if (operation === "get") {
            const type = this.getNodeParameter("type", i);
            const simple = this.getNodeParameter("simple", 0);
            if (type === "daily") {
              qs.month = this.getNodeParameter("month", i);
            }
            const options = this.getNodeParameter("options", i);
            Object.assign(qs, options);
            if (qs.dailyMetrics) {
              qs.metrics = qs.dailyMetrics.join(",");
              delete qs.dailyMetrics;
            }
            if (qs.monthlyMetrics) {
              qs.metrics = qs.monthlyMetrics.join(",");
              delete qs.monthlyMetrics;
            }
            responseData = await import_GenericFunctions.profitWellApiRequest.call(this, "GET", `/metrics/${type}`, {}, qs);
            responseData = responseData.data;
            if (simple) {
              if (type === "daily") {
                responseData = (0, import_GenericFunctions.simplifyDailyMetrics)(responseData);
              } else {
                responseData = (0, import_GenericFunctions.simplifyMontlyMetrics)(responseData);
              }
            }
          }
        }
        if (Array.isArray(responseData)) {
          returnData.push.apply(returnData, responseData);
        } else {
          returnData.push(responseData);
        }
      } catch (error) {
        if (this.continueOnFail()) {
          returnData.push({ error: error.message });
          continue;
        }
        throw error;
      }
    }
    return [this.helpers.returnJsonArray(returnData)];
  }
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  ProfitWell
});
//# sourceMappingURL=ProfitWell.node.js.map