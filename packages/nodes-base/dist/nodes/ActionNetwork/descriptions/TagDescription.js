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
var TagDescription_exports = {};
__export(TagDescription_exports, {
  tagFields: () => tagFields,
  tagOperations: () => tagOperations
});
module.exports = __toCommonJS(TagDescription_exports);
var import_SharedFields = require("./SharedFields");
const tagOperations = [
  {
    displayName: "Operation",
    name: "operation",
    type: "options",
    noDataExpression: true,
    displayOptions: {
      show: {
        resource: ["tag"]
      }
    },
    options: [
      {
        name: "Create",
        value: "create",
        action: "Create a tag"
      },
      {
        name: "Get",
        value: "get",
        action: "Get a tag"
      },
      {
        name: "Get Many",
        value: "getAll",
        action: "Get many tags"
      }
    ],
    default: "create"
  }
];
const tagFields = [
  // ----------------------------------------
  //               tag: create
  // ----------------------------------------
  {
    displayName: "Name",
    name: "name",
    description: "Name of the tag to create",
    type: "string",
    required: true,
    default: "",
    displayOptions: {
      show: {
        resource: ["tag"],
        operation: ["create"]
      }
    }
  },
  (0, import_SharedFields.makeSimpleField)("tag", "create"),
  // ----------------------------------------
  //                 tag: get
  // ----------------------------------------
  {
    displayName: "Tag ID",
    name: "tagId",
    description: "ID of the tag to retrieve",
    type: "string",
    default: "",
    required: true,
    displayOptions: {
      show: {
        resource: ["tag"],
        operation: ["get"]
      }
    }
  },
  (0, import_SharedFields.makeSimpleField)("tag", "get"),
  // ----------------------------------------
  //               tag: getAll
  // ----------------------------------------
  {
    displayName: "Return All",
    name: "returnAll",
    type: "boolean",
    default: false,
    description: "Whether to return all results or only up to a given limit",
    displayOptions: {
      show: {
        resource: ["tag"],
        operation: ["getAll"]
      }
    }
  },
  {
    displayName: "Limit",
    name: "limit",
    type: "number",
    default: 50,
    description: "Max number of results to return",
    typeOptions: {
      minValue: 1
    },
    displayOptions: {
      show: {
        resource: ["tag"],
        operation: ["getAll"],
        returnAll: [false]
      }
    }
  },
  (0, import_SharedFields.makeSimpleField)("tag", "getAll")
];
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  tagFields,
  tagOperations
});
//# sourceMappingURL=TagDescription.js.map