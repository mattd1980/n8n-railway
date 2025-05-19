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
var update_operation_exports = {};
__export(update_operation_exports, {
  description: () => description
});
module.exports = __toCommonJS(update_operation_exports);
var import_n8n_workflow = require("n8n-workflow");
var import_utils = require("../../helpers/utils");
var import_common = require("../common.description");
const properties = [
  {
    ...import_common.userPoolResourceLocator,
    description: "Select the user pool to use"
  },
  {
    ...import_common.groupResourceLocator,
    description: "Select the group you want to update"
  },
  {
    displayName: "Additional Fields",
    name: "additionalFields",
    placeholder: "Add Option",
    type: "collection",
    default: {},
    routing: {
      send: {
        preSend: [
          async function(requestOptions) {
            const additionalFields = this.getNodeParameter("additionalFields", {});
            const arn = additionalFields.arn;
            const description2 = additionalFields.description;
            const precedence = additionalFields.precedence;
            if (!description2 && !precedence && !arn) {
              throw new import_n8n_workflow.NodeApiError(this.getNode(), {
                message: "At least one field must be provided for update.",
                description: "Please provide a value for Description, Precedence, or Role ARN."
              });
            }
            return requestOptions;
          }
        ]
      }
    },
    options: [
      {
        displayName: "Description",
        name: "description",
        default: "",
        placeholder: "e.g. Updated group description",
        description: "A new description for the group",
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
        description: "The new precedence value for the group. Lower values indicate higher priority.",
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
        description: "A new role Amazon Resource Name (ARN) for the group. Used for setting claims in tokens.",
        type: "string",
        routing: {
          send: {
            type: "body",
            property: "Arn",
            preSend: [import_utils.validateArn]
          }
        }
      }
    ]
  }
];
const displayOptions = {
  show: {
    resource: ["group"],
    operation: ["update"]
  }
};
const description = (0, import_n8n_workflow.updateDisplayOptions)(displayOptions, properties);
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  description
});
//# sourceMappingURL=update.operation.js.map