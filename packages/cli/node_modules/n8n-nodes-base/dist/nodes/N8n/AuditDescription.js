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
var AuditDescription_exports = {};
__export(AuditDescription_exports, {
  auditFields: () => auditFields,
  auditOperations: () => auditOperations
});
module.exports = __toCommonJS(AuditDescription_exports);
const auditOperations = [
  {
    displayName: "Operation",
    name: "operation",
    type: "options",
    noDataExpression: true,
    default: "get",
    displayOptions: {
      show: {
        resource: ["audit"]
      }
    },
    options: [
      {
        name: "Generate",
        value: "generate",
        action: "Generate a security audit",
        description: "Generate a security audit for this n8n instance",
        routing: {
          request: {
            method: "POST",
            url: "/audit"
          }
        }
      }
    ]
  }
];
const auditFields = [
  {
    displayName: "Additional Options",
    name: "additionalOptions",
    type: "collection",
    placeholder: "Add Filter",
    displayOptions: {
      show: {
        resource: ["audit"]
      }
    },
    routing: {
      request: {
        body: {
          additionalOptions: "={{ $value }}"
        }
      }
    },
    default: {},
    options: [
      {
        displayName: "Categories",
        name: "categories",
        description: "Risk categories to include in the audit",
        type: "multiOptions",
        default: [],
        options: [
          {
            name: "Credentials",
            value: "credentials"
          },
          {
            name: "Database",
            value: "database"
          },
          {
            name: "Filesystem",
            value: "filesystem"
          },
          {
            name: "Instance",
            value: "instance"
          },
          {
            name: "Nodes",
            value: "nodes"
          }
        ]
      },
      {
        displayName: "Days Abandoned Workflow",
        name: "daysAbandonedWorkflow",
        description: "Days for a workflow to be considered abandoned if not executed",
        type: "number",
        default: 90
      }
    ]
  }
];
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  auditFields,
  auditOperations
});
//# sourceMappingURL=AuditDescription.js.map