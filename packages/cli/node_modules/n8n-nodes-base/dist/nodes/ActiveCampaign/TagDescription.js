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
var import_GenericFunctions = require("./GenericFunctions");
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
        name: "Get",
        value: "get",
        description: "Get data of a tag",
        action: "Get a tag"
      },
      {
        name: "Get Many",
        value: "getAll",
        description: "Get data of many tags",
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
  // ----------------------------------
  //         contact:create
  // ----------------------------------
  {
    displayName: "Type",
    name: "tagType",
    type: "options",
    default: "contact",
    required: true,
    displayOptions: {
      show: {
        operation: ["create"],
        resource: ["tag"]
      }
    },
    options: [
      {
        name: "Contact",
        value: "contact",
        description: "Tag contact"
      },
      {
        name: "Template",
        value: "template",
        description: "Tag template"
      }
    ],
    description: "Tag-type of the new tag"
  },
  {
    displayName: "Name",
    name: "name",
    type: "string",
    default: "",
    required: true,
    displayOptions: {
      show: {
        operation: ["create"],
        resource: ["tag"]
      }
    },
    description: "Name of the new tag"
  },
  {
    displayName: "Additional Fields",
    name: "additionalFields",
    type: "collection",
    placeholder: "Add Field",
    displayOptions: {
      show: {
        operation: ["create"],
        resource: ["tag"]
      }
    },
    default: {},
    options: [
      {
        displayName: "Description",
        name: "description",
        type: "string",
        default: "",
        description: "Description of the new tag"
      }
    ]
  },
  // ----------------------------------
  //         tag:update
  // ----------------------------------
  {
    displayName: "Tag ID",
    name: "tagId",
    type: "number",
    displayOptions: {
      show: {
        operation: ["update"],
        resource: ["tag"]
      }
    },
    default: 0,
    required: true,
    description: "ID of the tag to update"
  },
  {
    displayName: "Update Fields",
    name: "updateFields",
    type: "collection",
    description: "The fields to update",
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
        displayName: "Tag",
        name: "tag",
        type: "string",
        default: "",
        description: "Name of the contact"
      },
      {
        displayName: "Description",
        name: "description",
        type: "string",
        default: "",
        description: "Description of the tag being updated"
      }
    ]
  },
  // ----------------------------------
  //         tag:delete
  // ----------------------------------
  {
    displayName: "Tag ID",
    name: "tagId",
    type: "number",
    displayOptions: {
      show: {
        operation: ["delete"],
        resource: ["tag"]
      }
    },
    default: 0,
    required: true,
    description: "ID of the tag to delete"
  },
  // ----------------------------------
  //         contact:get
  // ----------------------------------
  {
    displayName: "Tag ID",
    name: "tagId",
    type: "number",
    displayOptions: {
      show: {
        operation: ["get"],
        resource: ["tag"]
      }
    },
    default: 0,
    required: true,
    description: "ID of the tag to get"
  },
  // ----------------------------------
  //         tag:getAll
  // ----------------------------------
  ...(0, import_GenericFunctions.activeCampaignDefaultGetAllProperties)("tag", "getAll")
];
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  tagFields,
  tagOperations
});
//# sourceMappingURL=TagDescription.js.map