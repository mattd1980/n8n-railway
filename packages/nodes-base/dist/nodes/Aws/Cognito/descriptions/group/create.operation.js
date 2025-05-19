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
var import_common = require("../common.description");
const properties = [
  {
    ...import_common.userPoolResourceLocator,
    description: "Select the user pool to use"
  },
  {
    displayName: "Group Name",
    name: "newGroupName",
    default: "",
    placeholder: "e.g. MyNewGroup",
    description: "The name of the new group to create",
    required: true,
    type: "string",
    validateType: "string",
    routing: {
      send: {
        property: "GroupName",
        type: "body",
        preSend: [
          async function(requestOptions) {
            const newGroupName = this.getNodeParameter("newGroupName", "");
            const groupNameRegex = /^[\p{L}\p{M}\p{S}\p{N}\p{P}]+$/u;
            if (!groupNameRegex.test(newGroupName)) {
              throw new import_n8n_workflow.NodeApiError(this.getNode(), {
                message: "Invalid format for Group Name",
                description: "Group Name should not contain spaces."
              });
            }
            return requestOptions;
          }
        ]
      }
    }
  },
  {
    displayName: "Additional Fields",
    name: "additionalFields",
    default: {},
    options: [
      {
        displayName: "Description",
        name: "description",
        default: "",
        placeholder: "e.g. New group description",
        description: "A description for the new group",
        type: "string",
        routing: {
          send: {
            type: "body",
            property: "Description"
          }
        }
      },
      {
        displayName: "Precedence",
        name: "precedence",
        default: "",
        placeholder: "e.g. 10",
        description: "Precedence value for the group. Lower values indicate higher priority.",
        type: "number",
        routing: {
          send: {
            type: "body",
            property: "Precedence"
          }
        },
        validateType: "number"
      },
      {
        displayName: "Role ARN",
        name: "arn",
        default: "",
        placeholder: "e.g. arn:aws:iam::123456789012:role/GroupRole",
        description: "The role ARN for the group, used for setting claims in tokens",
        type: "string",
        routing: {
          send: {
            type: "body",
            property: "Arn",
            preSend: [import_utils.validateArn]
          }
        }
      }
    ],
    placeholder: "Add Option",
    type: "collection"
  }
];
const displayOptions = {
  show: {
    resource: ["group"],
    operation: ["create"]
  }
};
const description = (0, import_n8n_workflow.updateDisplayOptions)(displayOptions, properties);
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  description
});
//# sourceMappingURL=create.operation.js.map