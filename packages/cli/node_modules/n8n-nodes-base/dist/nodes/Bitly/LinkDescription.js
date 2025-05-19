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
var LinkDescription_exports = {};
__export(LinkDescription_exports, {
  linkFields: () => linkFields,
  linkOperations: () => linkOperations
});
module.exports = __toCommonJS(LinkDescription_exports);
const linkOperations = [
  {
    displayName: "Operation",
    name: "operation",
    type: "options",
    noDataExpression: true,
    displayOptions: {
      show: {
        resource: ["link"]
      }
    },
    options: [
      {
        name: "Create",
        value: "create",
        description: "Create a link",
        action: "Create a link"
      },
      {
        name: "Get",
        value: "get",
        description: "Get a link",
        action: "Get a link"
      },
      {
        name: "Update",
        value: "update",
        description: "Update a link",
        action: "Update a link"
      }
    ],
    default: "create"
  }
];
const linkFields = [
  /* -------------------------------------------------------------------------- */
  /*                                link:create                                 */
  /* -------------------------------------------------------------------------- */
  {
    displayName: "Long URL",
    name: "longUrl",
    type: "string",
    displayOptions: {
      show: {
        resource: ["link"],
        operation: ["create"]
      }
    },
    default: "",
    placeholder: "https://example.com",
    required: true
  },
  {
    displayName: "Additional Fields",
    name: "additionalFields",
    type: "collection",
    placeholder: "Add Field",
    default: {},
    displayOptions: {
      show: {
        resource: ["link"],
        operation: ["create"]
      }
    },
    options: [
      {
        displayName: "Domain",
        name: "domain",
        type: "string",
        default: "bit.ly"
      },
      {
        displayName: "Group Name or ID",
        name: "group",
        type: "options",
        description: 'Choose from the list, or specify an ID using an <a href="https://docs.n8n.io/code/expressions/">expression</a>',
        default: "",
        typeOptions: {
          loadOptionsMethod: "getGroups"
        }
      },
      {
        displayName: "Tag Names or IDs",
        name: "tags",
        type: "multiOptions",
        description: 'Choose from the list, or specify IDs using an <a href="https://docs.n8n.io/code/expressions/">expression</a>',
        default: [],
        typeOptions: {
          loadOptionsMethod: "getTags",
          loadOptionsDependsOn: ["group"]
        }
      },
      {
        displayName: "Title",
        name: "title",
        type: "string",
        default: ""
      }
    ]
  },
  {
    displayName: "Deeplinks",
    name: "deeplink",
    placeholder: "Add Deep Link",
    type: "fixedCollection",
    typeOptions: {
      multipleValues: true
    },
    displayOptions: {
      show: {
        resource: ["link"],
        operation: ["create"]
      }
    },
    default: {},
    options: [
      {
        name: "deeplinkUi",
        displayName: "Deep Link",
        values: [
          {
            displayName: "App ID",
            name: "appId",
            type: "string",
            default: ""
          },
          {
            displayName: "App URI Path",
            name: "appUriPath",
            type: "string",
            default: ""
          },
          {
            displayName: "Install Type",
            name: "installType",
            type: "string",
            default: ""
          },
          {
            displayName: "Install URL",
            name: "installUrl",
            type: "string",
            default: ""
          }
        ]
      }
    ]
  },
  /* -------------------------------------------------------------------------- */
  /*                                link:update                                 */
  /* -------------------------------------------------------------------------- */
  {
    displayName: "Bitlink",
    name: "id",
    type: "string",
    default: "",
    placeholder: "bit.ly/22u3ypK",
    required: true,
    displayOptions: {
      show: {
        resource: ["link"],
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
        resource: ["link"],
        operation: ["update"]
      }
    },
    options: [
      {
        displayName: "Archived",
        name: "archived",
        type: "boolean",
        default: false
      },
      {
        displayName: "Group Name or ID",
        name: "group",
        type: "options",
        description: 'Choose from the list, or specify an ID using an <a href="https://docs.n8n.io/code/expressions/">expression</a>',
        default: "",
        typeOptions: {
          loadOptionsMethod: "getGroups"
        }
      },
      {
        displayName: "Long URL",
        name: "longUrl",
        type: "string",
        default: ""
      },
      {
        displayName: "Tag Names or IDs",
        name: "tags",
        type: "multiOptions",
        description: 'Choose from the list, or specify IDs using an <a href="https://docs.n8n.io/code/expressions/">expression</a>',
        default: [],
        typeOptions: {
          loadOptionsMethod: "getTags",
          loadOptionsDependsOn: ["group"]
        }
      },
      {
        displayName: "Title",
        name: "title",
        type: "string",
        default: ""
      }
    ]
  },
  {
    displayName: "Deeplinks",
    name: "deeplink",
    placeholder: "Add Deep Link",
    type: "fixedCollection",
    typeOptions: {
      multipleValues: true
    },
    displayOptions: {
      show: {
        resource: ["link"],
        operation: ["update"]
      }
    },
    default: {},
    options: [
      {
        name: "deeplinkUi",
        displayName: "Deep Link",
        values: [
          {
            displayName: "App ID",
            name: "appId",
            type: "string",
            default: ""
          },
          {
            displayName: "App URI Path",
            name: "appUriPath",
            type: "string",
            default: ""
          },
          {
            displayName: "Install Type",
            name: "installType",
            type: "string",
            default: ""
          },
          {
            displayName: "Install URL",
            name: "installUrl",
            type: "string",
            default: ""
          }
        ]
      }
    ]
  },
  /* -------------------------------------------------------------------------- */
  /*                                 link:get                                   */
  /* -------------------------------------------------------------------------- */
  {
    displayName: "Bitlink",
    name: "id",
    type: "string",
    default: "",
    placeholder: "bit.ly/22u3ypK",
    required: true,
    displayOptions: {
      show: {
        resource: ["link"],
        operation: ["get"]
      }
    }
  }
];
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  linkFields,
  linkOperations
});
//# sourceMappingURL=LinkDescription.js.map