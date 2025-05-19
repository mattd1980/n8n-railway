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
var evaluationUtils_exports = {};
__export(evaluationUtils_exports, {
  checkIfEvaluating: () => checkIfEvaluating,
  setMetrics: () => setMetrics,
  setOutput: () => setOutput,
  setOutputs: () => setOutputs
});
module.exports = __toCommonJS(evaluationUtils_exports);
var import_n8n_workflow = require("n8n-workflow");
var import_evaluationTriggerUtils = require("./evaluationTriggerUtils");
var import_utils = require("../../Set/v2/helpers/utils");
async function setOutput() {
  const evaluationNode = this.getNode();
  const parentNodes = this.getParentNodes(evaluationNode.name);
  const evalTrigger = parentNodes.find((node) => node.type === "n8n-nodes-base.evaluationTrigger");
  const evalTriggerOutput = evalTrigger ? this.evaluateExpression(`{{ $('${evalTrigger?.name}').isExecuted }}`, 0) : void 0;
  if (!evalTrigger || !evalTriggerOutput) {
    this.addExecutionHints({
      message: "No outputs were set since the execution didn't start from an evaluation trigger",
      location: "outputPane"
    });
    return [this.getInputData()];
  }
  const outputFields = this.getNodeParameter("outputs.values", 0, []);
  if (outputFields.length === 0) {
    throw new import_n8n_workflow.UserError("No outputs to set", {
      description: "Add outputs to write back to the Google Sheet using the \u2018Add Output\u2019 button"
    });
  }
  const googleSheetInstance = import_evaluationTriggerUtils.getGoogleSheet.call(this);
  const googleSheet = await import_evaluationTriggerUtils.getSheet.call(this, googleSheetInstance);
  const evaluationTrigger = this.evaluateExpression(
    `{{ $('${evalTrigger.name}').first().json }}`,
    0
  );
  const rowNumber = evaluationTrigger.row_number === "row_number" ? 1 : evaluationTrigger.row_number;
  const columnNames = Object.keys(evaluationTrigger).filter(
    (key) => key !== "row_number" && key !== "_rowsLeft"
  );
  outputFields.forEach(({ outputName }) => {
    if (!columnNames.includes(outputName)) {
      columnNames.push(outputName);
    }
  });
  await googleSheetInstance.updateRows(
    googleSheet.title,
    [columnNames],
    "RAW",
    // default value for Value Input Mode
    1
    // header row
  );
  const outputs = outputFields.reduce((acc, { outputName, outputValue }) => {
    acc[outputName] = outputValue;
    return acc;
  }, {});
  const preparedData = googleSheetInstance.prepareDataForUpdatingByRowNumber(
    [
      {
        row_number: rowNumber,
        ...outputs
      }
    ],
    `${googleSheet.title}!A:Z`,
    [columnNames]
  );
  await googleSheetInstance.batchUpdate(
    preparedData.updateData,
    "RAW"
    // default value for Value Input Mode
  );
  return [this.getInputData()];
}
async function setMetrics() {
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
            `Value for '${assignment.name}' isn't a number`,
            {
              description: `It\u2019s currently '${assignment.value}'. Metrics must be numeric.`
            }
          );
        }
        if (!assignment.name || isNaN(assignmentValue)) {
          throw new import_n8n_workflow.NodeOperationError(this.getNode(), "Metric name missing", {
            description: "Make sure each metric you define has a name"
          });
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
async function checkIfEvaluating() {
  const evaluationExecutionResult = [];
  const normalExecutionResult = [];
  const evaluationNode = this.getNode();
  const parentNodes = this.getParentNodes(evaluationNode.name);
  const evalTrigger = parentNodes.find((node) => node.type === "n8n-nodes-base.evaluationTrigger");
  const evalTriggerOutput = evalTrigger ? this.evaluateExpression(`{{ $('${evalTrigger?.name}').isExecuted }}`, 0) : void 0;
  if (evalTriggerOutput) {
    return [this.getInputData(), normalExecutionResult];
  } else {
    return [evaluationExecutionResult, this.getInputData()];
  }
}
function setOutputs(parameters) {
  if (parameters.operation === "checkIfEvaluating") {
    return [
      { type: "main", displayName: "Evaluation" },
      { type: "main", displayName: "Normal" }
    ];
  }
  return [{ type: "main" }];
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  checkIfEvaluating,
  setMetrics,
  setOutput,
  setOutputs
});
//# sourceMappingURL=evaluationUtils.js.map