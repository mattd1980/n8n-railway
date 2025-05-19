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
var N8n_node_exports = {};
__export(N8n_node_exports, {
  N8n: () => N8n
});
module.exports = __toCommonJS(N8n_node_exports);
var import_n8n_workflow = require("n8n-workflow");
var import_AuditDescription = require("./AuditDescription");
var import_CredentialDescription = require("./CredentialDescription");
var import_ExecutionDescription = require("./ExecutionDescription");
var import_WorkflowDescription = require("./WorkflowDescription");
var import_WorkflowLocator = require("./WorkflowLocator");
class N8n {
  constructor() {
    this.description = {
      displayName: "n8n",
      name: "n8n",
      icon: "file:n8n.svg",
      group: ["transform"],
      version: 1,
      subtitle: '={{$parameter["operation"] + ": " + $parameter["resource"]}}',
      description: "Handle events and perform actions on your n8n instance",
      defaults: {
        name: "n8n"
      },
      inputs: [import_n8n_workflow.NodeConnectionTypes.Main],
      outputs: [import_n8n_workflow.NodeConnectionTypes.Main],
      credentials: [
        {
          name: "n8nApi",
          required: true
        }
      ],
      requestDefaults: {
        returnFullResponse: true,
        baseURL: '={{ $credentials.baseUrl.replace(new RegExp("/$"), "") }}',
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        }
      },
      properties: [
        {
          displayName: "Resource",
          name: "resource",
          type: "options",
          noDataExpression: true,
          options: [
            {
              name: "Audit",
              value: "audit"
            },
            {
              name: "Credential",
              value: "credential"
            },
            {
              name: "Execution",
              value: "execution"
            },
            {
              name: "Workflow",
              value: "workflow"
            }
          ],
          default: "workflow"
        },
        ...import_AuditDescription.auditOperations,
        ...import_AuditDescription.auditFields,
        ...import_CredentialDescription.credentialOperations,
        ...import_CredentialDescription.credentialFields,
        ...import_ExecutionDescription.executionOperations,
        ...import_ExecutionDescription.executionFields,
        ...import_WorkflowDescription.workflowOperations,
        ...import_WorkflowDescription.workflowFields
      ]
    };
    this.methods = {
      listSearch: {
        // Provide workflows search capability for the workflow resourceLocator
        searchWorkflows: import_WorkflowLocator.searchWorkflows
      }
    };
  }
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  N8n
});
//# sourceMappingURL=N8n.node.js.map