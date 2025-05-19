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
var SubredditDescription_exports = {};
__export(SubredditDescription_exports, {
  subredditFields: () => subredditFields,
  subredditOperations: () => subredditOperations
});
module.exports = __toCommonJS(SubredditDescription_exports);
const subredditOperations = [
  {
    displayName: "Operation",
    name: "operation",
    type: "options",
    noDataExpression: true,
    default: "get",
    options: [
      {
        name: "Get",
        value: "get",
        description: "Retrieve background information about a subreddit",
        action: "Get a subreddit"
      },
      {
        name: "Get Many",
        value: "getAll",
        description: "Retrieve information about many subreddits",
        action: "Get many subreddits"
      }
    ],
    displayOptions: {
      show: {
        resource: ["subreddit"]
      }
    }
  }
];
const subredditFields = [
  // ----------------------------------
  //         subreddit: get
  // ----------------------------------
  {
    displayName: "Content",
    name: "content",
    type: "options",
    required: true,
    default: "about",
    description: "Subreddit content to retrieve",
    options: [
      {
        name: "About",
        value: "about"
      },
      {
        name: "Rules",
        value: "rules"
      }
    ],
    displayOptions: {
      show: {
        resource: ["subreddit"],
        operation: ["get"]
      }
    }
  },
  {
    displayName: "Subreddit",
    name: "subreddit",
    type: "string",
    required: true,
    default: "",
    description: "The name of subreddit to retrieve the content from",
    displayOptions: {
      show: {
        resource: ["subreddit"],
        operation: ["get"]
      }
    }
  },
  // ----------------------------------
  //        subreddit: getAll
  // ----------------------------------
  {
    displayName: "Return All",
    name: "returnAll",
    type: "boolean",
    default: false,
    description: "Whether to return all results or only up to a given limit",
    displayOptions: {
      show: {
        resource: ["subreddit"],
        operation: ["getAll"]
      }
    }
  },
  {
    displayName: "Limit",
    name: "limit",
    type: "number",
    default: 100,
    description: "Max number of results to return",
    typeOptions: {
      minValue: 1,
      maxValue: 100
    },
    displayOptions: {
      show: {
        resource: ["subreddit"],
        operation: ["getAll"],
        returnAll: [false]
      }
    }
  },
  {
    displayName: "Filters",
    name: "filters",
    type: "collection",
    placeholder: "Add Field",
    default: {},
    options: [
      {
        displayName: "Keyword",
        name: "keyword",
        type: "string",
        default: "",
        description: "The keyword for the subreddit search"
      },
      {
        displayName: "Trending",
        name: "trending",
        type: "boolean",
        default: false,
        description: "Whether to fetch currently trending subreddits in all of Reddit"
      }
    ],
    displayOptions: {
      show: {
        resource: ["subreddit"],
        operation: ["getAll"]
      }
    }
  }
];
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  subredditFields,
  subredditOperations
});
//# sourceMappingURL=SubredditDescription.js.map