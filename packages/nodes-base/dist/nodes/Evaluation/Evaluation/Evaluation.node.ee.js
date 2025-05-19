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
var Evaluation_node_ee_exports = {};
__export(Evaluation_node_ee_exports, {
  Evaluation: () => Evaluation
});
module.exports = __toCommonJS(Evaluation_node_ee_exports);
var import_n8n_workflow = require("n8n-workflow");
var import_Description = require("./Description.node");
var import_versionDescription = require("../../Google/Sheet/v2/actions/versionDescription");
var import_methods = require("../methods");
var import_evaluationUtils = require("../utils/evaluationUtils");
class Evaluation {
  constructor() {
    this.description = {
      displayName: "Evaluation",
      icon: "fa:check-double",
      name: "evaluation",
      group: ["transform"],
      version: 4.6,
      description: "Runs an evaluation",
      eventTriggerDescription: "",
      subtitle: '={{$parameter["operation"]}}',
      defaults: {
        name: "Evaluation",
        color: "#c3c9d5"
      },
      inputs: [import_n8n_workflow.NodeConnectionTypes.Main],
      outputs: `={{(${import_evaluationUtils.setOutputs})($parameter)}}`,
      codex: {
        alias: ["Test", "Metrics", "Evals", "Set Output", "Set Metrics"]
      },
      credentials: [
        {
          name: "googleApi",
          required: true,
          displayOptions: {
            show: {
              authentication: ["serviceAccount"],
              operation: ["setOutputs"]
            }
          },
          testedBy: "googleApiCredentialTest"
        },
        {
          name: "googleSheetsOAuth2Api",
          required: true,
          displayOptions: {
            show: {
              authentication: ["oAuth2"],
              operation: ["setOutputs"]
            }
          }
        }
      ],
      properties: [
        {
          displayName: "Operation",
          name: "operation",
          type: "options",
          noDataExpression: true,
          options: [
            {
              name: "Set Outputs",
              value: "setOutputs"
            },
            {
              name: "Set Metrics",
              value: "setMetrics"
            },
            {
              name: "Check If Evaluating",
              value: "checkIfEvaluating"
            }
          ],
          default: "setOutputs"
        },
        import_versionDescription.authentication,
        ...import_Description.setOutputProperties,
        ...import_Description.setMetricsProperties,
        ...import_Description.setCheckIfEvaluatingProperties
      ]
    };
    this.methods = { loadOptions: import_methods.loadOptions, listSearch: import_methods.listSearch };
  }
  async execute() {
    const operation = this.getNodeParameter("operation", 0);
    if (operation === "setOutputs") {
      return await import_evaluationUtils.setOutput.call(this);
    } else if (operation === "setMetrics") {
      return await import_evaluationUtils.setMetrics.call(this);
    } else {
      return await import_evaluationUtils.checkIfEvaluating.call(this);
    }
  }
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  Evaluation
});
//# sourceMappingURL=Evaluation.node.ee.js.map