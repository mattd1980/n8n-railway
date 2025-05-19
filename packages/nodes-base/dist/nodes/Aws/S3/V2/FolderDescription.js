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
        name: "Get Many",
        value: "getAll",
        description: "Get many folders",
        action: "Get many folders"
      }
    ],
    default: "create"
  }
];
const folderFields = [
  /* -------------------------------------------------------------------------- */
  /*                                folder:create                               */
  /* -------------------------------------------------------------------------- */
  {
    displayName: "Bucket Name",
    name: "bucketName",
    type: "string",
    required: true,
    default: "",
    displayOptions: {
      show: {
        resource: ["folder"],
        operation: ["create"]
      }
    }
  },
  {
    displayName: "Folder Name",
    name: "folderName",
    type: "string",
    required: true,
    default: "",
    displayOptions: {
      show: {
        resource: ["folder"],
        operation: ["create"]
      }
    }
  },
  {
    displayName: "Additional Fields",
    name: "additionalFields",
    type: "collection",
    placeholder: "Add Field",
    displayOptions: {
      show: {
        resource: ["folder"],
        operation: ["create"]
      }
    },
    default: {},
    options: [
      {
        displayName: "Parent Folder Key",
        name: "parentFolderKey",
        type: "string",
        default: "",
        description: "Parent folder you want to create the folder in"
      },
      {
        displayName: "Requester Pays",
        name: "requesterPays",
        type: "boolean",
        default: false,
        description: "Whether the requester will pay for requests and data transfer. While Requester Pays is enabled, anonymous access to this bucket is disabled."
      },
      {
        displayName: "Storage Class",
        name: "storageClass",
        type: "options",
        options: [
          {
            name: "Deep Archive",
            value: "deepArchive"
          },
          {
            name: "Glacier",
            value: "glacier"
          },
          {
            name: "Intelligent Tiering",
            value: "intelligentTiering"
          },
          {
            name: "One Zone IA",
            value: "onezoneIA"
          },
          {
            name: "Reduced Redundancy",
            value: "RecudedRedundancy"
          },
          {
            name: "Standard",
            value: "standard"
          },
          {
            name: "Standard IA",
            value: "standardIA"
          }
        ],
        default: "standard",
        description: "Amazon S3 storage classes"
      }
    ]
  },
  /* -------------------------------------------------------------------------- */
  /*                                folder:delete                               */
  /* -------------------------------------------------------------------------- */
  {
    displayName: "Bucket Name",
    name: "bucketName",
    type: "string",
    required: true,
    default: "",
    displayOptions: {
      show: {
        resource: ["folder"],
        operation: ["delete"]
      }
    }
  },
  {
    displayName: "Folder Key",
    name: "folderKey",
    type: "string",
    required: true,
    default: "",
    displayOptions: {
      show: {
        resource: ["folder"],
        operation: ["delete"]
      }
    }
  },
  /* -------------------------------------------------------------------------- */
  /*                                 folder:getAll                              */
  /* -------------------------------------------------------------------------- */
  {
    displayName: "Bucket Name",
    name: "bucketName",
    type: "string",
    required: true,
    default: "",
    displayOptions: {
      show: {
        resource: ["folder"],
        operation: ["getAll"]
      }
    }
  },
  {
    displayName: "Return All",
    name: "returnAll",
    type: "boolean",
    displayOptions: {
      show: {
        operation: ["getAll"],
        resource: ["folder"]
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
        resource: ["folder"],
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
    displayName: "Options",
    name: "options",
    type: "collection",
    placeholder: "Add Field",
    default: {},
    displayOptions: {
      show: {
        resource: ["folder"],
        operation: ["getAll"]
      }
    },
    options: [
      {
        displayName: "Fetch Owner",
        name: "fetchOwner",
        type: "boolean",
        default: false,
        // eslint-disable-next-line n8n-nodes-base/node-param-description-boolean-without-whether
        description: "The owner field is not present in listV2 by default, if you want to return owner field with each key in the result then set the fetch owner field to true"
      },
      {
        displayName: "Folder Key",
        name: "folderKey",
        type: "string",
        default: ""
      }
    ]
  }
];
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  folderFields,
  folderOperations
});
//# sourceMappingURL=FolderDescription.js.map