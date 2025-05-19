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
var description_exports = {};
__export(description_exports, {
  customerCreateDescription: () => customerCreateDescription
});
module.exports = __toCommonJS(description_exports);
var import_sharedFields = require("../../../methods/sharedFields");
const customerCreateDescription = [
  {
    displayName: "Email",
    name: "email",
    type: "string",
    placeholder: "name@email.com",
    displayOptions: {
      show: {
        resource: ["customer"],
        operation: ["create"]
      }
    },
    default: ""
  },
  {
    displayName: "Additional Fields",
    name: "additionalFields",
    type: "collection",
    placeholder: "Add Field",
    displayOptions: {
      show: {
        resource: ["customer"],
        operation: ["create"]
      }
    },
    default: {},
    options: [
      import_sharedFields.addressFixedCollection,
      {
        displayName: "Business Name",
        name: "businessName",
        type: "string",
        default: ""
      },
      {
        displayName: "First Name",
        name: "firstName",
        type: "string",
        default: ""
      },
      {
        displayName: "Get SMS",
        name: "getSms",
        type: "boolean",
        default: false
      },
      {
        displayName: "Invoice Emails",
        name: "invoiceCcEmails",
        type: "string",
        typeOptions: {
          multipleValues: true,
          multipleValueButtonText: "Add Email"
        },
        default: ""
      },
      {
        displayName: "Last Name",
        name: "lastname",
        type: "string",
        default: ""
      },
      {
        displayName: "No Email",
        name: "noEmail",
        type: "boolean",
        default: false
      },
      {
        displayName: "Notes",
        name: "notes",
        type: "string",
        default: ""
      },
      {
        displayName: "Notification Email",
        name: "notificationEmail",
        type: "string",
        default: "",
        displayOptions: {
          show: {
            noEmail: [false]
          }
        }
      },
      {
        displayName: "Phone",
        name: "phone",
        type: "string",
        default: ""
      },
      {
        displayName: "Referred By",
        name: "referredBy",
        type: "string",
        default: "",
        description: "Source from which customer is referred to the platform like Linkedin, Google, Customer name etc"
      }
    ]
  }
];
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  customerCreateDescription
});
//# sourceMappingURL=description.js.map