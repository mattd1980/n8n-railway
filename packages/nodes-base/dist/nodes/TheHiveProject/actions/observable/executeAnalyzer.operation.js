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
var executeAnalyzer_operation_exports = {};
__export(executeAnalyzer_operation_exports, {
  description: () => description,
  execute: () => execute
});
module.exports = __toCommonJS(executeAnalyzer_operation_exports);
var import_utilities = require("../../../../utils/utilities");
var import_descriptions = require("../../descriptions");
var import_transport = require("../../transport");
const properties = [
  import_descriptions.observableRLC,
  import_descriptions.observableTypeOptions,
  {
    displayName: "Analyzer Names or IDs",
    name: "analyzers",
    type: "multiOptions",
    description: 'Choose from the list, or specify IDs using an <a href="https://docs.n8n.io/code/expressions/">expression</a>',
    required: true,
    default: [],
    typeOptions: {
      loadOptionsDependsOn: ["observableId.value", "dataType"],
      loadOptionsMethod: "loadAnalyzers"
    },
    displayOptions: {
      hide: {
        id: [""]
      }
    }
  }
];
const displayOptions = {
  show: {
    resource: ["observable"],
    operation: ["executeAnalyzer"]
  }
};
const description = (0, import_utilities.updateDisplayOptions)(displayOptions, properties);
async function execute(i) {
  let responseData = {};
  const observableId = this.getNodeParameter("observableId", i, "", {
    extractValue: true
  });
  const analyzers = this.getNodeParameter("analyzers", i).map((analyzer) => {
    const parts = analyzer.split("::");
    return {
      analyzerId: parts[0],
      cortexId: parts[1]
    };
  });
  let response;
  let body;
  const qs = {};
  for (const analyzer of analyzers) {
    body = {
      ...analyzer,
      artifactId: observableId
    };
    response = await import_transport.theHiveApiRequest.call(
      this,
      "POST",
      "/connector/cortex/job",
      body,
      qs
    );
    const jobId = response.id;
    qs.name = "observable-jobs";
    do {
      responseData = await import_transport.theHiveApiRequest.call(
        this,
        "GET",
        `/connector/cortex/job/${jobId}`,
        body,
        qs
      );
    } while (responseData.status === "Waiting" || responseData.status === "InProgress");
  }
  const executionData = this.helpers.constructExecutionMetaData((0, import_utilities.wrapData)(responseData), {
    itemData: { item: i }
  });
  return executionData;
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  description,
  execute
});
//# sourceMappingURL=executeAnalyzer.operation.js.map