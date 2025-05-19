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
var HookDescription_exports = {};
__export(HookDescription_exports, {
  hookFields: () => hookFields,
  hookOperations: () => hookOperations
});
module.exports = __toCommonJS(HookDescription_exports);
const hookOperations = [
  {
    displayName: "Operation",
    name: "operation",
    type: "options",
    noDataExpression: true,
    displayOptions: {
      show: {
        resource: ["hook"]
      }
    },
    options: [
      {
        name: "Get",
        value: "get",
        description: "Get a single hook definition",
        action: "Get a hook"
      },
      {
        name: "Get Many",
        value: "getAll",
        description: "List many hooks on a form",
        action: "Get Many hooks"
      },
      {
        name: "Logs",
        value: "getLogs",
        description: "Get hook logs",
        action: "Get Logs for a hook"
      },
      {
        name: "Retry All",
        value: "retryAll",
        description: "Retry all failed attempts for a given hook",
        action: "Retry All hooks"
      },
      {
        name: "Retry One",
        value: "retryOne",
        description: "Retry a specific hook",
        action: "Retry One hook"
      }
    ],
    default: "getAll"
  }
];
const hookFields = [
  /* -------------------------------------------------------------------------- */
  /*                                hook:get                                    */
  /* -------------------------------------------------------------------------- */
  {
    displayName: "Form Name or ID",
    name: "formId",
    type: "options",
    typeOptions: {
      loadOptionsMethod: "loadForms"
    },
    required: true,
    default: "",
    displayOptions: {
      show: {
        resource: ["hook"],
        operation: ["get", "retryOne", "retryAll", "getLogs", "getAll"]
      }
    },
    description: 'Form ID (e.g. aSAvYreNzVEkrWg5Gdcvg). Choose from the list, or specify an ID using an <a href="https://docs.n8n.io/code/expressions/">expression</a>.'
  },
  {
    displayName: "Hook ID",
    name: "hookId",
    type: "string",
    required: true,
    displayOptions: {
      show: {
        resource: ["hook"],
        operation: ["get", "retryOne", "retryAll", "getLogs"]
      }
    },
    default: "",
    description: "Hook ID (starts with h, e.g. hVehywQ2oXPYGHJHKtqth4)"
  },
  /* -------------------------------------------------------------------------- */
  /*                                hook:getAll                                 */
  /* -------------------------------------------------------------------------- */
  {
    displayName: "Hook Log ID",
    name: "logId",
    type: "string",
    required: true,
    displayOptions: {
      show: {
        resource: ["hook"],
        operation: ["retryOne"]
      }
    },
    default: "",
    description: "Hook log ID (starts with hl, e.g. hlSbGKaUKzTVNoWEVMYbLHe)"
  },
  {
    displayName: "Return All",
    name: "returnAll",
    type: "boolean",
    required: true,
    default: false,
    displayOptions: {
      show: {
        resource: ["hook"],
        operation: ["getAll"]
      }
    },
    description: "Whether to return all results or only up to a given limit"
  },
  {
    displayName: "Limit",
    name: "limit",
    type: "number",
    typeOptions: {
      maxValue: 3e3
    },
    displayOptions: {
      show: {
        resource: ["hook"],
        operation: ["getAll"],
        returnAll: [false]
      }
    },
    default: 1e3,
    description: "Max number of results to return"
  },
  /* -------------------------------------------------------------------------- */
  /*                                hook:getLogs                                 */
  /* -------------------------------------------------------------------------- */
  {
    displayName: "Log Status",
    name: "status",
    type: "options",
    displayOptions: {
      show: {
        resource: ["hook"],
        operation: ["getLogs"]
      }
    },
    default: "",
    description: "Only retrieve logs with a specific status",
    options: [
      {
        name: "All",
        value: ""
      },
      {
        name: "Failed",
        value: "0"
      },
      {
        name: "Pending",
        value: "1"
      },
      {
        name: "Success",
        value: "2"
      }
    ]
  },
  {
    displayName: "Start Date",
    name: "startDate",
    type: "dateTime",
    displayOptions: {
      show: {
        resource: ["hook"],
        operation: ["getLogs"]
      }
    },
    default: "",
    description: "Minimum date for the hook log to retrieve"
  },
  {
    displayName: "End Date",
    name: "endDate",
    type: "dateTime",
    displayOptions: {
      show: {
        resource: ["hook"],
        operation: ["getLogs"]
      }
    },
    default: "",
    description: "Maximum date for the hook log to retrieve"
  }
];
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  hookFields,
  hookOperations
});
//# sourceMappingURL=HookDescription.js.map