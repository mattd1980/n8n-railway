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
    displayOptions: {
      show: {
        resource: ["tag"]
      }
    },
    noDataExpression: true,
    options: [
      {
        name: "Create",
        value: "create",
        action: "Create a tag"
      },
      {
        name: "Delete",
        value: "delete",
        action: "Delete a tag"
      },
      {
        name: "Get Many",
        value: "getAll",
        action: "Get many tags"
      },
      {
        name: "Update",
        value: "update",
        action: "Update a tag"
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
  {
    displayName: "Additional Fields",
    name: "additionalFields",
    type: "collection",
    placeholder: "Add Field",
    default: {},
    displayOptions: {
      show: {
        resource: ["tag"],
        operation: ["create"]
      }
    },
    options: [
      {
        displayName: "Color",
        description: "Hex color code for the tag",
        name: "colour",
        type: "color",
        default: ""
      }
    ]
  },
  // ----------------------------------------
  //               tag: delete
  // ----------------------------------------
  {
    displayName: "Tag ID",
    name: "tagId",
    description: "Numeric ID of the attribute",
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
  // ----------------------------------------
  //                 tag: getAll
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
  // ----------------------------------------
  //               tag: update
  // ----------------------------------------
  {
    displayName: "Tag ID",
    name: "tagId",
    description: "ID of the tag to update",
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
    default: {},
    displayOptions: {
      show: {
        resource: ["tag"],
        operation: ["update"]
      }
    },
    options: [
      {
        displayName: "Color",
        description: "Hex color code for the tag",
        name: "colour",
        type: "color",
        default: ""
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