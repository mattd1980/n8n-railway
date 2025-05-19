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
    description: "Select the user pool to retrieve"
  },
  {
    displayName: "User Name",
    name: "newUserName",
    default: "",
    description: "Depending on the user pool settings, this parameter requires the username, the email, or the phone number. No whitespace is allowed.",
    placeholder: "e.g. JohnSmith",
    required: true,
    routing: {
      send: {
        property: "Username",
        type: "body"
      }
    },
    type: "string",
    validateType: "string"
  },
  {
    displayName: "Additional Fields",
    name: "additionalFields",
    type: "collection",
    placeholder: "Add Field",
    default: {},
    options: [
      {
        displayName: "Message Action",
        name: "messageAction",
        default: "RESEND",
        type: "options",
        options: [
          {
            name: "Resend",
            value: "RESEND",
            description: "Resend the invitation message to a user that already exists and reset the expiration limit on the user's account"
          },
          {
            name: "Suppress",
            value: "SUPPRESS",
            description: "Suppress sending the message"
          }
        ],
        routing: {
          send: {
            property: "MessageAction",
            type: "body"
          }
        }
      },
      {
        displayName: "Force Alias Creation",
        name: "forceAliasCreation",
        type: "boolean",
        validateType: "boolean",
        default: false,
        description: "Whether this parameter is used only if the phone_number_verified or email_verified attribute is set to true. Otherwise, it is ignored. If set to true, and the phone number or email address specified in the UserAttributes parameter already exists as an alias with a different user, the alias will be migrated. If set to false, an AliasExistsException error is thrown if the alias already exists.",
        routing: {
          send: {
            type: "body",
            property: "ForceAliasCreation"
          }
        }
      },
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
                    name: "Email Verified",
                    value: "email_verified"
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
                    name: "Phone Number Verified",
                    value: "phone_number_verified"
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
      },
      {
        displayName: "Desired Delivery Mediums",
        name: "desiredDeliveryMediums",
        default: ["SMS"],
        description: "Specify how to send the welcome message",
        type: "multiOptions",
        options: [
          {
            name: "SMS",
            value: "SMS"
          },
          {
            name: "Email",
            value: "EMAIL"
          }
        ],
        routing: {
          send: {
            preSend: [import_utils.preSendDesiredDeliveryMediums],
            property: "DesiredDeliveryMediums",
            type: "body"
          }
        }
      },
      {
        displayName: "Temporary Password",
        name: "temporaryPasswordOptions",
        type: "string",
        typeOptions: {
          password: true
        },
        default: "",
        description: "The user's temporary password that will be valid only once. If not set, Amazon Cognito will automatically generate one for you.",
        routing: {
          send: {
            property: "TemporaryPassword",
            type: "body"
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