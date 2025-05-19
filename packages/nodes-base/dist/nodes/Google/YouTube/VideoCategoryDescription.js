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
var VideoCategoryDescription_exports = {};
__export(VideoCategoryDescription_exports, {
  videoCategoryFields: () => videoCategoryFields,
  videoCategoryOperations: () => videoCategoryOperations
});
module.exports = __toCommonJS(VideoCategoryDescription_exports);
const videoCategoryOperations = [
  {
    displayName: "Operation",
    name: "operation",
    type: "options",
    noDataExpression: true,
    displayOptions: {
      show: {
        resource: ["videoCategory"]
      }
    },
    options: [
      {
        name: "Get Many",
        value: "getAll",
        description: "Retrieve many video categories",
        action: "Get many video categories"
      }
    ],
    default: "getAll"
  }
];
const videoCategoryFields = [
  /* -------------------------------------------------------------------------- */
  /*                                 videoCategory:getAll                       */
  /* -------------------------------------------------------------------------- */
  {
    // eslint-disable-next-line n8n-nodes-base/node-param-display-name-wrong-for-dynamic-options
    displayName: "Region Code",
    name: "regionCode",
    type: "options",
    description: 'Choose from the list, or specify an ID using an <a href="https://docs.n8n.io/code/expressions/">expression</a>',
    required: true,
    displayOptions: {
      show: {
        operation: ["getAll"],
        resource: ["videoCategory"]
      }
    },
    typeOptions: {
      loadOptionsMethod: "getCountriesCodes"
    },
    default: ""
  },
  {
    displayName: "Return All",
    name: "returnAll",
    type: "boolean",
    displayOptions: {
      show: {
        operation: ["getAll"],
        resource: ["videoCategory"]
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
        resource: ["videoCategory"],
        returnAll: [false]
      }
    },
    typeOptions: {
      minValue: 1,
      maxValue: 50
    },
    default: 25,
    description: "Max number of results to return"
  }
];
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  videoCategoryFields,
  videoCategoryOperations
});
//# sourceMappingURL=VideoCategoryDescription.js.map