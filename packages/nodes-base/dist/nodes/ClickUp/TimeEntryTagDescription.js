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
var TimeEntryTagDescription_exports = {};
__export(TimeEntryTagDescription_exports, {
  timeEntryTagFields: () => timeEntryTagFields,
  timeEntryTagOperations: () => timeEntryTagOperations
});
module.exports = __toCommonJS(TimeEntryTagDescription_exports);
const timeEntryTagOperations = [
  {
    displayName: "Operation",
    name: "operation",
    type: "options",
    noDataExpression: true,
    displayOptions: {
      show: {
        resource: ["timeEntryTag"]
      }
    },
    options: [
      {
        name: "Add",
        value: "add",
        description: "Add tag to time entry",
        action: "Add a time entry tag"
      },
      {
        name: "Get Many",
        value: "getAll",
        description: "Get many time entry tags",
        action: "Get many time entry tags"
      },
      {
        name: "Remove",
        value: "remove",
        description: "Remove tag from time entry",
        action: "Remove a time entry tag"
      }
    ],
    default: "add"
  }
];
const timeEntryTagFields = [
  /* -------------------------------------------------------------------------- */
  /*                                timeEntryTag:getAll                         */
  /* -------------------------------------------------------------------------- */
  {
    displayName: "Team Name or ID",
    name: "team",
    type: "options",
    description: 'Choose from the list, or specify an ID using an <a href="https://docs.n8n.io/code/expressions/">expression</a>',
    default: "",
    displayOptions: {
      show: {
        resource: ["timeEntryTag"],
        operation: ["getAll"]
      }
    },
    typeOptions: {
      loadOptionsMethod: "getTeams"
    },
    required: true
  },
  {
    displayName: "Return All",
    name: "returnAll",
    type: "boolean",
    displayOptions: {
      show: {
        resource: ["timeEntryTag"],
        operation: ["getAll"]
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
        resource: ["timeEntryTag"],
        operation: ["getAll"],
        returnAll: [false]
      }
    },
    typeOptions: {
      minValue: 1,
      maxValue: 10
    },
    default: 5,
    description: "Max number of results to return"
  },
  /* -------------------------------------------------------------------------- */
  /*                                timeEntryTag:add                            */
  /* -------------------------------------------------------------------------- */
  {
    displayName: "Team Name or ID",
    name: "team",
    type: "options",
    description: 'Choose from the list, or specify an ID using an <a href="https://docs.n8n.io/code/expressions/">expression</a>',
    default: "",
    displayOptions: {
      show: {
        resource: ["timeEntryTag"],
        operation: ["add"]
      }
    },
    typeOptions: {
      loadOptionsMethod: "getTeams"
    },
    required: true
  },
  {
    displayName: "Time Entry IDs",
    name: "timeEntryIds",
    type: "string",
    default: "",
    displayOptions: {
      show: {
        resource: ["timeEntryTag"],
        operation: ["add"]
      }
    },
    required: true
  },
  {
    displayName: "Tags",
    name: "tagsUi",
    type: "fixedCollection",
    placeholder: "Add Tag",
    typeOptions: {
      multipleValues: true
    },
    default: {},
    displayOptions: {
      show: {
        resource: ["timeEntryTag"],
        operation: ["add"]
      }
    },
    options: [
      {
        displayName: "Tag",
        name: "tagsValues",
        values: [
          {
            displayName: "Name",
            name: "name",
            type: "string",
            default: ""
          },
          {
            displayName: "Background Color",
            name: "tag_bg",
            type: "color",
            default: "#ff0000"
          },
          {
            displayName: "Foreground Color",
            name: "tag_fg",
            type: "color",
            default: "#ff0000"
          }
        ]
      }
    ]
  },
  /* -------------------------------------------------------------------------- */
  /*                                timeEntryTag:remove                         */
  /* -------------------------------------------------------------------------- */
  {
    displayName: "Team Name or ID",
    name: "team",
    type: "options",
    description: 'Choose from the list, or specify an ID using an <a href="https://docs.n8n.io/code/expressions/">expression</a>',
    default: "",
    displayOptions: {
      show: {
        resource: ["timeEntryTag"],
        operation: ["remove"]
      }
    },
    typeOptions: {
      loadOptionsMethod: "getTeams"
    },
    required: true
  },
  {
    displayName: "Time Entry IDs",
    name: "timeEntryIds",
    type: "string",
    default: "",
    displayOptions: {
      show: {
        resource: ["timeEntryTag"],
        operation: ["remove"]
      }
    },
    required: true
  },
  {
    displayName: "Tag Names or IDs",
    name: "tagNames",
    type: "multiOptions",
    description: 'Choose from the list, or specify IDs using an <a href="https://docs.n8n.io/code/expressions/">expression</a>',
    typeOptions: {
      loadOptionsMethod: "getTimeEntryTags",
      loadOptionsDependsOn: ["teamId"]
    },
    default: [],
    displayOptions: {
      show: {
        resource: ["timeEntryTag"],
        operation: ["remove"]
      }
    },
    required: true
  }
];
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  timeEntryTagFields,
  timeEntryTagOperations
});
//# sourceMappingURL=TimeEntryTagDescription.js.map