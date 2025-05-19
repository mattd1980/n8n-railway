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
var WorkflowDescription_exports = {};
__export(WorkflowDescription_exports, {
  workflowFields: () => workflowFields,
  workflowOperations: () => workflowOperations
});
module.exports = __toCommonJS(WorkflowDescription_exports);
var import_GenericFunctions = require("./GenericFunctions");
var import_WorkflowLocator = require("./WorkflowLocator");
const workflowOperations = [
  {
    displayName: "Operation",
    name: "operation",
    type: "options",
    noDataExpression: true,
    default: "getAll",
    displayOptions: {
      show: {
        resource: ["workflow"]
      }
    },
    options: [
      {
        name: "Activate",
        value: "activate",
        action: "Activate a workflow"
      },
      {
        name: "Create",
        value: "create",
        action: "Create a workflow",
        routing: {
          request: {
            method: "POST",
            url: "/workflows"
          }
        }
      },
      {
        name: "Deactivate",
        value: "deactivate",
        action: "Deactivate a workflow"
      },
      {
        name: "Delete",
        value: "delete",
        action: "Delete a workflow"
      },
      {
        name: "Get",
        value: "get",
        action: "Get a workflow"
      },
      {
        name: "Get Many",
        value: "getAll",
        action: "Get many workflows",
        routing: {
          request: {
            method: "GET",
            url: "/workflows"
          },
          send: {
            paginate: true
          },
          operations: {
            pagination: (0, import_GenericFunctions.getCursorPaginator)()
          }
        }
      },
      {
        name: "Update",
        value: "update",
        action: "Update a workflow"
      }
    ]
  }
];
const activateOperation = [
  {
    ...import_WorkflowLocator.workflowIdLocator,
    required: true,
    displayOptions: {
      show: {
        resource: ["workflow"],
        operation: ["activate"]
      }
    },
    // The routing for resourceLocator-enabled properties currently needs to
    // happen in the property block where the property itself is defined, or
    // extractValue won't work when used with $parameter in routing.request.url.
    routing: {
      request: {
        method: "POST",
        url: "=/workflows/{{ $value }}/activate"
      }
    }
  }
];
const createOperation = [
  {
    displayName: "Workflow Object",
    name: "workflowObject",
    type: "json",
    default: '{ "name": "My workflow", "nodes": [], "connections": {}, "settings": {} }',
    placeholder: '{\n  "name": "My workflow",\n  "nodes": [],\n  "connections": {},\n  "settings": {}\n}',
    required: true,
    typeOptions: {
      alwaysOpenEditWindow: true
    },
    displayOptions: {
      show: {
        resource: ["workflow"],
        operation: ["create"]
      }
    },
    routing: {
      send: {
        preSend: [(0, import_GenericFunctions.parseAndSetBodyJson)("workflowObject"), import_GenericFunctions.prepareWorkflowCreateBody]
      }
    },
    description: `A valid JSON object with required fields: 'name', 'nodes', 'connections' and 'settings'. More information can be found in the <a href="https://docs.n8n.io/api/api-reference/#tag/Workflow/paths/~1workflows/post">documentation</a>.`
  }
];
const deactivateOperation = [
  {
    ...import_WorkflowLocator.workflowIdLocator,
    required: true,
    displayOptions: {
      show: {
        resource: ["workflow"],
        operation: ["deactivate"]
      }
    },
    routing: {
      request: {
        method: "POST",
        url: "=/workflows/{{ $value }}/deactivate"
      }
    }
  }
];
const deleteOperation = [
  {
    ...import_WorkflowLocator.workflowIdLocator,
    required: true,
    displayOptions: {
      show: {
        resource: ["workflow"],
        operation: ["delete"]
      }
    },
    routing: {
      request: {
        method: "DELETE",
        url: "=/workflows/{{ $value }}"
      }
    }
  }
];
const getAllOperation = [
  {
    displayName: "Return All",
    name: "returnAll",
    type: "boolean",
    default: true,
    displayOptions: {
      show: {
        resource: ["workflow"],
        operation: ["getAll"]
      }
    },
    description: "Whether to return all results or only up to a given limit"
  },
  {
    displayName: "Limit",
    name: "limit",
    type: "number",
    default: 100,
    typeOptions: {
      minValue: 1,
      maxValue: 250
    },
    displayOptions: {
      show: {
        resource: ["workflow"],
        operation: ["getAll"],
        returnAll: [false]
      }
    },
    routing: {
      request: {
        qs: {
          limit: "={{ $value }}"
        }
      }
    },
    description: "Max number of results to return"
  },
  {
    displayName: "Filters",
    name: "filters",
    type: "collection",
    default: {},
    displayOptions: {
      show: {
        resource: ["workflow"],
        operation: ["getAll"]
      }
    },
    options: [
      {
        displayName: "Return Only Active Workflows",
        name: "activeWorkflows",
        type: "boolean",
        default: true,
        routing: {
          request: {
            qs: {
              active: "={{ $value }}"
            }
          }
        }
      },
      {
        displayName: "Tags",
        name: "tags",
        type: "string",
        default: "",
        routing: {
          // Only include the 'tags' query parameter if it's non-empty
          send: {
            type: "query",
            property: "tags",
            value: '={{ $value !== "" ? $value : undefined }}'
          }
        },
        description: "Include only workflows with these tags",
        hint: "Comma separated list of tags (empty value is ignored)"
      }
    ]
  }
];
const getOperation = [
  {
    ...import_WorkflowLocator.workflowIdLocator,
    required: true,
    displayOptions: {
      show: {
        resource: ["workflow"],
        operation: ["get"]
      }
    },
    routing: {
      request: {
        method: "GET",
        url: "=/workflows/{{ $value }}"
      }
    }
  }
];
const updateOperation = [
  {
    ...import_WorkflowLocator.workflowIdLocator,
    required: true,
    displayOptions: {
      show: {
        resource: ["workflow"],
        operation: ["update"]
      }
    },
    routing: {
      request: {
        method: "PUT",
        url: "=/workflows/{{ $value }}"
      }
    }
  },
  {
    displayName: "Workflow Object",
    name: "workflowObject",
    type: "json",
    default: "",
    placeholder: '{\n  "name": "My workflow",\n  "nodes": [],\n  "connections": {},\n  "settings": {}\n}',
    required: true,
    typeOptions: {
      alwaysOpenEditWindow: true
    },
    displayOptions: {
      show: {
        resource: ["workflow"],
        operation: ["update"]
      }
    },
    routing: {
      send: {
        preSend: [(0, import_GenericFunctions.parseAndSetBodyJson)("workflowObject"), import_GenericFunctions.prepareWorkflowUpdateBody]
      }
    },
    description: `A valid JSON object with required fields: 'name', 'nodes', 'connections' and 'settings'. More information can be found in the <a href="https://docs.n8n.io/api/api-reference/#tag/Workflow/paths/~1workflows~1%7Bid%7D/put">documentation</a>.`
  }
];
const workflowFields = [
  ...activateOperation,
  ...createOperation,
  ...deactivateOperation,
  ...deleteOperation,
  ...getAllOperation,
  ...getOperation,
  ...updateOperation
];
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  workflowFields,
  workflowOperations
});
//# sourceMappingURL=WorkflowDescription.js.map