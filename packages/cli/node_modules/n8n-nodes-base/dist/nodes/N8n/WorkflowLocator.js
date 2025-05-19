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
var WorkflowLocator_exports = {};
__export(WorkflowLocator_exports, {
  searchWorkflows: () => searchWorkflows,
  workflowIdLocator: () => workflowIdLocator
});
module.exports = __toCommonJS(WorkflowLocator_exports);
var import_GenericFunctions = require("./GenericFunctions");
async function searchWorkflows(query) {
  const searchResults = await import_GenericFunctions.apiRequestAllItems.call(
    this,
    "GET",
    "workflows",
    {}
  );
  const workflows = searchResults.map((w) => ({
    name: `${w.name} (#${w.id})`,
    value: w.id
  })).filter(
    (w) => !query || w.name.toLowerCase().includes(query.toLowerCase()) || w.value?.toString() === query
  ).sort((a, b) => b.value - a.value);
  return {
    results: workflows
  };
}
const workflowIdLocator = {
  displayName: "Workflow",
  name: "workflowId",
  type: "resourceLocator",
  default: { mode: "list", value: "" },
  description: "Workflow to filter the executions by",
  modes: [
    {
      displayName: "From List",
      name: "list",
      type: "list",
      placeholder: "Select a Workflow...",
      initType: "workflow",
      typeOptions: {
        searchListMethod: "searchWorkflows",
        searchFilterRequired: false,
        searchable: true
      }
    },
    {
      displayName: "By URL",
      name: "url",
      type: "string",
      placeholder: "https://myinstance.app.n8n.cloud/workflow/1",
      validation: [
        {
          type: "regex",
          properties: {
            regex: ".*/workflow/([0-9a-zA-Z]{1,})",
            errorMessage: "Not a valid Workflow URL"
          }
        }
      ],
      extractValue: {
        type: "regex",
        regex: ".*/workflow/([0-9a-zA-Z]{1,})"
      }
    },
    {
      displayName: "ID",
      name: "id",
      type: "string",
      validation: [
        {
          type: "regex",
          properties: {
            regex: "[0-9a-zA-Z]{1,}",
            errorMessage: "Not a valid Workflow ID"
          }
        }
      ],
      placeholder: "1"
    }
  ]
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  searchWorkflows,
  workflowIdLocator
});
//# sourceMappingURL=WorkflowLocator.js.map