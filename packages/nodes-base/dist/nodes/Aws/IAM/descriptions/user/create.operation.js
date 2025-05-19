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
var create_operation_exports = {};
__export(create_operation_exports, {
  description: () => description
});
module.exports = __toCommonJS(create_operation_exports);
var import_n8n_workflow = require("n8n-workflow");
var import_utils = require("../../helpers/utils");
var import_common = require("../common");
const properties = [
  {
    ...import_common.userNameParameter,
    description: "The username of the new user to create",
    placeholder: "e.g. UserName"
  },
  {
    displayName: "Additional Fields",
    name: "additionalFields",
    type: "collection",
    placeholder: "Add Option",
    default: {},
    options: [
      {
        ...import_common.pathParameter,
        description: "The path for the user name",
        placeholder: "e.g. /division_abc/subdivision_xyz/",
        routing: {
          send: {
            preSend: [import_utils.validatePath],
            property: "Path",
            type: "query"
          }
        }
      },
      {
        displayName: "Permissions Boundary",
        name: "permissionsBoundary",
        default: "",
        description: "The ARN of the managed policy that is used to set the permissions boundary for the user",
        placeholder: "e.g. arn:aws:iam::123456789012:policy/ExampleBoundaryPolicy",
        type: "string",
        validateType: "string",
        routing: {
          send: {
            preSend: [import_utils.validatePermissionsBoundary]
          }
        }
      },
      {
        displayName: "Tags",
        name: "tags",
        type: "fixedCollection",
        description: "A list of tags that you want to attach to the new user",
        default: [],
        placeholder: "Add Tag",
        typeOptions: {
          multipleValues: true
        },
        options: [
          {
            name: "tags",
            displayName: "Tag",
            values: [
              {
                displayName: "Key",
                name: "key",
                type: "string",
                default: "",
                placeholder: "e.g., Department"
              },
              {
                displayName: "Value",
                name: "value",
                type: "string",
                default: "",
                placeholder: "e.g., Engineering"
              }
            ]
          }
        ],
        routing: {
          send: {
            preSend: [import_utils.preprocessTags]
          }
        }
      }
    ]
  }
];
const displayOptions = {
  show: {
    resource: ["user"],
    operation: ["create"]
  }
};
const description = (0, import_n8n_workflow.updateDisplayOptions)(displayOptions, properties);
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  description
});
//# sourceMappingURL=create.operation.js.map