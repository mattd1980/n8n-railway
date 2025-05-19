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
var UrlDescription_exports = {};
__export(UrlDescription_exports, {
  urlFields: () => urlFields,
  urlOperations: () => urlOperations
});
module.exports = __toCommonJS(UrlDescription_exports);
const urlOperations = [
  {
    displayName: "Operation",
    name: "operation",
    type: "options",
    noDataExpression: true,
    displayOptions: {
      show: {
        resource: ["url"]
      }
    },
    options: [
      {
        name: "Expand",
        value: "expand",
        description: "Expand a URL",
        action: "Expand a URL"
      },
      {
        name: "Shorten",
        value: "shorten",
        description: "Shorten a URL",
        action: "Shorten a URL"
      },
      {
        name: "Stats",
        value: "stats",
        description: "Get stats about one short URL",
        action: "Get stats for a URL"
      }
    ],
    default: "shorten"
  }
];
const urlFields = [
  /* -------------------------------------------------------------------------- */
  /*                                url:shorten                                 */
  /* -------------------------------------------------------------------------- */
  {
    displayName: "URL",
    name: "url",
    type: "string",
    required: true,
    displayOptions: {
      show: {
        resource: ["url"],
        operation: ["shorten"]
      }
    },
    default: "",
    description: "The URL to shorten"
  },
  {
    displayName: "Additional Fields",
    name: "additionalFields",
    type: "collection",
    placeholder: "Add Field",
    default: {},
    displayOptions: {
      show: {
        resource: ["url"],
        operation: ["shorten"]
      }
    },
    options: [
      {
        displayName: "Keyword",
        name: "keyword",
        type: "string",
        default: ""
      },
      {
        displayName: "Title",
        name: "title",
        type: "string",
        default: "",
        description: "Title for custom short URLs"
      }
    ]
  },
  /* -------------------------------------------------------------------------- */
  /*                                url:expand                                  */
  /* -------------------------------------------------------------------------- */
  {
    displayName: "Short URL",
    name: "shortUrl",
    type: "string",
    required: true,
    displayOptions: {
      show: {
        resource: ["url"],
        operation: ["expand"]
      }
    },
    default: "",
    description: "The short URL to expand"
  },
  /* -------------------------------------------------------------------------- */
  /*                                url:stats                                   */
  /* -------------------------------------------------------------------------- */
  {
    displayName: "Short URL",
    name: "shortUrl",
    type: "string",
    required: true,
    displayOptions: {
      show: {
        resource: ["url"],
        operation: ["stats"]
      }
    },
    default: "",
    description: "The short URL for which to get stats"
  }
];
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  urlFields,
  urlOperations
});
//# sourceMappingURL=UrlDescription.js.map