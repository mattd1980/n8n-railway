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
var rlc_description_exports = {};
__export(rlc_description_exports, {
  alertRLC: () => alertRLC,
  caseRLC: () => caseRLC,
  commentRLC: () => commentRLC,
  logRLC: () => logRLC,
  observableRLC: () => observableRLC,
  pageRLC: () => pageRLC,
  taskRLC: () => taskRLC
});
module.exports = __toCommonJS(rlc_description_exports);
const caseRLC = {
  displayName: "Case",
  name: "caseId",
  type: "resourceLocator",
  default: { mode: "list", value: "" },
  required: true,
  modes: [
    {
      displayName: "From List",
      name: "list",
      type: "list",
      placeholder: "Select a case...",
      typeOptions: {
        searchListMethod: "caseSearch",
        searchable: true
      }
    },
    {
      displayName: "Link",
      name: "url",
      type: "string",
      extractValue: {
        type: "regex",
        regex: "https:\\/\\/.+\\/cases\\/(~[0-9]{1,})\\/details"
      },
      validation: [
        {
          type: "regex",
          properties: {
            regex: "https:\\/\\/.+\\/cases\\/(~[0-9]{1,})\\/details",
            errorMessage: "Not a valid Case URL"
          }
        }
      ]
    },
    {
      displayName: "ID",
      name: "id",
      type: "string",
      placeholder: "e.g. ~123456789",
      validation: [
        {
          type: "regex",
          properties: {
            regex: "(~[0-9]{1,})",
            errorMessage: "Not a valid Case ID"
          }
        }
      ]
    }
  ]
};
const alertRLC = {
  displayName: "Alert",
  name: "alertId",
  type: "resourceLocator",
  default: { mode: "list", value: "" },
  required: true,
  modes: [
    {
      displayName: "From List",
      name: "list",
      type: "list",
      placeholder: "Select a alert...",
      typeOptions: {
        searchListMethod: "alertSearch",
        searchable: true
      }
    },
    {
      displayName: "Link",
      name: "url",
      type: "string",
      extractValue: {
        type: "regex",
        regex: "https:\\/\\/.+\\/alerts\\/(~[0-9]{1,})\\/details"
      },
      validation: [
        {
          type: "regex",
          properties: {
            regex: "https:\\/\\/.+\\/alerts\\/(~[0-9]{1,})\\/details",
            errorMessage: "Not a valid Alert URL"
          }
        }
      ]
    },
    {
      displayName: "ID",
      name: "id",
      type: "string",
      placeholder: "e.g. ~123456789",
      validation: [
        {
          type: "regex",
          properties: {
            regex: "(~[0-9]{1,})",
            errorMessage: "Not a valid Alert ID"
          }
        }
      ]
    }
  ]
};
const taskRLC = {
  displayName: "Task",
  name: "taskId",
  type: "resourceLocator",
  default: { mode: "list", value: "" },
  required: true,
  modes: [
    {
      displayName: "From List",
      name: "list",
      type: "list",
      placeholder: "Select a task...",
      typeOptions: {
        searchListMethod: "taskSearch",
        searchable: true
      }
    },
    {
      displayName: "ID",
      name: "id",
      type: "string",
      placeholder: "e.g. ~123456789",
      validation: [
        {
          type: "regex",
          properties: {
            regex: "(~[0-9]{1,})",
            errorMessage: "Not a valid Task ID"
          }
        }
      ]
    }
  ]
};
const pageRLC = {
  displayName: "Page",
  name: "pageId",
  type: "resourceLocator",
  default: { mode: "list", value: "" },
  required: true,
  typeOptions: {
    loadOptionsDependsOn: ["caseId"]
  },
  modes: [
    {
      displayName: "From List",
      name: "list",
      type: "list",
      placeholder: "Select a page...",
      typeOptions: {
        searchListMethod: "pageSearch",
        searchable: true
      }
    },
    {
      displayName: "ID",
      name: "id",
      type: "string",
      placeholder: "e.g. ~123456789",
      validation: [
        {
          type: "regex",
          properties: {
            regex: "(~[0-9]{1,})",
            errorMessage: "Not a valid Page ID"
          }
        }
      ]
    }
  ]
};
const logRLC = {
  displayName: "Task Log",
  name: "logId",
  type: "resourceLocator",
  default: { mode: "list", value: "" },
  required: true,
  modes: [
    {
      displayName: "From List",
      name: "list",
      type: "list",
      placeholder: "Select a task log...",
      typeOptions: {
        searchListMethod: "logSearch",
        searchable: true
      }
    },
    {
      displayName: "ID",
      name: "id",
      type: "string",
      placeholder: "e.g. ~123456789",
      validation: [
        {
          type: "regex",
          properties: {
            regex: "(~[0-9]{1,})",
            errorMessage: "Not a valid task Log ID"
          }
        }
      ]
    }
  ]
};
const commentRLC = {
  displayName: "Comment",
  name: "commentId",
  type: "resourceLocator",
  default: { mode: "list", value: "" },
  required: true,
  modes: [
    {
      displayName: "From List",
      name: "list",
      type: "list",
      placeholder: "Select a comment...",
      typeOptions: {
        searchListMethod: "commentSearch",
        searchable: true
      }
    },
    {
      displayName: "ID",
      name: "id",
      type: "string",
      placeholder: "e.g. ~123456789",
      validation: [
        {
          type: "regex",
          properties: {
            regex: "(~[0-9]{1,})",
            errorMessage: "Not a valid comment ID"
          }
        }
      ]
    }
  ]
};
const observableRLC = {
  displayName: "Observable",
  name: "observableId",
  type: "resourceLocator",
  default: { mode: "list", value: "" },
  required: true,
  modes: [
    {
      displayName: "From List",
      name: "list",
      type: "list",
      placeholder: "Select an observable...",
      typeOptions: {
        searchListMethod: "observableSearch",
        searchable: true
      }
    },
    {
      displayName: "ID",
      name: "id",
      type: "string",
      placeholder: "e.g. ~123456789",
      validation: [
        {
          type: "regex",
          properties: {
            regex: "(~[0-9]{1,})",
            errorMessage: "Not a valid Log ID"
          }
        }
      ]
    }
  ]
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  alertRLC,
  caseRLC,
  commentRLC,
  logRLC,
  observableRLC,
  pageRLC,
  taskRLC
});
//# sourceMappingURL=rlc.description.js.map