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
  import_common.userResourceLocator,
  {
    displayName: "User Attributes",
    name: "userAttributes",
    type: "fixedCollection",
    placeholder: "Add Attribute",
    default: {
      attributes: []
    },
    required: true,
    description: "Attributes to update for the user",
    typeOptions: {
      multipleValues: true
    },
    routing: {
      send: {
        preSend: [import_utils.preSendAttributes]
      }
    },
    options: [
      {
        displayName: "Attributes",
        name: "attributes",
        values: [
          {
            displayName: "Attribute Type",
            name: "attributeType",
            type: "options",
            default: "standard",
            options: [
              {
                name: "Standard Attribute",
                value: "standard"
              },
              {
                name: "Custom Attribute",
                value: "custom"
              }
            ]
          },
          {
            displayName: "Standard Attribute",
            name: "standardName",
            type: "options",
            default: "address",
            options: [
              {
                name: "Address",
                value: "address"
              },
              {
                name: "Birthdate",
                value: "birthdate"
              },
              {
                name: "Email",
                value: "email"
              },
              {
                name: "Family Name",
                value: "family_name"
              },
              {
                name: "Gender",
                value: "gender"
              },
              {
                name: "Given Name",
                value: "given_name"
              },
              {
                name: "Locale",
                value: "locale"
              },
              {
                name: "Middle Name",
                value: "middle_name"
              },
              {
                name: "Name",
                value: "name"
              },
              {
                name: "Nickname",
                value: "nickname"
              },
              {
                name: "Phone Number",
                value: "phone_number"
              },
              {
                name: "Preferred Username",
                value: "preferred_username"
              },
              {
                name: "Profile Picture",
                value: "profilepicture"
              },
              {
                name: "Updated At",
                value: "updated_at"
              },
              {
                name: "User Sub",
                value: "sub"
              },
              {
                name: "Website",
                value: "website"
              },
              {
                name: "Zone Info",
                value: "zoneinfo"
              }
            ],
            displayOptions: {
              show: {
                attributeType: ["standard"]
              }
            }
          },
          {
            displayName: "Custom Attribute Name",
            name: "customName",
            type: "string",
            default: "",
            placeholder: "custom:myAttribute",
            description: 'The name of the custom attribute (must start with "custom:")',
            displayOptions: {
              show: {
                attributeType: ["custom"]
              }
            }
          },
          {
            displayName: "Value",
            name: "value",
            type: "string",
            default: "",
            description: "The value of the attribute"
          }
        ]
      }
    ]
  }
];
const displayOptions = {
  show: {
    resource: ["user"],
    operation: ["update"]
  }
};
const description = (0, import_n8n_workflow.updateDisplayOptions)(displayOptions, properties);
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  description
});
//# sourceMappingURL=update.operation.js.map