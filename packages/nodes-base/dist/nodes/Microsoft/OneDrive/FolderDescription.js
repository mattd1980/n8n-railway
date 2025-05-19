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
var FolderDescription_exports = {};
__export(FolderDescription_exports, {
  folderFields: () => folderFields,
  folderOperations: () => folderOperations
});
module.exports = __toCommonJS(FolderDescription_exports);
const folderOperations = [
  {
    displayName: "Operation",
    name: "operation",
    type: "options",
    noDataExpression: true,
    displayOptions: {
      show: {
        resource: ["folder"]
      }
    },
    options: [
      {
        name: "Create",
        value: "create",
        description: "Create a folder",
        action: "Create a folder"
      },
      {
        name: "Delete",
        value: "delete",
        description: "Delete a folder",
        action: "Delete a folder"
      },
      {
        name: "Get Children",
        value: "getChildren",
        description: "Get items inside a folder",
        action: "Get items in a folder"
      },
      {
        name: "Rename",
        value: "rename",
        description: "Rename a folder",
        action: "Rename a folder"
      },
      {
        name: "Search",
        value: "search",
        description: "Search a folder",
        action: "Search a folder"
      },
      {
        name: "Share",
        value: "share",
        description: "Share a folder",
        action: "Share a folder"
      }
    ],
    default: "getChildren"
  }
];
const folderFields = [
  /* -------------------------------------------------------------------------- */
  /*                                 folder:create                              */
  /* -------------------------------------------------------------------------- */
  {
    displayName: "Name",
    name: "name",
    required: true,
    type: "string",
    placeholder: "/Pictures/2021",
    displayOptions: {
      show: {
        operation: ["create"],
        resource: ["folder"]
      }
    },
    default: "",
    description: "The name or path of the folder"
  },
  {
    displayName: "Options",
    name: "options",
    type: "collection",
    displayOptions: {
      show: {
        operation: ["create"],
        resource: ["folder"]
      }
    },
    default: {},
    placeholder: "Add Field",
    options: [
      {
        displayName: "Parent Folder ID",
        name: "parentFolderId",
        type: "string",
        default: "",
        description: "ID of the folder you want to crate the new folder in"
      }
    ]
  },
  /* -------------------------------------------------------------------------- */
  /*                                 folder:getChildren/delete                  */
  /* -------------------------------------------------------------------------- */
  {
    displayName: "Folder ID",
    name: "folderId",
    type: "string",
    displayOptions: {
      show: {
        operation: ["delete", "getChildren"],
        resource: ["folder"]
      }
    },
    default: ""
  },
  /* -------------------------------------------------------------------------- */
  /*                               folder:rename                                */
  /* -------------------------------------------------------------------------- */
  {
    displayName: "Item ID",
    name: "itemId",
    type: "string",
    displayOptions: {
      show: {
        operation: ["rename"],
        resource: ["folder"]
      }
    },
    default: "",
    description: "ID of the folder"
  },
  {
    displayName: "New Name",
    name: "newName",
    type: "string",
    displayOptions: {
      show: {
        operation: ["rename"],
        resource: ["folder"]
      }
    },
    default: "",
    description: "New name for folder"
  },
  /* -------------------------------------------------------------------------- */
  /*                                 folder:search                              */
  /* -------------------------------------------------------------------------- */
  {
    displayName: "Query",
    name: "query",
    type: "string",
    displayOptions: {
      show: {
        operation: ["search"],
        resource: ["folder"]
      }
    },
    default: "",
    description: "The query text used to search for items. Values may be matched across several fields including filename, metadata, and file content."
  },
  /* -------------------------------------------------------------------------- */
  /*                                 folder:share                               */
  /* -------------------------------------------------------------------------- */
  {
    displayName: "Folder ID",
    name: "folderId",
    type: "string",
    displayOptions: {
      show: {
        operation: ["share"],
        resource: ["folder"]
      }
    },
    default: "",
    description: "File ID"
  },
  {
    displayName: "Type",
    name: "type",
    type: "options",
    options: [
      {
        name: "View",
        value: "view"
      },
      {
        name: "Edit",
        value: "edit"
      },
      {
        name: "Embed",
        value: "embed"
      }
    ],
    displayOptions: {
      show: {
        operation: ["share"],
        resource: ["folder"]
      }
    },
    default: "",
    description: "The type of sharing link to create"
  },
  {
    displayName: "Scope",
    name: "scope",
    type: "options",
    options: [
      {
        name: "Anonymous",
        value: "anonymous"
      },
      {
        name: "Organization",
        value: "organization"
      }
    ],
    displayOptions: {
      show: {
        operation: ["share"],
        resource: ["folder"]
      }
    },
    default: "",
    description: "The type of sharing link to create"
  }
];
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  folderFields,
  folderOperations
});
//# sourceMappingURL=FolderDescription.js.map