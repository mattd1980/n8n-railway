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
var EvaluationMetrics_node_exports = {};
__export(EvaluationMetrics_node_exports, {
  EvaluationMetrics: () => EvaluationMetrics
});
module.exports = __toCommonJS(EvaluationMetrics_node_exports);
var import_n8n_workflow = require("n8n-workflow");
var import_utils = require("../Set/v2/helpers/utils");
class EvaluationMetrics {
  constructor() {
    this.description = {
      displayName: "Evaluation Metrics",
      name: "evaluationMetrics",
      icon: "fa:check-double",
      group: ["input"],
      iconColor: "light-green",
      version: 1,
      description: "Define the metrics returned for workflow evaluation",
      defaults: {
        name: "Evaluation Metrics",
        color: "#29A568"
      },
      inputs: [import_n8n_workflow.NodeConnectionTypes.Main],
      outputs: [import_n8n_workflow.NodeConnectionTypes.Main],
      properties: [
        {
          displayName: "Define the evaluation metrics returned in your report. Only numeric values are supported. <a href='https://docs.n8n.io/integrations/builtin/core-nodes/n8n-nodes-base.evaluationmetric/' target='_blank'>More Info</a>",
          name: "notice",
          type: "notice",
          default: ""
        },
        {
          displayName: "Metrics to Return",
          name: "metrics",
          type: "assignmentCollection",
          default: {
            assignments: [
              {
                name: "",
                value: "",
                type: "number"
              }
            ]
          },
          typeOptions: {
            assignment: {
              disableType: true,
              defaultType: "number"
            }
          }
        }
      ]
    };
  }
  async execute() {
    const items = this.getInputData();
    const metrics = [];
    for (let i = 0; i < items.length; i++) {
      const dataToSave = this.getNodeParameter("metrics", i, {});
      const newItem = {
        json: {},
        pairedItem: { item: i }
      };
      const newData = Object.fromEntries(
        (dataToSave?.assignments ?? []).map((assignment) => {
          const assignmentValue = typeof assignment.value === "number" ? assignment.value : Number(assignment.value);
          if (isNaN(assignmentValue)) {
            throw new import_n8n_workflow.NodeOperationError(
              this.getNode(),
              `Invalid numeric value: "${assignment.value}". Please provide a valid number.`
            );
          }
          const { name, value } = (0, import_utils.validateEntry)(
            assignment.name,
            assignment.type,
            assignmentValue,
            this.getNode(),
            i,
            false,
            1
          );
          return [name, value];
        })
      );
      const returnItem = import_utils.composeReturnItem.call(
        this,
        i,
        newItem,
        newData,
        { dotNotation: false, include: "none" },
        1
      );
      metrics.push(returnItem);
    }
    return [metrics];
  }
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  EvaluationMetrics
});
//# sourceMappingURL=EvaluationMetrics.node.js.map