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
var EvaluationTrigger_node_ee_exports = {};
__export(EvaluationTrigger_node_ee_exports, {
  EvaluationTrigger: () => EvaluationTrigger,
  startingRow: () => startingRow
});
module.exports = __toCommonJS(EvaluationTrigger_node_ee_exports);
var import_n8n_workflow = require("n8n-workflow");
var import_GoogleSheetsTrigger = require("../../Google/Sheet/GoogleSheetsTrigger.node");
var import_read = require("../../Google/Sheet/v2/actions/sheet/read.operation");
var import_versionDescription = require("../../Google/Sheet/v2/actions/versionDescription");
var import_methods = require("../methods");
var import_evaluationTriggerUtils = require("../utils/evaluationTriggerUtils");
let startingRow = 2;
class EvaluationTrigger {
  constructor() {
    this.description = {
      displayName: "Evaluation Trigger",
      icon: "fa:check-double",
      name: "evaluationTrigger",
      group: ["trigger"],
      version: 4.6,
      description: "Run a test dataset through your workflow to check performance",
      eventTriggerDescription: "",
      defaults: {
        name: "When fetching a dataset row",
        color: "#c3c9d5"
      },
      inputs: [],
      outputs: [import_n8n_workflow.NodeConnectionTypes.Main],
      properties: [
        {
          displayName: 'Pulls a test dataset from a Google Sheet. The workflow will run once for each row, in sequence. Tips for wiring this node up <a href="https://docs.n8n.io/advanced-ai/evaluations/tips-and-common-issues/#combining-multiple-triggers">here</a>.',
          name: "notice",
          type: "notice",
          default: ""
        },
        {
          displayName: "Credentials",
          name: "credentials",
          type: "credentials",
          default: ""
        },
        import_versionDescription.authentication,
        {
          ...import_GoogleSheetsTrigger.document,
          displayName: "Document Containing Dataset",
          hint: 'Example dataset format <a href="https://docs.google.com/spreadsheets/d/1vD_IdeFUg7sHsK9okL6Doy1rGOkWTnPJV3Dro4FBUsY/edit?gid=0#gid=0">here</a>'
        },
        { ...import_GoogleSheetsTrigger.sheet, displayName: "Sheet Containing Dataset" },
        {
          displayName: "Limit Rows",
          name: "limitRows",
          type: "boolean",
          default: false,
          noDataExpression: true,
          description: "Whether to limit number of rows to process"
        },
        {
          displayName: "Max Rows to Process",
          name: "maxRows",
          type: "number",
          default: 10,
          description: "Maximum number of rows to process",
          noDataExpression: false,
          displayOptions: { show: { limitRows: [true] } }
        },
        import_read.readFilter
      ],
      codex: {
        alias: ["Test", "Metrics", "Evals", "Set Output", "Set Metrics"]
      },
      credentials: [
        {
          name: "googleApi",
          required: true,
          displayOptions: {
            show: {
              authentication: ["serviceAccount"]
            }
          },
          testedBy: "googleApiCredentialTest"
        },
        {
          name: "googleSheetsOAuth2Api",
          required: true,
          displayOptions: {
            show: {
              authentication: ["oAuth2"]
            }
          }
        }
      ]
    };
    this.methods = { loadOptions: import_methods.loadOptions, listSearch: import_methods.listSearch };
  }
  async execute(startRow) {
    if (startRow) {
      startingRow = startRow;
    }
    const inputData = this.getInputData();
    const MAX_ROWS = 1e3;
    const maxRows = this.getNodeParameter("limitRows", 0) ? this.getNodeParameter("maxRows", 0) + 1 : MAX_ROWS;
    const rangeOptions = {
      rangeDefinition: "specifyRange",
      headerRow: 1,
      firstDataRow: startingRow
    };
    const googleSheetInstance = import_evaluationTriggerUtils.getGoogleSheet.call(this);
    const googleSheet = await import_evaluationTriggerUtils.getSheet.call(this, googleSheetInstance);
    const allRows = await import_evaluationTriggerUtils.getResults.call(this, [], googleSheetInstance, googleSheet, rangeOptions);
    if (inputData[0].json.requestDataset) {
      const testRunnerResult = await import_evaluationTriggerUtils.getResults.call(
        this,
        [],
        googleSheetInstance,
        googleSheet,
        {}
      );
      const result = testRunnerResult.filter((row) => row?.json?.row_number <= maxRows);
      return [result];
    }
    const hasFilter = this.getNodeParameter("filtersUI.values", 0, []);
    if (hasFilter.length > 0) {
      const currentRow = allRows[0];
      const currentRowNumber = currentRow.json?.row_number;
      if (currentRow === void 0) {
        startingRow = 2;
        throw new import_n8n_workflow.NodeOperationError(this.getNode(), "No row found");
      }
      const rowsLeft = await import_evaluationTriggerUtils.getNumberOfRowsLeftFiltered.call(
        this,
        googleSheetInstance,
        googleSheet.title,
        currentRowNumber + 1,
        maxRows
      );
      currentRow.json._rowsLeft = rowsLeft;
      startingRow = currentRowNumber + 1;
      if (rowsLeft === 0) {
        startingRow = 2;
      }
      return [[currentRow]];
    } else {
      const currentRow = allRows.find((row) => row?.json?.row_number === startingRow);
      const rowsLeft = await import_evaluationTriggerUtils.getRowsLeft.call(
        this,
        googleSheetInstance,
        googleSheet.title,
        `${googleSheet.title}!${startingRow}:${maxRows}`
      );
      if (currentRow === void 0) {
        startingRow = 2;
        throw new import_n8n_workflow.NodeOperationError(this.getNode(), "No row found");
      }
      currentRow.json._rowsLeft = rowsLeft;
      startingRow += 1;
      if (rowsLeft === 0) {
        startingRow = 2;
      }
      return [[currentRow]];
    }
  }
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  EvaluationTrigger,
  startingRow
});
//# sourceMappingURL=EvaluationTrigger.node.ee.js.map