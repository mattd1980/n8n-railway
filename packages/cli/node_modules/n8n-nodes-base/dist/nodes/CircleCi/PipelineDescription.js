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
var PipelineDescription_exports = {};
__export(PipelineDescription_exports, {
  pipelineFields: () => pipelineFields,
  pipelineOperations: () => pipelineOperations
});
module.exports = __toCommonJS(PipelineDescription_exports);
const pipelineOperations = [
  {
    displayName: "Operation",
    name: "operation",
    type: "options",
    noDataExpression: true,
    displayOptions: {
      show: {
        resource: ["pipeline"]
      }
    },
    options: [
      {
        name: "Get",
        value: "get",
        description: "Get a pipeline",
        action: "Get a pipeline"
      },
      {
        name: "Get Many",
        value: "getAll",
        description: "Get many pipelines",
        action: "Get many pipelines"
      },
      {
        name: "Trigger",
        value: "trigger",
        description: "Trigger a pipeline",
        action: "Trigger a pipeline"
      }
    ],
    default: "get"
  }
];
const pipelineFields = [
  /* -------------------------------------------------------------------------- */
  /*                               pipeline:shared                              */
  /* -------------------------------------------------------------------------- */
  {
    displayName: "Provider",
    name: "vcs",
    type: "options",
    options: [
      {
        name: "Bitbucket",
        value: "bitbucket"
      },
      {
        name: "GitHub",
        value: "github"
      }
    ],
    displayOptions: {
      show: {
        operation: ["get", "getAll", "trigger"],
        resource: ["pipeline"]
      }
    },
    default: "",
    description: "Source control system"
  },
  {
    displayName: "Project Slug",
    name: "projectSlug",
    type: "string",
    displayOptions: {
      show: {
        operation: ["get", "getAll", "trigger"],
        resource: ["pipeline"]
      }
    },
    default: "",
    placeholder: "n8n-io/n8n",
    description: "Project slug in the form org-name/repo-name"
  },
  /* -------------------------------------------------------------------------- */
  /*                                 pipeline:get                               */
  /* -------------------------------------------------------------------------- */
  {
    displayName: "Pipeline Number",
    name: "pipelineNumber",
    type: "number",
    typeOptions: {
      minValue: 1
    },
    displayOptions: {
      show: {
        operation: ["get"],
        resource: ["pipeline"]
      }
    },
    default: 1,
    description: "The number of the pipeline"
  },
  /* -------------------------------------------------------------------------- */
  /*                                 pipeline:getAll                            */
  /* -------------------------------------------------------------------------- */
  {
    displayName: "Return All",
    name: "returnAll",
    type: "boolean",
    displayOptions: {
      show: {
        operation: ["getAll"],
        resource: ["pipeline"]
      }
    },
    default: false,
    description: "Whether to return all results or only up to a given limit"
  },
  {
    displayName: "Limit",
    name: "limit",
    type: "number",
    displayOptions: {
      show: {
        operation: ["getAll"],
        resource: ["pipeline"],
        returnAll: [false]
      }
    },
    typeOptions: {
      minValue: 1,
      maxValue: 500
    },
    default: 100,
    description: "Max number of results to return"
  },
  {
    displayName: "Filters",
    name: "filters",
    type: "collection",
    placeholder: "Add Filter",
    default: {},
    displayOptions: {
      show: {
        resource: ["pipeline"],
        operation: ["getAll"]
      }
    },
    options: [
      {
        displayName: "Branch",
        name: "branch",
        type: "string",
        default: "",
        description: "The name of a vcs branch"
      }
    ]
  },
  /* -------------------------------------------------------------------------- */
  /*                                 pipeline:trigger                           */
  /* -------------------------------------------------------------------------- */
  {
    displayName: "Additional Fields",
    name: "additionalFields",
    type: "collection",
    placeholder: "Add Field",
    default: {},
    displayOptions: {
      show: {
        resource: ["pipeline"],
        operation: ["trigger"]
      }
    },
    options: [
      {
        displayName: "Branch",
        name: "branch",
        type: "string",
        default: "",
        description: "The branch where the pipeline ran. The HEAD commit on this branch was used for the pipeline. Note that branch and tag are mutually exclusive."
      },
      {
        displayName: "Tag",
        name: "tag",
        type: "string",
        default: "",
        description: "The tag used by the pipeline. The commit that this tag points to was used for the pipeline. Note that branch and tag are mutually exclusive"
      }
    ]
  }
];
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  pipelineFields,
  pipelineOperations
});
//# sourceMappingURL=PipelineDescription.js.map