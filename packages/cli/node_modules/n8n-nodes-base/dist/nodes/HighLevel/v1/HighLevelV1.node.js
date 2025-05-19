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
var HighLevelV1_node_exports = {};
__export(HighLevelV1_node_exports, {
  HighLevelV1: () => HighLevelV1
});
module.exports = __toCommonJS(HighLevelV1_node_exports);
var import_n8n_workflow = require("n8n-workflow");
var import_ContactDescription = require("./description/ContactDescription");
var import_OpportunityDescription = require("./description/OpportunityDescription");
var import_TaskDescription = require("./description/TaskDescription");
var import_GenericFunctions = require("./GenericFunctions");
const resources = [
  {
    displayName: "Resource",
    name: "resource",
    type: "options",
    noDataExpression: true,
    options: [
      {
        name: "Contact",
        value: "contact"
      },
      {
        name: "Opportunity",
        value: "opportunity"
      },
      {
        name: "Task",
        value: "task"
      }
    ],
    default: "contact",
    required: true
  }
];
const versionDescription = {
  displayName: "HighLevel",
  name: "highLevel",
  icon: "file:highLevel.svg",
  group: ["transform"],
  version: 1,
  description: "Consume HighLevel API v1",
  subtitle: '={{$parameter["operation"] + ": " + $parameter["resource"]}}',
  defaults: {
    name: "HighLevel"
  },
  inputs: [import_n8n_workflow.NodeConnectionTypes.Main],
  outputs: [import_n8n_workflow.NodeConnectionTypes.Main],
  credentials: [
    {
      name: "highLevelApi",
      required: true
    }
  ],
  requestDefaults: {
    baseURL: "https://rest.gohighlevel.com/v1",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json"
    }
  },
  requestOperations: {
    pagination: import_GenericFunctions.highLevelApiPagination
  },
  properties: [
    ...resources,
    ...import_ContactDescription.contactOperations,
    ...import_ContactDescription.contactNotes,
    ...import_ContactDescription.contactFields,
    ...import_OpportunityDescription.opportunityOperations,
    ...import_OpportunityDescription.opportunityFields,
    ...import_TaskDescription.taskOperations,
    ...import_TaskDescription.taskFields
  ]
};
class HighLevelV1 {
  constructor(baseDescription) {
    this.methods = {
      loadOptions: {
        getPipelineStages: import_GenericFunctions.getPipelineStages,
        getUsers: import_GenericFunctions.getUsers,
        getTimezones: import_GenericFunctions.getTimezones
      }
    };
    this.description = {
      ...baseDescription,
      ...versionDescription
    };
  }
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  HighLevelV1
});
//# sourceMappingURL=HighLevelV1.node.js.map