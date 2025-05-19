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
var Metabase_node_exports = {};
__export(Metabase_node_exports, {
  Metabase: () => Metabase
});
module.exports = __toCommonJS(Metabase_node_exports);
var import_n8n_workflow = require("n8n-workflow");
var import_AlertsDescription = require("./AlertsDescription");
var import_DatabasesDescription = require("./DatabasesDescription");
var import_MetricsDescription = require("./MetricsDescription");
var import_QuestionsDescription = require("./QuestionsDescription");
class Metabase {
  constructor() {
    this.description = {
      displayName: "Metabase",
      name: "metabase",
      icon: "file:metabase.svg",
      group: ["transform"],
      version: 1,
      subtitle: '={{$parameter["operation"] + ": " + $parameter["resource"]}}',
      description: "Use the Metabase API",
      defaults: {
        name: "Metabase"
      },
      usableAsTool: true,
      inputs: [import_n8n_workflow.NodeConnectionTypes.Main],
      outputs: [import_n8n_workflow.NodeConnectionTypes.Main],
      credentials: [
        {
          name: "metabaseApi",
          required: true
        }
      ],
      requestDefaults: {
        returnFullResponse: true,
        baseURL: '={{$credentials.url.replace(new RegExp("/$"), "")}}',
        headers: {}
      },
      properties: [
        {
          displayName: "Resource",
          name: "resource",
          type: "options",
          noDataExpression: true,
          options: [
            {
              name: "Alert",
              value: "alerts"
            },
            {
              name: "Database",
              value: "databases"
            },
            {
              name: "Metric",
              value: "metrics"
            },
            {
              name: "Question",
              value: "questions"
            }
          ],
          default: "questions"
        },
        ...import_QuestionsDescription.questionsOperations,
        ...import_QuestionsDescription.questionsFields,
        ...import_MetricsDescription.metricsOperations,
        ...import_MetricsDescription.metricsFields,
        ...import_DatabasesDescription.databasesOperations,
        ...import_DatabasesDescription.databasesFields,
        ...import_AlertsDescription.alertsOperations,
        ...import_AlertsDescription.alertsFields
      ]
    };
  }
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  Metabase
});
//# sourceMappingURL=Metabase.node.js.map