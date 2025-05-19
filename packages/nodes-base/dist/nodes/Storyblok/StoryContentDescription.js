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
var StoryContentDescription_exports = {};
__export(StoryContentDescription_exports, {
  storyContentFields: () => storyContentFields,
  storyContentOperations: () => storyContentOperations
});
module.exports = __toCommonJS(StoryContentDescription_exports);
const storyContentOperations = [
  {
    displayName: "Operation",
    name: "operation",
    type: "options",
    noDataExpression: true,
    displayOptions: {
      show: {
        source: ["contentApi"],
        resource: ["story"]
      }
    },
    options: [
      {
        name: "Get",
        value: "get",
        description: "Get a story",
        action: "Get a story"
      },
      {
        name: "Get Many",
        value: "getAll",
        description: "Get many stories",
        action: "Get many stories"
      }
    ],
    default: "get"
  }
];
const storyContentFields = [
  /* -------------------------------------------------------------------------- */
  /*                                story:get                                   */
  /* -------------------------------------------------------------------------- */
  {
    displayName: "Identifier",
    name: "identifier",
    type: "string",
    default: "",
    required: true,
    displayOptions: {
      show: {
        source: ["contentApi"],
        resource: ["story"],
        operation: ["get"]
      }
    },
    description: "The ID or slug of the story to get"
  },
  /* -------------------------------------------------------------------------- */
  /*                                story:getAll                                */
  /* -------------------------------------------------------------------------- */
  {
    displayName: "Return All",
    name: "returnAll",
    type: "boolean",
    displayOptions: {
      show: {
        source: ["contentApi"],
        resource: ["story"],
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
        source: ["contentApi"],
        resource: ["story"],
        operation: ["getAll"],
        returnAll: [false]
      }
    },
    typeOptions: {
      minValue: 1,
      maxValue: 100
    },
    default: 50,
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
        source: ["contentApi"],
        resource: ["story"],
        operation: ["getAll"]
      }
    },
    options: [
      {
        displayName: "Starts With",
        name: "starts_with",
        type: "string",
        default: "",
        description: "Filter by slug"
      }
    ]
  }
];
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  storyContentFields,
  storyContentOperations
});
//# sourceMappingURL=StoryContentDescription.js.map