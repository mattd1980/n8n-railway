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
var shared_exports = {};
__export(shared_exports, {
  customerCreateFields: () => customerCreateFields,
  customerUpdateFields: () => customerUpdateFields
});
module.exports = __toCommonJS(shared_exports);
const customerAddressOptions = [
  {
    displayName: "First Name",
    name: "first_name",
    type: "string",
    default: ""
  },
  {
    displayName: "Last Name",
    name: "last_name",
    type: "string",
    default: ""
  },
  {
    displayName: "Company",
    name: "company",
    type: "string",
    default: ""
  },
  {
    displayName: "Address 1",
    name: "address_1",
    type: "string",
    default: ""
  },
  {
    displayName: "Address 2",
    name: "address_2",
    type: "string",
    default: ""
  },
  {
    displayName: "City",
    name: "city",
    type: "string",
    default: ""
  },
  {
    displayName: "State",
    name: "state",
    type: "string",
    default: ""
  },
  {
    displayName: "Postcode",
    name: "postcode",
    type: "string",
    default: ""
  },
  {
    displayName: "Country",
    name: "country",
    type: "string",
    default: ""
  },
  {
    displayName: "Email",
    name: "email",
    type: "string",
    placeholder: "name@email.com",
    default: ""
  },
  {
    displayName: "Phone",
    name: "phone",
    type: "string",
    default: ""
  }
];
const customerUpdateOptions = [
  {
    displayName: "Billing Address",
    name: "billing",
    type: "collection",
    default: {},
    placeholder: "Add Field",
    options: customerAddressOptions
  },
  {
    displayName: "First Name",
    name: "first_name",
    type: "string",
    default: ""
  },
  {
    displayName: "Last Name",
    name: "last_name",
    type: "string",
    default: ""
  },
  {
    displayName: "Metadata",
    name: "meta_data",
    type: "fixedCollection",
    typeOptions: {
      multipleValues: true
    },
    default: {},
    placeholder: "Add Metadata Field",
    options: [
      {
        displayName: "Metadata Fields",
        name: "meta_data_fields",
        values: [
          {
            displayName: "Key",
            name: "key",
            type: "string",
            default: ""
          },
          {
            displayName: "Value",
            name: "value",
            type: "string",
            default: ""
          }
        ]
      }
    ]
  },
  {
    displayName: "Password",
    name: "password",
    type: "string",
    typeOptions: { password: true },
    displayOptions: {
      show: {
        "/resource": ["customer"],
        "/operation": ["create"]
      }
    },
    default: ""
  },
  {
    displayName: "Shipping Address",
    name: "shipping",
    type: "collection",
    default: {},
    placeholder: "Add Field",
    options: customerAddressOptions
  }
];
const customerCreateOptions = [
  ...customerUpdateOptions,
  {
    displayName: "Username",
    name: "username",
    type: "string",
    default: ""
  }
];
const customerCreateFields = {
  displayName: "Additional Fields",
  name: "additionalFields",
  type: "collection",
  placeholder: "Add Field",
  default: {},
  displayOptions: {
    show: {
      resource: ["customer"],
      operation: ["create"]
    }
  },
  options: customerCreateOptions
};
const customerUpdateFields = {
  displayName: "Update Fields",
  name: "updateFields",
  type: "collection",
  placeholder: "Add Field",
  default: {},
  displayOptions: {
    show: {
      resource: ["customer"],
      operation: ["update"]
    }
  },
  options: customerUpdateOptions
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  customerCreateFields,
  customerUpdateFields
});
//# sourceMappingURL=shared.js.map