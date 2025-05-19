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
  contactCreateDescription: () => contactCreateDescription
});
module.exports = __toCommonJS(description_exports);
var import_sharedFields = require("../../../methods/sharedFields");
const contactCreateDescription = [
  {
    displayName: "Customer ID",
    name: "customerId",
    type: "string",
    required: true,
    displayOptions: {
      show: {
        resource: ["contact"],
        operation: ["create"]
      }
    },
    default: ""
  },
  {
    displayName: "Email",
    name: "email",
    type: "string",
    placeholder: "name@email.com",
    displayOptions: {
      show: {
        resource: ["contact"],
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
        resource: ["contact"],
        operation: ["create"]
      }
    },
    default: {},
    options: [
      import_sharedFields.addressFixedCollection,
      {
        displayName: "Name",
        name: "name",
        type: "string",
        default: ""
      },
      {
        displayName: "Notes",
        name: "notes",
        type: "string",
        default: ""
      },
      {
        displayName: "Phone",
        name: "phone",
        type: "string",
        default: ""
      }
    ]
  }
];
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  contactCreateDescription
});
//# sourceMappingURL=description.js.map