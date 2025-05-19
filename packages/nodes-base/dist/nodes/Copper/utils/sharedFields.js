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
var sharedFields_exports = {};
__export(sharedFields_exports, {
  addressFixedCollection: () => addressFixedCollection,
  emailFixedCollection: () => emailFixedCollection,
  emailsFixedCollection: () => emailsFixedCollection,
  phoneNumbersFixedCollection: () => phoneNumbersFixedCollection
});
module.exports = __toCommonJS(sharedFields_exports);
const addressFixedCollection = {
  displayName: "Address",
  name: "address",
  placeholder: "Add Address Fields",
  type: "fixedCollection",
  default: {},
  options: [
    {
      displayName: "Address Fields",
      name: "addressFields",
      values: [
        {
          displayName: "Street",
          name: "street",
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
          displayName: "Postal Code",
          name: "postal_code",
          type: "string",
          default: ""
        },
        {
          displayName: "Country",
          name: "country",
          type: "string",
          default: "",
          description: "ISO 3166 alpha-2 country code"
        }
      ]
    }
  ]
};
const phoneNumbersFixedCollection = {
  displayName: "Phone Numbers",
  name: "phone_numbers",
  placeholder: "Add Phone Number",
  type: "fixedCollection",
  typeOptions: {
    multipleValues: true
  },
  default: {},
  options: [
    {
      displayName: "Phone Fields",
      name: "phoneFields",
      values: [
        {
          displayName: "Number",
          name: "number",
          type: "string",
          default: ""
        },
        {
          displayName: "Category",
          name: "category",
          type: "string",
          default: ""
        }
      ]
    }
  ]
};
const emailsFixedCollection = {
  displayName: "Emails",
  name: "emails",
  placeholder: "Add Email",
  type: "fixedCollection",
  typeOptions: {
    multipleValues: true
  },
  default: {},
  options: [
    {
      displayName: "Email Fields",
      name: "emailFields",
      values: [
        {
          displayName: "Email",
          name: "email",
          type: "string",
          placeholder: "name@email.com",
          default: ""
        },
        {
          displayName: "Category",
          name: "category",
          type: "string",
          default: ""
        }
      ]
    }
  ]
};
const emailFixedCollection = {
  displayName: "Email",
  name: "email",
  placeholder: "Add Email",
  type: "fixedCollection",
  default: {},
  options: [
    {
      displayName: "Email Fields",
      name: "emailFields",
      values: [
        {
          displayName: "Email",
          name: "email",
          type: "string",
          placeholder: "name@email.com",
          default: ""
        },
        {
          displayName: "Category",
          name: "category",
          type: "string",
          default: ""
        }
      ]
    }
  ]
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  addressFixedCollection,
  emailFixedCollection,
  emailsFixedCollection,
  phoneNumbersFixedCollection
});
//# sourceMappingURL=sharedFields.js.map