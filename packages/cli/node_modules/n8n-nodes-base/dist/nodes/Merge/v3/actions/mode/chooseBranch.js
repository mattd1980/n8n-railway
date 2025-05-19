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
var chooseBranch_exports = {};
__export(chooseBranch_exports, {
  description: () => description,
  execute: () => execute,
  properties: () => properties
});
module.exports = __toCommonJS(chooseBranch_exports);
var import_n8n_workflow = require("n8n-workflow");
var import_utilities = require("../../../../../utils/utilities");
var import_descriptions = require("../../helpers/descriptions");
const properties = [
  import_descriptions.numberInputsProperty,
  {
    displayName: "Output Type",
    name: "chooseBranchMode",
    type: "options",
    options: [
      {
        name: "Wait for All Inputs to Arrive",
        value: "waitForAll"
      }
    ],
    default: "waitForAll"
  },
  {
    displayName: "Output",
    name: "output",
    type: "options",
    options: [
      {
        name: "Data of Specified Input",
        value: "specifiedInput"
      },
      {
        name: "A Single, Empty Item",
        value: "empty"
      }
    ],
    default: "specifiedInput",
    displayOptions: {
      show: {
        chooseBranchMode: ["waitForAll"]
      }
    }
  },
  {
    // eslint-disable-next-line n8n-nodes-base/node-param-display-name-wrong-for-dynamic-options
    displayName: "Use Data of Input",
    name: "useDataOfInput",
    type: "options",
    default: 1,
    displayOptions: {
      show: {
        output: ["specifiedInput"]
      }
    },
    typeOptions: {
      minValue: 1,
      loadOptionsMethod: "getInputs",
      loadOptionsDependsOn: ["numberInputs"]
    },
    // eslint-disable-next-line n8n-nodes-base/node-param-description-wrong-for-dynamic-options
    description: "The number of the input to use data of",
    validateType: "number"
  }
];
const displayOptions = {
  show: {
    mode: ["chooseBranch"]
  }
};
const description = (0, import_utilities.updateDisplayOptions)(displayOptions, properties);
async function execute(inputsData) {
  const returnData = [];
  const chooseBranchMode = this.getNodeParameter("chooseBranchMode", 0);
  if (chooseBranchMode === "waitForAll") {
    const output = this.getNodeParameter("output", 0);
    if (output === "specifiedInput") {
      const useDataOfInput = this.getNodeParameter("useDataOfInput", 0);
      if (useDataOfInput > inputsData.length) {
        throw new import_n8n_workflow.NodeOperationError(this.getNode(), `Input ${useDataOfInput} doesn't exist`, {
          description: `The node has only ${inputsData.length} inputs, so selecting input ${useDataOfInput} is not possible.`
        });
      }
      const inputData = inputsData[useDataOfInput - 1];
      returnData.push.apply(returnData, inputData);
    }
    if (output === "empty") {
      const pairedItem = [
        ...this.getInputData(0).map((inputData) => inputData.pairedItem),
        ...this.getInputData(1).map((inputData) => inputData.pairedItem)
      ].flatMap(import_utilities.preparePairedItemDataArray);
      returnData.push({
        json: {},
        pairedItem
      });
    }
  }
  return [returnData];
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  description,
  execute,
  properties
});
//# sourceMappingURL=chooseBranch.js.map