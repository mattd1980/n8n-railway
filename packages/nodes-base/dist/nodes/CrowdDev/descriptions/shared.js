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
  emailsField: () => emailsField
});
module.exports = __toCommonJS(shared_exports);
const emailsField = {
  displayName: "Emails",
  name: "emails",
  description: "Email addresses of the member",
  type: "fixedCollection",
  typeOptions: {
    multipleValues: true
  },
  default: {},
  options: [
    {
      displayName: "Item Choice",
      name: "itemChoice",
      values: [
        {
          displayName: "Email",
          name: "email",
          type: "string",
          placeholder: "name@email.com",
          default: ""
        }
      ]
    }
  ]
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  emailsField
});
//# sourceMappingURL=shared.js.map