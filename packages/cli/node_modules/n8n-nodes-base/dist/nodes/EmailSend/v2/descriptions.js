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
var descriptions_exports = {};
__export(descriptions_exports, {
  fromEmailProperty: () => fromEmailProperty,
  toEmailProperty: () => toEmailProperty
});
module.exports = __toCommonJS(descriptions_exports);
const fromEmailProperty = {
  displayName: "From Email",
  name: "fromEmail",
  type: "string",
  default: "",
  required: true,
  placeholder: "admin@example.com",
  description: "Email address of the sender. You can also specify a name: Nathan Doe &lt;nate@n8n.io&gt;."
};
const toEmailProperty = {
  displayName: "To Email",
  name: "toEmail",
  type: "string",
  default: "",
  required: true,
  placeholder: "info@example.com",
  description: "Email address of the recipient. You can also specify a name: Nathan Doe &lt;nate@n8n.io&gt;."
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  fromEmailProperty,
  toEmailProperty
});
//# sourceMappingURL=descriptions.js.map