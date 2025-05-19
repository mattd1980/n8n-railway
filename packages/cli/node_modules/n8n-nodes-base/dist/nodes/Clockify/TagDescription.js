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
        description: "Create a tag",
        action: "Create a tag"
      },
      {
        name: "Delete",
        value: "delete",
        description: "Delete a tag",
        action: "Delete a tag"
      },
      {
        name: "Get Many",
        value: "getAll",
        description: "Get many tags",
        action: "Get many tags"
      },
      {
        name: "Update",
        value: "update",
        description: "Update a tag",
        action: "Update a tag"
      }
    ],
    default: "create"
  }
];
const tagFields = [
  /* -------------------------------------------------------------------------- */
  /*                                 tag:create                                 */
  /* -------------------------------------------------------------------------- */
  {
    displayName: "Name",
    name: "name",
    type: "string",
    required: true,
    default: "",
    description: "Name of tag being created",
    displayOptions: {
      show: {
        resource: ["tag"],
        operation: ["create"]
      }
    }
  },
  /* -------------------------------------------------------------------------- */
  /*                                 tag:delete                                 */
  /* -------------------------------------------------------------------------- */
  {
    displayName: "Tag ID",
    name: "tagId",
    type: "string",
    required: true,
    default: "",
    displayOptions: {
      show: {
        resource: ["tag"],
        operation: ["delete"]
      }
    }
  },
  /* -------------------------------------------------------------------------- */
  /*                                 tag:getAll                                 */
  /* -------------------------------------------------------------------------- */
  {
    displayName: "Return All",
    name: "returnAll",
    type: "boolean",
    displayOptions: {
      show: {
        operation: ["getAll"],
        resource: ["tag"]
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
        resource: ["tag"],
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
    displayName: "Additional Fields",
    name: "additionalFields",
    type: "collection",
    placeholder: "Add Field",
    displayOptions: {
      show: {
        operation: ["getAll"],
        resource: ["tag"]
      }
    },
    default: {},
    options: [
      {
        displayName: "Archived",
        name: "archived",
        type: "boolean",
        default: true
      },
      {
        displayName: "Name",
        name: "name",
        type: "string",
        default: ""
      },
      {
        displayName: "Sort Column",
        name: "sort-column",
        type: "options",
        options: [
          {
            name: "Name",
            value: "NAME"
          }
        ],
        default: ""
      },
      {
        displayName: "Sort Order",
        name: "sort-order",
        type: "options",
        options: [
          {
            name: "Ascending",
            value: "ASCENDING"
          },
          {
            name: "Descending",
            value: "DESCENDING"
          }
        ],
        default: ""
      }
    ]
  },
  /* -------------------------------------------------------------------------- */
  /*                                 tag:update                                 */
  /* -------------------------------------------------------------------------- */
  {
    displayName: "Tag ID",
    name: "tagId",
    type: "string",
    required: true,
    default: "",
    displayOptions: {
      show: {
        resource: ["tag"],
        operation: ["update"]
      }
    }
  },
  {
    displayName: "Update Fields",
    name: "updateFields",
    type: "collection",
    placeholder: "Add Field",
    displayOptions: {
      show: {
        operation: ["update"],
        resource: ["tag"]
      }
    },
    default: {},
    options: [
      {
        displayName: "Archived",
        name: "archived",
        type: "boolean",
        default: false
      },
      {
        displayName: "Name",
        name: "name",
        type: "string",
        default: ""
      }
    ]
  }
];
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  tagFields,
  tagOperations
});
//# sourceMappingURL=TagDescription.js.map