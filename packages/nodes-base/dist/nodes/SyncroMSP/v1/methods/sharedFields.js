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
  addressFixedCollection: () => addressFixedCollection
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
          displayName: "Line 1",
          name: "address",
          type: "string",
          default: ""
        },
        {
          displayName: "Line 2",
          name: "address2",
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
          displayName: "ZIP",
          name: "zip",
          type: "string",
          default: ""
        }
      ]
    }
  ]
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  addressFixedCollection
});
//# sourceMappingURL=sharedFields.js.map